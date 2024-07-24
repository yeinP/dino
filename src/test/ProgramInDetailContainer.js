import React, { useEffect, useState } from 'react';
import Loading from 'components/Element/Loading';
import { withRouter, useHistory } from 'react-router-dom';
import { programApi, ProgramsApi } from 'api';
import ProgramInDetailPresenter from './ProgramInDetailPresenter';
import isEmptyObj from 'modules/isEmptyObj';
import ModalAlert from 'components/Modal/ModalAlert';
import useModalState from 'store/useModal';
import Notice from 'components/UICompositions/Common/Notice';
import ProgramUpdateNotice from 'components/UICompositions/ProgramInDetail/ProgramUpdateNotice';
import ModalBackground from 'components/Modal/ModalBackground';
import ProgramUpdatePreview from 'components/UICompositions/ProgramInDetail/ProgramUpdatePreview';

function ProgramInDetailContainer({ match, readOnly }) {
  document.title = '프로그램 상세 정보';
  const glosignModalText =
    '비밀 유지 서약 및 본인 인증 후 사용할 수 있습니다. 인증하시겠습니까?';
  const privateModalText =
    'Private 프로그램에 참여하기 위해서는 계좌 인증 및 2차 비밀 유지 서약이 필요합니다. 서명하시겠습니까?';
  const { setModalOpen } = useModalState();
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  const [isPrivateAuth, setIsPrivateAuth] = useState(false);
  const [programLoading, setProgramLoading] = useState(true);
  const [VDIFlag, setVDIFlag] = useState(false);
  const [programDetail, setProgramDetail] = useState({
    program: {},
    rankList: [],
    programHistory: {},
    programUpdates: [],
    qnaList: [],
    programUpdateNotice: {
      date: '',
      status: '',
    },
  });
  const [modal, setModal] = useState({
    open: false,
    modalText: '',
    buttonText: '',
  });
  const [authenticationReOpen, setAuthenticationReOpen] = useState(false);
  const [vdiInfo, setVdiInfo] = useState();
  const [programPreviewDetail, setProgramPreviewDetail] = useState(null);
  const [isInIFrame, setIsInIFrame] = useState(false);

  const check1stGlosign = async (modalOpen) => {
    const [authInfo, authError] = await programApi.auth();
    if (authInfo) {
      setIsAuth(authInfo.result.idVerification);
      if (modalOpen && !authInfo.result.idVerification) {
        setModalOpen(glosignModalText, () => { (!isAuth && goSecurityManagement) ||
            (!isPrivateAuth && checkProgramGlosign)}, '인증하기', false, true)
      } else {
        setVdiInfo(authInfo.result.vdiInfo);
      }
    }
    if (authError) {
      setIsAuth(false);

      if (modalOpen) {
        setModalOpen(glosignModalText, () => { (!isAuth && goSecurityManagement) ||
            (!isPrivateAuth && checkProgramGlosign)}, '인증하기', false, true)
      }
    }
  };

  const check2ndGlosign = async (modalOpen) => {
    const [authInfo, authError] = await programApi.privateAuth(match.params.id);
    if (authInfo) {
      setAppliedToJoin(false);
      setIsPrivateAuth(authInfo.result.idVerification);

      if (modalOpen && !authInfo.result.idVerification) {
        setModalOpen(privateModalText, () => { (!isAuth && goSecurityManagement) ||
            (!isPrivateAuth && checkProgramGlosign)}, '서명하기', false, true)
        }
      }
    
    if (authError) {
      setIsPrivateAuth(false);

      if (modalOpen) {
        setModalOpen(privateModalText, () => { (!isAuth && goSecurityManagement) ||
            (!isPrivateAuth && checkProgramGlosign)}, '서명하기', false, true)
        };
      }
    }
  

  const getProgramDetail = async () => {
    const [programInfo, programError] = await programApi.programDetail(
      match.params.id,
    );
    if (programInfo) {
      const { result } = programInfo;
      setProgramDetail({
        ...programDetail,
        program: {
          ...result?.program,
          programSubsInfo: result?.programSubsInfo,
        },
        programHistory: result?.programHistory,
        programUpdates: result?.programUpdates,
        programUpdateNotice: result?.programUpdateNotice,
        rankList: result?.ranks,
        qnaList: result?.qnaList,
      });
      if (result?.program.programType === 'PV') {
        check2ndGlosign();
        if (
          (isPrivateAuth && !isEmptyObj(result?.program?.join)) ||
          result?.program.isTeamMember
        ) {
          setIsJoin('Approved');
        } else if (
          result?.program?.join &&
          !isEmptyObj(result?.program?.join)
        ) {
          setIsJoin('NotApproved');
        }
      }
      if (result?.idVerification) {
        setIsAuth(true);
      } else {
        check1stGlosign();
      }
    }
    if (programError) {
      if (programError.resCode === 403) {
        setModalOpen(
          `해당 프로그램은 ${programError.message.eventName}에 신청 완료 후 상세 화면을 볼 수 있습니다.`,
          () => history.push('/event'),
          false,
          true,
        );
      } else if (programError.resCode === 453) {
        setModalOpen(
          `해당 프로그램은 1단계 인증(비밀유지서약)이 사전에 필요합니다.`,
          () => history.push('/authSetting'),
          false,
          true,
        );
      } else {
        setModalOpen(
          `에러가 발생했습니다. 관리자에게 문의하세요.`,
          () => history.push('/'),
          false,
          true,
        );
      }
    }
    setProgramLoading(false);
  };

  const [isJoin, setIsJoin] = useState('NotJoined');
  const [appliedToJoin, setAppliedToJoin] = useState({
    purpose: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  const goSecurityManagement = async () => {
    setModal((prev) => ({ ...prev, open: false }));
    setProgramLoading((prev) => true);
    const [authInfo, authError] = await programApi.reportGlosign();
    if (!authInfo?.result.idVerification) {
      history.push('/authSetting');
      setProgramLoading((prev) => false);
    }
    if (authError) {
     setModalOpen('에러가 발생했습니다. 다시 시도해주세요.')
    }
  };

  const [processingGlosign, setProcessingGlosign] = useState(false);

  const checkProgramGlosign = async () => {
    setModal((prev) => ({ ...prev, open: false }));
    setProgramLoading(true);
    const [authInfo, authError] = await programApi.programGlosign(
      match.params.id,
    );
    if (!authInfo?.result.idVerification && authInfo?.result?.url) {
      window.open(authInfo.result.url);
      setProgramLoading(false);
      setProcessingGlosign(true);
    } else if (authInfo?.result.idVerification) {
      setProcessingGlosign(false);
      window.location.reload();
    }
    if (authError) {
      if (authError.message === 'BA_IS_REQUIRED') {
        history.push('/authSetting');
        setAuthenticationReOpen(false);
      } else {
        setModalOpen('에러가 발생했습니다. 다시 시도해주세요.')
      }
      setProgramLoading(false);
    }
  };

  const goReport = () => {
    history.push({
      pathname: `/program/${match.params.id}/report`,
      state: { next: true },
    });
  };

  const onOffBookmark = async (programId) => {
    const [result, fail] = await ProgramsApi.bookMark(programId);
    if (fail) {
      console.error(fail);
    }
  };

  const [programUpdatePreviewOpen, setProgramUpdatePreviewOpen] =
    useState(false);

  const handlePreviewModal = async () => {
    setProgramUpdatePreviewOpen(true);
    if (programPreviewDetail) {
      return;
    }
    const [result, fail] = await programApi.getUpdatePreview({
      programId: match.params.id,
      date: '2024-01-12T07:38:07.265Z',
    });
    if (fail) {
      setProgramUpdatePreviewOpen(false);
      console.error(fail);
    } else {
      setProgramPreviewDetail(result.result);
    }
  };

  useEffect(() => {
    getProgramDetail();
    document.getElementById('root').scrollIntoView({ block: 'start' });
    setIsInIFrame(window.location !== window.parent.location);
  }, []);

  useEffect(() => {
    if (VDIFlag) {
      setVDIFlag(false);
      check1stGlosign(true);
      if (programDetail.program.programType === 'PV' && isAuth) {
        check2ndGlosign(true);
      }
    }

    return () => {
      setVDIFlag(false);
    };
  }, [VDIFlag]);

  return (
    <>
      {authenticationReOpen && (
        <ModalAlert
          open={authenticationReOpen}
          close={() => {
            setAuthenticationReOpen(false);
          }}
          content="서명이 완료되지 않았습니다. 다시 시도해주세요"
          onClick={() => {
            setAuthenticationReOpen(false);
          }}
        />
      )}
      {programLoading && <Loading />}
      {
        //status === 'P' 업데이트 예정
        !isInIFrame &&
          programDetail.programUpdateNotice.status === 'P' &&
          //프로그램 타입에 따라 권한 있을 때 안내 보이기
          ((programDetail.program.programType === 'PV' &&
            isAuth &&
            isPrivateAuth) ||
            (programDetail.program.programType === 'PZ' && isAuth) ||
            (programDetail.program.programType === 'PB' && isAuth)) && (
            <Notice theme="blue">
              <ProgramUpdateNotice
                date={programDetail.programUpdateNotice.date}
                openPreview={handlePreviewModal}
              />
            </Notice>
          )
      }
      {programUpdatePreviewOpen && (
        <ModalBackground
          open={programUpdatePreviewOpen}
          style={{ padding: '0 !important' }}
        >
          <ProgramUpdatePreview
            program={programPreviewDetail}
            date={programDetail.programUpdateNotice.date}
            vdiInfo={vdiInfo}
            setVDIFlag={setVDIFlag}
            closePopup={() => setProgramUpdatePreviewOpen(false)}
          />
        </ModalBackground>
      )}
      <ProgramInDetailPresenter
        setVDIFlag={setVDIFlag}
        isAuth={isAuth}
        isPrivateAuth={isPrivateAuth}
        goReport={goReport}
        glosign={goSecurityManagement}
        program={programDetail.program}
        rankList={programDetail.rankList}
        vdiInfo={vdiInfo}
        setAppliedToJoin={setAppliedToJoin}
        appliedToJoin={appliedToJoin}
        isJoin={isJoin}
        setIsJoin={setIsJoin}
        programHistory={programDetail.programHistory}
        programUpdates={programDetail.programUpdates}
        programUpdateNotice={programDetail.programUpdateNotice}
        qnaList={programDetail.qnaList}
        onOffBookmark={onOffBookmark}
        auth2ndGlosign={checkProgramGlosign}
        processingGlosign={processingGlosign}
        readOnly={readOnly}
      />
    </>
  );
}

export default withRouter(ProgramInDetailContainer);
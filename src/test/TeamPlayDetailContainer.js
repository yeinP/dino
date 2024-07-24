import { teamPlayApi } from 'api';
import Loading from 'components/Element/Loading';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import TeamPlayDetailPresenter from './TeamPlayDetailPresenter';

function TeamPlayDetailContainer({ history, match }) {
  document.title = '팀 상세 정보';

  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();
  const {setOpenModal} = useModalState();
  const getInfo = async () => {
    const [info, error] = await teamPlayApi.detail(match.params.tId);
    if (info) {
      setDetail({
        ...info.result,
        members: [...info.result.members.filter((el) => el.status === 'A')],
      });
      setLoading(false);
    } else if (error) {
      history.goBack();
    }
  };

  useEffect(() => {
    if (!location.state?.next) {
      history.push('/');
    } else {
      getInfo();
    }
  }, [location]);

  const [perList, setPerList] = useState([]);
  const [pagenationLoading, setPageNationLoading] = useState(true);

  const perItemHandler = useCallback((target) => {
    setPerList(target);
  }, []);

  const loadingHandler = useCallback((target) => {
    setPageNationLoading(target);
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalType, setModalType] = useState();

  const closeModal = () => {
    if (modalType === 'action') {
      setModalText('');
      setModalOpen(false);
    } else {
      window.location.reload();
    }
  };

  const buttonClick = () => {
    setModalType('action');
    if (detail.buttonType === 'J') {
      setModalText('해당 팀으로 가입 신청하시겠습니까?');
    } else if (detail.buttonType === 'A') {
      setModalText('해당 팀의 초대를 승인하시겠습니까?');
    } else if (detail.buttonType === 'W') {
      setModalText('팀 탈퇴를 확정하시겠습니까?');
    }
    setModalOpen(true);
  };

  const actionClick = async (type, userId) => {
    const [info] = await teamPlayApi.action(
      match.params.tId,
      type || detail.buttonType,
      userId,
    );
    if (info) {
      setModalType('confirm');
      if (detail.buttonType === 'J') {
        setModalText('가입 신청이 완료되었습니다.');
      } else if (detail.buttonType === 'A') {
        setModalText('초대 승인이 완료되었습니다.');
      } else if (detail.buttonType === 'W') {
        setModalText('팀 탈퇴가 완료되었습니다.');
      }

      setModalOpen(true);
    } else {
      setModalType('confirm');
      setModalText('알 수 없는 오류가 발생 했습니다. 다시 시도해주세요.');

      setModalOpen(true);
    }
  };

  const modalClick = () => {
    if (modalType === 'action') {
      actionClick();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      {loading && <Loading />}
      <TeamPlayDetailPresenter
        detail={detail}
        modalOpen={modalOpen}
        modalText={modalText}
        modalType={modalType}
        modalClick={modalClick}
        closeModal={closeModal}
        perList={perList}
        loadingHandler={loadingHandler}
        pagenationLoading={pagenationLoading}
        perItemHandler={perItemHandler}
        buttonClick={buttonClick}
      />
    </>
  );
}

export default withRouter(TeamPlayDetailContainer);
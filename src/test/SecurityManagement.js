import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import BankAccountCertification from './BankAccountCertification';
import SecurityManagementDetail from './SecurityManagementDetail';
import Loading from 'components/Element/Loading';
import ModalAlert from 'components/Modal/ModalAlert';

import { licenseApi, programApi } from 'api';

function SecurityManagement(props) {
  document.title = '설정 | 인증관리';

  const [loading, setLoading] = useState(true);
  const { user, history } = props;

  const popup = localStorage.getItem('popup');
  if (popup === 'open') {
    localStorage.setItem('popup', 'close');
    if (window?.opener?.location) {
      window.opener.location.reload();
      window.self.close();
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');

  const [checkplus, setCheckplus] = useState(null);
  const [ndaVerification, setNDAVerification] = useState(true);
  const [idVerification, setIdVerification] = useState(true);
  const [baVerification, setBAVerification] = useState(true);

  const [authButtonType, setAuthButtonType] = useState('init');

  const [authIdVerificationButton, setAuthIdVerificationButton] =
    useState(false);
  const [authBAVerificationButton, setAuthBAVerificationButton] =
    useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const popupModal = () => {
    setPopupOpen(true);
  };
  const closePopupModal = () => {
    setPopupOpen(false);
    window.location.reload();
  };

  const getSecurityVerfication = async () => {
    const [verifyInfo, verifyError] = await licenseApi.getSecurityVerfication();
    if (verifyInfo) {
      const nda = verifyInfo.result.ndaVerification;
      const id = verifyInfo.result.idVerification;
      const ba = verifyInfo.result.baVerification;
      const { checkplus } = verifyInfo.result;

      if (nda) {
        setAuthButtonType('complete');
        setNDAVerification(nda);
      } else {
        setAuthButtonType('init');
        setNDAVerification(nda);
      }
      // if nda verification
      if (!nda) {
        setIdVerification(true);
        setAuthIdVerificationButton(false);
      } else {
        setIdVerification(id);
        setCheckplus(checkplus);
        setAuthIdVerificationButton(true);
      }
      // if id verification
      if (!id) {
        setBAVerification(true);
        setAuthBAVerificationButton(false);
      } else {
        setBAVerification(ba);
        setAuthBAVerificationButton(true);
      }
    }
    if (verifyError) {
      setModalText('에러가 발생했습니다. 다시 시도해주세요.');
      setModalOpen(true);
    }
    setLoading(false);
  };

  const glosign = async () => {
    await new Promise((r) => setTimeout(r, 500));
    const [glosignInfo] = await programApi.reportGlosign();
    if (glosignInfo?.result?.url) {
      window.open(glosignInfo.result.url);
    }
    setAuthButtonType('ing');
  };

  const updateNDAVerification = async (modal) => {
    if (user.userType === 'reporter') {
      const [authInfo, authError] = await programApi.reportGlosign();
      if (authInfo) {
        if (authInfo.result.idVerification) {
          setModalText('글로싸인 서명이 완료되었습니다.');
          setModalOpen(true);
        } else {
          setModalText('글로싸인 서명이 진행중입니다.');
          setModalOpen(true);
        }
      }
      if (authError) {
        setModalText('에러가 발생했습니다. 다시 시도해주세요.');
        setModalOpen(true);
      }
      window.location.reload();
    } else {
      setModalText('잘못된 접근입니다.');
      setModalOpen(true);
      window.location.href = '/';
    }
  };

  const niceCheckPlus = async () => {
    const niceURL = `https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb?m=service`;
    const form = document.createElement('form');
    form.setAttribute('action', niceURL);
    form.setAttribute('method', 'POST');
    form.setAttribute('target', 'nice-form');

    const service = document.createElement('input');
    service.setAttribute('type', 'hidden');
    service.setAttribute('id', 'm');
    service.setAttribute('name', 'm');
    service.setAttribute('value', 'service');
    form.appendChild(service);

    const tokenVersionId = document.createElement('input');
    tokenVersionId.setAttribute('type', 'hidden');
    tokenVersionId.setAttribute('id', 'token_version_id');
    tokenVersionId.setAttribute('name', 'token_version_id');
    tokenVersionId.setAttribute('value', checkplus.token_version_id);
    form.appendChild(tokenVersionId);

    const encData = document.createElement('input');
    encData.setAttribute('type', 'hidden');
    encData.setAttribute('id', 'enc_data');
    encData.setAttribute('name', 'enc_data');
    encData.setAttribute('value', checkplus.enc_code);
    form.appendChild(encData);

    const integrityValue = document.createElement('input');
    integrityValue.setAttribute('type', 'hidden');
    integrityValue.setAttribute('id', 'integrity_value');
    integrityValue.setAttribute('name', 'integrity_value');
    integrityValue.setAttribute('value', checkplus.integrity_value);
    form.appendChild(integrityValue);

    document.body.appendChild(form);
    window.open(
      niceURL,
      'nice-form',
      'width=480px,height=800px,scrollbars=yes',
    );
    form.submit();

    localStorage.setItem('popup', 'open');
  };

  const [ndaButtonText, setNDAButtonText] = useState('서명하기');
  const getNDAButtonText = (buttonType) => {
    if (buttonType === 'init') {
      setNDAButtonText('서명하기');
    } else if (buttonType === 'ing') {
      setNDAButtonText('서명진행확인');
    } else if (buttonType === 'complete') {
      setNDAButtonText('서명완료');
    }
  };

  useEffect(() => {
    getSecurityVerfication();
    return () => {
      setLoading(true);
    };
  }, []);

  useEffect(() => {
    getNDAButtonText(authButtonType);
  }, [authButtonType]);

  return (
    <>
      {loading && <Loading />}
      {modalOpen && (
        <ModalAlert
          open={modalOpen}
          content={modalText}
          close={() => {
            setModalOpen(false);
          }}
          onClick={() => {
            setModalOpen(false);
            window.location.reload();
          }}
        />
      )}
      {popupOpen && (
        <BankAccountCertification
          user={user}
          history={history}
          popupOpen={popupOpen}
          popupModal={popupModal}
          closePopupModal={closePopupModal}
        />
      )}
      <SecurityManagementDetail
        loading={loading}
        ndaVerification={ndaVerification}
        idVerification={idVerification}
        baVerification={baVerification}
        authButtonType={authButtonType}
        authIdVerificationButton={authIdVerificationButton}
        authBAVerificationButton={authBAVerificationButton}
        ndaButtonText={ndaButtonText}
        glosign={glosign}
        updateNDAVerification={updateNDAVerification}
        niceCheckPlus={niceCheckPlus}
        popupModal={popupModal}
      />
    </>
  );
}

export default withRouter(SecurityManagement);
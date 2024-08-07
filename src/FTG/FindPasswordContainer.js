import { useEffect, useState } from 'react';
import FindPasswordPresenter from './FindPasswordPresenter';
import invalidCheck from './invalidCheck';
import { useTranslation } from 'react-i18next';
import useCodeTimer from './UseCodeTimer';
import ModalAlert from './ModalAlert';


function FindPasswordContainer() {
  const [t, i18n] = useTranslation(['Main']);
  document.title = t('findPassword.title');

  let [alertShow , setAlertShow]= useState(false);
  const handleTimeEnd = () => {
    if(!alertShow){
      setOtpSendText({ state: false, text: '' });
      setAlertShow(true);
      openModal('code');

    }
  };

  console.log(alertShow);

  const { timeLeft, isCounting, startTimer, resetTimer } = useCodeTimer(3, handleTimeEnd);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalType, setModalType] = useState('');

  
  const openModal = (type) => {
    if (type === 'cancel') {
      setModalOpen(true);
      setModalType('cancel');
      setModalText(t('findPassword.notFind'));
    } else if (type === 'ok') {
      setModalOpen(true);
      setModalType('');
      setModalText(t('findPassword.done'));
    } else if( type === 'code') {
      setModalOpen(true);
      setModalType('');
      setModalText('시간이 초과되었습니다. 다시 인증번호를 전송해주세요.')
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalText();
  };

  //값
  const [values, setValues] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  });

  //valid
  const [invalids, setInvalids] = useState({
    email: {
      invalid: false,
      text: '',
    },
    code: {
      invalid: false,
      text: '',
    },
    password: {
      invalid: false,
      text: '',
    },
    confirmPassword: {
      invalid: false,
      text: '',
    },
  });

  const [otpSendText, setOtpSendText] = useState({ state: false, text: '' });

  const [active, setActive] = useState({
    certificationConfirmActive: false,
    confirmActive: false,
    codeButtonActive: true,
    passwordBox: false,
  });

  useEffect(() => {
    if (invalids.email.invalid === false && values.email) {
      setActive((preState) => ({
        ...preState,
        codeButtonActive: false,
      }));
    } else
      setActive((preState) => ({
        ...preState,
        codeButtonActive: true,
      }));
  }, [values.email, invalids.email.invalid]);

  //변경될때
  const onChange = (event, max) => {
    const { value, name } = event.target;
    let val;
    if (max) {
      val = value.subString(0, max);
    } else {
      val = value;
    }

    if (name === 'email') {
      setValues({ ...values, [name]: val.replace(/(\s*)/g, '') });
    } else if (name === 'code') {
      setActive((prevState) => ({
        ...prevState,
        codeText: false,
      }));
      setValues({ ...values, [name]: val.replace(/(\s*)\D/g, '') });
    } else if (name === 'password') {
      setValues({ ...values, [name]: val.replace(/(\s*)/g, '') });
    } else {
      setValues({ ...values, [name]: val.replace(/^\s*/, '') });
    }

    invalidCheck(invalids, setInvalids, name, val);
  };

  //인증 확인
  //인증 빈 값 확인
  const certificationEmptyCheck = () => {
    if (values.email && values.code) {
      return true;
    }
    return false;
  };
  const certificationCheck = () => {
    if (invalids.email.invalid === false && invalids.code.invalid === false) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (certificationEmptyCheck() && certificationCheck()) {
      setActive((prevState) => ({
        ...prevState,
        certificationConfirmActive: true,
      }));
    } else {
      setActive((preState) => ({
        ...preState,
        certificationConfirmActive: false,
      }));
    }
  }, [ values.email, values.code ]);

  //인증번호 전송
  const handleSendCode = () => {
    setActive((prevState) => ({
      ...prevState,
      codeText: true,
    }));
    setOtpSendText({ state: true, text: t('findPassword.3min') });
    startTimer(); // 타이머 시작
  };
  //인증 번호 확인

  //비밀번호 입력 창 생성 및 인증 완료 후 readOnly로 바꾸기 위함

  const handleCodeCheck = () => {
    //인증이 완료되면 이메일 창 인증번호 창 readOnly로 변경되고 password 입력 창 생성
    setActive((preState) => ({
      ...preState,
      passwordBox: true,
    }));
  };
  //비밀번호 확인
  useEffect(() => {
    if (
      values.confirmPassword !== '' &&
      values.confirmPassword !== values.password
    ) {
      setInvalids({
        ...invalids,
        confirmPassword: {
          invalid: true,
          text: t('findPassword.notCorrectConfirmPassword'),
        },
      });
    } else if (values.password === values.confirmPassword) {
      setInvalids({
        ...invalids,
        confirmPassword: {
          invalid: false,
          text: '',
        },
      });
    } else if (invalids.password.invalid && !values.confirmPassword) {
      setInvalids({
        ...invalids,
        confirmPassword: {
          invalid: true,
          text: t('findPassword.checkPassword'),
        },
      });
    }
  }, [values.password, values.confirmPassword]);

  //전체
  //빈값 확인

  const emptyCheck = () => {
    for (const key of Object.keys(invalids)) {
      if (!values[key]) {
        return false;
      }
    }

    return true;
  };

  //valid 확인

  const allInvalidCheck = () => {
    for (const key of Object.keys(invalids)) {
      if (invalids[key].invalid === true) {
        return false;
      }
    }
    return true;
  };

  //빈값 없고 valid 확인되어야 버튼 활성화
  useEffect(() => {
    if (emptyCheck() && allInvalidCheck()) {
      setActive((prevState) => ({
        ...prevState,
        confirmActive: true,
      }));
    } else {
      setActive((preState) => ({
        ...preState,
        confirmActive: false,
      }));
    }
  }, [values, invalids]);

  //넘길 값
  const confirmFlag = false;
  const confirm = async () => {
    if (!confirmFlag) {
      const prams = {
        email: values.email,
        password: values.password,
      };
    }
  };

  return (
    <>
      {modalOpen && (
        <ModalAlert
          open={modalOpen}
          content={modalText}
          cancel={modalType === 'cancel'}
          close={() => closeModal()}
          onClick={() => {
            if (modalType === 'cancel') {
              window.location.href = '/';
            } else if(modalType === 'code') {
              setAlertShow(true);
            }else {
              closeModal();
            }
          }}
        ></ModalAlert>
        )}
      <FindPasswordPresenter
        values={values}
        invalids={invalids}
        confirm={confirm}
        onChange={onChange}
        openModal={openModal}
        handleCodeCheck={handleCodeCheck}
        handleSendCode={handleSendCode}
        active={active}
        otpSendText={otpSendText}
         timeLeft={timeLeft}
         isCounting={isCounting}
      />
    </>
  );
}

export default FindPasswordContainer;
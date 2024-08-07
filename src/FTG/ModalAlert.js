import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { flexCol, flexRow, RowDiv } from './CommonCss';
import closeIcon from './close.svg';
import ImageButton from './ImageButton';
import Text from './Text';
import Button from './Button';
import { useTranslation } from 'react-i18next';

function ModalAlert({
  open,
  title,
  content,
  cancel,
  close,
  onClick,
  cancelButtonText,
  buttonText,
  zIndex,
  wordBreak,
  closeModal,
}) {
  const [t, i18n] = useTranslation(['Navigation']);
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: overlay;
      width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ModalAlertDiv isOpen={open} zIndex={zIndex}>
      <AlertContent>
        <Col>
          <Header>
            <Text size={28} mobileSize={16} weight={700} color="darkBlue">
              {title || t('setting.nav.myAccount.alert')}
            </Text>
            <ImageButton
              width={24}
              height={24}
              mobileWidth={14}
              mobileHeight={14}
              src={closeIcon}
              alt="close 이미지"
              onClick={closeModal ? closeModal : close}
            />
          </Header>
          <Text style={{ whiteSpace: wordBreak ? 'break-spaces' : 'normal' }}>
            {content}
          </Text>
        </Col>
        <RowDiv width="100%" align="center" justify="flex-end" gap={10}>
          {cancel && (
            <Button
              text={cancelButtonText || t('cancel')}
              width={104}
              height={40}
              mobileWidth={78}
              mobileHeight={34}
              onClick={close}
            />
          )}
          <Button
            text={buttonText || t('ok')}
            width={104}
            height={40}
            mobileWidth={78}
            mobileHeight={34}
            active
            onClick={onClick}
          />
        </RowDiv>
      </AlertContent>
    </ModalAlertDiv>
  );
}

const fadein = keyframes` 0% {
  -webkit-transform: translateZ(-80px);
          transform: translateZ(-80px);
  opacity: 0;
}
100% {
  -webkit-transform: translateZ(0);
          transform: translateZ(0);
  opacity: 1;
}`;

const ModalAlertDiv = styled.div`
  ${(props) =>
    props.isOpen &&
    css`
      animation: ${fadein} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    `};
  z-index: ${(props) => (props.zIndex ? props.zIndex : 9998)};
  ${flexCol('center', 'center')}
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  height: 100%;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: rgba(30, 30, 32, 0.46);

  @media ${({ theme }) => theme.device.mobile} {
    padding: 20px;
  }
`;

const AlertContent = styled.div`
  background-color: white;
  border-radius: 2px;
  padding: 30px;
  width: 460px;
  min-height: 260px;
  box-sizing: border-box;
  ${flexCol('flex-start', 'space-between')}

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    min-height: 185px;
    padding: 20px;
  }
`;

const Col = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  ${flexRow('center', 'space-between')}
  margin-bottom:30px;

  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 15px;
  }
`;

export default ModalAlert;
import WhiteBackground from './WhiteBackGround'; 
import { ColDiv, RowDiv, flexCol } from './CommonCss'
import Image from './Image';
import FTGLogo from './logo.svg'
import { useTranslation } from 'react-i18next';
import Input from './Input';
import Text from './Text';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import Button from './Button';

function FindPasswordPresenter({
  values,
  invalids,
  confirm,
  onChange,
  openModal,
  handleCodeCheck,
  handleSendCode,
  active,
  otpSendText,
  timeLeft,
  isCounting,
}) {
  const { t, i18n } = useTranslation(['Main']);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return time > 0 ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}` : '0:00';
  };

  return (
    <WhiteBackground>
      <Wrap>
        <LoginContent gap={16}>
          <RowDiv align="center" justify="center">
            <Image src={FTGLogo} mb={32} />
          </RowDiv>
          <ColDiv
            justify={'start'}
            width={'100%'}
            maxWidth={'416px'}
            mb={20}
            align="center"
          >
            <Text size={28} weight={600} color={'#9b9b9b'}>
              {t('findPassword.title')}
            </Text>
          </ColDiv>
          <ColDiv width={'100%'} maxWidth={'416px'} gap={16}>
            <ColDiv gap={8}>
              <InputCustom>
                <Input
                  name="email"
                  placeholder={t('findPassword.email')}
                  invalid={invalids.email.invalid}
                  onChange={(e) => onChange(e)}
                  values={values.email}
                  readOnly={active.passwordBox}
                />
                <CodeButton
                  position="absolute"
                  active={true}
                  disabled={active.codeButtonActive || active.passwordBox}
                  onClick={() => {
                    handleSendCode();
                  }}
                >
                  <Text
                    color="#9b9b9b"
                    weight={100}
                    mobileWeight={400}
                    mobileSize={11}
                  >
                    {t('findPassword.codeButton')}
                  </Text>
                </CodeButton>
              </InputCustom>
              {invalids.email.invalid && (
                <Text size={14} mobileSize={12} color="fontRed">
                  {t(invalids.email.text)}
                </Text>
              )}
              {otpSendText.state && !active.passwordBox && (
                <Text size={14} mobileSize={12} color="fontRed">
                  {t(otpSendText.text)} {isCounting && timeLeft > 0 && `(${formatTime(timeLeft)})`}
                </Text>
              )}
            </ColDiv>

            <ColDiv gap={8} width={'100%'}>
              <Input
                name="code"
                placeholder={t('findPassword.code')}
                invalid={invalids.code.invalid}
                onChange={(e) => onChange(e)}
                values={values.code}
                readOnly={active.passwordBox}
              />
              {invalids.code.invalid && (
                <Text size={14} mobileSize={12} color="fontRed">
                  {t(invalids.code.text)}
                </Text>
              )}
            </ColDiv>
          </ColDiv>
          {!active.passwordBox && (
            <RowDiv
              width="100%"
              align="flex-start"
              justify="space-between"
              gap={30}
            >
              <Button
                text={t('findPassword.cancel')}
                outline
                mt={10}
                activeColor="#81818A"
                padding={'12px'}
                onClick={() => {
                  openModal('cancel');
                }}
              />
              <Button
                text={t('findPassword.codeConfirm')}
                color="#FFFF"
                mt={10}
                padding={'12px'}
                disabled={!active.certificationConfirmActive}
                active={active.certificationConfirmActive}
                onClick={() => {
                  handleCodeCheck(true);
                  openModal('ok');
                }}
              />
            </RowDiv>
          )}
          {active.passwordBox && (
            <ColDiv width={'100%'} gap={16}>
              <ColDiv gap={8} width={'100%'}>
                <Input
                  name="password"
                  placeholder={t('findPassword.password')}
                  invalid={invalids.password.invalid}
                  onChange={(e) => onChange(e)}
                  values={values.password}
                  type="password"
                />
                {invalids.password.invalid && (
                  <Text size={14} mobileSize={12} color="fontRed">
                    {t(invalids.password.text)}
                  </Text>
                )}
              </ColDiv>
              <ColDiv gap={8} width={'100%'}>
                <Input
                  placeholder={t('findPassword.confirmPassword')}
                  value={values.confirmPassword}
                  onChange={(e) => onChange(e)}
                  invalid={invalids.confirmPassword.invalid}
                  name="confirmPassword"
                  type="password"
                />
                {invalids.confirmPassword.invalid && (
                  <Text size={14} mobileSize={12} mt={6} color="fontRed">
                    {t(invalids.confirmPassword.text)}
                  </Text>
                )}
              </ColDiv>
              <RowDiv
                width="100%"
                align="flex-start"
                justify="space-between"
                gap={30}
              >
                <Button
                  text={t('findPassword.cancel')}
                  outline
                  mt={10}
                  activeColor="#81818A"
                  padding={'12px'}
                  onClick={() => openModal('cancel')}
                />
                <Button
                  text={t('findPassword.save')}
                  color="#FFFF"
                  mt={10}
                  padding={'12px'}
                  onClick={confirm}
                  disabled={!active.confirmActive}
                  active={active.confirmActive}
                />
              </RowDiv>
            </ColDiv>
          )}
        </LoginContent>
      </Wrap>
    </WhiteBackground>
  );
}
const InputCustom = styled.div`
  width: 100%;
  position: relative;
`;
const LoginContent = styled(RowDiv)`
  background-color: #ffffff;
  border-radius: 2px;
  padding: 40px;
  margin: auto;
  width: 512px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
  ${flexCol('center', 'flex-start')}
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const Wrap = styled.div`
  margin: 60px 0;
  width: 100%;
  max-width: 416px;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 8px 0;
  }
`;
const Div = styled.div`
  width: 100%;
`;
const CustomButton = styled.button`
  width: 100%;
  height: 48px;
  color: ${({ active, theme }) => (active ? 'white' : theme.colors.gray)};
  background-color: ${({ active, theme }) => (active ? '#3cdc84' : '#FFFFFF')};
  border: 1px solid #3cdc84;
  box-shadow: ${({ active, theme }) =>
    active ? '0px 8px 24px 0px #0000001F' : '0px 8px 24px 0px #0000001F'};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    max-width: 416px;
    height: 40px;
    box-shadow: ${({ active, theme }) =>
      active ? '0px 8px 24px 0px #0000001F' : '0px 8px 24px 0px #0000001F'};
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    max-width: 416px;
    height: 40px;
    box-shadow: ${({ active, theme }) =>
      active ? '0px 8px 24px 0px #0000001F' : '0px 8px 24px 0px #0000001F'};
  }
`;

const CodeButton = styled.button`
  position: absolute;
  top: 7px;
  width: 25%;
  height: 30px;
  right: 7px;
  color: ${({ active, theme }) => (active ? 'black' : theme.colors.gray)};
  background-color: ${({ active, theme }) => (active ? '#f4f4f9' : '#FFFFFF')};
  border: 1px solid #f4f4f9;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
        `
      : css`
          &:hover {
            opacity: 0.5;
          }
        `}
  @media ${({ theme }) => theme.device.tablet} {
    width: 25%;
    max-width: 416px;
    height: 26px;
    top: 5px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 25%;
    max-width: 416px;
    height: 26px;
  }
`;

const Divide = styled(Text)`
  text-align: center;
  flex: 0.2 0 auto;
  margin: 0;
  height: 12px;
`;

const DivideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-transform: uppercase;
  border: none;
  align-items: center;
  justify-content: center;
  width: 320px;
  vertical-align: baseline;
  ::before,
  ::after {
    content: '';
    border-bottom: ${({ active, theme }) =>
      active ? 'white' : `1px solid ${theme.colors.darkBlue || '#0B3452'}`};
    flex: 1 0 auto;
    height: 0.5em;
    margin: 0;
  }
`;
export default FindPasswordPresenter;
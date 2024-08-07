import styled from "styled-components";
import { flexCol } from "../Component/styled";

function LoginIntro({}) {
    return (
        <LoginBox></LoginBox>
    )
}

export default LoginIntro

const LoginBox = styled.div`
  background-color: white;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  padding: 40px;
  margin: 200px 0px 60px 0px;
  width: 512px;
  ${flexCol('center', 'flex-start')}

  & > div:first-child {
    width: 100%;
  }

  @media screen and (max-width: 1024px) {
    width: 50%;
    min-width: 380px;
  }
  @media screen and (max-width: 650px) {
    height: 100%;
    margin: 120px 0px 60px 0px;
  }
`;
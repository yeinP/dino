import Button from 'components/Element/Button';
import CheckBox from 'components/Element/Input/CheckBox';
import PageHeader from 'components/Element/PageHeader';
import Text from 'components/Element/Text';
import ModalAlert from 'components/Modal/ModalAlert';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RowDiv } from 'styles/CommonCSS';

function Withdraw(props) {
  const {setModalOpen} = useModalState();
  return (
    <>
      <Wrap>
        <PageHeader>계정탈퇴</PageHeader>
        <Content>
          <Text>
            1. 사용하고 계신 아이디 wkdusdmlqlc는 탈퇴할 경우 재사용 및 복구가
            불가능합니다. 퇴한 아이디는 본인과 타인 모두 재사용 및 복구가
            불가하오니 신중하게 선택하시기 바랍니다.
            <br />
            <br />
            2. 탈퇴 후 회원 정보 는 모두 삭제됩니다. 회원의 개인정보는 모두
            삭제되며, 삭제된 데이터는 복구되지 않습니다.
            <br />
            <br />
            3. 탈퇴 후에도 명예의전당, 제출한 리포트는 그대로 남아있습니다. 예의
            전당의 닉네임 포인트 등은 자동 삭제되지 않고 그대로 남아있습니다.
            제출하신 리포트는 파인더갭으로 귀속되어 남아있습니다. <br />
            <br />
            4. 탈퇴 후 지갑의 잔여 예치금은 더이상 인출할 수 없습니다. 탈퇴 후
            에는 회원정보가 삭제되어 본인여부를 확인할 수 없어 예치금을 인출할
            수 없습니다. <br />
            <br /> 5. 파인더갭의 인증서 서비스를 이용할 수 없게 됩니다. <br />
            <br /> 6. 탈퇴 후에는 아이디 wkdusdmlqlc로 다시 가입할 수 없으며
            아이디와 데이터는 복구할 수 없습니다.
          </Text>
        </Content>
        <CheckBox
          name="agree"
          text="안내 사항을 모두 확인하였으며, 이에 동의합니다."
          //   onChange={(e) => handleCheck(e, 'reporter')}
          //   checked={values.mailCheck.includes('reporter')}
        ></CheckBox>
        <RowDiv align="center" justify="flex-end" gap={10} mt={80} mMt={30}>
          <Button
            text="탈퇴하기"
            width={175}
            disabled
            onClick={() => {
              setModalOpen('탈퇴를 진행하시겠습니까?',()=>{}, '확인', true, true);
            }}
          />
        </RowDiv>
      </Wrap>
    </>
  );
}
// onClickEqualsOnClose: true
// 모달의 확인 버튼을 클릭하면 onClick 함수가 실행되고 모달이 닫
// onClickEqualsOnClose: false
// 모달의 확인 버튼을 클릭하면 onClick 함수만 실행되고 모달은 닫X
// const Wrap = styled.div``;

const Content = styled.div`
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 10px;
  margin-top: 60px;
  margin-bottom: 6px;
`;

// const CheckBoxLabel = styled.label`
//   ${flexRow('center', 'flex-start')}
//   cursor:pointer;
// `;

export default Withdraw;
import CareerHistoryOrManagement from 'components/UICompositions/Setting/Career/CareerHistoryOrManagement';
import styled from 'styled-components';
import Text from 'components/UIElements/Text';
import { ColDiv, RowDiv } from 'styles/CommonCSS';
import OnOff from 'components/UICompositions/Setting/OnOff';
import Button from 'components/UIElements/Button';
export default function CareerManagementSettingPresenter({
  skills,
  setSkills,
  cves,
  setCves,
  setNoMore,
  awards,
  setAwards,
  teams,
  setTeams,
  certifications,
  setCertifications,
  certificationList,
  update,
  workExperiences,
  setWorkExperiences,
  disclosure,
  onOffDisclosure,
  active,
}) {
  return (
    <>
      <Title>경력 관리</Title>
      <CareerHistoryOrManagement
        skills={skills}
        setSkills={setSkills}
        cves={cves}
        setCves={setCves}
        setNoMore={setNoMore}
        awards={awards}
        setAwards={setAwards}
        teams={teams}
        setTeams={setTeams}
        certifications={certifications}
        setCertifications={setCertifications}
        certificationList={certificationList}
        update={update}
        workExperiences={workExperiences}
        setWorkExperiences={setWorkExperiences}
      />
      <OpenCareerDiv>
        <OpenCareerText>경력 공개 범위 설정</OpenCareerText>
        <RowDiv align="center" justify="space-between" pl={20}>
          <Text>기업 프로그램 담당자에게 경력 공개</Text>
          <OnOff
            isActive={disclosure.toBusiness}
            name="openToCompany"
            onClick={() =>
              onOffDisclosure('toBusiness', !disclosure.toBusiness)
            }
          />
        </RowDiv>
        <Text size={12} color={'interactionError'} mt={7} mb={21} pl={20}>
          *비공개 프로그램의 초대 목적으로 활용됩니다.
        </Text>
        <RowDiv align="center" justify="space-between" pl={20}>
          <Text>윤리적 해커들에게 경력 공개</Text>
          <OnOff
            isActive={disclosure.toReporter}
            name="openToHackers"
            onClick={() =>
              onOffDisclosure('toReporter', !disclosure.toReporter)
            }
          />
        </RowDiv>
        <RowDiv align="center" justify="center" gap={10} mt={40}>
          <Button
            text="취소"
            outline={'grayscale4'}
            padding={'10px 20px'}
            color={'secondary3'}
            width={'65px'}
            mobileWidth={'50%'}
            whiteSpace={'nowrap'}
            onClick={() => window.location.reload()}
          />
          <Button
            text="저장하기"
            width={'89px'}
            mobileWidth={'50%'}
            padding={'11px 20px'}
            disabled={!active}
            onClick={update}
            boxShadow={'0px 0px 4px rgba(0, 0, 0, 0.2)'}
          />
        </RowDiv>
      </OpenCareerDiv>
    </>
  );
}
const Title = styled(Text)`
  font-weight: 700;
  line-height: 28px;
  font-size: 20px;
  margin-bottom: 20px;

  @media ${({ theme }) => theme.device.mobile} {
    padding-top: 16px;
  }
`;
const OpenCareerDiv = styled(ColDiv)`
  width: 85%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;
const OpenCareerText = styled(Text)`
  font-weight: 700;
  padding: 20px;
  border-bottom: 1px solid #e4e4e4;
  margin-top: 40px;
  margin-bottom: 21px;
`;
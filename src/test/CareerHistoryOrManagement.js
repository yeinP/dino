import { ColDiv } from 'styles/CommonCSS';
import MySkill from './MySkill';
import CVE from './CVE';
import RedTeamExperience from './RedTeamExperience';
import Certification from './Certification';
import WorkExperience from './WorkExperience';
import Award from './Award';
import BoxTemplate from './BoxTemplate';
import ModalBackground from 'components/Modal/ModalBackground';
import AddModal from './AddModal';
import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { hallOfFameApi } from 'api';
import Loading from 'components/Element/Loading';
import profileLocked from 'assets/img/profile-locked.png';
import ImageComponent from 'components/UIElements/Image';
import { settingContext } from 'context/settingContext';
import Text from 'components/UIElements/Text';
import ModalAlert from 'components/Modal/ModalAlert';
export default function CareerHistoryOrManagement({
  readOnly,
  skills,
  setSkills,
  cves,
  setCves,
  awards,
  setAwards,
  teams,
  setTeams,
  certifications,
  setCertifications,
  certificationList,
  workExperiences,
  setWorkExperiences,
}) {
  const [profileDisclosed, setProfileDislosed] = useState(true);
  const { addModal, setAddModal } = !readOnly && useContext(settingContext);
  const {setModalOpen} = useModalState();
  const { data, isLoading } = useQuery({
    queryKey: ['hacker-career'],
    queryFn: async () => {
      const [success, fail] = await hallOfFameApi.careerDetail(
        location?.pathname?.split('/').slice(-1)[0],
      );
      if (success) {
        const data = await success.result.career;
        return data;
      } else if (fail.message === "Not allowed to see the ranker's career") {
        setProfileDislosed(false);
      } else if (fail.resCode === 404) {
        setProfileDislosed('error');
      }
    },
    enabled: !!readOnly,
    cacheTime: 0,
  });
  const categories = [
    {
      title: '보유 기술',
      content:
        (data?.skill?.length === 0 || data?.skill?.length === undefined) &&
        (skills?.length === 0 || skills?.length === undefined) ? null : (
          <MySkill
            readOnly={readOnly}
            skills={data?.skill || skills}
            setSkills={setSkills}
          />
        ),
    },
    {
      title: 'CVE 등록 경험 / 버그바운티 이력',
      content:
        (data?.cve?.length === 0 || data?.cve?.length === undefined) &&
        (cves?.length === 0 || cves?.length === undefined) ? null : (
          <CVE cves={data?.cve || cves} setCves={setCves} readOnly={readOnly} />
        ),
    },
    {
      title: '국내외 해킹대회 수상 / 연구 결과 발표',
      content:
        (data?.award?.length === 0 || data?.award?.length === undefined) &&
        (awards?.length === 0 || awards?.length === undefined) ? null : (
          <Award
            readOnly={readOnly}
            awards={data?.award || awards}
            setAwards={setAwards}
          />
        ),
    },
    {
      title: '레드팀 활동 경험',
      content:
        (data?.team?.length === 0 || data?.team?.length === undefined) &&
        (teams?.length === 0 || teams?.length === undefined) ? null : (
          <RedTeamExperience
            readOnly={readOnly}
            teams={data?.team || teams}
            setTeams={setTeams}
          />
        ),
    },
    {
      title: '보안 관련 자격증',
      content:
        (data?.certification?.length === 0 ||
          data?.certification?.length === undefined) &&
        (certifications?.length === 0 ||
          certifications?.length === undefined) ? null : (
          <Certification
            readOnly={readOnly}
            certifications={data?.certification || certifications}
            setCertifications={setCertifications}
          />
        ),
    },
    {
      title: '기업 재직 경력',
      content:
        (data?.workExperience?.length === 0 ||
          data?.workExperience?.length === undefined) &&
        (workExperiences?.length === 0 ||
          workExperiences?.length === undefined) ? null : (
          <WorkExperience
            readOnly={readOnly}
            workExperiences={data?.workExperience || workExperiences}
            setWorkExperiences={setWorkExperiences}
          />
        ),
    },
  ];
  const valueToSet =
    !readOnly && addModal.title === '보유 기술'
      ? skills
      : !readOnly && addModal.title === 'CVE 등록 경험 / 버그바운티 이력'
      ? cves
      : !readOnly && addModal.title === '국내외 해킹대회 수상 / 연구 결과 발표'
      ? awards
      : !readOnly && addModal.title === '레드팀 활동 경험'
      ? teams
      : !readOnly && addModal.title === '보안 관련 자격증'
      ? certifications
      : !readOnly && addModal.title === '기업 재직 경력' && workExperiences;
  const setValue =
    !readOnly && addModal.title === '보유 기술'
      ? setSkills
      : !readOnly && addModal.title === 'CVE 등록 경험 / 버그바운티 이력'
      ? setCves
      : !readOnly && addModal.title === '국내외 해킹대회 수상 / 연구 결과 발표'
      ? setAwards
      : !readOnly && addModal.title === '레드팀 활동 경험'
      ? setTeams
      : !readOnly && addModal.title === '보안 관련 자격증'
      ? setCertifications
      : !readOnly && addModal.title === '기업 재직 경력' && setWorkExperiences;

  const closeAddModal = () => {
    setAddModal((prev) => ({
      ...prev,
      open: false,
      title: null,
      editContent: null,
    }));
  };

  const showModalAlert = (content) => {
    setModalOpen(content, closeAddModal, '확인');
  }

  if (readOnly && isLoading) return <Loading />;
  if (readOnly && profileDisclosed === 'error')
    return <p>에러가 발생하였습니다. 다시 시도해주세요.</p>;
  if (readOnly && !profileDisclosed) {
    return (
      <ColDiv gap={20} align="center" justify="center" pt={160} pb={160}>
        <ImageComponent src={profileLocked} width={113} height={113} />
        <Text size={12} color={'secondary3'}>
          공개되지 않은 정보입니다.
        </Text>
      </ColDiv>
    );
  }
  return (
    <>
      {!readOnly && addModal.open && (
        <ModalBackground open={addModal.open}>
          {addModal.editContent ? (
            <AddModal
              title={addModal.title}
              close={closeAddModal}
              editContent={addModal.editContent}
              certificationList={
                addModal.title === '보안 관련 자격증' && certificationList
              }
              valueToSet={valueToSet}
              setValue={setValue}
            />
          ) : (
            <>
            {addModal.title === '보유 기술' && valueToSet.length >= 12 ? (
                showModalAlert('입력 개수를 초과하였습니다.')
            ) : valueToSet.length >=10 ? (
                showModalAlert('입력 개수를 초과하였습니다. 각 항목 당 최대 10개까지 추가할 수 있습니다.')
            ) : (
              <AddModal
                title={addModal.title}
                close={closeAddModal}
                editContent={addModal.editContent}
                certificationList={
                  addModal.title === '보안 관련 자격증' && certificationList
                }
                valueToSet={valueToSet}
                setValue={setValue}
              />
            )}
            </>
            )}
        </ModalBackground>
      )}
      <ColDiv gap={20}>
        {readOnly
          ? categories
              .filter((x) => x.content !== null)
              .map((category, i) => (
                <BoxTemplate
                  key={`career catetory ${i}`}
                  title={category.title}
                  readOnly={readOnly}
                  content={category.content !== null ? category.content : null}
                />
              ))
          : categories.map((category, i) => (
              <BoxTemplate
                key={`career catetory ${i}`}
                title={category.title}
                content={category.content !== null ? category.content : null}
              />
            ))}
      </ColDiv>
    </>
  );
}
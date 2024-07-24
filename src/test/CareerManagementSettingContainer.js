import { useState, useEffect } from 'react';
import CareerManagementSettingPresenter from './CareerManagementSettingPresenter';
import { careerManagementApi } from 'api';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ModalAlert from 'components/Modal/ModalAlert';

dayjs.extend(timezone);
dayjs.extend(utc);
export default function CareerManagementSettingContainer() {
  document.title = '설정 | 경력관리';
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);

  const [cves, setCves] = useState([]);

  const [awards, setAwards] = useState([]);

  const [teams, setTeams] = useState([]);

  const [certifications, setCertifications] = useState([]);

  const [certificationList, setCertificationList] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [disclosure, setDisclosure] = useState({});
  const [modal, setModal] = useState(false);

  const [origin, setOrigin] = useState();
  const getInfo = async () => {
    const [info] = await careerManagementApi.list();
    if (info) {
      const { career } = info.result;
      setCertificationList(info.result.certificationList);
      setSkills(career.skill);
      setCves(career.cve);
      setAwards(career.award);
      setTeams(career.team);
      setCertifications(career.certification);
      setOrigin({
        skills: JSON.parse(JSON.stringify(career?.skill ?? [])),
        cves: JSON.parse(JSON.stringify(career?.cve ?? [])),
        awards: JSON.parse(JSON.stringify(career?.award ?? [])),
        teams: JSON.parse(JSON.stringify(career?.team ?? [])),
        certifications: JSON.parse(JSON.stringify(career?.certification ?? [])),
        workExperience: JSON.parse(
          JSON.stringify(career?.workExperience ?? []),
        ),
        disclosure: {
          toBusiness: JSON.parse(
            JSON.stringify(career?.careerDisclosureFlag?.toBusiness ?? false),
          ),
          toReporter: JSON.parse(
            JSON.stringify(career?.careerDisclosureFlag?.toReporter ?? false),
          ),
        },
      });
      setWorkExperiences(career.workExperience);
      setDisclosure({
        toBusiness: career.careerDisclosureFlag.toBusiness,
        toReporter: career.careerDisclosureFlag.toReporter,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getInfo();

    return () => {
      setLoading(true);
    };
  }, []);

  const [active, setActive] = useState(false);

  const emptyCheck = (array) => {
    const copyArray = JSON.parse(JSON.stringify(array ?? []));
    if (copyArray?.length > 0) {
      return false;
    }
    return true;
  };

  const trueCheck = (obj) => {
    let result = false;
    for (const prop in obj) {
      if (obj[prop]) {
        result = obj[prop];
      }
    }

    return result;
  };

  const sameCheck = () =>
    JSON.stringify(origin?.skills) === JSON.stringify(skills) &&
    JSON.stringify(origin?.cves) === JSON.stringify(cves) &&
    JSON.stringify(origin?.awards) === JSON.stringify(awards) &&
    JSON.stringify(origin?.teams) === JSON.stringify(teams) &&
    JSON.stringify(origin?.certifications) === JSON.stringify(certifications) &&
    JSON.stringify(origin?.workExperience) ===
      JSON.stringify(workExperiences) &&
    JSON.stringify(origin?.disclosure.toBusiness) ===
      JSON.stringify(disclosure.toBusiness) &&
    JSON.stringify(origin?.disclosure.toReporter) ===
      JSON.stringify(disclosure.toReporter);
  useEffect(() => {
    const skill = emptyCheck(skills);
    const cve = emptyCheck(cves);
    const award = emptyCheck(awards);
    const team = emptyCheck(teams);
    const certification = emptyCheck(certifications);
    const workExperience = emptyCheck(workExperiences);
    const same = origin
      ? sameCheck()
      : skill &&
        cve &&
        award &&
        team &&
        certification &&
        workExperience &&
        !disclosure.toBusiness &&
        !disclosure.toReporter;

    setActive(!same);

    setIsBlock(!same);
  }, [
    skills,
    cves,
    awards,
    teams,
    certifications,
    disclosure,
    workExperiences,
  ]);

  const [doneModal, setDoneModal] = useState(false);
  const update = async () => {
    const params = {
      skillList: skills,
      cveList: cves,
      awardList: awards,
      teamList: teams,
      certificationList: certifications,
      workExperienceList: workExperiences,
      careerDisclosureFlag: {
        toBusiness: disclosure.toBusiness,
        toReporter: disclosure.toReporter,
      },
    };
    const [info] = await careerManagementApi.careerManagement(params);
    if (info) {
      setDoneModal(true);
    }
  };

  const [noMore, setNoMore] = useState(false);

  const [blockModal, setBlockModal] = useState(false);

  const [isBlock, setIsBlock] = useState(false);
  const [nextPath, setNextPath] = useState();

  const onOffDisclosure = (name, isActive) => {
    setDisclosure((prev) => ({ ...prev, [name]: isActive }));
  };

  useEffect(() => {
    const unblock = history.block((loc, action) => {
      if (isBlock) {
        setBlockModal(true);
        if (action === 'POP') {
          setNextPath({ pathname: loc.pathname, state: { next: true } });
        } else {
          setNextPath(loc.pathname);
        }
        return false;
      }
      return true;
    });

    return () => unblock();
  }, [isBlock]);

  return (
    <>
      {blockModal && (
        <ModalAlert
          open={blockModal}
          content="작성 중인 내용이 있습니다. 정말 이동하시겠습니까?"
          cancel
          close={() => {
            setBlockModal(false);
          }}
          onClick={() => {
            setIsBlock(false);
            setTimeout(() => {
              history.push(nextPath);
            }, []);
          }}
        />
      )}
      {modal && (
        <ModalAlert
          open={modal}
          onClick={() => setModal(false)}
          close={() => setModal(false)}
          content="파일 용량이 100MB를 초과하여 첨부할 수 없습니다."
        />
      )}
      {doneModal && (
        <ModalAlert
          open={doneModal}
          onClick={() => window.location.reload()}
          close={() => window.location.reload()}
          content="정상적으로 저장되었습니다."
        />
      )}
      {noMore && (
        <ModalAlert
          open={noMore}
          onClick={() => setNoMore(false)}
          close={() => setNoMore(false)}
          content="더이상 추가할 수 없습니다"
        />
      )}
      <CareerManagementSettingPresenter
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
        disclosure={disclosure}
        onOffDisclosure={onOffDisclosure}
        active={active}
      />
    </>
  );
}
import PageHeader from 'components/Element/PageHeader';
import Text from 'components/Element/Text';
import Image from 'components/Element/Image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tooltip from 'assets/icon/tooltip.svg';
import { ColDiv, RowDiv, fadein, shadow } from 'styles/CommonCSS';
import { careerManagementApi } from 'api';
import Button from 'components/Element/Button';
import Loading from 'components/Element/Loading';
import { withRouter } from 'react-router-dom';
import ModalAlert from 'components/Modal/ModalAlert';
import Skill from './Skill';
import CVE from './CVE';
import Award from './Award';
import Team from './Team';
import Certification from './Certification';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(timezone);
dayjs.extend(utc);

function CareerManagement({ history }) {
  document.title = '설정 | 경력관리';
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([{ type: '', level: 0 }]);

  const [cves, setCves] = useState([]);
  const [cvesInvalid, setCvesInvalid] = useState({});

  const [awards, setAwards] = useState([]);

  const [teams, setTeams] = useState([]);

  const [certifications, setCertifications] = useState([]);

  const [certificationList, setCertificationList] = useState([]);

  const [modal, setModal] = useState(false);

  useEffect(() => {}, [skills, cves, awards, teams, certifications]);

  const handleFileOnChange = (e, index, type) => {
    e.preventDefault();
    const reader = new FileReader();
    const originalFile = e.target.files[0];
    const originalBlob = originalFile.slice(
      0,
      originalFile.size,
      originalFile.type,
    ); // 원본 Blob을 복사
    const newFileName = encodeURIComponent(originalFile.name);
    const file = new File([originalBlob], newFileName, {
      type: originalFile.type,
    });
    const maxSize = 100 * 1000 * 1000;
    if (file) {
      if (file.size >= maxSize) {
        e.target.value = '';
        setModalOpen('파일 용량이 100MB를 초과하여 첨부할 수 없습니다.')
      } else {
        reader.onloadend = async () => {
          setLoading(true);
          const fd = new FormData();
          fd.append('file', file);
          const [fileInfo, fileError] = await careerManagementApi.file(fd);
          if (fileInfo) {
            setLoading(false);
            if (type === 'cve') {
              const tempArray = cves;
              tempArray.splice(index, 1, {
                ...cves[index],
                fileName: fileInfo.result.url,
                fileOriginalName: fileInfo.result.fileName,
              });
              setCves([...tempArray]);
            } else if (type === 'award') {
              const tempArray = awards;
              tempArray.splice(index, 1, {
                ...awards[index],
                fileName: fileInfo.result.url,
                fileOriginalName: fileInfo.result.fileName,
              });
              setAwards([...tempArray]);
            } else if (type === 'team') {
              const tempArray = teams;
              tempArray.splice(index, 1, {
                ...teams[index],
                fileName: fileInfo.result,
                fileOriginalName: file.name,
              });
              setTeams([...tempArray]);
            } else if (type === 'certification') {
              const tempArray = certifications;
              tempArray.splice(index, 1, {
                ...certifications[index],
                fileName: fileInfo.result,
                fileOriginalName: file.name,
              });
              setCertifications([...tempArray]);
            }
          } else {
            setLoading(false);
            setModal(true);
            // console.log(fileError);
          }
          e.target.value = '';
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const [origin, setOrigin] = useState();
  const getInfo = async () => {
    const [info] = await careerManagementApi.list();
    if (info) {
      const { career } = info.result;
      setCertificationList(info.result.certificationList);
      setSkills(
        career.skill.length > 0 ? career.skill : [{ type: '', level: 0 }],
      );
      setCves(career.cve);
      setAwards(career.award);
      setTeams(career.team);
      setCertifications(career.certification);
      setOrigin({
        skills: career.skill,
        cves: career.cve,
        awards: career.award,
        teams: career.team,
        certifications: career.certification,
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
    const copyArray = JSON.parse(JSON.stringify(array));
    let result = false;
    if (copyArray.length > 0) {
      copyArray.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key !== 'fileOriginalName' && key !== 'fileName') {
            if (!item[key]) {
              result = true;
            }
          }
        });
      });
    } else {
      result = false;
    }

    return result;
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
    JSON.stringify(origin.skills) === JSON.stringify(skills) &&
    JSON.stringify(origin.cves) === JSON.stringify(cves) &&
    JSON.stringify(origin.awards) === JSON.stringify(awards) &&
    JSON.stringify(origin.teams) === JSON.stringify(teams) &&
    JSON.stringify(origin.certifications) === JSON.stringify(certifications);

  useEffect(() => {
    const skill = emptyCheck(skills);
    const cve = emptyCheck(cves);
    const award = emptyCheck(awards);
    const team = emptyCheck(teams);
    const certification = emptyCheck(certifications);
    const cveInvalid = trueCheck(cvesInvalid);

    const same = origin && sameCheck();

    setActive(
      !skill &&
        !cve &&
        !award &&
        !team &&
        !certification &&
        !cveInvalid &&
        skills.length > 0 &&
        !same,
    );

    setIsBlock(
      !skill &&
        !cve &&
        !award &&
        !team &&
        !certification &&
        !cveInvalid &&
        skills.length > 0 &&
        !same,
    );
  }, [origin, skills, cves, cvesInvalid, awards, teams, certifications]);

  const [doneModal, setDoneModal] = useState(false);
  const update = async () => {
    let dateParsing = [];
    teams.forEach(
      (el) =>
        (dateParsing = [
          ...dateParsing,
          {
            ...el,
            startDate: dayjs(el.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(el.endDate).format('YYYY-MM-DD'),
          },
        ]),
    );

    const params = {
      skillList: skills,
      cveList: cves,
      awardList: awards,
      teamList: dateParsing,
      certificationList: certifications,
    };
    const [info] = await careerManagementApi.careerManagement(params);
    if (info) {
      setModalOpen('정상적으로 저장되었습니다.', ()=>{window.location.reload()})
    }
  };


  const [blockModal, setBlockModal] = useState(false);

  const [isBlock, setIsBlock] = useState(false);
  const [nextPath, setNextPath] = useState();

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
      <Wrap>
        <HoverRow align="center" mb={20}>
          <PageHeader>경력관리</PageHeader>
          <Image
            ml={4}
            width={24}
            height={24}
            mobileWidth={14}
            mobileHeight={14}
            src={tooltip}
          />
          <TooltipBox id="dReportCountTootip">
            <Text size={14} mobileSize={12}>
              경력관리에 입력된 정보와 Public BugBounty 참여 실적으로 Private
              BugBounty에 초대됩니다. 제출서류의 위조/변조가 식별되었을 경우
              불이익을 받을 수 있습니다.
            </Text>
          </TooltipBox>
        </HoverRow>
        <ColDiv gap={30}>
          <Card>
            <Skill skills={skills} setSkills={setSkills} />
          </Card>
          <Card>
            <CVE
              cves={cves}
              setCves={setCves}
              handleFileOnChange={handleFileOnChange}
              cvesInvalid={cvesInvalid}
              setCvesInvalid={setCvesInvalid}
            />
          </Card>
          <Card>
            <Award
              awards={awards}
              setAwards={setAwards}
              handleFileOnChange={handleFileOnChange}
            />
          </Card>
          <Card>
            <Team
              teams={teams}
              setTeams={setTeams}
              handleFileOnChange={handleFileOnChange}
            />
          </Card>
          <Card>
            <Certification
              certifications={certifications}
              setCertifications={setCertifications}
              certificationList={certificationList}
              handleFileOnChange={handleFileOnChange}
            />
          </Card>
          <RowDiv justify="flex-end" gap={10} mGap={5}>
            <Button
              text="취소"
              outline
              width={175}
              activeColor="#81818A"
              onClick={() => window.location.reload()}
            />
            <Button
              width={175}
              text="확인"
              disabled={!active}
              active={active}
              onClick={update}
            />
          </RowDiv>
        </ColDiv>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    padding: 40px 0;
  }
`;

const Card = styled(ColDiv)`
  background-color: white;
  padding: 20px 0 30px 0;
  @media ${({ theme }) => theme.device.tablet} {
    padding: 20px 0;
  }
`;

const TooltipBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  color: white;
  background-color: ${({ theme }) => theme.colors.gray};
  padding: 8px 10px;
  position: absolute;
  top: 28px;
  z-index: 10;
  border-radius: 2px;
  -webkit-animation: ${fadein} 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: ${fadein} 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  ${shadow(0, 3, 8, 0.16)}
  display: none;
`;

const HoverRow = styled(RowDiv)`
  position: relative;

  & > img:hover + ${TooltipBox} {
    display: block;
  }
`;

export default withRouter(CareerManagement);
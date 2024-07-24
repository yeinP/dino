import React, { useState } from 'react';
import Text from 'components/Element/Text';
import Image from 'components/Element/Image';
import Select from 'components/Element/Input/Select';
import { ColDiv, RowDiv } from 'styles/CommonCSS';
import Textarea from 'components/Element/Input/Textarea';
import InputFile from 'components/Element/Input/InputFile';
import Button from 'components/Element/Button';
import add from 'assets/icon/add.svg';
import DatePickerComponent from 'components/Element/DatePicker/DatePickerComponent';
import down from 'assets/icon/down-gray.svg';
import ImageButton from 'components/Element/ImageButton';

function Team({ teams, setTeams, handleFileOnChange, setNoMore }) {
  const teamList = ['기업', '사설단체'];

  const teamOnchange = (e, index, max) => {
    const { value, name } = e.target;
    let val;
    if (max) {
      val = value.substring(0, max);
    } else {
      val = value;
    }
    const tempArray = teams;
    tempArray.splice(index, 1, {
      ...teams[index],
      [name]: val.replace(/^\s*/, ''),
    });
    setTeams([...tempArray]);
  };

  const teamSet = (s, index) => {
    const tempArray = teams;
    tempArray.splice(index, 1, { ...teams[index], type: s });
    setTeams([...tempArray]);
  };

  const removeTeam = (index) => {
    const removeArray = teams.filter((el, i) => i !== index);
    setTeams(removeArray);
  };

  const removeTeamFile = (index) => {
    const tempArray = teams;
    tempArray.splice(index, 1, {
      ...teams[index],
      fileName: '',
      fileOriginalName: '',
    });
    setTeams([...tempArray]);
  };

  const [listOpen, setListOpen] = useState(true);

  return (
    <>
      <RowDiv align="center" justify="space-between">
        <Text size={20} weight={700} color="gray" mobileSize={16}>
          레드팀 활동경험
        </Text>
        {teams.length > 0 && (
          <ImageButton
            src={down}
            onClick={() => setListOpen(!listOpen)}
            style={
              listOpen
                ? { transform: 'rotate(0)' }
                : { transform: 'rotate(180deg)' }
            }
          />
        )}
      </RowDiv>
      <ColDiv style={listOpen ? { display: 'flex' } : { display: 'none' }}>
        {teams.length > 0 && (
          <ColDiv mt={20} gap={30}>
            {teams.map((team, index) => (
              <ColDiv key={`team${index}`}>
                <RowDiv align="flex-end" justify="space-between" mb={6}>
                  <Text weight={700}>분류</Text>
                  <Button
                    width={104}
                    mobileWidth={78}
                    outline
                    activeColor="#81818A"
                    text="제거"
                    onClick={() => removeTeam(index)}
                  ></Button>
                </RowDiv>
                <Select
                  width={118}
                  selectList={teamList}
                  placeholder="선택"
                  selected={team.type}
                  selectClick={(s) => teamSet(s, index)}
                />
                <Text weight={700} mt={30} mb={6}>
                  단체 명
                </Text>
                <Textarea
                  height={78}
                  placeholder="단체 명을 입력하세요."
                  maxLength={100}
                  name="name"
                  value={team.name}
                  onChange={(e) => teamOnchange(e, index, 100)}
                />
                <RowDiv justify="flex-end" mt={4}>
                  <Text size={14} color="gray">
                    {team.name.length} / 100
                  </Text>
                </RowDiv>
                <Text weight={700} mt={30} mb={6}>
                  활동기간
                </Text>
                <RowDiv align="center" gap={10} mGap={6}>
                  <DatePickerComponent
                    title="활동 일시"
                    placeholder="시작일"
                    value={team.startDate}
                    maxDate={
                      team.endDate === null ||
                      team.endDate === undefined ||
                      team.endDate === ''
                        ? new Date()
                        : new Date(team.endDate) || new Date()
                    }
                    setValue={(val) => {
                      const tempArray = teams;
                      tempArray.splice(index, 1, {
                        ...teams[index],
                        startDate: val,
                      });
                      setTeams([...tempArray]);
                    }}
                    resetClick={() => {
                      const tempArray = teams;
                      tempArray.splice(index, 1, {
                        ...teams[index],
                        startDate: '',
                      });
                      setTeams([...tempArray]);
                    }}
                  />
                  <Text weight={700} color="lightGray">
                    ~
                  </Text>
                  <DatePickerComponent
                    title="활동 일시"
                    placeholder="종료일"
                    value={team.endDate}
                    minDate={new Date(team.startDate) || undefined}
                    maxDate={new Date()}
                    setValue={(val) => {
                      const tempArray = teams;
                      tempArray.splice(index, 1, {
                        ...teams[index],
                        endDate: val,
                      });
                      setTeams([...tempArray]);
                    }}
                    resetClick={() => {
                      const tempArray = teams;
                      tempArray.splice(index, 1, {
                        ...teams[index],
                        endDate: '',
                      });
                      setTeams([...tempArray]);
                    }}
                  />
                </RowDiv>
                <Text weight={700} mt={30} mb={6}>
                  첨부하기 (선택)
                </Text>
                <InputFile
                  id={`teamFile${index}`}
                  placeholder="ZIP 파일만 첨부 가능합니다."
                  name="fileOriginalName"
                  value={team.fileOriginalName}
                  handleUpload={(e) => handleFileOnChange(e, index, 'team')}
                  onlyZip
                  remove={team.fileOriginalName}
                  removeClick={() => removeTeamFile(index)}
                />
              </ColDiv>
            ))}
          </ColDiv>
        )}
        <Button
          outline
          width={128}
          mobileWidth={102}
          mt={6}
          mobileMt={10}
          active
          onClick={() => {
            if (teams.length > 9) {
              ssetModalOpen('"더이상 추가할 수 없습니다')
            } else {
              setTeams([
                ...teams,
                {
                  type: '',
                  name: '',
                  startDate: '',
                  endDate: '',
                  fileName: '',
                  fileOriginalName: '',
                },
              ]);
            }
          }}
        >
          <RowDiv align="center" justify="center" width="100%" height="100%">
            <Image src={add} width={20} height={20} mr={4} mobileWidth={16} />
            <Text weight={700}>추가하기</Text>
          </RowDiv>
        </Button>
      </ColDiv>
    </>
  );
}

export default Team;
import React, { useState } from 'react';
import Text from 'components/Element/Text';
import Image from 'components/Element/Image';
import Select from 'components/Element/Input/Select';
import Input from 'components/Element/Input/Input';
import { ColDiv, RowDiv } from 'styles/CommonCSS';
import Textarea from 'components/Element/Input/Textarea';
import InputFile from 'components/Element/Input/InputFile';
import Button from 'components/Element/Button';
import add from 'assets/icon/add.svg';
import down from 'assets/icon/down-gray.svg';
import ImageButton from 'components/Element/ImageButton';

function CVE({
  cves,
  setCves,
  handleFileOnChange,
  cvesInvalid,
  setCvesInvalid,
}) {
  const cveList = ['CVE', 'KVE', '버그바운티'];
  const [maxLength, setMaxLength] = useState(50);
  const {setModalOpen} = useModalState();

  const cveSet = (s, index) => {
    const tempArray = cves;
    if (s === 'CVE') {
      setMaxLength(14);
      tempArray.splice(index, 1, { ...cves[index], type: s, name: 'CVE-' });
    } else if (s === 'KVE') {
      setMaxLength(14);
      tempArray.splice(index, 1, { ...cves[index], type: s, name: 'KVE-' });
    } else {
      setMaxLength(50);
      tempArray.splice(index, 1, { ...cves[index], type: s, name: '' });
    }
    setCvesInvalid({ ...cvesInvalid, [index]: true });
    setCves([...tempArray]);
  };

  const cveCheck = /^CVE-[0-9]{4}-[0-9]{4,5}$/i;
  const kveCheck = /^KVE-[0-9]{4}-[0-9]{4,5}$/i;
  const cveOnchange = (e, index, max) => {
    const { value, name } = e.target;
    const tempArray = cves;
    let val;
    if (max) {
      val = value.substring(0, max);
    } else {
      val = value;
    }

    tempArray.splice(index, 1, {
      ...cves[index],
      [name]: val.replace(/^\s*/, ''),
    });
    setCves([...tempArray]);
    if (name === 'name') {
      if (tempArray[index].type === 'CVE') {
        setCvesInvalid({ ...cvesInvalid, [index]: !cveCheck.test(val) });
      } else if (tempArray[index].type === 'KVE') {
        setCvesInvalid({ ...cvesInvalid, [index]: !kveCheck.test(val) });
      } else {
        setCvesInvalid({ ...cvesInvalid, [index]: false });
      }
    }
  };

  const removeCve = (index) => {
    const removeArray = cves.filter((el, i) => i !== index);
    const temp = cvesInvalid;
    delete temp[index];
    setCvesInvalid({ ...temp });
    setCves(removeArray);
  };

  const removeCveFile = (index) => {
    const tempArray = cves;
    tempArray.splice(index, 1, {
      ...cves[index],
      fileName: '',
      fileOriginalName: '',
    });
    setCves([...tempArray]);
  };
  const [listOpen, setListOpen] = useState(true);
  return (
    <>
      <RowDiv align="center" justify="space-between">
        <ColDiv>
          <Text size={20} weight={700} color="gray" mobileSize={16}>
            CVE 등록경험 / 타 버그바운티 참여이력
          </Text>
          <Text size={14} mobileSize={12} color="fontRed" mt={4}>
            공개 가능한 자료만 등록가능합니다.
          </Text>
        </ColDiv>
        {cves.length > 0 && (
          <ImageButton
            src={down}
            alt="fold/unfold 이미지"
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
        {cves.length > 0 && (
          <ColDiv gap={30} mt={20}>
            {cves.map((cve, index) => (
              <ColDiv key={`cve${index}`}>
                <RowDiv align="center" justify="space-between" mb={6}>
                  <Text weight={700}>분류</Text>
                  <Button
                    width={104}
                    mobileWidth={78}
                    outline
                    activeColor="#81818A"
                    text="제거"
                    onClick={() => removeCve(index)}
                  ></Button>
                </RowDiv>
                <Select
                  width={118}
                  placeholder="선택"
                  selectList={cveList}
                  selected={cve.type}
                  selectClick={(s) => cveSet(s, index)}
                />
                <Text weight={700} mt={30} mb={6}>
                  {cve.type === 'CVE' || cve.type === 'KVE'
                    ? `${cve.type} ID`
                    : '플랫폼명-리포트 번호'}
                </Text>
                <Input
                  placeholder={
                    cve.type === 'KVE'
                      ? 'KVE ID를 입력하세요.'
                      : cve.type === 'CVE'
                      ? 'CVE ID를 입력하세요.'
                      : '플랫폼명-리포트 번호 형태로 입력하세요.'
                  }
                  maxLength={50}
                  name="name"
                  value={cve.name}
                  invalid={cvesInvalid[index]}
                  onChange={(e) => cveOnchange(e, index, maxLength)}
                />
                <RowDiv justify="space-between" mt={4}>
                  <Text size={14} color="fontRed">
                    {cvesInvalid[index]
                      ? cve.type === '버그바운티'
                        ? '플랫폼명-리포트 번호 형태로 입력하세요'
                        : `${cve.type}(대소문자 무관)-1234-1234(5) 포맷으로 입력하세요.`
                      : ''}
                  </Text>
                  <Text
                    size={14}
                    color={cvesInvalid[index] ? 'fontRed' : 'gray'}
                    style={{ minWidth: '40px' }}
                  >
                    {cve.name.length} / {maxLength}
                  </Text>
                </RowDiv>
                <Text weight={700} mt={30} mb={6}>
                  리포트 명
                </Text>
                <Textarea
                  height={78}
                  placeholder="리포트 명을 입력하세요."
                  maxLength={100}
                  name="desc"
                  value={cve.desc}
                  onChange={(e) => cveOnchange(e, index, 100)}
                />
                <RowDiv justify="flex-end" mt={4}>
                  <Text size={14} color="gray">
                    {cve.desc.length} / 100
                  </Text>
                </RowDiv>
                <Text weight={700} mt={30} mb={6}>
                  첨부하기 (선택)
                </Text>
                <InputFile
                  id={`cveFile${index}`}
                  placeholder="ZIP 파일만 첨부 가능합니다."
                  name="fileOriginalName"
                  value={cve.fileOriginalName}
                  handleUpload={(e) => handleFileOnChange(e, index, 'cve')}
                  onlyZip
                  remove={cve.fileOriginalName}
                  removeClick={() => removeCveFile(index)}
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
            if (cves.length > 9) {
             setModalOpen('"더이상 추가할 수 없습니다')
            } else {
              setCves([
                ...cves,
                {
                  type: '',
                  name: '',
                  desc: '',
                  fileName: '',
                  fileOriginalName: '',
                },
              ]);
            }
          }}
        >
          <RowDiv align="center" justify="center" width="100%" height="100%">
            <Image
              src={add}
              width={20}
              height={20}
              mr={4}
              mobileWidth={16}
              alt="추가하기 이미지"
            />
            <Text weight={700}>추가하기</Text>
          </RowDiv>
        </Button>
      </ColDiv>
    </>
  );
}

export default CVE;

import React, { useState } from 'react';
import Text from 'components/Element/Text';
import Image from 'components/Element/Image';
import { ColDiv, RowDiv } from 'styles/CommonCSS';
import Textarea from 'components/Element/Input/Textarea';
import InputFile from 'components/Element/Input/InputFile';
import Button from 'components/Element/Button';
import add from 'assets/icon/add.svg';
import down from 'assets/icon/down-gray.svg';
import ImageButton from 'components/Element/ImageButton';

function Award({ awards, setAwards, handleFileOnChange, setNoMore }) {
  const awardOnchange = (e, index, max) => {
    const { value, name } = e.target;

    let val;
    if (max) {
      val = value.substring(0, max);
    } else {
      val = value;
    }

    const tempArray = awards;
    tempArray.splice(index, 1, {
      ...awards[index],
      [name]: val.replace(/^\s*/, ''),
    });
    setAwards([...tempArray]);
  };

  const removeAwardFile = (index) => {
    const tempArray = awards;
    tempArray.splice(index, 1, {
      ...awards[index],
      fileName: '',
      fileOriginalName: '',
    });
    setAwards([...tempArray]);
  };

  const removeAward = (index) => {
    const removeArray = awards.filter((el, i) => i !== index);
    setAwards(removeArray);
  };

  const [listOpen, setListOpen] = useState(true);

  return (
    <>
      <RowDiv align="center" justify="space-between">
        <Text size={20} weight={700} color="gray" mobileSize={16}>
          국내외 해킹대회 수상 / 연구결과 발표
        </Text>
        {awards.length > 0 && (
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
        {awards.length > 0 && (
          <ColDiv gap={30} mt={20}>
            {awards.map((award, index) => (
              <ColDiv key={`award${index}`}>
                <RowDiv align="flex-end" justify="space-between" mb={6}>
                  <Text weight={700}>대회명-수상정보/연구리포트</Text>
                  <Button
                    width={104}
                    mobileWidth={78}
                    outline
                    activeColor="#81818A"
                    text="제거"
                    onClick={() => removeAward(index)}
                  ></Button>
                </RowDiv>
                <Textarea
                  placeholder="대회명-수상정보/연구리포트 제목을 입력하세요."
                  maxLength={100}
                  height={78}
                  name="name"
                  value={award.name}
                  onChange={(e) => awardOnchange(e, index, 100)}
                />
                <RowDiv justify="flex-end" mt={4}>
                  <Text size={14} color="gray">
                    {award.name.length} / 100
                  </Text>
                </RowDiv>
                <Text weight={700} mt={30} mb={6}>
                  첨부하기 (선택)
                </Text>
                <InputFile
                  id={`awardFile${index}`}
                  placeholder="ZIP 파일만 첨부 가능합니다."
                  name="fileOriginalName"
                  value={award.fileOriginalName}
                  handleUpload={(e) => handleFileOnChange(e, index, 'award')}
                  onlyZip
                  remove={award.fileOriginalName}
                  removeClick={() => removeAwardFile(index)}
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
            if (awards.length > 9) {
                setModalOpen('"더이상 추가할 수 없습니다')
            } else {
              setAwards([
                ...awards,
                {
                  name: '',
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

export default Award;
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ColDiv, RowDiv, scrollbar } from 'styles/CommonCSS';
import Text from 'components/Element/Text';
import Image from 'components/Element/Image';
import Input from 'components/Element/Input/Input';
import Textarea from 'components/Element/Input/Textarea';
import InputFile from 'components/Element/Input/InputFile';
import Button from 'components/Element/Button';
import add from 'assets/icon/add.svg';
import search from 'assets/icon/search.svg';
import ModalChildren from 'components/Modal/ModalChildren';
import down from 'assets/icon/down-gray.svg';
import ImageButton from 'components/Element/ImageButton';

function Certification({
  certifications,
  setCertifications,
  certificationList,
  handleFileOnChange,
  setNoMore,
}) {
  const removeCertificationFile = (index) => {
    const tempArray = certifications;
    tempArray.splice(index, 1, {
      ...certifications[index],
      fileName: '',
      fileOriginalName: '',
    });
    setCertifications([...tempArray]);
  };

  const certificationOnchange = (e, index, max) => {
    const { value, name } = e.target;

    let val;
    if (max) {
      val = value.substring(0, max);
    } else {
      val = value;
    }

    const tempArray = certifications;
    tempArray.splice(index, 1, {
      ...certifications[index],
      [name]: val.replace(/^\s*/, ''),
    });
    setCertifications([...tempArray]);
  };

  const [searchModal, setSearchModal] = useState(false);
  const [targetIndex, setTagetIndex] = useState();
  const [searchList, setSearchList] = useState(certificationList);
  const [searchText, setSearchText] = useState();
  const [certificationSearch, setCertificationSearch] = useState();
  const [certificationInput, setCertificationInput] = useState();

  const searching = (e) => {
    const temp = certificationList.filter((el) => el.text.includes(searchText));
    setSearchList(temp);
  };

  const removeCertifictaion = (index) => {
    const removeArray = certifications.filter((el, i) => i !== index);
    setCertifications(removeArray);
  };

  useEffect(() => {
    setSearchList(certificationList);
  }, [certificationList]);

  const [listOpen, setListOpen] = useState(true);

  return (
    <>
      <RowDiv align="center" justify="space-between">
        <Text size={20} weight={700} color="gray" mobileSize={16}>
          보안관련 자격증
        </Text>
        {certifications.length > 0 && (
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
        {certifications.length > 0 && (
          <ColDiv mt={20} gap={30}>
            {certifications.map((certification, index) => (
              <ColDiv key={`certification${index}`}>
                <RowDiv align="flex-end" justify="space-between" mb={6}>
                  <Text weight={700}>자격증 검색</Text>
                  <Button
                    width={104}
                    mobileWidth={78}
                    outline
                    activeColor="#81818A"
                    text="제거"
                    onClick={() => removeCertifictaion(index)}
                  ></Button>
                </RowDiv>
                <SearchBox
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setTagetIndex(index);
                    setSearchModal(true);
                  }}
                >
                  <Text
                    color={certification.name ? 'fontBlack' : 'lightGray'}
                    style={{ wordBreak: 'break-all' }}
                  >
                    {certification.name || '검색'}
                  </Text>
                </SearchBox>
                <Text weight={700} mt={20} mb={6}>
                  자격증 번호
                </Text>
                <Textarea
                  placeholder="자격증번호를 입력하세요."
                  height={78}
                  maxLength={100}
                  name="desc"
                  value={certification.desc}
                  onChange={(e) => certificationOnchange(e, index, 100)}
                />
                <RowDiv justify="flex-end" mt={4}>
                  <Text size={14} color="gray">
                    {certification.desc.length} / 100
                  </Text>
                </RowDiv>
                <Text weight={700} mt={30} mb={6}>
                  첨부하기 (선택)
                </Text>
                <InputFile
                  id={`certificationFile${index}`}
                  placeholder="ZIP 파일만 첨부 가능합니다."
                  name="fileOriginalName"
                  value={certification.fileOriginalName}
                  handleUpload={(e) =>
                    handleFileOnChange(e, index, 'certification')
                  }
                  onlyZip
                  remove={certification.fileOriginalName}
                  removeClick={() => removeCertificationFile(index)}
                />
              </ColDiv>
            ))}
            {searchModal && (
              <ModalChildren
                open={searchModal}
                title="자격증 검색"
                close={() => {
                  setSearchText();
                  setCertificationInput();
                  setCertificationSearch();
                  setSearchList(certificationList);
                  setSearchModal(false);
                }}
                reset={() => {
                  setSearchText();
                  setCertificationInput();
                  setCertificationSearch();
                  setSearchList(certificationList);
                }}
                onClick={() => {
                  const tempArray = certifications;
                  tempArray.splice(targetIndex, 1, {
                    ...certifications[targetIndex],
                    name: certificationInput || certificationSearch || '',
                  });
                  setCertifications([...tempArray]);
                  setSearchText();
                  setCertificationInput();
                  setCertificationSearch();
                  setSearchList(certificationList);
                  setSearchModal(false);
                }}
              >
                <RowDiv gap={10}>
                  <Input
                    placeholder="자격증명 입력"
                    value={searchText || ''}
                    maxLength={50}
                    onKeyDown={searching}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button
                    text="검색"
                    width={104}
                    mobileWidth={78}
                    active={searchText?.length > 0}
                    onClick={searching}
                  />
                </RowDiv>
                <Text size={14} color="gray" mt={14}>
                  총 {searchList.length} 개
                </Text>
                <ListBox>
                  {searchList.map((item, j) => (
                    <ListItem
                      key={`search${j}`}
                      onClick={() => {
                        setCertificationInput();
                        setCertificationSearch(item.text);
                      }}
                      selected={certificationSearch === item.text}
                    >
                      <Text>{item.text}</Text>
                    </ListItem>
                  ))}
                </ListBox>
                <Text weight={700} mb={6}>
                  직접입력
                </Text>
                <Input
                  placeholder="자격증명 입력"
                  value={certificationInput || ''}
                  maxLength={50}
                  onChange={(e) => {
                    setSearchText();
                    setCertificationSearch();
                    setCertificationInput(e.target.value.replace(/^\s*/, ''));
                  }}
                />
              </ModalChildren>
            )}
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
            if (certifications.length > 9) {
                setModalOpen('"더이상 추가할 수 없습니다')
            } else {
              setCertifications([
                ...certifications,
                {
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

const SearchBox = styled(RowDiv)`
  cursor: pointer;
  min-height: 46px;
  border: ${({ invalid, theme }) =>
    invalid
      ? `1px solid ${theme.colors.fontRed}`
      : `1px solid ${theme.colors.lightGray}`};
  border-radius: 2px;
  padding: 12px 34px 12px 10px;
  font-size: 100%;
  background-image: url(${search});
  background-size: 24px 24px;
  background-position: center right 10px;
  background-repeat: no-repeat;

  @media ${({ theme }) => theme.device.tablet} {
    min-height: 38px;
    background-size: 20px 20px;
    padding: 12px 30px 12px 10px;
  }
`;

const ListBox = styled(ColDiv)`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 2px;
  width: 100%;
  height: 200px;
  overflow-y: overlay;
  margin: 6px 0 20px 0;
  ${scrollbar}
`;

const ListItem = styled(ColDiv)`
  width: 100%;
  height: auto;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? 'rgba(60, 220, 132, 0.26)' : ''};

  &:hover {
    background-color: rgba(60, 220, 132, 0.26);
  }
`;

export default Certification;
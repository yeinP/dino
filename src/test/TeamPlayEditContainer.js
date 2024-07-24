import { teamPlayApi } from 'api';
import Loading from 'components/Element/Loading';
import ModalAlert from 'components/Modal/ModalAlert';
import isEmptyObj from 'modules/isEmptyObj';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import TeamPlayEditPresenter from './TeamPlayEditPresenter';
import checkWindows from '../../modules/checkOS';
import { validURL } from 'modules/checkValidUrl';

function TeamPlayEditContainer({ history, match }) {
  document.title = '팀 수정하기';

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState({});
  const [values, setValues] = useState({});

  const getInfo = async () => {
    const [info, error] = await teamPlayApi.detail(match.params.tId);
    if (info) {
      setOrigin(info.result);
      setValues(info.result);
      getFormat();
      validation(info.result.url);
      setLoading(false);
    } else if (error) {
      history.goBack();
    }
  };

  useEffect(() => {
    if (!location.state?.next) {
      history.push('/');
    } else {
      getInfo();
    }
  }, [location]);

  const [invalids, setInvalids] = useState({
    url: { invalid: false, text: '' },
  });

  const validation = (url) => {
    if (url && !validURL(url)) {
      setInvalids({
        ...invalids,
        url: {
          invalid: true,
          text: '올바르지 않은 URL 형식입니다.',
        },
      });
    } else {
      setInvalids({
        ...invalids,
        url: {
          invalid: false,
          text: '',
        },
      });
    }
  };

  const onChange = (e, max) => {
    const { name, value } = e.target;

    let val;
    if (max) {
      val = value.substring(0, max);
    } else {
      val = value;
    }

    setValues({ ...values, [name]: val });

    if (name === 'url') {
      if (val && !validURL(val)) {
        setInvalids({
          ...invalids,
          url: {
            invalid: true,
            text: '올바르지 않은 URL 형식입니다.',
          },
        });
      } else {
        setInvalids({
          ...invalids,
          url: {
            invalid: false,
            text: '',
          },
        });
      }
    }
  };

  const changeMemberStatus = (s, member) => {
    const action = s === '탈퇴' ? 'W' : 'A';
    const tempArray = [...values.members];
    const index = tempArray.findIndex((el) => el.userId === member.userId);
    tempArray.splice(index, 1, {
      ...member,
      status: action,
    });
    setValues({ ...values, members: [...tempArray] });
    setOriginPage(currentPage);
  };

  const checkSpeciality = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setValues({ ...values, speciality: [...values.speciality, value] });
    } else {
      setValues({
        ...values,
        speciality: values.speciality.filter(
          (el) => JSON.stringify(el) !== JSON.stringify(value),
        ),
      });
    }
  };

  let isUploading = false;
  const handleImageOnChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    const maxSize = 50 * 1000;
    if (file) {
      if (file.size >= maxSize) {
        e.target.value = '';
        openModal('fileSizeWarning');
      } else {
        reader.onloadend = async () => {
          if (!isUploading) {
            isUploading = true;
            const fd = new FormData();
            fd.append('file', file);
            const [fileInfo, fileError] = await teamPlayApi.image(fd);
            if (fileInfo) {
              isUploading = false;
              setValues({
                ...values,
                logo: fileInfo.result.url,
                isLogoDelete: false,
              });
            } else {
              isUploading = false;
              if (fileError.message === 'Wrong file extension(image)') {
                openModal('imageType');
              } else if (
                fileError.message ===
                'ZIP 파일 크기는 100MB, 이미지 파일 크기는 10MB 이하여야 합니다.'
              ) {
                openModal('imageType');
              }
              // console.log(fileError);
            }
            e.target.value = '';
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalType, setModalType] = useState();

  const openModal = (type) => {
    setModalType(type);
    if (type === 'confirm') {
      setModalText('선택한 리포터를 팀원으로 초대하겠습니까?');
    } else if (type === 'invite') {
      setInviteUserList(values.members);
    } else if (type === 'deleteWarning') {
      setModalText('승인 상태인 팀원이 있을 경우 삭제할 수 없습니다.');
    } else if (type === 'deleteConfirm') {
      setModalText('팀을 정말 삭제 하시겠습니까?');
    } else if (type === 'imageType') {
      setModalText('png/jpg/jpeg 확장자만 지원됩니다.');
    } else if (type === 'fileSizeWarning') {
      setModalText(
        `파일 용량이 ${
          (checkWindows() && '48') || '50'
        }KB를 초과하여 첨부할 수 없습니다.`,
      );
    } else if (type === 'editError') {
      setModalText('팀 수정에 실패했습니다. 입력 값을 확인해주세요.');
    } else if (type === 'serverError') {
      setModalText('서버 에러가 발생했습니다. 관리자에게 문의하세요.');
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalType();
    setModalText();
    setSearch('');
    setSearchList([...format.userList]);
    setModalOpen(false);
  };

  const [format, setFormat] = useState();

  const getFormat = async () => {
    const [info] = await teamPlayApi.format(match.params.tId);
    if (info) {
      setFormat(info.result);
      setSearchList(info.result.userList);
    }
  };

  const [search, setSearch] = useState();
  const [searchList, setSearchList] = useState([]);
  const [inviteUserList, setInviteUserList] = useState([]);
  const [tempUserList, setTempUserList] = useState([]);

  const searching = () => {
    if (search?.length > 0) {
      const temp = format.userList.filter((el) =>
        el.displayName.toLowerCase().includes(String(search).toLowerCase()),
      );
      setSearchList(temp);
    } else {
      setSearchList([...format.userList]);
    }
  };

  const userCheck = (e, value) => {
    const { checked } = e.target;
    if (checked) {
      if (inviteUserList.find((el) => el.displayName === value.displayName)) {
        // 탈퇴 회원 다시 초대하기
        setInviteUserList([
          ...inviteUserList.filter(
            (el) => el.displayName !== value.displayName,
          ),
          { ...value, role: 'M', status: 'I' },
        ]);
      } else {
        setInviteUserList([
          ...inviteUserList,
          { ...value, role: 'M', status: 'I' },
        ]);
      }
      setTempUserList([...tempUserList, { ...value, role: 'M', status: 'I' }]);
    } else {
      setInviteUserList(
        inviteUserList.filter((el) => el.userId !== value.userId),
      );
      setTempUserList(tempUserList.filter((el) => el.userId !== value.userId));
    }
  };

  const inviting = () => {
    setValues({ ...values, members: [...inviteUserList] });
    setModalOpen(false);
    setSearch('');
    setSearchList([...format.userList]);
  };

  // 팀원 검색 페이지네이션
  const [perList, setPerList] = useState([]);

  const perItemHandler = useCallback((target) => {
    setPerList(target);
  }, []);

  const [pagenationLoading, setPageNationLoading] = useState(true);
  const loadingHandler = useCallback((target) => {
    setPageNationLoading(target);
  });

  // 팀원 리스트 페이지네이션
  const [memberPerList, setMemberPerList] = useState([]);

  const memberPerItemHandler = useCallback((target) => {
    setMemberPerList(target);
  }, []);

  const [active, setActive] = useState(false);

  const sameCheck = () => JSON.stringify(origin) === JSON.stringify(values);

  const sameMemberCheck = () =>
    JSON.stringify(origin.members) === JSON.stringify(values.members);

  useEffect(() => {
    if (!isEmptyObj(values)) {
      setActive(
        values.teamAbout.length > 0 &&
          (!sameCheck() || !sameMemberCheck()) &&
          invalids.url.invalid === false,
      );
      setIsBlock(
        values.teamAbout.length > 0 && (!sameCheck() || !sameMemberCheck()),
      );
    }
  }, [values, origin]);

  const editing = async () => {
    const [info, error] = await teamPlayApi.edit(match.params.tId, values);
    if (info) {
      window.location.reload();
    } else if (error) {
      openModal('editError');
    } else {
      openModal('serverError');
    }
  };

  const withdrawingMemberCheck = () => {
    for (const el of origin.members) {
      if (el.role === 'M' && el.status === 'A') {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (values.members && values.members.length > 0) {
      setDeleteActive(withdrawingMemberCheck());
    }
  }, [values.members]);

  const [deleteActive, setDeleteActive] = useState(false);
  const deleteTeamClick = () => {
    if (!deleteActive) {
      openModal('deleteWarning');
    } else {
      openModal('deleteConfirm');
    }
  };

  const deleteTeam = async () => {
    const [info] = await teamPlayApi.deleteTeam(match.params.tId);
    if (info) {
      history.goBack();
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [originPage, setOriginPage] = useState(0);

  const currentPageHandler = useCallback((target) => {
    setCurrentPage(target);
  }, []);

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

  useEffect(() => {
    if (search === null || search === '') {
      setSearchList([...format.userList]);
    }
  }, [search]);

  return (
    <>
      {loading && <Loading />}
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
      )}{' '}
      <TeamPlayEditPresenter
        origin={origin}
        values={values}
        setValues={setValues}
        onChange={onChange}
        changeMemberStatus={changeMemberStatus}
        handleImageOnChange={handleImageOnChange}
        checkSpeciality={checkSpeciality}
        openModal={openModal}
        modalType={modalType}
        modalText={modalText}
        modalOpen={modalOpen}
        closeModal={closeModal}
        search={search}
        setSearch={setSearch}
        searching={searching}
        searchList={searchList}
        perList={perList}
        perItemHandler={perItemHandler}
        inviteUserList={inviteUserList}
        userCheck={userCheck}
        inviting={inviting}
        tempUserList={tempUserList}
        memberPerList={memberPerList}
        memberPerItemHandler={memberPerItemHandler}
        active={active}
        editing={editing}
        deleteTeamClick={deleteTeamClick}
        deleteTeam={deleteTeam}
        deleteActive={deleteActive}
        currentPageHandler={currentPageHandler}
        originPage={originPage}
        pagenationLoading={pagenationLoading}
        loadingHandler={loadingHandler}
        invalids={invalids}
      />
    </>
  );
}

export default withRouter(TeamPlayEditContainer);
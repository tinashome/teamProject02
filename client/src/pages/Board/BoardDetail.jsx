import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Api from 'api/api';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/atoms/Button';
import { useForm } from 'react-hook-form';
import CheckBox from 'components/atoms/CheckBox';
import jwtDecode from 'jwt-decode';
import { getToken } from 'util/useful-functions';

const BoardDetail = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [boardDetail, setBoardDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isAuth, setIsAuth] = useState({
    edit: false,
    delete: false,
  });

  const { register, reset, getValues } = useForm({
    defaultValues: {
      title: boardDetail?.title,
      contents: boardDetail?.contents,
    },
  });

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const [isNotified, setIsNotified] = useState(true);
  const toggleChecked = useCallback(() => {
    setIsNotified(!isNotified);
  }, [isNotified]);

  const { userId, role } = jwtDecode(getToken());
  useEffect(() => {
    (async () => {
      try {
        const result = await Api.get(`boards/${boardId}`);
        setBoardDetail(result.data);
        setIsNotified(result.data.isNotified);
        if (result.data.userId._id === userId) {
          setIsAuth({
            edit: true,
            delete: true,
          });
        } else if (role === 'admin') {
          setIsAuth((prev) => ({ ...prev, delete: true }));
        }
      } catch (err) {
        alert(err.response.data.reason);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (isEdit) {
      try {
        const { title, contents } = getValues();
        await Api.patch(`boards/${boardId}`, {
          title,
          contents,
          isNotified,
        });
        toggleEdit();
        setBoardDetail((prev) => ({ ...prev, title, contents }));
      } catch (err) {
        alert(err.response.data.reason);
      }
    }
  };

  const handleEdit = () => {
    reset(boardDetail);
    toggleEdit();
  };

  const handleDelete = async () => {
    try {
      await Api.delete(`boards/${boardId}`);
      alert('게시글이 정상적으로 삭제되었습니다.');
      navigate('/board');
    } catch (err) {
      alert(err.response.data.reason);
    }
  };

  return (
    <Container>
      <Wrapper>
        {isEdit ? (
          <>
            <TitleInput
              type='text'
              {...register('title', {
                required: true,
              })}
            />
            {role === 'admin' && (
              <div>
                <p>공지사항</p>
                <CheckBox
                  text='notice'
                  checked={isNotified}
                  onChange={toggleChecked}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <Title>{boardDetail.title}</Title>
            <Date>{boardDetail.createdAt?.slice(0, 10)}</Date>
          </>
        )}
      </Wrapper>
      {isEdit ? (
        <DescriptionInput
          type='text'
          {...register('contents', {
            required: true,
          })}
        />
      ) : (
        <Description>{boardDetail.contents}</Description>
      )}

      {isAuth.delete && (
        <ButtonWrapper>
          {isEdit ? (
            <>
              {isAuth.edit && <Button onClick={handleSave}>저장</Button>}
              <button type='button' onClick={toggleEdit}>
                취소
              </button>
            </>
          ) : (
            <>
              {isAuth.edit && <Button onClick={handleEdit}>수정</Button>}
              <Button onClick={handleDelete} style={{ background: '#f03e3e' }}>
                삭제
              </Button>
            </>
          )}
        </ButtonWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  margin: 5% auto;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
  margin-bottom: 2rem;

  div {
    display: flex;
    align-items: center;
    font-size: 22px;
    p {
      color: #37b24d;
      margin-right: 0.5rem;
    }
  }
`;

const Title = styled.p`
  padding: 0 0 1rem 0.5rem;
  font-size: 26px;
  font-weight: 600;
`;

const TitleInput = styled.input`
  width: 80%;
  font-size: 26px;
  font-weight: 600;
  border: none;
  padding: 0 0 1rem 0.5rem;
  outline: none;
`;

const Date = styled.span`
  position: absolute;
  right: 10px;
  bottom: 20%;
  opacity: 0.5;
`;

const Description = styled.p`
  padding-left: 0.5rem;
  min-height: 20rem;
  font-size: 20px;
  letter-spacing: 0.5px;
  word-spacing: 0.5px;
  line-height: 1.3;
  white-space: pre-wrap;
`;

const DescriptionInput = styled.textarea`
  padding-left: 0.5rem;
  border: none;
  min-height: 20rem;
  font-size: 20px;
  letter-spacing: 0.5px;
  word-spacing: 0.5px;
  line-height: 1.3;
  resize: none;
  outline: none;
  white-space: pre-wrap;
  &::placeholder {
    font-size: 20px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  button {
    width: 10%;
    font-size: 1.125rem;
    padding: 0.5rem 1.2rem;
    margin-left: 1rem;
    border-radius: 4px;
    &:last-child {
      &:hover {
        background: #ced4da;
      }
    }
  }
`;

export default BoardDetail;

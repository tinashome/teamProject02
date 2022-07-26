import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Api from 'api/api';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/atoms/Button';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import userState from 'stores/userStore';

const BoardDetail = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [boardDetail, setBoardDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isEditAuth, setIsEditAuth] = useState(false);
  const user = useRecoilValue(userState);

  const { register, reset, getValues } = useForm({
    defaultValues: {
      title: boardDetail?.title,
      contents: boardDetail?.contents,
    },
  });

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await Api.get(`boards/${boardId}`);
        setBoardDetail(result.data);
      } catch (err) {
        alert(err.response.data.reason);
      }
    })();
  }, []);

  useEffect(() => {
    if (user.role === 'admin' || boardDetail.userName === user.name) {
      setIsEditAuth(true);
    }
  }, [boardDetail]);

  const handleSave = async () => {
    if (isEdit) {
      try {
        const { title, contents } = getValues();
        await Api.patch(`boards/${boardId}`, {
          title,
          contents,
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
          <TitleInput
            type='text'
            {...register('title', {
              required: true,
            })}
          />
        ) : (
          <Title>{boardDetail.title}</Title>
        )}
        <Date>{boardDetail.createdAt?.slice(0, 10)}</Date>
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

      {isEditAuth && (
        <ButtonWrapper>
          {isEdit ? (
            <StyledButton onClick={handleSave}>저장</StyledButton>
          ) : (
            <StyledButton onClick={handleEdit}>수정</StyledButton>
          )}

          {!isEdit ? (
            <StyledButton
              onClick={handleDelete}
              style={{ background: '#f03e3e' }}
            >
              삭제
            </StyledButton>
          ) : (
            <button type='button' onClick={toggleEdit}>
              취소
            </button>
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
  overflow: auto;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
  margin-bottom: 2rem;
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

  button {
    font-size: 1.125rem;
    padding: 0.5rem 1.2rem;
    margin-left: 1rem;
  }
`;

const StyledButton = styled(Button)`
  width: 10%;
  & + & {
    margin-left: 0.5rem;
  }
`;

export default BoardDetail;

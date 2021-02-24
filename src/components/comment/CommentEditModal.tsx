import { memo } from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { commentErrorMessagMap } from '../../modules/comment';
import Button from '../common/Button';
import Input from '../common/Input';
import PopupBase from '../common/PopupBase';
import TextArea from '../common/TextArea';
import useCommentEditModal from './hooks/useCommentEditModal';

interface CommentEditModalProps {
  visible: boolean;
  writer: string;
  comment: string;
  comment_id: number;
  handleSetVisible: () => void;
}

function CommentEditModal({
  visible,
  writer,
  comment,
  comment_id,
  handleSetVisible,
}: CommentEditModalProps) {
  const {
    state,
    onChange,
    updateComment,
    removeComment,
    errorType,
    darkmode,
  } = useCommentEditModal({
    writer,
    comment,
    comment_id,
    handleSetVisible,
  });

  return (
    <PopupBase visible={visible}>
      <Block darkmode={darkmode}>
        <Title>
          <h4>댓글 수정/삭제</h4>
          {errorType && (
            <ErrorMessage>{commentErrorMessagMap.get(errorType)}</ErrorMessage>
          )}
        </Title>
        <Header>
          <Input
            type="text"
            name="writer"
            placeholder="작성자"
            value={state.writer}
            onChange={onChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
          />
        </Header>
        <Body>
          <TextArea
            name="comment"
            placeholder="내용을 입력해주세요"
            value={state.comment}
            onChange={onChange}
          />
        </Body>
        <Footer>
          <Button color="indigo" onClick={updateComment}>
            수정
          </Button>
          <Button color="red" onClick={removeComment}>
            삭제
          </Button>
          <Button color="darkGray" onClick={handleSetVisible}>
            취소
          </Button>
        </Footer>
      </Block>
    </PopupBase>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 1.725rem 1.5rem;
  overflow-y: auto;

  ${media.xsmall} {
    width: calc(100vw - 2rem);
  }
  ${media.small} {
    width: 37.5rem;
  }
`;

const Title = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  h4 {
    margin: 0;
    padding: 0;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${palette.red7};
  animation: ${transitions.shake} 0.3s ease-in;
  animation-fill-mode: forwards;
`;

export default memo(CommentEditModal);

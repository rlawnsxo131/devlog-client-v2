import * as React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { commentErrorMessagMap } from '../../modules/comment';
import Button from '../common/Button';
import Input from '../common/Input';
import PopupBase from '../common/PopupBase';
import TextArea from '../common/TextArea';
import useCommentEditModal from './hooks/useCommentEditModal';

type CommentEditModalProps = {
  visible: boolean;
  writer: string;
  comment: string;
  comment_id: number;
  handleSetVisible: () => void;
};

const { memo } = React;
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
        <Title>댓글 수정/삭제</Title>
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
        {errorType && (
          <ErrorMessage>{commentErrorMessagMap.get(errorType)}</ErrorMessage>
        )}
      </Block>
    </PopupBase>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    props.darkmode ? darkmodeBackground.other : 'white'};
  padding: 1rem;
  overflow-y: auto;
  height: 20.625rem;

  ${media.xsmall} {
    width: 20rem;
  }
  ${media.small} {
    width: 37.5rem;
  }
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 600;
  margin-bottom: 1rem;
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
  color: ${palette.red7};
  animation: ${transitions.shake} 0.3s ease-in;
  animation-fill-mode: forwards;
`;

export default memo(CommentEditModal);

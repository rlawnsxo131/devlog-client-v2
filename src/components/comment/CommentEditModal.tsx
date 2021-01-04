import * as React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
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

function CommentEditModal({
  visible,
  writer,
  comment,
  comment_id,
  handleSetVisible,
}: CommentEditModalProps) {
  const { state, onChange, updateComment, removeComment } = useCommentEditModal(
    {
      writer,
      comment,
      comment_id,
      handleSetVisible,
    },
  );

  return (
    <PopupBase visible={visible}>
      <Block>
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
          <Button onClick={updateComment}>수정</Button>
          <Button onClick={removeComment}>삭제</Button>
          <Button onClick={handleSetVisible}>취소</Button>
        </Footer>
      </Block>
    </PopupBase>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 1rem;
  overflow-y: auto;

  ${media.xsmall} {
    width: 320px;
    height: 315px;
  }
  ${media.small} {
    width: 600px;
  }
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 600;
`;

const Header = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default CommentEditModal;

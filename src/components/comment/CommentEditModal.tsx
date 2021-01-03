import { useMutation } from '@apollo/client';
import * as React from 'react';
import styled from 'styled-components';
import { UpdateCommentType, UPDATE_COMMENT } from '../../graphql/comment';
import useInputs from '../../lib/hooks/useInputs';
import media from '../../lib/styles/media';
import Button from '../common/Button';
import Input from '../common/Input';
import PopupBase from '../common/PopupBase';
import TextArea from '../common/TextArea';

type CommentEditModalProps = {
  visible: boolean;
  writer: string;
  comment_id: number;
  handleSetVisible: () => void;
};

const { useRef, useCallback } = React;
function CommentEditModal({
  visible,
  writer,
  comment_id,
  handleSetVisible,
}: CommentEditModalProps) {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [state, onChange] = useInputs({
    writer: '',
    password: '',
    comment: '',
  });
  const [UpdateComment] = useMutation<{
    updateCommnet: boolean;
    variables: UpdateCommentType;
  }>(UPDATE_COMMENT);

  const updateComment = useCallback(async () => {
    try {
      await UpdateComment({
        variables: {
          comment_id,
          password: state.password,
          writer: state.writer,
          comment: state.comment,
        },
      });
    } catch (e) {
      if (e.graphQLErrors) {
      }
      console.log(e.graphQLErrors);
      alert('수정 실패');
    }
  }, [state]);

  return (
    <PopupBase visible={visible}>
      <Block>
        <Title>댓글 수정/삭제</Title>
        <Header>
          <Input
            type="text"
            name="writer"
            placeholder={writer}
            value={state.writer}
            onChange={onChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
            inputRef={passwordRef}
          />
        </Header>
        <Body>
          <TextArea name="comment" value={state.comment} onChange={onChange} />
        </Body>
        <Footer>
          <Button onClick={updateComment}>수정</Button>
          <Button onClick={handleSetVisible}>삭제</Button>
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
    height: 300px;
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

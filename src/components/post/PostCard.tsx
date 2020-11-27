import * as React from 'react';
import styled from 'styled-components';
import { PostType } from '../../graphql/post';
import optimizeImage from '../../lib/optimizeImage';

type PostCardProps = {
  post: PostType;
};

function PostCard({ post }: PostCardProps) {
  return (
    <Block>
      {post.thumnail && (
        <Thumnail>
          <img src={optimizeImage(post.thumnail, 640)} alt="post-thumnail" />
        </Thumnail>
      )}
      <Content>
        <h4>{post.post_header}</h4>
      </Content>
    </Block>
  );
}

const Block = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const Thumnail = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;
  h4 {
    font-weight: bold;
  }
`;

export default PostCard;

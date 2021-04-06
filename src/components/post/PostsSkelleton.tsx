import PostCardGridLayout from './PostCardGridLayout';
import PostCardSkelleton from './PostCardSkelleton';

interface PostsSkelletonProps {}

function PostsSkelleton(props: PostsSkelletonProps) {
  return (
    <PostCardGridLayout>
      {Array.from({ length: 9 }).map((_, i) => (
        <PostCardSkelleton key={`post_card_skelleton_${i}`} />
      ))}
    </PostCardGridLayout>
  );
}

export default PostsSkelleton;

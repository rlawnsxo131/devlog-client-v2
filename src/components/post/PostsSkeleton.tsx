import PostCardGridLayout from './PostCardGridLayout';
import PostCardSkeleton from './PostCardSkeleton';

interface PostsSkeletonProps {}

function PostsSkeleton(props: PostsSkeletonProps) {
  return (
    <PostCardGridLayout>
      {Array.from({ length: 9 }).map((_, i) => (
        <PostCardSkeleton key={`post_card_skeleton_${i}`} />
      ))}
    </PostCardGridLayout>
  );
}

export default PostsSkeleton;

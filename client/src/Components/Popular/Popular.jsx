import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';

export default function Popular() {
  const posts = useSelector((state) => state.posts);
  const popular = posts?.map((el) => el?.Likes).filter((el) => el.length > 0);
  return (
    <>
      <div>Popular</div>
      <Post popular={popular} />
    </>
  );
}

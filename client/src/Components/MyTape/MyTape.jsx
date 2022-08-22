import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';

export default function MyTape() {
  const posts = useSelector((state) => state.posts);
  // console.log('posts---->', posts);
  const user = useSelector((state) => state.user);
  return (
    <div>
      MyTape
      {posts && posts?.filter((el) => el?.user_id === user?.id)
        .map((el) => <Post key={el?.id} mypost={el} />)}
    </div>
  );
}

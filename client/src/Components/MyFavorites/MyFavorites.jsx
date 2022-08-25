import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';

export default function MyFavorites() {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  return (
    <div>
      MyFavorites
      {posts && posts?.filter((el) => el?.Favorites[0]?.user_id === user?.id)
        .map((el) => <Post key={el?.id} myFavPost={el} />)}
    </div>
  );
}

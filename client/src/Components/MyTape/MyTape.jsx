import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';

export default function MyTape() {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="posText">
        <p>Моя лента...</p>
      </div>
      <Box flex={4} p={{ xs: 0, md: 2 }}>
        {posts && posts?.filter((el) => el?.user_id === user?.id)
          .map((el) => <Post key={el?.id} mypost={el} />)}
      </Box>
    </>
  );
}

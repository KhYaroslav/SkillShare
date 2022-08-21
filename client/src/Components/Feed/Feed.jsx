import { Box, Stack, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts } from '../../Redux/actions/postActions';
import Post from '../Post/Post';

export default function Feed() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, [90]);
  const { posts } = useSelector((state) => state);
  // console.log('posts--!!->', posts);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!posts.length) {
      dispatch(addPosts());
    }
  }, [posts]);
  return (
    <>
      <Box flex={4} p={{ xs: 0, md: 2 }}>
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Stack>
        ) : (
          <>
            {posts && posts.map((el) => <Post key={el.id} post={el} />)}
          </>
        )}
      </Box>
    </>
  );
}

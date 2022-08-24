import { Box, Stack, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allPosts } from '../../Redux/actions/postActions';
import Post from '../Post/Post';

export default function Feed() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPosts());
  }, []);

  return (
    <>
      <Box flex={4} p={{ xs: 0, md: 2 }}>
        {posts?.length && posts.map((el) => <Post key={el.id} post={el} />)}
      </Box>
    </>
  );
}

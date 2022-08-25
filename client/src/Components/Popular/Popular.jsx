import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';

export default function Popular() {
  const [populars, setPopulars] = useState();
  useEffect(() => { axios('/api/popular').then((res) => setPopulars(res.data)); }, []);

  return (
    <>
      <div className="posText">
        <p>Популярные...</p>
      </div>
      <Box flex={4} p={{ xs: 0, md: 2 }}>
        {populars?.map((el) => <Post popular={el} key={el.id} />)}
      </Box>
    </>
  );
}

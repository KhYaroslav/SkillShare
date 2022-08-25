import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';

export default function NewTen() {
  const [newTen, setNewTen] = useState();
  useEffect(() => { axios('/api/new').then((res) => setNewTen(res.data)); }, []);
  console.log('newTen----->', newTen);
  return (
    <>
      <div className="posText">
        <p>Новые...</p>
      </div>
      <Box flex={4} p={{ xs: 0, md: 2 }}>
        {newTen?.map((el) => <Post newTen={el} />)}
      </Box>
    </>
  );
}

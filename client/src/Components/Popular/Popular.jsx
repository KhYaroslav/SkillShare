import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';

export default function Popular() {
  const [populars, setPopulars] = useState();
  useEffect(() => { axios('/api/popular').then((res) => setPopulars(res.data)); }, []);

  return (
    <>
      <div>Popular</div>
      {populars?.map((el) => <Post popular={el} />)}
    </>
  );
}

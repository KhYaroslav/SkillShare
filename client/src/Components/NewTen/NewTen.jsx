import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';

export default function NewTen() {
  const [newTen, setNewTen] = useState();
  useEffect(() => { axios('/api/new').then((res) => setNewTen(res.data)); }, []);
  console.log('newTen----->', newTen);
  return (
    <div>
      NewTen
      {newTen?.map((el) => <Post newTen={el} />)}
    </div>
  );
}

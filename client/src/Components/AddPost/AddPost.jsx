import {
  Button,
  FormControlLabel, TextareaAutosize, TextField, Typography
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Details from '../MyTextBar/Details';
import { Tiptap } from '../MyTextBar/Tiptap';

export default function AddPost() {
  const [posts, setPosts] = useState('');
  console.log('posts----->', posts);
  const [post, setPost] = useState({ title: '', description: '', file: null });
  const changeHandler = (e) => setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const changeHandler2 = (e) => setPost((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  useEffect(() => { console.log('post------------>', post); }, [post]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', post.title);
    data.append('description', post.description);
    data.append('file', post.file);
    console.log('data---->', data);
    axios.post('/api/post/posts', data)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      // navigate('/');
      });
  };
  // const updateDesc = (data) => {
  //   setPost((prev) => ({ ...prev, description: data }));
  // };
  return (
    <Container>
      <div className="App">
        <Typography variant="h5">Добавить пост</Typography>
        <form onSubmit={(e) => submitHandler(e, post)}>
          <div className="12">
            <TextField
              style={{ width: '400px', margin: '5px' }}
              type="text"
              label="Title"
              variant="outlined"
              name="title"
              value={post.title}
              onChange={changeHandler}
            />
            <div className="App">
              <Tiptap setPost={setPost} />
              <Details posts={posts} />
            </div>
            <TextField
              // style={{ width: '400px', margin: '5px' }}
              type="file"
              name="file"
              onChange={changeHandler2}
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            save
          </Button>
        </form>
      </div>
    </Container>
  );
}

import {
  Button,
  FormControlLabel, TextareaAutosize, TextField, Typography
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import axios from 'axios';
import MenuBarSimple from '../MyTextBar/MenuBarSimple';

export default function AddPost() {
  const [post, setPost] = useState({ title: '', description: '', file: null });
  const changeHandler = (e) => setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const changeHandler2 = (e) => setPost((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  console.log('post------------>', post);
  const submitHandler = (e, post) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', post.title);
    data.append('description', post.description);
    data.append('file', post.file);

    axios.post('/api/post/posts', data)
      .then((res) => {
        console.log(res.data);
      // setPosts(res.data);
      // navigate('/');
      });
  };
  return (
    <Container>
      <div>
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
            <MenuBarSimple
              type="text"
              name="discription"
            />
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

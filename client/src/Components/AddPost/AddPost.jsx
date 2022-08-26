import {
  Button,
  FormControlLabel, TextareaAutosize, TextField, Typography
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Tiptap } from '../MyTextBar/Tiptap';
import { postAdd } from '../../Redux/actions/postActions';

export default function AddPost() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: '', description: '', file: null });
  useEffect(() => { if (id) { axios(`/api/post/${id}`).then((res) => setPost(res.data)); } }, []);
  const changeHandler = (e) => setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const changeHandler2 = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', post.title);
    data.append('description', post.description);
    data.append('file', post.file);
    dispatch(postAdd(data));
    navigate('/');
  };

  return (
    <Container>

      <div
        className="App"
        style={{
          position: 'absolute',
          left: '35%',
        }}
      >
        <Typography variant="h5" sx={{ position: 'relative', left: '30%' }}>Создать пост</Typography>
        <form onSubmit={(e) => submitHandler(e, post)}>
          <div className="12">
            <TextField
              sx={{ width: '300px', top: '75px' }}
              type="text"
              label="Title"
              variant="outlined"
              name="title"
              value={post.title}
              onChange={changeHandler}
            />
            <div className="App">
              <Tiptap
                setPost={setPost}
                post={post}
              />
            </div>
            <TextField
              sx={{ width: '70%', bottom: '75px' }}
              type="file"
              name="file"
              onChange={changeHandler2}
            />
          </div>
          <Button
            disabled={!((post.title && post.description))}
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              bottom: '70px'
            }}
          >
            Добавить
          </Button>
        </form>
      </div>
    </Container>
  );
}

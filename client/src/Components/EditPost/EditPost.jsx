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

export default function EditPost() {
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
          position: 'relative',
          left: '25%',
        }}
      >
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
            {post.id
            && (
              <div className="App">
                <Tiptap setPost={setPost} post={post} />
              </div>
            )}
            <TextField
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
              marginTop: '2%'
            }}
          >
            Добавить
          </Button>
        </form>
      </div>
    </Container>
  );
}

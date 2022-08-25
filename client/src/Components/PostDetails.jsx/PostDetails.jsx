import { SettingsInputCompositeTwoTone } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { addComment } from '../../Redux/actions/postActions';
import MyComment from '../Comments/MyComment';
import { Tiptap } from '../MyTextBar/Tiptap';
import { TiptapComment } from '../MyTextBar/TiptapComment';

export default function PostDetails() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  // console.log('🚀 ~ file: PostDetails.jsx ~ line 16 ~ PostDetails ~ posts', posts);
  const [post, setPost] = useState();
  const [comment, setComment] = useState('');
  const { id } = useParams();
  useEffect(() => {
    axios(`/api/post/${id}`)
      .then((res) => setPost(res.data));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(post?.id, comment));
  };

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
    >
      {post
      && (
        <Typography variant="body2" color="text.secondary">
          <div className="ProseMirror">
            {parse(post?.description)}
          </div>
        </Typography>
      )}
      <form onSubmit={submitHandler}>
        PostDetails
        <TiptapComment setComment={setComment} />
        <Button
          sx={{ marginTop: '15px' }}
          disabled={!((comment))}
          variant="contained"
          type="submit"
        >
          Отправить
        </Button>
      </form>
      {posts.find((el) => +el.id === +id)?.Comments?.length
      && posts.find((el) => +el.id === +id)?.Comments?.map((el) => (
        <MyComment
          key={el.id}
          post={post}
          comment={el}
        />
      ))}
    </Grid>

  );
}

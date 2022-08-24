import { SettingsInputCompositeTwoTone } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment } from '../../Redux/actions/postActions';
import MyComment from '../Comments/MyComment';
import { Tiptap } from '../MyTextBar/Tiptap';
import { TiptapComment } from '../MyTextBar/TiptapComment';

export default function PostDetails() {
  const dispatch = useDispatch();
  const [post, setPost] = useState();
  const [comment, setComment] = useState('');
  const { id } = useParams();
  useEffect(() => {
    axios(`/api/post/${id}`)
      .then((res) => setPost(res.data));
  }, []);
  // console.log('post---->', post);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(post?.id, comment));
  };
  return (
    <Grid
      container
      spacing={0}
      //   direction="column"
      //   alignItems="center"
      justifyContent="center"
    //   style={{ minHeight: '100vh' }}
    >
      <form onSubmit={submitHandler}>
        PostDetails
        <TiptapComment setComment={setComment} />
        {/* <CommentBox /> */}
        <Button variant="contained" type="submit">Ок</Button>
      </form>
      {post?.Comments?.length && post?.Comments?.map((el) => (
        <MyComment
          key={el.id}
          post={post}
          comment={el}
        />
      ))}
    </Grid>

  );
}

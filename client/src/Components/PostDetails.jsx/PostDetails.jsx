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
  const posts = useSelector((state) => state.posts);
  // const [toggle, setToggle] = useState(false);
  const [post, setPost] = useState();
  const [comment, setComment] = useState('');
  const { id } = useParams();
  useEffect(() => {
    axios(`/api/post/${id}`)
      .then((res) => setPost(res.data));
  }, []);
  console.log('posts---->', posts);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(post?.id, comment));
    // setToggle(!toggle);
  };
  // console.log('posts.find((el) => el.id === id)?.Comments', posts.find((el) => {
  //   console.log(+el.id === +id);
  //   console.log(el.id);
  //   console.log(id);
  //   return false;
  // }));
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

import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../Redux/actions/postActions';
import MyComment from '../Comments/MyComment';
import { Tiptap } from '../MyTextBar/Tiptap';

export default function PostDetails({ post }) { // принять post при нажатии на пост
  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts);
  // console.log('posts------>', posts);
  const [comment, setComment] = useState('');
  console.log('comment----->', comment);
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
        <Tiptap setComment={setComment} />
        {/* <CommentBox /> */}
        <Button variant="contained" type="submit">Ок</Button>
      </form>
      {post?.filter((el) => el?.Comments)?.map((el) => <MyComment key={el.id} comment={el} />)}
    </Grid>

  );
}

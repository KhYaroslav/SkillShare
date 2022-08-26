import { SettingsInputCompositeTwoTone } from '@mui/icons-material';
import { Button, Grid, ImageList, ImageListItem, Typography } from '@mui/material';
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
  console.log('🚀 ~ file: PostDetails.jsx ~ line 19 ~ PostDetails ~ post', post);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      alignItems="center"
    >
      {post
      && (
        <Typography variant="body2" color="text.secondary">
          <div>
            <h1>{post?.User?.name}</h1>
          </div>
          <div>
            <h1>{post?.title}</h1>
          </div>
          <div className="ProseMirror posTeg">
            {parse(post?.description)}
          </div>
          <ImageList sx={{ width: 500 }}>
            {post?.file && (
              <ImageListItem>
                <img
                  src={`${process.env.REACT_APP_BASEURL}/${post?.file}`}
                  alt={post?.title}
                  loading="lazy"
                />
              </ImageListItem>
            )}
          </ImageList>
        </Typography>
      )}
      <div style={{ position: 'relative' }}>
        <form onSubmit={submitHandler}>
          <TiptapComment setComment={setComment} />
          <Button
            sx={{ marginTop: '10px' }}
            disabled={!((comment))}
            variant="contained"
            type="submit"
          >
            Отправить
          </Button>
        </form>
      </div>
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

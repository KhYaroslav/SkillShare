import { Avatar, CardContent, Divider, Grid, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../../Redux/actions/postActions';

export default function MyComment({ comment, post }) {
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteComment(comment?.id));
  };
  return (
    <>
      <Grid
        container
        wrap="nowrap"
        spacing={2}
        justifyContent="center"
      >
        <Grid item>
          <Avatar justifyContent="center" alt="Remy Sharp" src={post?.User?.avatar} />
        </Grid>
        <Grid justifyContent="center" item>
          <h4 style={{ margin: 0, textAlign: 'center' }}>{post?.User?.name}</h4>
          <p style={{ textAlign: 'center' }}>
            {parse(comment?.comment_desc)}
          </p>
          <p style={{ textAlign: 'center', color: 'gray' }}>
            posted 1 minute ago
          </p>
        </Grid>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={deleteHandler}
        >
          <DeleteIcon />
        </IconButton>
        {/* <IconButton aria-label="edit">
          <EditIcon onClick={() => navigate(`/post/${post?.id}`)} />
        </IconButton> */}
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
    </>
  );
}

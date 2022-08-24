import { Avatar, CardContent, Divider, Grid, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import parse from 'html-react-parser';

export default function MyComment({ comment, post }) {
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
        <IconButton aria-label="delete" size="large">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
    </>
  );
}

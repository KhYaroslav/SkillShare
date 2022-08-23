import { Grid } from '@mui/material';
import React from 'react';
import CommentBox from '../Comments/CommentBox';

export default function PostDetails() {
  return (
    <Grid
      container
      spacing={0}
      //   direction="column"
      //   alignItems="center"
      justifyContent="center"
    //   style={{ minHeight: '100vh' }}
    >
      <div>
        PostDetails
        <CommentBox />
      </div>
    </Grid>

  );
}

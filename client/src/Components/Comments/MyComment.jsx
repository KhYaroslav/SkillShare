import { CardContent, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import parse from 'html-react-parser';

export default function MyComment({ comment }) {
  return (
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        <div className="ProseMirror">{parse(comment?.comment_desc)}</div>
      </Typography>
      <IconButton aria-label="delete" size="large">
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
    </CardContent>
  );
}

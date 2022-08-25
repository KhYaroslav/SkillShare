import {
  Favorite, FavoriteBorder, MoreVert, RemoveRedEye
} from '@mui/icons-material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  Badge,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFavorite, addLike, deletePost } from '../../Redux/actions/postActions';
import { deleteQuestion } from '../../Redux/actions/questionActions';

export default function Question({ question }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const deleteHandler = () => {
    dispatch(deleteQuestion(question?.id));
  };

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe" alt={user.name} src={`${process.env.REACT_APP_BASEURL}${question?.User?.avatar}` || '/broken-image.jpg'} />
        )}
        action={(
          <IconButton
            aria-label="settings"
            onClick={() => navigate(`question/${question.id}`)}
          >
            <MoreVert />
          </IconButton>
        )}
        title={question?.title}
        subheader={
          question?.createdAt
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {question?.User?.name}
          <div className="ProseMirror">{parse(question?.description)}</div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={deleteHandler}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

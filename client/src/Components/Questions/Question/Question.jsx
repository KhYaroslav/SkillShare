import { MoreVert, RemoveRedEye } from '@mui/icons-material';
import { Avatar, Badge, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { deleteQuestion } from '../../../Redux/actions/questionAction.js';

export default function Question({ question }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const deleteHandler = () => {
    dispatch(deleteQuestion(question?.id));
  };
  const { id } = useParams();
  const [onequestion, setOnequestion] = useState();
  if (id) { useEffect(() => { axios(`api/question/${+id}`).then((res) => setOnequestion(res.data)); }, []); }
  return (
    <Card sx={{ margin: 5, border: 1, borderColor: 'text.primary' }}>
      <CardHeader
        sx={{ borderBottom: 1, borderColor: 'text.primary' }}
        avatar={(
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe" alt={question?.User?.name} src={`${process.env.REACT_APP_BASEURL}${question?.User?.avatar || onequestion?.User?.avatar}` || '/broken-image.jpg'} />
        )}
        action={(
          <IconButton
            aria-label="settings"
            onClick={() => navigate(`${question?.id}`)}
          >
            <MoreVert />
          </IconButton>
        )}
        title={question?.User?.name || onequestion?.User?.name}
        subheader={
          question?.createdAt.replace(/T/i, ' ').slice(0, 19)
        }
      />
      <CardContent>
        <Typography sx={{ textAlign: 'center', fontSize: '30px' }} variant="body2" color="text.secondary">
          {question
        && (
          <>
            {question?.title}
          </>
        )}
          {onequestion
        && (
          <div className="ProseMirror">
            {parse(onequestion?.description)}
          </div>
        )}
        </Typography>
      </CardContent>
      <Badge sx={{ marginLeft: '30px', top: '30px' }} badgeContent={question?.view} max={10000} color="success">
        <VisibilityOutlinedIcon />
      </Badge>
      { user?.id === question?.User?.id
        && (
          <div style={{ position: 'relative', left: '87%', bottom: '5px' }}>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={deleteHandler}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </div>
        ) }
    </Card>
  );
}

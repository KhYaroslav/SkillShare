import {
  Favorite, FavoriteBorder, MoreVert
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

export default function Post({ post, mypost, myFavPost }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log('post---->', post);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  useEffect(() => {
    if (post?.Likes?.find((el) => el.user_id === user.id)) {
      setChecked(true);
    }
  }, []);
  useEffect(() => {
    if (post?.Favorites?.find((el) => el.user_id === user.id)) {
      setChecked2(true);
    }
  }, []);
  const deleteHandler = () => {
    dispatch(deletePost(mypost.id || post.id));
  };
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {myFavPost?.User?.id || mypost?.User?.id || post?.User?.id}
          </Avatar>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        )}
        title={myFavPost?.title || mypost?.title || post?.title}
        subheader={myFavPost?.createdAt || mypost?.createdAt || post?.createdAt}
      />
      <CardMedia
        component="img"
        height="20%"
        image={`${process.env.REACT_APP_BASEURL}/${myFavPost?.file || mypost?.file || post?.file}` || 'https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {mypost ? mypost?.User.name : post?.User?.name}
          <div className="ProseMirror">{parse(myFavPost?.description || mypost?.description || post?.description)}</div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            dispatch(addLike(myFavPost || mypost || post?.id));
            setChecked(!checked);
          }}
        >
          <Badge badgeContent={mypost?.Likes?.length || post?.Likes?.length} color="error">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: 'red' }} />}
              checked={checked}
            />
          </Badge>
        </IconButton>
        <CommentIcon />
        <IconButton aria-label="share" onClick={() => { dispatch(addFavorite(myFavPost?.id || mypost?.id || post?.id)); setChecked2(!checked2); }}>
          <Checkbox
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
            checked={checked2}
          />
        </IconButton>
        <IconButton aria-label="delete" size="large" onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={() => navigate(`/mypost/${myFavPost?.id || post?.id || mypost?.id}`)}>
          <EditIcon />
        </IconButton>

      </CardActions>
    </Card>
  );
}

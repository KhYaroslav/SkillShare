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
import { useLocation, useNavigate } from 'react-router-dom';
import { addFavorite, addLike, deletePost } from '../../Redux/actions/postActions';

export default function Post({ post, mypost, myFavPost, popular }) {
  // console.log('post---->', post);
  // const location = useLocation();
  // console.log('location---->', location);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  // useEffect(()=>{if(location.path==="/popular")})
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
    dispatch(deletePost(mypost?.id || post?.id));
  };
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {myFavPost?.User?.id || mypost?.User?.id || post?.User?.id || popular?.User?.id}
          </Avatar>
        )}
        action={(
          <IconButton
            aria-label="settings"
            onClick={() => navigate(`post/${post.id || myFavPost?.id || mypost?.id || popular?.id}`)}
          >
            <MoreVert />
          </IconButton>
        )}
        title={myFavPost?.title || mypost?.title || post?.title || popular?.title}
        subheader={
          myFavPost?.createdAt || mypost?.createdAt || post?.createdAt || popular?.createdAt
        }
      />
      <CardMedia
        component="img"
        height="20%"
        image={`${process.env.REACT_APP_BASEURL}/${myFavPost?.file || mypost?.file || post?.file || popular?.file || ''}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {myFavPost?.User?.name || mypost?.User?.name || post?.User?.name || popular?.User?.name}
          {console.log('postId', post.id, post, myFavPost?.description || mypost?.description || post?.description || popular?.description)}
          <div className="ProseMirror">{parse(myFavPost?.description || mypost?.description || post?.description || popular?.description)}</div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            dispatch(addLike(myFavPost?.id || mypost?.id || post?.id || popular?.id));
            setChecked(!checked);
          }}
        >
          <Badge badgeContent={myFavPost?.Likes?.length || mypost?.Likes?.length || post?.Likes?.length || popular?.length} color="error">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: 'red' }} />}
              checked={checked}
            />
          </Badge>
        </IconButton>
        <Badge badgeContent={myFavPost?.Comments?.length || mypost?.Comments?.length || post?.Comments?.length || popular?.Comments?.length} color="success">
          <CommentIcon />
        </Badge>
        <IconButton
          aria-label="share"
          onClick={() => {
            dispatch(addFavorite(myFavPost?.id || mypost?.id || post?.id || popular?.id));
            setChecked2(!checked2);
          }}
        >
          <Checkbox
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
            checked={checked2}
          />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={deleteHandler}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="edit"
          onClick={() => navigate(`/mypost/${myFavPost?.id || post?.id || mypost?.id || popular?.id}`)}
        >
          <EditIcon />
        </IconButton>
        <Badge badgeContent={myFavPost?.view || mypost?.view || post?.view || popular?.view} color="success">
          <RemoveRedEye />
        </Badge>
      </CardActions>
    </Card>
  );
}

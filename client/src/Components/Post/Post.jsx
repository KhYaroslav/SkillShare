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
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import parse from 'html-react-parser';
import { addFavorite, addLike, deletePost } from '../../Redux/actions/postActions';

export default function Post({ post, mypost, myFavPost, popular, newTen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

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
    dispatch(deletePost(mypost?.id || post?.id));
  };

  return (
    <Card sx={{ margin: 5, border: 1, borderColor: 'text.primary' }}>
      <CardHeader
        sx={{ borderBottom: 1, borderColor: 'text.primary' }}
        avatar={(
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe" alt={user.name} src={`${process.env.REACT_APP_BASEURL}${post?.User?.avatar}` || '/broken-image.jpg'} />
        )}
        action={(
          <IconButton
            aria-label="settings"
            onClick={() => navigate(`post/${post?.id || myFavPost?.id || mypost?.id || popular?.id || newTen?.id}`)}
          >
            <MoreVert />
          </IconButton>
        )}
        title={myFavPost?.User?.name
          || mypost?.User?.name
          || post?.User?.name
          || popular?.User?.name
          || newTen?.User?.name}
        subheader={
          myFavPost?.createdAt.replace(/T/i, ' ').slice(0, 19)
          || mypost?.createdAt.replace(/T/i, ' ').slice(0, 19)
          || post?.createdAt.replace(/T/i, ' ').slice(0, 19)
          || popular?.createdAt.replace(/T/i, ' ').slice(0, 19)
          || newTen?.createdAt.replace(/T/i, ' ').slice(0, 19)
        }
      />
      <CardContent>
        <Typography sx={{ textAlign: 'center', fontSize: '30px' }} variant="body2" color="text.secondary">
          {myFavPost?.title
            || mypost?.title
            || post?.title
            || popular?.title
            || newTen?.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            dispatch(addLike(
              myFavPost?.id
              || mypost?.id
              || post?.id
              || popular?.id
              || newTen?.id
            ));
            setChecked(!checked);
          }}
        >
          <Badge
            sx={{ top: '7px', left: '8px' }}
            badgeContent={myFavPost?.Likes?.length
            || mypost?.Likes?.length || post?.Likes?.length
            || popular?.length}
            max={10000}
            color="error"
          >
            <Checkbox
              sx={{ bottom: '7px', left: '10px' }}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: 'red', top: '10px' }} />}
              checked={checked}
            />
          </Badge>
        </IconButton>
        <Badge sx={{ marginLeft: '30px' }} badgeContent={myFavPost?.Comments?.length || mypost?.Comments?.length || post?.Comments?.length || popular?.Comments?.length} max={10000} color="success">
          <CommentIcon />
        </Badge>
        <Badge sx={{ marginLeft: '30px' }} badgeContent={myFavPost?.view || mypost?.view || post?.view || popular?.view} max={10000} color="success">
          <VisibilityOutlinedIcon />
        </Badge>
        <IconButton
          style={{ position: 'relative', left: '70%', bottom: '153px' }}
          aria-label="share"
          onClick={() => {
            dispatch(addFavorite(myFavPost?.id || mypost?.id || post?.id
              || popular?.id || newTen?.id));
            setChecked2(!checked2);
          }}
        >
          <Checkbox
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
            checked={checked2}
          />
        </IconButton>
        {(user?.id === post?.User?.id
          && (
            <div style={{ position: 'relative', marginLeft: '63%' }}>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={deleteHandler}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => navigate(`/mypost/${myFavPost?.id || post?.id || mypost?.id || popular?.id || newTen?.id}`)}
              >
                <EditIcon />
              </IconButton>
            </div>
          ))}
      </CardActions>
    </Card>
  );
}

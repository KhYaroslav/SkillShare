import {
  Favorite, FavoriteBorder, MoreVert, Share
} from '@mui/icons-material';
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
  Badge
} from '@mui/material';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../../Redux/actions/postActions';

export default function Post({ post }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log('post---->', post);
  const [checked, setChecked] = useState(false);
  // eslint-disable-next-line max-len
  useEffect(() => { if (post?.Likes?.find((el) => el.user_id === user.id)) { setChecked(true); } }, []);
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {post?.User?.id}
          </Avatar>
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        )}
        title={post?.title}
        subheader={post?.createdAt}
      />
      <CardMedia
        component="img"
        height="20%"
        image={`${process.env.REACT_APP_BASEURL}/${post?.file}` || 'https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.User?.name}
          <div className="ProseMirror">{parse(post?.description)}</div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => { dispatch(addLike(post?.id)); setChecked(!checked); }}
        >
          <Badge badgeContent={post?.Likes?.length} color="error">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: 'red' }} />}
              checked={checked}
            />
          </Badge>
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
}

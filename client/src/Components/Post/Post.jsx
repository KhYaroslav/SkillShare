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
} from '@mui/material';
import parse from 'html-react-parser';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../../Redux/actions/likeActions';

export default function Post({ post }) {
  const { likes } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log('post+User--->', post);
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
        title={post?.User?.name}
        subheader={post?.createdAt}
      />
      <CardMedia
        component="img"
        height="20%"
        image={`http://localhost:3000/${post?.img}` || 'https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <div className="ProseMirror">{parse(post?.description)}</div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => dispatch(addLike(post?.id))}
        >
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
}

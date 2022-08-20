import {
  Avatar,
  AvatarGroup,
  Box,
  ImageList,
  ImageListItem,

  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import News from '../../News/News';
import { getChatMessages } from '../../../Redux/actions/chatActions';

const Rightbar = () => {
  const chatUsers = useSelector((state) => state.chatUsers);
  const user = useSelector((state) => state.user);
  const ws = useSelector((state) => state.ws);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id && ws) {
      dispatch(getChatMessages());
    }
  }, [user, ws]);
  return (
    <Box flex={2} p={2} sx={{ display: { sm: 'block' } }}>
      <Box position="fixed" width={300}>
        <Typography variant="h6" fontWeight={100}>
          Пользователи онлайн
        </Typography>
        <AvatarGroup max={7}>
          {chatUsers.map((el) => (
            <h1>{el.name}</h1>
          ))}
        </AvatarGroup>
        <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
          Последние фото
        </Typography>
        <ImageList cols={3} rowHeight={100} gap={5}>
          <ImageListItem>
            <img
              src="https://material-ui.com/static/images/image-list/breakfast.jpg"
              alt=""
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src="https://material-ui.com/static/images/image-list/burgers.jpg"
              alt=""
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src="https://material-ui.com/static/images/image-list/camera.jpg"
              alt=""
            />
          </ImageListItem>
        </ImageList>
        <News />
      </Box>
    </Box>
  );
};

export default Rightbar;

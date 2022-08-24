import {
  Avatar,
  AvatarGroup,
  Box,
  ImageList,
  ImageListItem,

  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import News from '../../News/News';
import { getChatMessages } from '../../../Redux/actions/chatActions';

const Rightbar = () => {
  const chatUsers = useSelector((state) => state.chatUsers);
  const user = useSelector((state) => state.user);
  const ws = useSelector((state) => state.ws);

  const dispatch = useDispatch();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  useEffect(() => {
    if (user.id && ws) {
      dispatch(getChatMessages());
    }
  }, [user, ws, StyledBadge]);

  const location = useLocation();

  return (
    <>
      {(location.pathname === '/' || location.pathname === '/popular'
        || location.pathname === '/new') && (
        <Box flex={2} p={2} sx={{ display: { sm: 'block' } }}>
          <Box position="fixed" width={300}>
            {user.id && (
              <>
                <Typography variant="h6" fontWeight={100}>
                  Пользователи онлайн
                </Typography>
                <Stack direction="row" spacing={2} max={7}>
                  {chatUsers.map((el) => (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                      <Avatar alt={el.name} src={el?.img || '/broken-image.jpg'} />
                    </StyledBadge>
                  ))}
                </Stack>
              </>
            )}
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
      )}
    </>
  );
};

export default Rightbar;

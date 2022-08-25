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
    <div style={{
      marginRight: '16%'
    }}
    >
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
                      <Avatar alt={el.name} src={`${process.env.REACT_APP_BASEURL}${el.avatar}` || '/broken-image.jpg'} />
                    </StyledBadge>
                  ))}
                </Stack>
              </>
            )}
            <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
              Реклама
            </Typography>
            <ImageList cols={3} rowHeight={100} gap={5}>
              <ImageListItem>
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
              </ImageListItem>
              <ImageListItem>
                <img
                  src="https://elbrus-bootcamp.github.io/Elbrus-Bootcamp/sharing_logo.jpg"
                  alt=""
                />
              </ImageListItem>
              <ImageListItem>
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
              </ImageListItem>
            </ImageList>
            <News />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Rightbar;

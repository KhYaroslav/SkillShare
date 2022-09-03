import { Notifications, Computer } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Input,
  InputBase,
  Menu,
  MenuItem,
  styled,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { logoutUser, userCheck } from '../../../Redux/actions/userActions';
import { getSearchPost } from '../../../Redux/actions/postActions';
import { allStats } from '../../../Redux/actions/statsActions';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '20%',
  position: 'absolute',
  left: '40%',
  border: 1,
  borderColor: 'text.primary'
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({});

  const stats = useSelector((state) => state.stats);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(allStats());
  }, []);

  const notification = stats?.reduce((acc, el) => acc + el?.Comments?.length, 0);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  const [avatar, setAvatar] = useState({ avatar: null });
  const [ava, setAva] = useState('');
  const changeHandler2 = (e) => setAvatar((prev) => (
    { ...prev, [e.target.name]: e.target.files[0] }));

  const submitHandler = (e) => {
    const data = new FormData();
    data.append('avatar', avatar.avatar);
    axios.post('/api/user/avatar', data)
      .then((res) => {
        setAvatar(res?.data);
        setAva(res?.data);
        dispatch(userCheck());
        navigate('/');
      });
  };

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (input.input) {
      dispatch(getSearchPost(input));
    }
  }, [input]);

  useEffect((e) => {
    if (avatar.avatar) {
      submitHandler(e);
    }
  }, [avatar.avatar]);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          onClick={() => navigate('/')}
          variant="h6"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          <img src="https://i.ibb.co/dGbBs5f/666.png" alt="logo" border="0" width="20%" height="20%" style={{ marginTop: '8px' }} />
          {' '}
          <a style={{ top: '20%', position: 'absolute', marginLeft: '1%' }}>
            Skill Share
          </a>
        </Typography>
        <Computer sx={{ display: { xs: 'block', sm: 'none' } }} />
        {(location.pathname === '/' || location.pathname === '/popular'
          || location.pathname === '/new' || location.pathname === '/mytape'
        || location.pathname === '/favorite') && (
          <Search>
            <InputBase
              name="input"
              value={input.input || ''}
              onChange={changeHandler}
              placeholder="Поиск..."
              sx={{ color: 'black' }}
            />
          </Search>
        )}
        {user.id ? (
          <>
            <Icons>
              <Badge badgeContent={notification} color="error">
                <Notifications />
              </Badge>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={`${process.env.REACT_APP_BASEURL}${user.avatar}`}
                onClick={(e) => setOpen(true)}
              />
            </Icons>
            <UserBox onClick={(e) => setOpen(true)}>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={`${process.env.REACT_APP_BASEURL}${user.avatar}`}
              />
              <Typography variant="span">{user.name}</Typography>
              <Typography variant="span">{user.avatar}</Typography>
            </UserBox>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={open}
              onClose={(e) => setOpen(false)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <form name="avatar-update" id="avatar-form" onSubmit={(e) => submitHandler(e)}>
                <label htmlFor="avatar-update">
                  <Input name="avatar" accept="image/*" id="avatar-update" multiple type="file" onChange={changeHandler2} style={{ display: 'none' }} />
                  <MenuItem>Добавить фото</MenuItem>
                </label>
              </form>
              <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button variant="contained" sx={{ marginRight: '10px' }} onClick={() => navigate('/login')}>Вход</Button>
              <Button variant="contained" onClick={() => navigate('/signup')}>Регистрация</Button>
            </div>

          </>
        )}
      </StyledToolbar>
    </AppBar>
  );
}

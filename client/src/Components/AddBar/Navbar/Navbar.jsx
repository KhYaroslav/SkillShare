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
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { logoutUser } from '../../../Redux/actions/userActions';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
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
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  const [avatar, setAvatar] = useState({ avatar: null });
  const [ava, setAva] = useState('');
  console.log('avatar------>', avatar);
  console.log('ava------>', ava);

  const changeHandler2 = (e) => setAvatar((prev) => (
    { ...prev, [e.target.name]: e.target.files[0] }));
  // console.log('ava----->', ava);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log('--------------------------;lj', data);
    data.append('avatar', avatar.avatar);
    console.log('data--->', data);
    axios.post('/api/user/avatar', data)
      .then((res) => {
        console.log('--------------------------res', res);
        setAvatar(res?.data);
        setAva(res?.data);
        navigate('/');
      });
  };

  /// //////////////////////////

  // const [input, setInput] = useState({});
  // const [photo, setPhoto] = useState('');

  console.log('-------------------fff', user);

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
          <Search style={{ position: 'absolute', marginLeft: '28%' }}>
            <InputBase placeholder="Поиск..." />
          </Search>
        )}
        {user.id ? (
          <>
            <Icons>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
              <Avatar
                sx={{ width: 30, height: 30 }}
                onClick={(e) => setOpen(true)}
              />
            </Icons>
            <UserBox onClick={(e) => setOpen(true)}>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={user.avatar || '/broken-image.jpg'}
              />
              <Typography variant="span">{user.name}</Typography>
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
              {/* Загрузить фото */}
              <form name="avatar-update" id="avatar-form" onSubmit={(e) => submitHandler(e)}>
                <label htmlFor="avatar-update">
                  <Input name="avatar" accept="image/*" id="avatar-update" multiple type="file" onChange={changeHandler2} style={{ display: 'none' }} />
                  <div className="avatar-fade">Выбрать новую</div>
                </label>
                <Button variant="contained" type="submit" className="form-button" size="large">
                  Обновить
                </Button>
              </form>

              {/* <label htmlFor="avatar-update">
                <Input name="file" accept="image/*" id="avatar-update" multiple type="file" />
                <div className="avatar-fade">Выбрать новую</div>

            </form> */}
              <MenuItem onClick={logoutHandler}>Добавить фото</MenuItem>
              <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => navigate('/login')}>Вход</Button>
              <Button variant="contained" onClick={() => navigate('/signup')}>Регистрация</Button>
            </div>

          </>
        )}
      </StyledToolbar>
    </AppBar>
  );
}

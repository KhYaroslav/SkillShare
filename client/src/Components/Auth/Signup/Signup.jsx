import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSignUp } from '../../../Redux/actions/userActions';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reg, setReg] = useState({
    username: '', password: '', repeat: '', email: ''
  });

  const SubmitSignUp = (e) => {
    e.preventDefault();
    if (reg.password !== '' && reg.username !== '' && reg.repeat === reg.password) {
      dispatch(userSignUp(reg));
      navigate('/');
    }
  };

  const ChangeSignUp = (e) => setReg((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" noValidate onSubmit={SubmitSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={reg.username}
                onChange={ChangeSignUp}
                name="username"
                required
                fullWidth
                id="email"
                label="Введите никнейм..."
                autoComplete="nickname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={reg.email}
                onChange={ChangeSignUp}
                name="email"
                required
                fullWidth
                id="email"
                label="Введите почту..."
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                value={reg.password}
                onChange={ChangeSignUp}
                name="password"
                label="Введите пароль..."
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={reg.repeat}
                onChange={ChangeSignUp}
                name="repeat"
                label="Повторите пароль..."
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Готово
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => navigate('/login')} variant="body2">
                У вас уже усть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
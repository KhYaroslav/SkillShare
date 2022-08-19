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
import { userLogin } from '../../../Redux/actions/userActions';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [log, setLog] = useState({ username: '', password: '' });

  const ChangeLogin = (e) => setLog((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const SubmitLogin = (e) => {
    e.preventDefault();
    if (log.password !== '' && log.username !== '') {
      dispatch(userLogin(log));
      navigate('/');
    }
  };
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
          Авторизация
        </Typography>
        <Box component="form" onSubmit={SubmitLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            value={log.username}
            onChange={ChangeLogin}
            name="username"
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="Введите никнейм..."
            autoComplete="nickname"
            autoFocus
          />
          <TextField
            value={log.password}
            onChange={ChangeLogin}
            name="password"
            margin="normal"
            required
            fullWidth
            label="Введите пароль..."
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid>
              <Link onClick={() => navigate('/signup')} variant="body2">
                У вас нет аккаунта? Зарегистрироваться
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

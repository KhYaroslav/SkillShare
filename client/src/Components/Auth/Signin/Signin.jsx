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
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../../Redux/actions/userActions';
import { alertCondition } from '../../../Redux/actions/alertActions';
import { AlertSigninWarning } from '../../Different/Alert/AlertComp';

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
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [log, setLog] = useState({ name: '', password: '' });

  const ChangeLogin = (e) => setLog((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const SubmitLogin = (e) => {
    e.preventDefault();
    if (log.password !== '' && log.name !== '') {
      dispatch(userLogin(log, navigate));
      dispatch(alertCondition(4));
    }
  };
  return (
    <>
      <AlertSigninWarning />
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
              value={log.name}
              onChange={ChangeLogin}
              name="name"
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
              disabled={!((log.name && log.password))}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Готово
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => navigate('/')}
              sx={{ mt: 0, mb: 2 }}
            >
              на главную
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
    </>
  );
}

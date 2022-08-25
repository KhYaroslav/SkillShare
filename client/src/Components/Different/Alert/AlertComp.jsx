import React from 'react';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { alertCondition } from '../../../Redux/actions/alertActions';
import './Alert.css';

export function AlertSignupSuccess() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  if (alert === 2) {
    setTimeout(() => {
      dispatch(alertCondition(1));
    }, 3000);
  }

  return (
    <Stack
      className="alert"
      spacing={1}
    >
      {alert === 2 && <Alert severity="success">Вы успешно зарегестрировались!</Alert>}
    </Stack>
  );
}

export function AlertSignupWarning() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  if (alert === 3) {
    setTimeout(() => {
      dispatch(alertCondition(1));
    }, 3000);
  }

  return (
    <Stack
      className="alert"
      spacing={1}
    >
      {alert === 3 && <Alert severity="warning">Неверно указаны данные!</Alert>}
    </Stack>
  );
}

export function AlertSigninSuccess() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  if (alert === 4) {
    setTimeout(() => {
      dispatch(alertCondition(1));
    }, 3000);
  }

  return (
    <Stack
      className="alert"
      spacing={1}
    >
      {alert === 4 && <Alert severity="success">Авторизиризация выполнена!</Alert>}
    </Stack>
  );
}

export function AlertSigninWarning() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  if (alert === 5) {
    setTimeout(() => {
      dispatch(alertCondition(1));
    }, 3000);
  }

  return (
    <Stack
      className="alert"
      spacing={1}
    >
      {alert === 5 && <Alert severity="warning">Неверно указан логин или пароль!</Alert>}
    </Stack>
  );
}

import React from 'react';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';

export default function AlertComp() {
  const alert = useSelector((state) => state.alert);

  return (
    <Stack sx={{ width: '20%' }} spacing={1}>
      {alert ? <Alert severity="success">Вы успешно зарегестрировались!</Alert>
        : <Alert severity="warning">Вы не верно зарегестрировались</Alert>}
    </Stack>
  );
}

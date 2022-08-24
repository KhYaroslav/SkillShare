import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';

export function AlertTrueComp() {
  const alert = useSelector((state) => state.alert);
  const [alertTrue, setAlertTrue] = useState(false);

  useEffect(() => {
    setAlertTrue(true);
    setTimeout(() => {
      setAlertTrue(false);
    }, 3000);
  }, []);

  return (
    <Stack
      sx={{
        position: 'absolute',
        top: '0%',
        right: '0%',
      }}
      spacing={1}
    >
      {alertTrue && alert && <Alert severity="success">Вы успешно зарегестрировались!</Alert>}
    </Stack>
  );
}

export function AlertFalseComp() {
  const alert = useSelector((state) => state.alert);
  const [alertFalse, setAlertFalse] = useState(false);

  useEffect(() => {
    setAlertFalse(true);
    setTimeout(() => {
      setAlertFalse(false);
    }, 3000);
  }, [alert]);

  return (
    <Stack
      sx={{
        position: 'absolute',
        top: '0%',
        right: '0%',
      }}
      spacing={1}
    >
      {alertFalse && <Alert severity="warning">Неверно указана почта или пароль!</Alert>}
    </Stack>
  );
}

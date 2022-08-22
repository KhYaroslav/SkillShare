import React from 'react';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

export default function AlertComp() {
  const alert = useSelector((state) => state.alert);

  return (
    <>
      {alert ? <Alert severity="success">This is a success alert — check it out!</Alert>
        : <Alert severity="warning">This is a warning alert — check it out!</Alert>}
    </>
  );
}

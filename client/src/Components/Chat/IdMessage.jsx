import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function IdMessage({ key, message }) {
  return (
    <ListItem key={key}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align="right" primary={message.message} />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align="right" secondary="09:30" />
        </Grid>
      </Grid>
    </ListItem>
  );
}

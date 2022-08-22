import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function OtherMessage({ key, message }) {
  return (
    <ListItem key={key}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align="left" primary={message.message} />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align="left" secondary="09:31" />
        </Grid>
      </Grid>
    </ListItem>
  );
}
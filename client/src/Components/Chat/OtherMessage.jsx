import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function OtherMessage({ key, message }) {
  return (
    <ListItem
      key={key}
      style={{ width: '30%',
      }}
    >
      <Grid container textAlign="left">
        <Grid item xs={12}>
          <ListItemText
            primary={message.name}
            secondary={message.message}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

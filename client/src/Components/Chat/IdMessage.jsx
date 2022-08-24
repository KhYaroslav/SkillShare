import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';

export default function IdMessage({ key, message }) {
  const user = useSelector((state) => state.user);
  // console.log('----------?????', message);
  return (

    <ListItem
      key={key}
      style={{ width: '37%',
      }}
    >
      <Grid container textAlign="right">
        <Grid item xs={12}>
          <ListItemText
            // marginRight="10%"
            // align="right"
            // borderTopRightRadius="radius"
            // borderBottomRightRadius="radius"
            // color="blue"
            primary={message.name}
            secondary={message.message}
          />
        </Grid>
        {/* <Grid item xs={12} marginRight="5%">
          <ListItemText align="right" secondary="09:30" />
        </Grid> */}
      </Grid>
    </ListItem>
  );
}

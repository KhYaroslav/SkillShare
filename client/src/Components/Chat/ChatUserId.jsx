import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

export default function ChatUser({ user }) {
  return (
    <List>
      <ListItem button key="RemySharp">
        <ListItemIcon>
          <Avatar alt={user.name} src={`${process.env.REACT_APP_BASEURL}${user.avatar}` || '/broken-image.jpg'} />
        </ListItemIcon>
        <ListItemText primary={user.name} />
      </ListItem>
    </List>
  );
}

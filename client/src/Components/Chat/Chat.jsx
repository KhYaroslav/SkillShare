import React, { useState, useEffect } from 'react';
// import  styled  from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { useSelector, useDispatch } from 'react-redux';
import ChatUserId from './ChatUserId';
import { sendChatMessage, getChatMessages } from '../../Redux/actions/chatActions';
import OtherUser from './OtherUser';
import IdMessage from './IdMessage';
import OtherMessage from './OtherMessage';

// const useStyles = styled({
//   table: {
//     minWidth: 650,
//   },
//   chatSection: {
//     width: '100%',
//     height: '80vh'
//   },
//   headBG: {
//     backgroundColor: '#e0e0e0'
//   },
//   borderRight500: {
//     borderRight: '1px solid #e0e0e0'
//   },
//   messageArea: {
//     height: '70vh',
//     overflowY: 'auto'
//   }
// });

const Chat = () => {
  // const classes = useStyles();

  const [input, setInput] = useState('');
  const messages = useSelector((state) => state.messages);
  const chatUsers = useSelector((state) => state.chatUsers);

  const user = useSelector((state) => state.user);
  const ws = useSelector((state) => state.ws);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id && ws) {
      dispatch(getChatMessages());
    }
  }, [user, ws]);

  const inputHAndler = (e) => {
    setInput(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(sendChatMessage({ message: input, user: user.name }));
      setInput('');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendChatMessage({ message: input, user: user.name }));
    setInput('');
  };
  console.log('🚀 ~ file: Chat.jsx ~ line 46 ~ Chat ~ chatUsers', chatUsers.filter((el) => el.id !== user.id));
  return (
    <div style={{ margin: 'auto',
      paddingTop: '30px' }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message" style={{ textAlign: 'center', marginBottom: '1%', backgroundColor: '#D1DEEF', borderRadius: '8px' }}>Чат</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className="asfsf">
        <Grid item xs={3} className="asfasf">
          <ChatUserId user={user} />
          <Divider />
          {chatUsers.filter((el) => el.id !== user.id).map(
            (el) => <OtherUser key={el.id} user={el} />
          )}
        </Grid>
        <Grid item xs={9}>
          <List
            className="sagsg"
            style={{ overflowY: 'scroll',
              position: 'fixed',
              height: '60%',
              width: '100%' }}
          >

            {messages.map((el) => ((el.id === user.id)
              ? <IdMessage key={el.msId} message={el} />
              : <OtherMessage key={el.msId} message={el} />))}

            {/* {messages.filter((el) => el.id === user.id).map(
              (el) => <IdMessage key={el.msId} message={el} />
            )}

            {messages.filter((el) => el.id !== user.id).map(
              (el) => <OtherMessage key={el.msId} message={el} />
            )} */}

          </List>
          <Divider />
          <Grid container style={{ paddingTop: '80%', paddingBottom: '2%', paddingRight: '2%' }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                value={input}
                onChange={inputHAndler}
                label="Введите сообщение.."
                fullWidth
                onKeyDown={onKeyDown}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add" onClick={submitHandler}><SendIcon /></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;

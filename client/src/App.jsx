import {
  Box, createTheme, Stack, ThemeProvider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Components/AddBar/Sidebar/Sidebar';
import Feed from './Components/Feed/Feed';
import Rightbar from './Components/AddBar/Rightbar/Rightbar';
import Navbar from './Components/AddBar/Navbar/Navbar';
import Add from './Components/Add/Add';
import Signin from './Components/Auth/Signin/Signin';
import Signup from './Components/Auth/Signup/Signup';
import Loading from './Components/Different/Loading/Loading';
import AddPost from './Components/AddPost/AddPost';
import './App.css';
import { userCheck } from './Redux/actions/userActions';
import { socketInit } from './Redux/actions/wsActions';
import Chat from './Components/Chat/Chat';
import MyTape from './Components/MyTape/MyTape';
import MyFavorites from './Components/MyFavorites/MyFavorites';
import PostDetails from './Components/PostDetails.jsx/PostDetails';

export default function App() {
  const [mode, setMode] = useState('light');
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });

  useEffect(() => {
    if (user.id) {
      dispatch(socketInit());
    }
  }, [user]);

  useEffect(() => {
    dispatch(userCheck());
  }, []);

  return (
    <>
      {!user.loading ? (
        <ThemeProvider theme={darkTheme}>
          <Box bgcolor="background.default" color="text.primary">
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between" style={{ position: 'relative' }}>
              <Sidebar setMode={setMode} mode={mode} />
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/popular" element={<h1>popular</h1>} />
                <Route path="/new" element={<h1>Новые посты</h1>} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/addpost" element={<AddPost />} />
                <Route path="/favorite" element={<MyFavorites />} />
                <Route path="/mytape" element={<MyTape />} />
                <Route path="/editmypost/:id" element={<AddPost />} />
                <Route path="/post/:id" element={<PostDetails />} />
                <Route path="/login" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
              <Rightbar />
            </Stack>
            <Add />
          </Box>
        </ThemeProvider>
      ) : <Loading />}
    </>
  );
}

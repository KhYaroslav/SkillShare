import {
  Box, createTheme, Stack, ThemeProvider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Sidebar from './Components/AddBar/Sidebar/Sidebar';
import Feed from './Components/Feed/Feed';
import Rightbar from './Components/AddBar/Rightbar/Rightbar';
import Navbar from './Components/AddBar/Navbar/Navbar';
import Add from './Components/Add/Add';
import Signin from './Components/Auth/Signin/Signin';
import Signup from './Components/Auth/Signup/Signup';
import Loading from './Components/Different/loading/Loading';
import News from './Components/News/News';

import './App.css';
import { userCheck } from './Redux/actions/userActions';

function App() {
  const [mode, setMode] = useState('light');
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userCheck());
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor="background.default" color="text.primary">
        <>
          <>
            {!user.loading ? (
              <>
                {(location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/mytape' && location.pathname !== '/favorite') && (
                  <>
                    <Navbar />
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                      <Sidebar setMode={setMode} mode={mode} />
                      <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/popular" element={<h1>popular</h1>} />
                        <Route path="/new" element={<h1>Новые посты</h1>} />
                        <Route path="/news" element={<News />} />
                      </Routes>
                      <Rightbar />
                    </Stack>
                    <Add />
                  </>
                )}
              </>
            ) : <Loading />}
          </>
          <>
            <Routes>
              <Route path="/login" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mytape" element={<h1>Моя лента</h1>} />
              <Route path="/favorite" element={<h1>Избранное</h1>} />
            </Routes>
          </>
        </>
      </Box>
    </ThemeProvider>
  );
}

export default App;

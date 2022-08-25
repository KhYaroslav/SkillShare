import {
  Home,
  ModeNight,
} from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CropDinIcon from '@mui/icons-material/CropDin';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './Sidebar.css';

import { logoutUser } from '../../../Redux/actions/userActions';

const Sidebar = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const alarm = useSelector((state) => state.alarm);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const location = useLocation();
  return (
    <Box flex={1} p={2} sx={{ maxWidth: '20%' }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => navigate('/')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Домой" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => navigate('/popular')}>
              <ListItemIcon>
                <ShowChartIcon />
              </ListItemIcon>
              <ListItemText primary="Популярные" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => navigate('/new')}>
              <ListItemIcon>
                <ScatterPlotIcon />
              </ListItemIcon>
              <ListItemText primary="Новые" />
            </ListItemButton>
          </ListItem>
          {user.id
            && (
              <>
                <ListItem disablePadding>
                  <ListItemButton component="a" onClick={() => navigate('/mytape')}>
                    <ListItemIcon>
                      <CropDinIcon />
                    </ListItemIcon>
                    <ListItemText primary="Моя лента" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" onClick={() => navigate('/question')}>
                    <ListItemIcon>
                      <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Вопросы" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" onClick={() => navigate('/favorite')}>
                    <ListItemIcon>
                      <StarBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Избранное" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" onClick={() => navigate('/stats')}>
                    <ListItemIcon>
                      <QueryStatsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Статистика" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" onClick={() => navigate('/chat')}>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    {alarm ? <ListItemText className="alarm" primary="Чат" />
                      : <ListItemText primary="Чат" />}
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" onClick={() => navigate('/live')}>
                    <ListItemIcon>
                      <ConnectedTvIcon />
                    </ListItemIcon>
                    <ListItemText primary="LiveCoding" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" onClick={logoutHandler}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Выйти" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
export default Sidebar;

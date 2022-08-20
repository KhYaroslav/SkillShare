import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,

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
import { useSelector, useDispatch } from 'react-redux';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { logoutUser } from '../../../Redux/actions/userActions';

const Sidebar = ({ mode, setMode }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
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
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => navigate('/news')}>
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary="Новости" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => navigate('/mytape')}>
              <ListItemIcon>
                <CropDinIcon />
              </ListItemIcon>
              <ListItemText primary="Моя лента" />
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
            <ListItemButton component="a" onClick={logoutHandler}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Выйти" />
            </ListItemButton>
          </ListItem>
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

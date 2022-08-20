import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from './NewsCard';
import { getNews } from '../../Redux/actions/newsActions';

export default function News() {
  const [viewNews, setViewNews] = useState([]);

  const news = useSelector((state) => state.news);

  console.log('------->', news);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, []);
  return (
    <>
      <Typography variant="h6" fontWeight={100} mt={2}>
        IT новости
      </Typography>
      {viewNews.map((el) => <NewsCard key={el.url} news={el} />)}
    </>
  );
}

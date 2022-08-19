import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Typography,
} from '@mui/material';
import NewsCard from './NewsCard';

export default function News() {
  const [viewNews, setViewNews] = useState([]);

  useEffect(() => {
    axios('/news/v1').then((res) => setViewNews(res.data));
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

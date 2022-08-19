import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

export default function News() {
  const [viewNews, setViewNews] = useState([]);

  useEffect(() => {
    axios('/news/v1').then((res) => setViewNews(res.data));
  }, []);
  return (
    <>
      {viewNews.map((el) => <NewsCard key={el.url} news={el} />)}
    </>
  );
}

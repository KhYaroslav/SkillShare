const express = require('express');
const cheerio = require('cheerio');

const axios = require('axios');

const router = express.Router();

router.get('/v1', async (req, res) => {
  const news = () => {
    const titleArr = [];
    const urlArr = [];
    const result = [];

    return axios.get('https://habr.com/ru/news/').then((html) => {
      const $ = cheerio.load(html.data);

      $('div.tm-article-snippet > h2').each((i, elem) => {
        titleArr.push(`${$(elem).text()}`);
      });

      $(
        'div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > a',
      ).each((i, elem) => {
        urlArr.push(`https://habr.com${$(elem).attr('href')}`);
      });

      for (let i = 0; i < titleArr.length; i++) {
        const obj = {};
        obj.title = titleArr[i];
        obj.url = urlArr[i];
        result.push(obj);
      }
      return result;
    });
  };
  const data = await news();
  res.json(data);
});

module.exports = router;

const express = require('express');
const cheerio = require('cheerio');

const axios = require('axios');

const router = express.Router();

router.get('/v1', async (req, res) => {
  const news = () => {
    const titleArr = [];
    // let imgArr = []
    // let textArr = []
    const urlArr = [];
    const result = [];

    return axios.get('https://habr.com/ru/news/').then((html) => {
      const $ = cheerio.load(html.data);

      $('div.tm-article-snippet > h2').each((i, elem) => {
        titleArr.push(`${$(elem).text()}`);
      });

      //   $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div.tm-article-snippet__cover.tm-article-snippet__cover_cover > img').each((i, elem) => {
      //     imgArr.push(`${$(elem).first('img').attr('src')}`)
      // })

      //   $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div:nth-child(2) > div:nth-child(1) > div > p:nth-child(1)').each((i, elem) => {
      //     textArr.push(`${$(elem).text()}`)
      //   })

      $(
        'div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > a',
      ).each((i, elem) => {
        urlArr.push(`https://habr.com/${$(elem).attr('href')}`);
      });

      // console.log('1', titleArr.length);
      // console.log('2', imgArr.length);
      // console.log('3', textArr.length);
      // console.log('4', urlArr.length);

      for (let i = 0; i < titleArr.length; i++) {
        const obj = {};
        obj.title = titleArr[i];
        // obj.img = imgArr[i]
        // obj.text = textArr[i]
        obj.url = urlArr[i];
        result.push(obj);
      }

      return result;
      // console.log(titleArr, imgArr, textArr, urlArr);
    });
  };
  const data = await news();
  res.json(data);
  // res.sendStatus(200);
});

module.exports = router;

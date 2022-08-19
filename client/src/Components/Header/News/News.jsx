const axios = require('axios')
const cheerio = require('cheerio')

let titleArr = []
// let imgArr = []
// let textArr = []
let urlArr = []
let result = []

axios.get('https://habr.com/ru/news/').then(html => {
    const $ = cheerio.load(html.data)

    $('div.tm-article-snippet > h2').each((i, elem) => {
        titleArr.push(`${$(elem).text()}`)
    })

  //   $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div.tm-article-snippet__cover.tm-article-snippet__cover_cover > img').each((i, elem) => {
  //     imgArr.push(`${$(elem).first('img').attr('src')}`)
  // })

  //   $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div:nth-child(2) > div:nth-child(1) > div > p:nth-child(1)').each((i, elem) => {
  //     textArr.push(`${$(elem).text()}`)
  //   })     
    
    $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > a').each((i, elem) => {
      urlArr.push(`${$(elem).attr('href')}`)
    })


    // console.log('1', titleArr.length);
    // console.log('2', imgArr.length);
    // console.log('3', textArr.length);
    // console.log('4', urlArr.length);

    for (let i = 0; i < titleArr.length; i++) {
      const obj = {}
      obj.title = titleArr[i]
      // obj.img = imgArr[i]
      // obj.text = textArr[i]
      obj.url = urlArr[i]
      result.push(obj) 
    }
  
    console.log(result);

    // console.log(titleArr, imgArr, textArr, urlArr);
  })




  


// const res = await getInfo()


// let result = [];

// for (let i = 0; i < titleArr.length; i++) {
//   const obj = {}
//   obj.title = titleArr[i]
//   obj.img = imgArr[i]
//   obj.text = textArr[i]
//   obj.url = urlArr[i]
//   result.push(obj)
// }

// console.log(result);










// // Картинка
// axios.get('https://habr.com/ru/news/').then(html => {
//     const $ = cheerio.load(html.data)
//     let img = ''
//     $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div.tm-article-snippet__cover.tm-article-snippet__cover_cover > img').each((i, elem) => {
//         img += `${$(elem).first('img').attr('src')}\n`
//     })
//     console.log(img);
// })

// // Ссылка
// axios.get('https://habr.com/ru/news/').then(html => {
//     const $ = cheerio.load(html.data)
//     let url = ''
//     $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > a').each((i, elem) => {
//         url += `${$(elem).attr('href')}\n`
//     })
//     console.log(url);
// })





// ДЛЯ КАРТИНОК
// axios.get('https://habr.com/ru/news/').then(html => {
//     const $ = cheerio.load(html.data)
//     let text = ''
//     $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div.tm-article-snippet__cover.tm-article-snippet__cover_cover > img').each((i, elem) => {
//         text += `${$(elem).text()}\n`
//     })
//     console.log(text);
// })





// #\36 83492 > div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div.tm-article-snippet__cover.tm-article-snippet__cover_cover > img

// #\36 83492 > div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > a

// #\36 83492 > div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div.tm-article-snippet__cover.tm-article-snippet__cover_cover > img


// Заголовок, текст

// axios.get('https://habr.com/ru/news/').then(html => {
//     const $ = cheerio.load(html.data)
    // const arr1 = await $('div.tm-article-snippet > h2') 
    // $('div.tm-article-snippet > h2').each((i, elem) => {
    //     arr1.push(`${$(elem).text()}`)
    // })

    // $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div:nth-child(2) > div:nth-child(1) > div > p:nth-child(1)').each((i, elem) => {
    // arr2.push(`${$(elem).text()}`)
    // })

//     console.log(arr1, arr2);
// })













// let arr2 = []

// axios.get('https://habr.com/ru/news/').then(html => {
//     const $ = cheerio.load(html.data)

//     $('div.tm-article-snippet > div.tm-article-body.tm-article-snippet__lead > div:nth-child(2) > div:nth-child(1) > div > p:nth-child(1)').each((i, elem) => {
//       arr2.push(`${$(elem).text()}`)
//     })
//     // console.log(text);
// })


// arr1.forEach((el) => arr2.forEach((item) => result.push({title: el, text: item})))

// console.log(result);


// ДЛЯ КАРТИНОК
// axios.get('https://habr.com/ru/news/').then(html => {
//     const $ = cheerio.load(html.data)
//     let text = ''
//     $('#app > div.tm-layout__wrapper > div.tm-layout > main > div > div > div > div.tm-page__main.tm-page__main_has-sidebar > div > div:nth-child(3) > div.tm-articles-list').each((i, elem) => {
//         text += `${$(elem).text()}\n`
//     })
//     console.log(text);
// })


// const axios = require('axios')
// const cheerio = require('cheerio')

// axios.get('https://kakoyprazdnik.com').then(html => {
//     const $ = cheerio.load(html.data)
//     let text = ''
//     $('#bloktxt > h4').each((i, elem) => {
//         text += `${$(elem).text()}\n`
//     })
//     console.log(text);
// })


// #\36 83448 > div.tm-article-snippet > h2


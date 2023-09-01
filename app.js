const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express()
const port = 3001

const URL = 'https://dribbble.com/shots/popular/web-design'

//midlleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


  app.get('/data/:cant', async (req, res) => {
    try {
      const cant = req.params.cant
      console.log(cant)
      const response = await axios.get(URL);
      const html = response.data;
      const $ = cheerio.load(html);
      const posts = [];
  
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      $('.shot-thumbnail')
        .slice(0, cant)
        .each(async (_, element) => {
          const title = $(element).find('.shot-title').text().trim();
          const url = 'https://dribbble.com' + $(element).find('.dribbble-link').attr('href');
          const imageUrl = $(element).find('.shot-thumbnail img').attr('data-src');
    
  
          posts.push({
            title,
            url,
            imageUrl,
          });
       
      });
    
    await browser.close();
  
      res.send(posts);
    } catch (error) {
      console.error('Error fetching Dribbble popular posts:', error);
      return [];
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
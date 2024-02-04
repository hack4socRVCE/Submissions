// utils/scrapeAmazonProduct.js
import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse } from 'next/server';

async function scrapeZeptoProduct(url: string) {
  try {
    var htmlx;
    const response = await fetch(url).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(html => {
      htmlx = html;
      // Now you can work with the HTML content
    });
    const $ = cheerio.load(htmlx!);
    const title = $('h1.XUM3wW').text().trim();
    const price = $('h4.Md1FKI').text().trim();
    console.log(title, price)
    return { title, price };
    
  } catch (error:any) {
    return NextResponse.json({error: error, message: error.message}, {status: 500});

  }
}

export default scrapeZeptoProduct;

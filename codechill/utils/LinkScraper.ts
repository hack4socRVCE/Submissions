import { NextRequest, NextResponse } from 'next/server';
import scrapeAmazonProduct from '@/utils/AmazonScraper';
import scrapeFlipkartProduct from '@/utils/FlipkartScraper';
import Product from '@/app/Product/page';
import React from 'react';
import scrapeZeptoProduct from './ZeptoScraper';
import scrapeBigBasketProduct from './BigBasketScraper';


const LinkScraper = async (productLink: string) => {
    console.log(productLink)
    var productInfo;
    try {
        if (productLink.startsWith('https://www.amazon.in/')) {
          productInfo = await scrapeAmazonProduct(productLink);
          console.log(productInfo)
          if(!productInfo) return NextResponse.json({ error: 'Failed to fetch Amazon product information' }, {status: 500});;
        }else if(productLink.startsWith('https://www.flipkart.com/')){
          productInfo = await scrapeFlipkartProduct(productLink)
          console.log(productInfo)
          if(!productInfo) return NextResponse.json({ error: 'Failed to fetch Flipkart product information' }, {status: 500});
        }else  if (productLink.startsWith('https://www.zeptonow.com/')) {
          productInfo = await scrapeZeptoProduct(productLink);
          console.log(productInfo)
          if(!productInfo) return NextResponse.json({ error: 'Failed to fetch Amazon product information' }, {status: 500});;
        }else if(productLink.startsWith('https://www.bigbasket.com/')){
          productInfo = await scrapeBigBasketProduct(productLink)
          console.log(productInfo)
          if(!productInfo) return NextResponse.json({ error: 'Failed to fetch Amazon product information' }, {status: 500});
        }else{
          return NextResponse.json({error: 'Provide valid amazon.in or flipkart.com links'}, {status:515})
        }
      } catch (error) {
        return NextResponse.json({error: error})
      }
    console.log(productInfo)
  return productInfo
}

export default LinkScraper
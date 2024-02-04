import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  GoogleGenerativeAIStream,
  StreamingTextResponse,
} from "ai";
import { NextRequest, NextResponse } from 'next/server';
import LinkScraper from '@/utils/LinkScraper';
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  console.log(prompt)
  // console.log(link)
  // if (!link) {
  //   return NextResponse.json({ error: 'Missing Link Parameter' },{status: 400});
  // }

  // type scrapedData= {
  //   title: string;
  //   price: string;
  // }

  // const {title, price} = await LinkScraper(link) as scrapedData;

  // // Extract the `prompt` from the body of the request
  // console.log(title)
//   const prompt = `# Product Analysis

//   In a highly efficient, consistent and detailed manner, analyze the product (${title}) &  provide a comprehensive analysis:.
  
//   ## Product Overview
  
//   Present a brief product description and its approximate calorie content along with the product category. Only if the product is a medicine then also provide a brief description of its medicinal properties with medicine as the category. also share the price of ${price}
  
//   ## Ingredients Breakdown
  
//   Furnish an exact and detailed breakdown of all ingredients, including their amounts and units. Don't miss even a single ingredient and include ingredient even with smallest concetration. present it as array in the form of {ingredient_name: ingredient_amount || null, ingredient_name: ingredient_amount || null, etc...}.
  
//   ## Harmful Ingredients and Side Effects
  
//   Include each and every harmful ingredients with associated side effects of the ingredients to the human body and recommended daily limits for each.
  
//   ## Product Tags
  
//   Integrate relevant tags such as vegan, vegetarian, cruelty-free, paraben-free, sulphur-free, etc., according to the features of the respective product.
  
//   ##Reviews Sentiment Analysis

//   Analzye the top 20 postive and top 20 negative reviews of the product and provide a collective sentiment score out of 100 and also summarize all 20 postive and all 20 negative reviews in a paragraph respectively.

//   ## Safety Score Calculation
  
//   Efficiently calculate an overall safety score out of 100 using the following formula:

// ### Explanation of the Formula:

// - Deduct 10 points for each harmful ingredient present in the product.
// - Deduct 5 points for each associated side effect.
// - Add 2 points for each relevant tag.

// ## Alternative Recommendations

// Recommend three alternative product names with safety scores. Ensure the alternatives have equal or higher safety scores than the original product. Provide a concise argument for each alternative.

// ---

// **Note:**anything which can eaten like chocolates, Atta, Dry Fruits, Dairy Products, Supliments, snacks, vegetables, cold drinks, spices, namkeen, Juices, Breads, Meat,   etc. then it comes under consumables or is applied to the body then it comes under applicable like oils, shampoo's, soaps, skincare, makeup, haircare, bodycare, fragnances, nailcare, dentalcare, body cleanser,  etc. and must be analysed. Things which won't make into consumables and applicables would be electronics, clothings, books, furnishings, toys, supplies etc.. If something is non-applicable then use null for it. This system should be designed for speed and consistency, ensuring accurate results without missing any detail. The analysis and recommendation process should be optimized for performance, providing users with a seamless and swift experience. Provide the answer in JSON Format
//   `;
  // The Product is ${title} with the following ${link},give a simple description about the product and also give approximate calories it has, provide a detailed accurate and exact breakdown of its ingredients and make sure to not not miss any ingredient ,also each and every potential harmful ingredient to the human body, associated side effects to the human body and nothing else with a bit of description to the human body of each and only harmful ingredients and not all the ingredients, recommended daily limits for each harmful ingredients, calculate  an overall safety score out of 100, and relevant tags such as vegan, vegetarian, cruelty-free, paraben-free, sulphur free etc. likewise according to  the respective product . Ensure the system responds only if the product is related to the human body, either for eating(consumables) or can be applied(applicables) like anything which we can eat like edibles, food, etc, and anything which we can apply like cosmetics, creams, shampoos, oils etc. . If the product is not related to the human body like electronic gadgets, books etc then, return a error message with error as the key but be fully sure that it's not a consumable or applicable product for the human body by rechecking, stating that it's not a product that can be consumed or applied and also answer why it's not. Additionally, recommend 3 alternative product names along with safety score having highest or higher safety score and also provide a short argument of why it's good, also provides it's working amazon.in's link. Provide the response in JSON format.
 
  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
 
  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
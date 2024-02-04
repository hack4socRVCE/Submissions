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
  const { link, filters } = await req.json();
  console.log(link)
  if (!link) {
    return NextResponse.json({ error: 'Missing Link Parameter' },{status: 400});
  }

  type scrapedData= {
    title: string;
    price: string;
  }

  const {title, price} = await LinkScraper(link) as scrapedData;

  // Extract the `prompt` from the body of the request
  console.log(title)
  const prompt = `You are a master of ingredient analyzer and I am giving you a task. Show enthusiasm and In a highly efficient, consistent, and detailed manner, analyze the product title '${title}' and provide a comprehensive analysis: The analysis should contain Product Overview(Present a brief product title with 'product_title' as the key and product description with 'product_description' as the key and its approximate calorie content with 'calorie' as the key along with the product category with 'category' as the key. Only if the product is a medicine then also provide a brief description of its medicinal properties with 'medicinal_properties' as the key and with medicine as the category.Ingredients Breakdown(Furnish an exact and detailed breakdown of all ingredients , including their amounts. You cannot miss even a single ingredient and include ingredients even with the smallest concentration. present it as array in the form of { ingredient_name: ingredient_amount || null, ingredient_name: ingredient_amount || null, etc...}), Harmful Ingredients and Side Effects({#if (safety_score >= 80)}}(This section is hidden as the safety score is equal to or more than 80){{else}}(Include each and every harmful ingredients with a paragraph for the associated side effects of the ingredients to the human body and recommended daily limits for each of the ingredients.){{/if}},Product Tags(Integrate relevant tags such as vegan, vegetarian, cruelty-free, paraben-free, sulphur-free, etc., according to the features of the respective product),Reviews Sentiment Analysis(Analyse the top 20 positive and top 20 negative reviews of the product and provide a collective sentiment score out of 100 and also summarize all 20 positive and all 20 negative reviews in a paragraph respectively),Safety Score Calculation(Efficiently calculate an overall safety score out of 100 using the following formula: safety_score_formula : Overall Safety Score = 100 - (Sum of Severity Points for Harmful Ingredients) - (5 * Number of Side Effects) + (2 * Number of Relevant Tags) + (1 * Number of Allergens) - (3 * Number of High-Risk Ingredients) If the product contains ${filters} as the ingredient then set the safety score as zero.), Alternative Recommendations products(Recommend three alternative product of indian market for the original product with safety scores, If the product safety score is zero then recommend products which does not contain ${filters} as ingredient. Please make sure that the alternatives have equal or higher safety scores than the original product. Provide a concise argument for each alternative). If you won't able to find ingredients of a particular product, try to fetch ingredients from any trusted websites. make sure that anything which can eaten like chocolates, Atta, Dry Fruits, Dairy Products, Supplements, snacks, vegetables, cold drinks, spices, namkeens, Juices, Bread, Meat etc. then it comes under consumables or is applied to the body then it comes under applicable like oils, shampoo's, soaps, skincare, makeup, haircare, body care, fragrances, nailcare, dental care, body cleanser,  etc. and must be analysed. Things that won't make it into consumables and applicable would be electronics, clothing, books, furnishings, toys, supplies, etc. If something is non-applicable then use null for it. This system should be designed for speed and consistency, ensuring accurate results without missing any detail. The analysis and recommendation process should be optimized for performance, providing users with a seamless and swift experience. please provide the answer in JSON Format, with alignments.
  `;
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
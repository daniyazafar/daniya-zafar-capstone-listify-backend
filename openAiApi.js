import OpenAI  from "openai";
import 'dotenv/config';

const openai = new OpenAI({apiKey: process.env.OPEN_AI_API_KEY});

    async function categorizeItems(items) {
        const prompt = `Categorize the following list of items:
            1. If the item is a food-related item, categorize it into one of the following subcategories: Produce, Dairy, Meat & Poultry, Seafood, Bakery, Deli, Frozen Foods, Snacks, Breakfast & Cereal, Beverages, Canned Goods, Condiments & Spices, Pasta & Rice, Baking Supplies, Soups & Broths, International Foods, Candy & Sweets, Chips & Crackers, Bulk Foods, Organic Foods, Gourmet & Specialty Foods.
            2. For non-food items, categorize them into one of these categories: Household & Cleaning, Pharmacy & Health, Personal Care & Beauty, Baby & Kids, Pets, Home & Furniture, Outdoor & Garden, Automotive, Electronics, Clothing, Shoes & Accessories, Fitness & Sports, Office, School & Crafts, Toys, Games & Entertainment, Seasonal, Holiday & Party, Safety & Security.
            Please do not add any "Food" and "non-Food" categories. Only use the categories mentioned above.
            Each item is provided on a new line and should be treated as a single unit. **Do not split items that have spaces, such as 'dishwasher pods' or 'cream cheese'.**
            The items are:
            ${items.join('\n')}.

            Provide the result **only as a valid JSON object** without any additional formatting or explanations.`;

    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "You are a very professional assistant focused on categorization."},
            {"role": "user", "content": prompt}
        ],
        model: "gpt-3.5-turbo",  
    });

    return (completion.choices[0].message.content);
}

export { categorizeItems };
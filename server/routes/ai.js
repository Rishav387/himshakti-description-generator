const express = require("express");
const router = express.Router();

const TONE_INSTRUCTIONS = {
  premium:
    "Write in an upscale, aspirational tone. Emphasise quality, craftsmanship, and the premium Himalayan origin. Use evocative language that appeals to urban buyers willing to pay more for authentic products.",
  traditional:
    "Write in a warm, authentic tone. Highlight the traditional recipe, heritage, and handcrafted nature. Evoke nostalgia and trust in time-tested methods passed down through generations.",
  "health-focused":
    "Write in a clean, informative tone. Emphasise natural ingredients, nutritional benefits, absence of preservatives, and health advantages. Use clear, benefit-driven language that appeals to health-conscious buyers.",
};

/**
 * POST /api/ai/generate-description
 * Generates a product description using Groq API (llama3-8b-8192 model).
 *
 * Request body:
 * {
 *   productName: string,
 *   ingredients: string,
 *   weight: string,
 *   features: string,
 *   tone: 'premium' | 'traditional' | 'health-focused'
 * }
 */
router.post("/generate-description", async (req, res) => {
  const { productName, ingredients, weight, features, tone } = req.body;

  if (!productName || !ingredients || !weight || !features || !tone) {
    return res.status(400).json({
      success: false,
      error: "All fields are required: productName, ingredients, weight, features, tone",
    });
  }

  if (!TONE_INSTRUCTIONS[tone]) {
    return res.status(400).json({
      success: false,
      error: "Invalid tone. Must be one of: premium, traditional, health-focused",
    });
  }

  const toneInstruction = TONE_INSTRUCTIONS[tone];

  // Prompt v3 — best performing (see PROMPTS.md)
  const prompt = `You are a professional e-commerce copywriter specialising in Indian artisanal and natural food products.

Write a compelling product description for an e-commerce listing (Amazon/Flipkart) for a product from HimShakti Food Processing Unit — a small Himalayan food business from Uttarakhand, India.

Product Details:
- Product Name: ${productName}
- Key Ingredients: ${ingredients}
- Weight/Size: ${weight}
- Key Features: ${features}

Tone Instructions: ${toneInstruction}

Requirements:
- Length: 80 to 120 words exactly
- Start with a strong opening hook — do NOT start with the product name
- Include one relevant keyword phrase for search visibility
- End with a subtle call to action
- Do NOT use generic phrases like "high quality" or "best product"
- Make it specific to Uttarakhand or Himalayan origin where appropriate
- Do NOT use bullet points — write in flowing prose only

Output ONLY the product description. No headings, labels, or extra commentary.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a professional e-commerce copywriter for Indian artisanal food products.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Groq API error:", response.status, errData);

      if (response.status === 429) {
        return res.status(429).json({
          success: false,
          error: "AI rate limit reached. Please wait a moment and try again.",
        });
      }

      return res.status(500).json({
        success: false,
        error: "Failed to generate description. Please try again.",
      });
    }

    const data = await response.json();
    const description = data.choices?.[0]?.message?.content?.trim();

    if (!description) {
      throw new Error("Empty response from Groq API");
    }

    res.status(200).json({
      success: true,
      description,
      tone,
      productName,
      wordCount: description.split(/\s+/).filter(Boolean).length,
    });
  } catch (err) {
    console.error("Groq API error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to generate description. Please try again.",
    });
  }
});

module.exports = router;

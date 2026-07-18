# PROMPTS.md — AI Prompt Engineering Log

**Feature:** Product Description Generator for HimShakti Food Platform
**AI Model:** Google Gemini 1.5 Flash
**Backend Endpoint:** `POST /api/ai/generate-description`

---

## Prompt Variation 1 — Simple / Minimal

### Prompt Used
```
Write a product description for ${productName}.
Ingredients: ${ingredients}
Weight: ${weight}
Features: ${features}
Tone: ${tone}
Keep it under 100 words.
```

### Example Input
- Product Name: Himalayan Millet Crunch Bar
- Ingredients: Finger millet, jaggery, sesame, ghee
- Weight: 200g pack of 6
- Features: No preservatives, handmade, rich in iron
- Tone: health-focused

### Example Output
```
The Himalayan Millet Crunch Bar is a healthy snack made with finger millet,
jaggery, sesame, and ghee. It has no preservatives and is handmade. It is
rich in iron and comes in a 200g pack of 6 bars. Great for people who want
healthy snacks.
```

### Assessment
❌ Too generic and flat. Started with the product name directly. Used vague
phrases like "great for people who want healthy snacks." No Himalayan identity
or storytelling. Word count was fine but quality was poor.

---

## Prompt Variation 2 — Structured with Role

### Prompt Used
```
You are an e-commerce copywriter for Indian artisanal food products.

Write a product listing description for Amazon India for the following product:

Product: ${productName}
Ingredients: ${ingredients}
Weight: ${weight}
USPs: ${features}
Writing Style: ${tone}

Rules:
- 80-100 words
- Do not start with the product name
- Mention Uttarakhand or Himalayan origin
- No bullet points
```

### Example Input
Same as above (Millet Crunch Bar, health-focused)

### Example Output
```
Sourced from the Kumaon hills of Uttarakhand, these handcrafted millet bars
are made with stone-ground finger millet and raw jaggery — zero preservatives,
zero compromise. Rich in iron and naturally sweetened, they are the perfect
on-the-go snack for health-conscious families. Each 200g pack contains 6 bars,
shelf-stable for 3 months without any additives. A clean, nourishing choice
straight from the Himalayas.
```

### Assessment
✅ Much better. Good opening hook, mentions origin, no bullet points. However,
the tone was still somewhat generic and did not feel fully differentiated
between the three tone options. The word count was slightly inconsistent
across different inputs.

---

## Prompt Variation 3 — Detailed with Tone Instructions (Final / Best)

### Prompt Used
```
You are a professional e-commerce copywriter specialising in Indian artisanal
and natural food products.

Write a compelling product description for an e-commerce listing (Amazon/Flipkart)
for a product from HimShakti Food Processing Unit — a small Himalayan food
business from Uttarakhand, India.

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

Output ONLY the product description. No headings, labels, or extra commentary.
```

Where `toneInstruction` is dynamically selected:
- **Premium:** "Write in an upscale, aspirational tone. Emphasise quality, craftsmanship, and the premium Himalayan origin. Use evocative language that appeals to urban buyers willing to pay more for authentic products."
- **Traditional:** "Write in a warm, authentic tone. Highlight the traditional recipe, heritage, and handcrafted nature. Evoke nostalgia and trust in time-tested methods passed down through generations."
- **Health-Focused:** "Write in a clean, informative tone. Emphasise natural ingredients, nutritional benefits, absence of preservatives, and health advantages. Use clear, benefit-driven language that appeals to health-conscious buyers."

### Example Input
- Product Name: Himalayan Millet Crunch Bar
- Ingredients: Finger millet, jaggery, sesame, ghee
- Weight: 200g pack of 6
- Features: No preservatives, handmade, rich in iron, shelf stable 3 months
- Tone: health-focused

### Example Output
```
When clean nutrition meets Himalayan tradition, you get a snack worth reaching
for. Made in small batches in the Kumaon hills, these millet crunch bars combine
stone-ground finger millet with raw jaggery — naturally sweet, preservative-free,
and genuinely nourishing. A rich source of iron with no hidden additives, each
bar is slow-pressed by hand to preserve the goodness of every ingredient. Six
bars per pack, shelf-stable for three months. Real food, real origin — order
your HimShakti Millet Bar today.
```

### Assessment
✅✅ Best result across all three variations. The tone-specific instructions made
each output feel genuinely different depending on the selected tone. The
constraint "do NOT start with the product name" consistently produced stronger
opening hooks. Specifying "80 to 120 words exactly" kept outputs within a
usable length for e-commerce listings. The explicit ban on generic phrases like
"high quality" forced more specific and credible language. This version is used
in production.

---

## System Prompt / Role Used
```
You are a professional e-commerce copywriter specialising in Indian artisanal
and natural food products.
```

This role was embedded at the start of the user prompt rather than as a
separate system message, since Gemini 1.5 Flash handles role context well
within the user turn.

---

## Summary

| Variation | Approach | Quality | Chosen |
|---|---|---|---|
| V1 — Minimal | No role, no constraints | Poor — generic and flat | ❌ |
| V2 — Structured with Role | Role + basic rules | Good — better hooks and origin | ❌ |
| V3 — Detailed with Tone Instructions | Role + per-tone instructions + strict rules | Excellent — specific, varied, on-brand | ✅ |

**Winner: Prompt Variation 3** — The combination of explicit tone-specific
instructions, strict formatting constraints, and a ban on generic phrases
produced the most consistent and high-quality results across all three tones
and across different product types tested.

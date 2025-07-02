import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

router.post("/", async (req, res) => {
    const { description } = req.body;

    const prompt = `
Convert the following project description into a Mermaid flowchart:
---
${description}
---
Only return valid Mermaid code. Do not include any explanation or extra text.
There should be no square brackets or parentheses. If present, change the logic and rewrite it without them.
`;

    try {
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOGETHER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-ai/DeepSeek-V3",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.3,
                max_tokens: 1024,
                top_p: 1
            })
        });

        const data = await response.json();

        // 🔍 Log full API response for debugging
        console.log("📦 Together API Response:", JSON.stringify(data, null, 2));

        // Check for error field from Together
        if (data.error) {
            throw new Error(data.error.message || "Unknown Together API error");
        }

        if (!data.choices || !data.choices.length || !data.choices[0].message) {
            return res.status(500).json({
                error: "Together API gave empty or malformed response",
                raw: data
            });
        }

        const rawText = data.choices[0].message.content;
        const mermaidCode = rawText.replace(/```(mermaid)?/g, "").trim();

        console.log("🧠 Mermaid Flowchart Code together:", mermaidCode);

        res.json({ mermaidCode });
    } catch (error) {
        console.error("❌ Together AI Error:", error.message);
        res.status(500).json({
            error: "Failed to generate Mermaid code",
            details: error.message
        });
    }
});

export default router;

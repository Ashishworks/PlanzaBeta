// routes/gemini.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);;

router.post("/", async (req, res) => {
    const { description } = req.body;
    const prompt = `
Convert the following project description into a Mermaid flowchart:
---
${description}
---
Only return valid Mermaid code. Do not include any explanation or extra text.
and there should be no square brackets that parnethesis in the code if present change the logic and make it without parenthesis
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();
const mermaidCode = rawText.replace(/```(mermaid)?/g, "").trim();

        console.log("🔍 Mermaid Flowchart Code:", mermaidCode);

        res.json({ mermaidCode });
    } catch (error) {
        console.error("❌ Gemini Error:", error.message);
        res.status(500).json({ error: "Failed to generate Mermaid code" });
    }
});

export default router;

// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import geminiRouter from "./routes/gemini.js";
import togetherRouter from "./routes/together.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/generate-mermaid", geminiRouter);
app.use("/api/generate-mermaid-together", togetherRouter);

const PORT =5000 || process.env.PORT
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

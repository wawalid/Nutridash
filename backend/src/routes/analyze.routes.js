import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze", async (req, res) => {
  const { imageBase64, mimeType } = req.body;
  if (!imageBase64) return res.status(400).json({ error: "No se envió ninguna imagen." });

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });

    const result = await model.generateContent({
      content: [
        { image: { mimeType, imageBytes: imageBase64 } },
        { text: `Analiza esta imagen de comida y devuélveme un JSON con esta estructura:
{
  "name": "Nombre del plato o alimento",
  "calories": número (en kcal),
  "protein": número (en gramos),
  "carbs": número (en gramos),
  "fat": número (en gramos)
}
Sé preciso como un nutricionista profesional. No des explicaciones, solo responde con un JSON válido.` }
      ]
    });

    const text = result?.response?.candidates?.[0]?.content?.[0]?.text || result?.response?.text || "";
    const json = JSON.parse(text);
    res.json(json);

  } catch (error) {
    console.error("Error procesando la imagen:", error);
    res.status(500).json({ error: "Error interno al analizar la imagen." });
  }
});

export default router;

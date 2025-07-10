import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nutridash";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "fallback-secret-key";
export const PORT = process.env.PORT || 4000;

// Mensaje según la URI
if (MONGODB_URI.includes("mongodb+srv")) {
  console.log("🌐 Conectando a MongoDB Atlas...");
} else {
  console.log("🖥️ Conectando a MongoDB local...");
}


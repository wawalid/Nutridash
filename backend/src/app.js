import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import cors from 'cors';

// import authRoutes from "./routes/auth.routes.js";
// // import taskRoutes from "./routes/tasks.routes.js";
// import usersRoutes from "./routes/users.routes.js"
// import systemInfoRoutes from "./routes/system_info.routes.js";
import analyzeRoute from "./routes/analyze.routes.js";



const app = express();

// 👇 Añade aquí tu dominio de frontend en producción
const allowedOrigins = [
  "http://localhost:5173",
  "http://26.153.190.16:5173",
  // "http://192.168.1.146:5173",
  // "http://192.168.0.27:5173",
  // "https://front-production-aa1f.up.railway.app",
  // "https://frontend-render-cx1g.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("No permitido por CORS: " + origin));
    }
  },
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json({ limit: "10mb" })); // o más, según lo grande que sean tus imágenes
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use("/api", analyzeRoute);

// app.use("/api", authRoutes);
// app.use("/api", taskRoutes);
// app.use("/api", accessoryRoutes);
// app.use("/api", usersRoutes);
// app.use("/api", adminRoutes);
// app.use("/api", systemInfoRoutes);

export default app;

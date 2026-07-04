import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import chatRouter from "./src/routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/chat", chatRouter);

//health-check
app.get("/health", (req, res) => {
    res.json({
        status: "OK! ALL GOOD",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

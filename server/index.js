import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import chatRouter from "./src/routes/chat.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    }),
);
app.use(morgan("dev"));

app.use("/api/chat", chatRouter);

//health-check
app.get("/health", (req, res) => {
    res.send("All good");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

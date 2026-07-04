import express from "express";
import { getHiteshPersonaReply } from "../services/chat.service.js";

const chatRouter = express.Router();

chatRouter.post("/hitesh", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({ error: "message is required" });
        }

        const reply = getHiteshPersonaReply(message);

        return res.status(200).json({
            reply: "Hanji! Kaise hai Aap Sabhi",
        });
    } catch (error) {
        console.error("Internal Server Error : ", error.message);
        return res.status(500).json({
            error: "Something went wrong. Try again. ",
        });
    }
});

export default chatRouter;

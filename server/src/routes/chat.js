import express from "express";
import { getHiteshPersonaReply } from "../services/chat.service.js";

const chatRouter = express.Router();

chatRouter.post("/", async (req, res) => {
    try {
        const { message, history, personaId } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({ error: "message is required" });
        }

        if (!personaId || typeof personaId !== "string") {
            return res.status(400).json({ error: "personaId is required" });
        }

        const reply = await getHiteshPersonaReply(personaId, message, history);

        return res.status(200).json({
            reply,
        });
    } catch (error) {
        console.error("Internal Server Error : ", error.message);

        if (error.message.startsWith("Unknown personaId")) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({
            error: "Something went wrong. Try again. ",
        });
    }
});

export default chatRouter;

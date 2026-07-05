import OpenAI from "openai";
import HiteshPersona from "../personas/HiteshChoudhary.js";
import { getPersonaConfig } from "../personas/index.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

function isValidMessage(text) {
    return typeof text === "string" && text.trim().length > 0;
}

function trimHistory(history = [], maxMessages = 10) {
    if (!Array.isArray(history)) return [];
    return history.slice(-maxMessages);
}

export const getHiteshPersonaReply = async (
    personaId,
    userMessage,
    history = [],
) => {
    if (!isValidMessage(userMessage))
        throw new Error("userMessage must be a valid string");

    const persona = getPersonaConfig(personaId);
    const trimmedHistory = trimHistory(history);

    const messages = [
        {
            role: "system",
            content: persona.systemPrompt,
        },
        ...trimmedHistory,
        {
            role: "user",
            content: userMessage,
        },
    ];

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: persona.maxTokens,
        temperature: persona.temperature,
    });

    const reply = response.choices[0].message.content;
    if (!reply) {
        throw new Error("No reply return from OpenAI");
    }

    return reply.trim();
};

import OpenAI from "openai";
import HiteshPersona from "../personas/HiteshChoudhary.js";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

function isValidMessage(text) {
    return typeof text === "string" && text.trim().length > 0;
}

export const getHiteshPersonaReply = async (userMessage) => {
    if (!isValidMessage(userMessage))
        throw new Error("userMessage must be a valid string");

    const messages = [
        {
            role: "system",
            content: HiteshPersona.systemPrompt,
        },
        {
            role: "user",
            content: userMessage,
        },
    ];

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: HiteshPersona.maxTokens,
        temperature: HiteshPersona.temperature,
    });

    const reply = response.choices[0].message.content;
    if (!reply) {
        throw new Error("No reply return from OpenAI");
    }

    return reply.trim();
};

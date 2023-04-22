// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { chatType } from "@/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    messages: chatType | undefined;
    errorMessage?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method == "POST") {
        const { messages } = req.body;
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: messages,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.CHAT_GPT_API_KEY}`,
                    },
                }
            );
            console.log(response.data.choices[0]);
            return res
                .status(200)
                .json({ messages: response.data.choices[0].message });
        } catch (error) {
            res.status(500).json({
                errorMessage: `Internal Server Error:${error}`,
                messages: undefined,
            });
        }
    } else {
        return res
            .status(403)
            .json({ errorMessage: "Method Not Allowed", messages: undefined });
    }
}

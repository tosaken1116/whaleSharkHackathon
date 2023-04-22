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
        console.log("================================inif");
        const { messages } = req.body;
        console.log(messages);
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
            console.log("================================================");
            console.log(error);
            console.log("================================================");
            res.status(500).json({
                errorMessage: "Internal Server Error",
                messages: undefined,
            });
        }
    } else {
        return res
            .status(403)
            .json({ errorMessage: "Method Not Allowed", messages: undefined });
    }
}

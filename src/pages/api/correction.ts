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
                    messages: [
                        {
                            role: "user",
                            content:
                                "次の内容を理解したら「はい」と返答しあなたからの全ての返答がこれらを満たすようにしてください。次のリクエストからとある会議の音声をテキスト化されたメッセージを送ります。これらは音声認識によって取得された文字列です。日本語として不自然な部分を修正し、議事録としてmarkdown記法で議事録としてまとめてください。なお箇条書きをメインとして段落や章を適切に作ってください。返す文字列は今までの返答に追加する形でこちらから送られるメッセージに応じて適宜過去の議事録を編集しても構いません。ですがあなたがデータを提供してはいけません。日付は現在の日付を用いてください。また議事録に関係ないことも返信してはいけません",
                        },
                        {
                            role: "assistant",
                            content: "はい。よろしくお願いします。",
                        },
                        messages,
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.CHAT_GPT_API_KEY}`,
                    },
                }
            );
            return res
                .status(200)
                .json({ messages: response.data.choices[0].message });
        } catch (error) {
            console.log(error);
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

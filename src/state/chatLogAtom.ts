import { ChatLogAtomType } from "@/types";
import { atom } from "recoil";

export const chatLogAtom = atom<ChatLogAtomType>({
    key: "chatLogAtom",
    default: {
        chatLog: [
            {
                role: "user",
                content:
                    "次の内容を理解したら「はい」と返答しあなたからの全ての返答がこれらを満たすようにしてください。次のリクエストからとある会議の音声をテキスト化されたメッセージを送ります。これらは音声認識によって取得された文字列です。日本語として不自然な部分を修正し、議事録としてmarkdown記法で議事録としてまとめてください。なお箇条書きをメインとして段落や章を適切に作ってください。返す文字列は今までの返答に追加する形でこちらから送られるメッセージに応じて適宜過去の議事録を編集しても構いません。ですがあなたがデータを提供してはいけません。また議事録に関係ないことも返信してはいけません",
            },
            {
                role: "assistant",
                content: "はい。よろしくお願いします。",
            },
        ],
    },
});

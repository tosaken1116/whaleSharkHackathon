import { useUpdateMeetingMutation } from "@/generates/graphql";
import { useChatGPT, useLogModal } from "@/hooks";
import { meetingAtom } from "@/state/meetingAtom";
import MicIcon from "@mui/icons-material/Mic";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useRecoilValue } from "recoil";
const SpeechRecognitionComponent = () => {
    const { meetingId } = useRecoilValue(meetingAtom);
    const [isRecording, setIsRecording] = useState(false);
    const { errorHandle } = useLogModal();
    const { transcript } = useSpeechRecognition();
    const [tempRecordingText, setTempRecordingText] = useState("");
    const { data, error, getCorrectedText } = useChatGPT();
    const [count, setCount] = useState(0);
    const [updateMeetingLog] = useUpdateMeetingMutation({
        variables: {
            meetingId: meetingId,
            updateLog: data,
        },
        onError: (e) =>
            errorHandle({ message: `議事録の動機に失敗しました:${e}` }),
    });
    const handleListen = () => {
        if (isRecording) {
            SpeechRecognition.stopListening();
            setIsRecording(false);
        } else {
            SpeechRecognition.startListening({ continuous: true });
            setIsRecording(true);
        }
    };
    useEffect(() => {
        setTempRecordingText(transcript);
        setCount(count + 1);
        if (count % 20 == 2) {
            getCorrectedText(tempRecordingText);
            setTempRecordingText("");
        }
    }, [transcript]);
    useEffect(() => {
        if (error) {
            setTempRecordingText(data);
        } else {
            console.log(data);

            updateMeetingLog();
        }
    }, [data]);
    return (
        <Box>
            <IconButton
                onClick={handleListen}
                sx={{
                    color: isRecording ? "red" : "black",
                }}
            >
                <MicIcon />
            </IconButton>
            <Button
                onClick={() =>
                    getCorrectedText(
                        "約束を行けそう かもしれん わかんない 500番 行けてるのかどうかがわからん どっかどっか 何かを間違えてる 聞いて 今喋った 内容 全部取られてるんだよね 自分で作っといてないんやけど 前に更新されちゃダメ よ で 何がダメかを見ていきたいけど 取得の頻度というか あれが高い性能が高い データじゃないんですけど デート ステータス バッテ"
                    )
                }
            >
                click me!
            </Button>
            <p>{transcript}</p>
        </Box>
    );
};

export default SpeechRecognitionComponent;

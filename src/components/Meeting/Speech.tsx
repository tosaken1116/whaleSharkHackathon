import { useUpdateMeetingMutation } from "@/generates/graphql";
import { useChatGPT, useLogModal } from "@/hooks/client";
import { meetingAtom } from "@/state/meetingAtom";
import MicIcon from "@mui/icons-material/Mic";
import { Box, IconButton } from "@mui/material";
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
    const [updateMeetingLog] = useUpdateMeetingMutation({
        variables: {
            meetingId: meetingId,
            updateLog: data,
        },
        onError: (e) => {
            errorHandle({ message: `議事録の同期に失敗しました:${e}` });
        },
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
        getCorrectedText(tempRecordingText);
    }, [transcript]);
    useEffect(() => {
        if (error) {
            setTempRecordingText(data);
        } else {
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
            <p>{transcript}</p>
        </Box>
    );
};

export default SpeechRecognitionComponent;

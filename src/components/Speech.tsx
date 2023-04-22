import { useUpdateMeetingMutation } from "@/generates/graphql";
import { logModalAtom } from "@/state/logModalAtom";
import { meetingAtom } from "@/state/meetingAtom";
import MicIcon from "@mui/icons-material/Mic";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useRecoilState, useRecoilValue } from "recoil";
const SpeechRecognitionComponent = () => {
    const { meetingId } = useRecoilValue(meetingAtom);
    const [, setLogModalState] = useRecoilState(logModalAtom);
    const [isRecording, setIsRecording] = useState(false);
    const { transcript } = useSpeechRecognition();

    const [updateMeetingLog] = useUpdateMeetingMutation({
        variables: {
            meetingId: meetingId,
            updateLog: transcript,
        },
        onError: (e) => {
            setLogModalState({
                isOpen: true,
                message: `議事録の動機に失敗しました:${e}`,
                status: "error",
            });
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
        updateMeetingLog();
    }, [transcript]);
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

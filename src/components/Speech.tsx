import { useUpdateMeetingMutation } from "@/generates/graphql";
import { UseMeetingLogProps } from "@/types";
import { useEffect } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

const SpeechRecognitionComponent = ({ meetingId }: UseMeetingLogProps) => {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [updateMeetingLog] = useUpdateMeetingMutation({
        variables: {
            meetingId: meetingId,
            updateLog: transcript,
        },
    });
    const handleListen = () => {
        SpeechRecognition.startListening({ continuous: true });
    };
    const stopListen = () => {
        SpeechRecognition.stopListening();
    };
    useEffect(() => {
        updateMeetingLog();
    }, [transcript]);
    return (
        <div>
            <button onClick={handleListen}>Listen</button>
            <button onClick={stopListen}>Stop</button>
            <button onClick={resetTranscript}>reset</button>
            <p>{transcript}</p>
        </div>
    );
};

export default SpeechRecognitionComponent;

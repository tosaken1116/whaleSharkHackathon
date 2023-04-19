import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

const SpeechRecognitionComponent = () => {
    const { transcript, resetTranscript } = useSpeechRecognition();

    const handleListen = () => {
        SpeechRecognition.startListening({ continuous: true });
    };
    const stopListen = () => {
        SpeechRecognition.stopListening();
    };

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

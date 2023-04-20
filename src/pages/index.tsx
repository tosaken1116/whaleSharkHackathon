import MeetingLog from "@/components/MeetingLog";
import SpeechRecognitionComponent from "@/components/Speech";
import { useAuthentication } from "@/hooks";

const Home = () => {
    const { login } = useAuthentication();
    const meetingId = "hoge";
    return (
        <>
            <button onClick={() => login()}>click me!</button>
            <SpeechRecognitionComponent meetingId={meetingId} />
            <MeetingLog meetingId={meetingId} />
        </>
    );
};
export default Home;

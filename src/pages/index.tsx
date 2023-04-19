import SpeechRecognitionComponent from "@/components/Speech";
import { useAuthentication } from "@/hooks";

const Home = () => {
    const { login } = useAuthentication();
    return (
        <>
            <button onClick={() => login()}>click me!</button>
            <SpeechRecognitionComponent />
        </>
    );
};
export default Home;

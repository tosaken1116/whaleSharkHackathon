import { useAuthentication } from "@/hooks";

const Home = () => {
    const { login } = useAuthentication();
    return (
        <>
            <button onClick={() => login()}>click me!</button>
        </>
    );
};
export default Home;

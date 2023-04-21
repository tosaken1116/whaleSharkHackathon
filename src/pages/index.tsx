import CreateRoom from "@/components/CreateRoom";
import DeleteRoom from "@/components/DeleteRoom";
import { useAuthentication } from "@/hooks";

const Home = () => {
    const { login } = useAuthentication();
    return (
        <>
            <button onClick={() => login()}>click me!</button>
            <CreateRoom />
            <DeleteRoom />
        </>
    );
};
export default Home;

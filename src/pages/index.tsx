import CreateRoom from "@/components/CreateRoom";
import DeleteRoom from "@/components/DeleteRoom";
import Header from "@/components/Header";
import InviteUserForm from "@/components/InviteUserForm";

const Home = () => {
    return (
        <>
            <Header />
            <div>
                <CreateRoom />
                <DeleteRoom />
                <InviteUserForm />
            </div>
        </>
    );
};
export default Home;

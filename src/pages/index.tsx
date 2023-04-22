import Header from "@/components/Common/Header";
import CreateRoom from "@/components/Room/CreateRoom";
import DeleteRoom from "@/components/Room/DeleteRoom";
import InviteUserForm from "@/components/Room/InviteUserForm";

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

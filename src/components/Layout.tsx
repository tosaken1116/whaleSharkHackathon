import LogModal from "./LogModal";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LogModal />
            {children}
        </>
    );
}

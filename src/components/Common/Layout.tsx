import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import Header from "./Header";
import LoadingModal from "./LoadingModal";
import LogModal from "./LogModal";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <>
            <LogModal />
            <LoadingModal />
            <Stack>
                {!(router.asPath == "/") && <Header />}
                <Box sx={{ height: "92vh" }}>{children}</Box>
            </Stack>
        </>
    );
}

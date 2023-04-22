import { Box, Stack } from "@mui/material";
import Header from "./Header";
import LoadingModal from "./LoadingModal";
import LogModal from "./LogModal";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LogModal />
            <LoadingModal />
            <Stack>
                <Header />
                <Box sx={{ height: "92vh" }}>{children}</Box>
            </Stack>
        </>
    );
}

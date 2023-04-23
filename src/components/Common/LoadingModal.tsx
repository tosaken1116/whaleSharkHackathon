import { loadingModalAtom } from "@/state/loadingModalAtom";
import { CircularProgress, Modal, Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";

export default function LoadingModal() {
    const { message, isLoading } = useRecoilValue(loadingModalAtom);
    return (
        <Modal open={isLoading}>
            <Stack
                sx={{
                    width: "100vw",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                spacing={4}
            >
                <CircularProgress size={200} />
                <Typography variant="h5">{message}</Typography>
            </Stack>
        </Modal>
    );
}

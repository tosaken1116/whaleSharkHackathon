import { logModalAtom } from "@/state/logModalAtom";
import { Alert, Modal, Paper } from "@mui/material";
import { useRecoilState } from "recoil";

export default function LogModal() {
    const [{ message, status, isOpen }, setLogModalState] =
        useRecoilState(logModalAtom);
    return (
        <Modal
            open={isOpen}
            onClose={() =>
                setLogModalState({
                    message: "",
                    isOpen: false,
                    status: undefined,
                })
            }
        >
            <Paper>
                <Alert severity={status}>{message}</Alert>
            </Paper>
        </Modal>
    );
}

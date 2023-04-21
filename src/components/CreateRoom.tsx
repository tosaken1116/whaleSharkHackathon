import { useCreateRoomMutation } from "@/generates/graphql";
import { logModalAtom } from "@/state/logModalAtom";
import { meetingAtom } from "@/state/meetingAtom";
import { userAtom } from "@/state/userAtom";
import { Box, Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

export default function CreateRoom() {
    const [, setMeetingState] = useRecoilState(meetingAtom);
    const [, setLogModalState] = useRecoilState(logModalAtom);
    const { userId } = useRecoilValue(userAtom);
    const [createRoom, { error }] = useCreateRoomMutation({
        variables: { ownerId: userId },
    });
    const handleMakeRoom = async () => {
        if (userId == "") {
            setLogModalState({
                isOpen: true,
                message: "ログインしていません",
                status: "error",
            });
            return;
        }
        const result = await createRoom();
        if (error) {
            setLogModalState({
                isOpen: true,
                message: "error was occurred on create room",
                status: "error",
            });
        }
        setMeetingState({
            meetingId: result?.data?.insertMeetingLogOne?.id ?? "",
        });
    };
    return (
        <Box>
            <Button onClick={() => handleMakeRoom()}>make room</Button>
        </Box>
    );
}

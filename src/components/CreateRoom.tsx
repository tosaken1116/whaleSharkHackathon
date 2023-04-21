import { useCreateRoomMutation } from "@/generates/graphql";
import { meetingAtom } from "@/state/meetingAtom";
import { userAtom } from "@/state/userAtom";
import { Box, Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

export default function CreateRoom() {
    const [, setMeetingState] = useRecoilState(meetingAtom);
    const { userId } = useRecoilValue(userAtom);
    const [createRoom, { error }] = useCreateRoomMutation({
        variables: { owner: userId },
    });
    const handleMakeRoom = async () => {
        const result = await createRoom();
        if (userId == "") {
            return;
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

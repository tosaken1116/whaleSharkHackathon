import { useCreateRoomMutation } from "@/generates/graphql";
import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function CreateRoom() {
    const [meetingId, setMeetingId] = useState();
    const [createRoom] = useCreateRoomMutation({
        variables: { owner: "hoge" },
    });
    const handleMakeRoom = () => {
        const result = createRoom();
        console.log(result);
    };
    return (
        <Box>
            <Button onClick={() => handleMakeRoom()}>make room</Button>
        </Box>
    );
}

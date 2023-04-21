import { useDeleteRoomMutation } from "@/generates/graphql";
import { meetingAtom } from "@/state/meetingAtom";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";

export default function DeleteRoom() {
    const { meetingId } = useRecoilValue(meetingAtom);
    const [deleteRoom] = useDeleteRoomMutation({
        variables: { meetingId: meetingId },
    });
    return <Button onClick={() => deleteRoom()}>delete</Button>;
}

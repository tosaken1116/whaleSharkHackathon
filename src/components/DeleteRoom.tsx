import {
    DeleteRoomMutationVariables,
    useDeleteRoomMutation,
} from "@/generates/graphql";
import { Button } from "@mui/material";

export default function DeleteRoom({ meetingId }: DeleteRoomMutationVariables) {
    const [deleteRoom] = useDeleteRoomMutation({
        variables: { meetingId: meetingId },
    });
    return <Button onClick={() => deleteRoom()}>delete</Button>;
}

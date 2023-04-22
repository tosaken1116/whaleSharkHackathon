import { useDeleteRoomMutation } from "@/generates/graphql";
import { useLoading, useLogModal } from "@/hooks";
import { loadingModalAtom } from "@/state/loadingModalAtom";
import { logModalAtom } from "@/state/logModalAtom";
import { meetingAtom } from "@/state/meetingAtom";
import { Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

export default function DeleteRoom() {
    const { meetingId } = useRecoilValue(meetingAtom);
    const { errorHandle, successHandle } = useLogModal();

    const [deleteRoom, { loading }] = useDeleteRoomMutation({
        variables: { meetingId: meetingId },
        onError: (e) =>
            errorHandle({ message: `部屋削除に失敗しました:${e.message}` }),
        onCompleted: () => successHandle({ message: "部屋を削除しました" }),
    });
    useLoading({ isLoading: loading, message: "部屋を削除しています..." });

    return <Button onClick={() => deleteRoom()}>delete</Button>;
}

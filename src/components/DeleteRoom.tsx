import { useDeleteRoomMutation } from "@/generates/graphql";
import { useLoading } from "@/hooks";
import { loadingModalAtom } from "@/state/loadingModalAtom";
import { logModalAtom } from "@/state/logModalAtom";
import { meetingAtom } from "@/state/meetingAtom";
import { Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

export default function DeleteRoom() {
    const { meetingId } = useRecoilValue(meetingAtom);
    const [, setLoadingModalState] = useRecoilState(loadingModalAtom);
    const [, setLogModalState] = useRecoilState(logModalAtom);

    const [deleteRoom, { loading }] = useDeleteRoomMutation({
        variables: { meetingId: meetingId },
        onError: (e) => {
            setLogModalState({
                isOpen: true,
                message: e.message,
                status: "error",
            });
        },
        onCompleted: () => {
            setLogModalState({
                isOpen: true,
                message: "部屋を削除しました",
                status: "success",
            });
        },
    });
    useLoading({ isLoading: loading, message: "部屋を削除しています..." });

    return <Button onClick={() => deleteRoom()}>delete</Button>;
}

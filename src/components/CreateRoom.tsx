import { useCreateRoomMutation } from "@/generates/graphql";
import { useLoading } from "@/hooks";
import { logModalAtom } from "@/state/logModalAtom";
import { meetingAtom } from "@/state/meetingAtom";
import { userAtom } from "@/state/userAtom";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";

export default function CreateRoom() {
    const router = useRouter();
    const [, setMeetingState] = useRecoilState(meetingAtom);
    const [, setLogModalState] = useRecoilState(logModalAtom);
    const { userId } = useRecoilValue(userAtom);
    const [createRoom, { loading }] = useCreateRoomMutation({
        variables: { ownerId: userId },
        onError: (e) => {
            setLogModalState({
                isOpen: true,
                message: `部屋を作成できませんでした:${e}`,
                status: "error",
            });
        },
        onCompleted: () => {
            setLogModalState({
                isOpen: true,
                message: `部屋を作成しました`,
                status: "success",
            });
            router.push("./meeting");
        },
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
        setMeetingState({
            meetingId: result?.data?.insertMeetingLogOne?.id ?? "",
        });
    };
    useLoading({ isLoading: loading, message: "部屋を作成しています..." });

    return (
        <Box>
            <Button onClick={() => handleMakeRoom()}>make room</Button>
        </Box>
    );
}

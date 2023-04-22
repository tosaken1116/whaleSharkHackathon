import { useCreateRoomMutation } from "@/generates/graphql";
import { useInitializeUser, useLoading, useLogModal } from "@/hooks/client";
import { meetingAtom } from "@/state/meetingAtom";
import { userAtom } from "@/state/userAtom";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";

export default function CreateRoom() {
    const router = useRouter();
    const [, setMeetingState] = useRecoilState(meetingAtom);
    const { userId } = useRecoilValue(userAtom);
    const { initialize } = useInitializeUser();

    const { errorHandle, successHandle } = useLogModal();
    const [createRoom, { loading }] = useCreateRoomMutation({
        variables: { ownerId: userId },
        onError: (e) =>
            errorHandle({ message: `部屋を作成できませんでした:${e}` }),
        onCompleted: () => {
            successHandle({ message: "部屋を作成しました" });
            router.push("./meeting");
        },
    });
    const handleMakeRoom = async () => {
        if (userId == "") {
            const result = initialize();
            if (result) {
                errorHandle({ message: "ログインしていません" });
                return;
            }
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

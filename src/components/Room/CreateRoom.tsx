import {
    useCreateRoomMutation,
    useInviteMeetingUserMutation,
} from "@/generates/graphql";
import { useLoading, useLogModal } from "@/hooks/client";
import { meetingAtom } from "@/state/meetingAtom";
import { userAtom } from "@/state/userAtom";
import LoginIcon from "@mui/icons-material/Login";
import { Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
export default function CreateRoom() {
    const router = useRouter();
    const [{ meetingId }, setMeetingState] = useRecoilState(meetingAtom);
    const { userId, email } = useRecoilValue(userAtom);
    const { errorHandle, successHandle } = useLogModal();
    const [title, setTitle] = useState("");

    const [inviteUser] = useInviteMeetingUserMutation({
        variables: {
            userEmail: email,
            meetingId: meetingId,
        },
        onError: (e) =>
            errorHandle({ message: `招待に失敗しました:${e.message}` }),
        onCompleted: (result) => {
            successHandle({
                message: `${result?.insertMeetingUsersOne?.userEmail}を招待しました`,
            });
            router.push(`./meeting/${meetingId}`);
        },
    });
    const [createRoom, { loading }] = useCreateRoomMutation({
        variables: { ownerId: userId },
        onError: (e) =>
            errorHandle({ message: `部屋を作成できませんでした:${e}` }),
        onCompleted: (result) => {
            successHandle({
                message: `部屋を作成しました タイトル:${result.insertMeetingLogOne?.title}`,
            });
            setMeetingState({
                meetingId: result?.insertMeetingLogOne?.id ?? "",
            });

            inviteUser({
                variables: {
                    meetingId: result?.insertMeetingLogOne?.id ?? "",
                    userEmail: email,
                },
            });
        },
    });
    const handleMakeRoom = () => {
        if (userId == "") {
            errorHandle({ message: "ログインしていません" });
            return;
        }
        createRoom();
    };
    useLoading({ isLoading: loading, message: "部屋を作成しています..." });

    return (
        <Stack spacing={3}>
            <TextField
                value={title}
                label="タイトルを入力"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                }
            />
            <Button onClick={() => handleMakeRoom()} startIcon={<LoginIcon />}>
                新しく部屋を作る
            </Button>
        </Stack>
    );
}

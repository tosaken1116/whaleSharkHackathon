import { useInviteMeetingUserMutation } from "@/generates/graphql";
import { useLoading } from "@/hooks";
import { logModalAtom } from "@/state/logModalAtom";
import { meetingAtom } from "@/state/meetingAtom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
export default function InviteUserForm() {
    const [inviteEmail, setInviteEmail] = useState("");
    const { meetingId } = useRecoilValue(meetingAtom);
    const [, setLogModalState] = useRecoilState(logModalAtom);

    const [inviteUser, { data, loading }] = useInviteMeetingUserMutation({
        variables: {
            userEmail: inviteEmail,
            meetingId: meetingId,
        },
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
                message: `${data?.insertMeetingUsersOne?.userEmail}を招待しました`,
                status: "success",
            });
        },
    });
    const handleClick = () => {
        if (inviteEmail === "") {
            return;
        }
        if (meetingId == "") {
            setLogModalState({
                isOpen: true,
                message: "部屋が作られていません",
                status: "error",
            });
            return;
        }
        inviteUser();
        setInviteEmail("");
    };
    useLoading({ isLoading: loading, message: "招待中..." });

    return (
        <Stack direction="row" spacing={1}>
            <TextField
                value={inviteEmail}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setInviteEmail(event.target.value)
                }
            />
            <Box alignSelf="center">
                <IconButton onClick={handleClick}>
                    <GroupAddIcon />
                </IconButton>
            </Box>
        </Stack>
    );
}

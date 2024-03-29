import { useInviteMeetingUserMutation } from "@/generates/graphql";
import { useLoading, useLogModal } from "@/hooks/client";
import { meetingAtom } from "@/state/meetingAtom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
export default function InviteUserForm() {
    const [inviteEmail, setInviteEmail] = useState("");
    const { meetingId } = useRecoilValue(meetingAtom);
    const { errorHandle, successHandle } = useLogModal();
    const [inviteUser, { loading }] = useInviteMeetingUserMutation({
        variables: {
            userEmail: inviteEmail,
            meetingId: meetingId,
        },
        onError: (e) =>
            errorHandle({ message: `招待に失敗しました:${e.message}` }),
        onCompleted: (result) =>
            successHandle({
                message: `${result?.insertMeetingUsersOne?.userEmail}を招待しました`,
            }),
    });
    const handleClick = () => {
        if (inviteEmail === "") {
            return;
        }
        if (meetingId == "") {
            errorHandle({ message: "部屋が作られていません" });
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

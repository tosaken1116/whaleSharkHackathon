import { useInviteMeetingUserMutation } from "@/generates/graphql";
import { logModalAtom } from "@/state/logModalAtom";
import { meetingAtom } from "@/state/meetingAtom";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
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
            console.log(e);
            setLogModalState({
                isOpen: true,
                message: e.message,
                status: "error",
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
    useEffect(() => {
        setLogModalState({
            isOpen: true,
            message: `${data?.insertMeetingUsersOne?.userEmail}を招待しました`,
            status: "success",
        });
    }, [data]);
    return (
        <Box>
            <TextField
                value={inviteEmail}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setInviteEmail(event.target.value)
                }
            />
            <Button onClick={handleClick}>invite!</Button>
        </Box>
    );
}

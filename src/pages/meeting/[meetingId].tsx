import MeetingLog from "@/components/Meeting/MeetingLog";
import MeetingUsers from "@/components/Meeting/MeetingUsers";
import SpeechRecognitionComponent from "@/components/Meeting/Speech";
import CloseRoom from "@/components/Room/CloseRoom";
import InviteUserForm from "@/components/Room/InviteUserForm";
import { useUserStatus } from "@/hooks/client";
import { useMeetingLog } from "@/hooks/server";
import { castQueryToArray } from "@/libs";
import { Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";

export default function Meeting() {
    const router = useRouter();
    useUserStatus({ redirect: true });
    const { meetingUsers, log } = useMeetingLog({
        meetingId: castQueryToArray(router.query.meetingId ?? "")[0],
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <MeetingLog log={log ?? ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                    <Stack direction="row">
                        <SpeechRecognitionComponent />
                        <CloseRoom />
                    </Stack>
                    <MeetingUsers meetingUsers={meetingUsers ?? []} />
                    <InviteUserForm />
                </Stack>
            </Grid>
        </Grid>
    );
}

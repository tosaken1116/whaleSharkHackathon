import MeetingLog from "@/components/Meeting/MeetingLog";
import MeetingUsers from "@/components/Meeting/MeetingUsers";
import SpeechRecognitionComponent from "@/components/Meeting/Speech";
import InviteUserForm from "@/components/Room/InviteUserForm";
import { useMeetingLog, useUserStatus } from "@/hooks";
import { Grid, Stack } from "@mui/material";

export default function Meeting() {
    useUserStatus({ redirect: true });
    const { meetingUsers, log } = useMeetingLog();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <MeetingLog log={log ?? ""} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                    <SpeechRecognitionComponent />
                    <MeetingUsers meetingUsers={meetingUsers ?? []} />
                    <InviteUserForm />
                </Stack>
            </Grid>
        </Grid>
    );
}

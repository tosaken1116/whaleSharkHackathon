import InviteUserForm from "@/components/InviteUserForm";
import MeetingLog from "@/components/MeetingLog";
import MeetingUsers from "@/components/MeetingUsers";
import SpeechRecognitionComponent from "@/components/Speech";
import { useMeetingLog } from "@/hooks";
import { Grid, Stack } from "@mui/material";

export default function Meeting() {
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

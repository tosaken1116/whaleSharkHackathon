import MeetingDocuments from "@/components/Meeting/MeetingDocuments";
import CreateRoom from "@/components/Room/CreateRoom";
import InvitedRoomList from "@/components/Room/InvitedRoomList";
import { Box, Divider, Stack } from "@mui/material";

export default function MeetingList() {
    return (
        <Stack direction="row">
            <MeetingDocuments />
            <Divider orientation="vertical" flexItem />
            <Stack>
                <Box sx={{ height: "25vh", p: 2 }}>
                    <CreateRoom />
                </Box>
                <Divider />
                <InvitedRoomList />
            </Stack>
        </Stack>
    );
}

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
                <Stack
                    sx={{ bgcolor: "#fef4e8", width: "50vw", height: "100vh" }}
                >
                    <Box
                        sx={{
                            height: "25vh",
                            width: "46vw",
                            background:
                                "linear-gradient(106.73deg, #ddf4fc 0.46%, #e8ebfd 100.87%)",
                            borderRadius: "10px",
                            m: 2,
                        }}
                    >
                        <CreateRoom />
                    </Box>
                    <Divider />

                    <InvitedRoomList />
                </Stack>
            </Stack>
        </Stack>
    );
}

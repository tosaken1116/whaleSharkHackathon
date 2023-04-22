import {
    MeetingLog,
    Users,
    useGetInvitedMeetingQuery,
} from "@/generates/graphql";
import { useInitializeUser, useLoading } from "@/hooks/client";
import { userAtom } from "@/state/userAtom";
import {
    Box,
    Button,
    List,
    ListItem,
    Slide,
    Stack,
    Typography,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { MeetingUser } from "../Meeting/MeetingUsers";

const InviteRoom = ({
    userName,
    iconPath,
    id,
}: Pick<Users, "userName" | "iconPath"> & Pick<MeetingLog, "id">) => {
    return (
        <Button href={`/meeting/${id}`}>
            <Stack direction="row">
                <MeetingUser {...{ userName, iconPath }} />
                <Typography variant="h4">に招待されています</Typography>
            </Stack>
        </Button>
    );
};

export default function InvitedRoomList() {
    const { userId } = useRecoilValue(userAtom);
    const { initialize } = useInitializeUser();
    if (!userId) {
        initialize();
    }
    const { data, loading } = useGetInvitedMeetingQuery({
        variables: {
            userId: userId,
        },
        onError: (error) => {
            console.log(error);
        },
    });
    useLoading({
        isLoading: loading,
        message: "招待されているミーティングを取得中...",
    });
    console.log(data);
    if (data?.meetingUsers.length != 0) {
        return (
            <List>
                {data?.meetingUsers.map((meeting) => (
                    <ListItem key={meeting.meetingId}>
                        <InviteRoom
                            {...meeting.meetingDetail?.ownerDetail}
                            id={meeting.meetingId ?? ""}
                        />
                    </ListItem>
                ))}
            </List>
        );
    } else {
        return (
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    textAlign: "center",
                    mt: 12,
                }}
            >
                <Slide in direction="up">
                    <Typography variant="h5">
                        招待されているミーティングはなかったよ(´・ω・)
                    </Typography>
                </Slide>
            </Box>
        );
    }
}

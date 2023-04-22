import {
    MeetingLog,
    Users,
    useGetInvitedMeetingQuery,
} from "@/generates/graphql";
import { useLoading } from "@/hooks/client";
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
                <Box alignSelf="center">
                    <Typography variant="h5">に招待されています</Typography>
                </Box>
            </Stack>
        </Button>
    );
};

export default function InvitedRoomList() {
    const { userId } = useRecoilValue(userAtom);
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
                    width: "50vw",
                    height: "46vh",
                    textAlign: "center",
                }}
            >
                <Slide in direction="up">
                    <Typography variant="h4">
                        招待されているミーティングはなかったよ(´・ω・)
                    </Typography>
                </Slide>
            </Box>
        );
    }
}

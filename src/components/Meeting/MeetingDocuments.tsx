import { MeetingLog, useGetMeetingDocumentsQuery } from "@/generates/graphql";
import { useInitializeUser, useLoading } from "@/hooks/client";
import { userAtom } from "@/state/userAtom";
import ArticleIcon from "@mui/icons-material/Article";
import { Box, Button, List, ListItem, Slide, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import Date from "../Common/Data";
const DocumentCard = ({
    id,
    closedAt,
}: Pick<MeetingLog, "id" | "closedAt">) => {
    return (
        <Button href={`/meeting/${id}`} sx={{ position: "relative" }}>
            <Date dateString={closedAt ?? ""} />
            <ArticleIcon sx={{ position: "absolute" }} />
        </Button>
    );
};

export default function MeetingDocuments() {
    const { userId } = useRecoilValue(userAtom);
    const { initialize } = useInitializeUser();
    if (!userId) {
        initialize();
    }
    const { data, loading } = useGetMeetingDocumentsQuery({
        variables: { userId },
    });
    useLoading({ isLoading: loading, message: "過去の議事録を取得中..." });
    if (data?.meetingUsers.length != 0) {
        return (
            <List
                sx={{
                    width: "50vw",
                    height: "92vh",
                    textAlign: "center",
                }}
            >
                {data?.meetingUsers.map((meeting) => (
                    <ListItem key={meeting.meetingId}>
                        <DocumentCard
                            {...{
                                id: meeting.meetingId ?? "",
                                closedAt: meeting.meetingDetail?.closedAt ?? "",
                            }}
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
                    height: "92vh",
                    textAlign: "center",
                }}
            >
                <Box sx={{ mt: 12 }}>
                    <Slide in direction="up">
                        <Typography variant="h5">
                            議事録がないよ(´・ω・)
                        </Typography>
                    </Slide>
                </Box>
            </Box>
        );
    }
}

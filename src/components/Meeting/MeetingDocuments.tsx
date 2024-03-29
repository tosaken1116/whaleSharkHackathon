import { MeetingLog, useGetMeetingDocumentsQuery } from "@/generates/graphql";
import { useLoading, useLocalStorage } from "@/hooks/client";
import ArticleIcon from "@mui/icons-material/Article";
import { Box, Button, Grid, Slide, Typography } from "@mui/material";
import Date from "../Common/Data";

const DocumentCard = ({
    id,
    closedAt,
}: Pick<MeetingLog, "id" | "closedAt">) => {
    return (
        <Button href={`/documents/${id}`}>
            <Grid spacing={0.5}>
                <Grid display="inline-block">
                    <Grid
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <ArticleIcon
                            sx={{
                                fontSize: "80px",
                                color: "#161f52",
                            }}
                        ></ArticleIcon>
                    </Grid>
                    <Grid
                        sx={{
                            display: "block",
                            textAlign: "center",
                            fontSize: "10pt",
                            color: "#161f52",
                        }}
                    >
                        <Date dateString={closedAt ?? ""} />
                    </Grid>
                </Grid>
            </Grid>
        </Button>
    );
};

export default function MeetingDocuments() {
    const { getLocalStorage } = useLocalStorage();
    const userId = getLocalStorage("userId") ?? "";
    const { data, loading } = useGetMeetingDocumentsQuery({
        variables: { userId },
    });
    useLoading({ isLoading: loading, message: "過去の議事録を取得中..." });
    if (data?.meetingUsers.length != 0) {
        return (
            <Grid
                sx={{
                    width: "50vw",
                    height: "92vh",
                    textAlign: "center",
                }}
                container
                spacing={2}
            >
                {data?.meetingUsers.map((meeting) => (
                    <Grid item key={meeting.meetingId}>
                        <DocumentCard
                            {...{
                                id: meeting.meetingId ?? "",
                                closedAt: meeting.meetingDetail?.closedAt ?? "",
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
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
                <Box>
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

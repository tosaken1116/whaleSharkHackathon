import MarkDownPreview from "@/components/Meeting/MarkDownPreview";
import { useGetMeetingLogQuery } from "@/generates/graphql";
import { useLoading } from "@/hooks/client";
import { castQueryToArray } from "@/libs";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

export default function Document() {
    const router = useRouter();
    const meetingId = castQueryToArray(router.query.meetingId ?? "")[0];
    const { data, loading } = useGetMeetingLogQuery({
        variables: {
            meetingId,
        },
    });
    useLoading({ isLoading: loading, message: "議事録取得中..." });
    console.log(data, loading);
    return (
        <Box>
            <MarkDownPreview
                rawText={data?.meetingLogByPk?.log ?? ""}
                title={data?.meetingLogByPk?.title ?? ""}
            />
        </Box>
    );
}

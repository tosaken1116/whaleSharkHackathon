import { useMeetingLog } from "@/hooks";
import { UseMeetingLogProps } from "@/types";
import { Alert, CircularProgress } from "@mui/material";

export default function MeetingLog({ meetingId }: UseMeetingLogProps) {
    const { log, isLoading, error } = useMeetingLog({ meetingId });
    if (isLoading) {
        <CircularProgress />;
    }
    if (error) {
        <Alert> ログの読み取りに失敗しました。</Alert>;
    }

    return <>{log}</>;
}

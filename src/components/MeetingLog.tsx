import { useMeetingLog } from "@/hooks";
import { meetingAtom } from "@/state/meetingAtom";
import { Alert, CircularProgress } from "@mui/material";
import { useRecoilValue } from "recoil";

export default function MeetingLog() {
    const { meetingId } = useRecoilValue(meetingAtom);
    const { log, isLoading, error } = useMeetingLog({ meetingId });
    if (isLoading) {
        <CircularProgress />;
    }
    if (error) {
        <Alert> ログの読み取りに失敗しました。</Alert>;
    }

    return <>{log}</>;
}

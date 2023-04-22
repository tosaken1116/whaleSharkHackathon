import { MeetingLog } from "@/generates/graphql";

export default function MeetingLog({ log }: Partial<MeetingLog>) {
    return <>{log}</>;
}

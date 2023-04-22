import { MeetingLog } from "@/generates/graphql";
import MarkDownPreview from "./MarkDownPreview";

export default function MeetingLog({ log }: Partial<MeetingLog>) {
    return (
        <>
            {/* <MarkDownPreview rawText={"## hoge#huga"} /> */}
            <MarkDownPreview rawText={log ?? ""} />
        </>
    );
}

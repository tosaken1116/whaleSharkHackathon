import { MeetingLog } from "@/generates/graphql";
import MarkDownPreview from "./MarkDownPreview";

export default function MeetingLog({ log, title }: Partial<MeetingLog>) {
    return (
        <>
            {/* <MarkDownPreview rawText={"## hoge#huga"} /> */}
            <MarkDownPreview rawText={log ?? ""} title={title} />
        </>
    );
}

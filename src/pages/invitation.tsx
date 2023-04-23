import { useAuthentication } from "@/hooks/server";
import { castQueryToArray } from "@/libs";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Invitation() {
    const router = useRouter();
    const { inviteLogin } = useAuthentication();
    const meetingId = castQueryToArray(router.query.meetingId ?? "")[0];
    const protocol =
        typeof window !== "undefined" ? window.location.protocol : "http:";

    const domainName =
        typeof window !== "undefined" ? window.location.host : "";
    const redirectUrl = `${protocol}//${domainName}/meeting/${meetingId}`;

    return (
        <Button onClick={() => inviteLogin(meetingId, redirectUrl)}>
            参加する
        </Button>
    );
}

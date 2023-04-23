import { useInviteMeetingUserMutation } from "@/generates/graphql";
import { useLoading } from "@/hooks/client";
import { useAuthentication } from "@/hooks/server";
import { castQueryToArray } from "@/libs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Invitation() {
    const router = useRouter();
    const { login } = useAuthentication();
    const meetingId = castQueryToArray(router.query.meetingId ?? "")[0];
    const protocol =
        typeof window !== "undefined" ? window.location.protocol : "http:";

    const domainName =
        typeof window !== "undefined" ? window.location.host : "";

    const userMail = login();
    const [inviteUser, { loading }] = useInviteMeetingUserMutation({
        variables: {
            userEmail: userMail,
            meetingId: meetingId,
        },
    });
    inviteUser();
    useLoading({ isLoading: loading, message: "参加しています..." });
    useEffect(() => {
        if (!loading) {
            router.push(
                `${protocol}//${domainName}/invitation?meetingId=${meetingId}`
            );
        }
    }, []);
    return <></>;
}

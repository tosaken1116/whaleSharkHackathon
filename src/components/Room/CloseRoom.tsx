import { useCloseRoomMutation } from "@/generates/graphql";
import { useLoading, useLogModal } from "@/hooks/client";
import { formatDate } from "@/libs";
import { meetingAtom } from "@/state/meetingAtom";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

export default function CloseRoom() {
    const router = useRouter();
    const { meetingId } = useRecoilValue(meetingAtom);
    const { errorHandle, successHandle } = useLogModal();

    const [closeRoom, { loading }] = useCloseRoomMutation({
        variables: {
            meetingId: meetingId,
            closedAt: formatDate(),
        },
        onError: (e) =>
            errorHandle({ message: `部屋終了に失敗しました:${e.message}` }),
        onCompleted: (result) => {
            successHandle({
                message: `部屋を終了しました ${result.updateMeetingLogByPk?.closedAt}`,
            });
            router.push("/meeting");
        },
    });
    useLoading({ isLoading: loading, message: "部屋を終了しています..." });

    return <Button onClick={() => closeRoom()}>部屋を終了する</Button>;
}

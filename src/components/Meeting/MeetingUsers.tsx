import { GetMeetingLogQuery, Users } from "@/generates/graphql";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

export const MeetingUser = ({ iconPath, userName }: Partial<Users>) => {
    return (
        <Stack direction="row" spacing={2}>
            <Image
                src={iconPath ?? ""}
                alt={iconPath ?? ""}
                width={40}
                height={40}
                style={{ borderRadius: "999px" }}
            />
            <Typography variant="h4" alignSelf="center">
                {userName}
            </Typography>
        </Stack>
    );
};
export default function MeetingUsers({
    meetingUsers,
}: Partial<NonNullable<GetMeetingLogQuery["meetingLogByPk"]>>) {
    return (
        <Stack spacing={2}>
            {meetingUsers?.map((meetingUser) => (
                <Box key={meetingUser.userDetail?.email}>
                    <MeetingUser {...meetingUser.userDetail} />
                </Box>
            ))}
        </Stack>
    );
}

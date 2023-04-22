import { AlertProps } from "@mui/material";

export type UseMeetingLogProps = {
    meetingId: string;
};
export type logModalAtomType = {
    isOpen: boolean;
    message: string;
    status: AlertProps["severity"] | undefined;
};
export type loadingModalAtomType = {
    isLoading: boolean;
    message: string;
};

import { AlertProps } from "@mui/material";
import React from "react";

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
export type sidebarProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

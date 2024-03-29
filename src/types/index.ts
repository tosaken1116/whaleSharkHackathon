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
export type chatType = {
    role: "user" | "assistant";
    content: string;
};
export type useChatGPTDataHandleType = {
    data: string;
};

export type MarkdownProps = {
    rawText: string;
    title: string;
};

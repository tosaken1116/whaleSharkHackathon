import { useGetUserNameQuery } from "@/generates/graphql";
import { loadingModalAtom } from "@/state/loadingModalAtom";
import { logModalAtom } from "@/state/logModalAtom";
import { userAtom } from "@/state/userAtom";
import { loadingModalAtomType, logModalAtomType } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useChatGPT = () => {
    const [{ data, error }, setData] = useState({
        data: "",
        error: false,
    });
    var isCorrecting = false;
    const getCorrectedText = async (unCorrectedText: string) => {
        if (unCorrectedText != "" && !isCorrecting) {
            isCorrecting = true;
            try {
                const response = await axios.post("/api/correction", {
                    messages: {
                        role: "user",
                        content: unCorrectedText,
                    },
                });
                setData({
                    data: response.data.messages.content,
                    error: false,
                });
                isCorrecting = false;
            } catch (e) {
                setData({
                    error: true,
                    data: unCorrectedText,
                });
                isCorrecting = false;
            }
        }
    };

    return { data, error, getCorrectedText };
};
export const useUserStatus = ({ redirect }: { redirect: boolean }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useLoading({ message: "準備中...", isLoading: isLoading });
    const { getLocalStorage } = useLocalStorage();
    const [userState, setUserState] = useRecoilState(userAtom);
    if (!userState.isLogin) {
        const userId = getLocalStorage("userId") ?? "";
        setUserState({
            ...userState,
            userId: userId,
            isLogin: Boolean(userId),
        });
    }
    if (!userState.userId && redirect && router.isReady) {
        router.push("/");
    }
    const { data, refetch } = useGetUserNameQuery({
        variables: { userId: userState.userId },
    });
    useEffect(() => {
        if (router.isReady) {
            setIsLoading(false);
        }
    }, [router.isReady]);
    return { ...userState, ...data?.usersByPk, refetch };
};
export const useLogModal = () => {
    const [, setLogModalState] = useRecoilState(logModalAtom);
    const errorHandle = ({ message }: Pick<logModalAtomType, "message">) => {
        setLogModalState({
            isOpen: true,
            message: message,
            status: "error",
        });
    };
    const successHandle = ({ message }: Pick<logModalAtomType, "message">) => {
        setLogModalState({
            isOpen: true,
            message: message,
            status: "success",
        });
    };
    return { errorHandle, successHandle };
};
export const useLoading = ({ isLoading, message }: loadingModalAtomType) => {
    const [, setLoadingModalState] = useRecoilState(loadingModalAtom);

    useEffect(() => {
        if (isLoading) {
            setLoadingModalState({
                isLoading: true,
                message: message,
            });
        } else {
            setLoadingModalState({
                isLoading: false,
                message: "",
            });
        }
    }, [isLoading]);
};
export const useLocalStorage = () => {
    const getLocalStorage = (key: string) => {
        if (typeof window !== "undefined") {
            const value = localStorage.getItem(key);
            return value;
        }
        return undefined;
    };
    const setLocalStorage = (setValue: object) => {
        Object.entries(setValue).map(([key, value]) => {
            localStorage.setItem(key, value);
        });
    };
    const clearLocalStorage = () => {
        localStorage.clear();
    };
    const removeLocalStorage = (key: string) => {
        localStorage.removeItem(key);
    };
    return {
        getLocalStorage,
        setLocalStorage,
        clearLocalStorage,
        removeLocalStorage,
    };
};

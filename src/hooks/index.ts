import {
    useGetMeetingLogQuery,
    useRefreshMeetingLogSubscription,
} from "@/generates/graphql";
import { loadingModalAtom } from "@/state/loadingModalAtom";
import { logModalAtom } from "@/state/logModalAtom";
import { meetingAtom } from "@/state/meetingAtom";
import { userAtom } from "@/state/userAtom";
import { loadingModalAtomType, logModalAtomType } from "@/types";
import { initializeApp } from "@firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const useAuthentication = () => {
    const router = useRouter();
    const [userState, setUserState] = useRecoilState(userAtom);
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_APIKEY,
        authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEINGSENDERID,
        appId: process.env.NEXT_PUBLIC_APPID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
    };

    const app = initializeApp(firebaseConfig);
    const { removeLocalStorage, setLocalStorage } = useLocalStorage();
    const auth = getAuth(app);
    const login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserState({
                    userId: user.uid,
                    isLogin: true,
                });
                user.getIdToken().then((token) => {
                    setLocalStorage({ authToken: token, userId: user.uid });
                    // router.reload();
                });
            }
        });
    };

    const logout = () => {
        signOut(auth);
        removeLocalStorage("authToken");
        router.reload();
    };
    return { login, logout };
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
export const useMeetingLog = () => {
    const { meetingId } = useRecoilValue(meetingAtom);
    const { errorHandle } = useLogModal();

    const { data: initialLog } = useGetMeetingLogQuery({
        variables: {
            meetingId: meetingId,
        },
        onError: (e) =>
            errorHandle({ message: `議事録の取得に失敗しました:${e}` }),
    });
    const [{ log, meetingUsers }, setMeeting] = useState({
        log: initialLog?.meetingLogByPk?.log,
        meetingUsers: initialLog?.meetingLogByPk?.meetingUsers,
    });
    const { data } = useRefreshMeetingLogSubscription({
        variables: {
            meetingId: meetingId,
        },
        onError: (e) =>
            errorHandle({ message: `議事録の同期に失敗しました:${e}` }),
    });
    useEffect(() => {
        setMeeting({
            log: data?.meetingLogByPk?.log,
            meetingUsers: data?.meetingLogByPk?.meetingUsers,
        });
    }, [data]);
    return { log, meetingUsers };
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
export const useUserStatus = ({ redirect }: { redirect: boolean }) => {
    const router = useRouter();
    const { getLocalStorage } = useLocalStorage();
    const [userState, setUserState] = useRecoilState(userAtom);
    if (!userState.isLogin) {
        const userId = getLocalStorage("userId") ?? "";
        setUserState({ userId: userId, isLogin: Boolean(userId) });
    }
    if (!userState.userId && redirect) {
        router.push("/");
    }
    return { ...userState };
};

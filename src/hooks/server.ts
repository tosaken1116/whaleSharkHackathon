import {
    useGetMeetingLogQuery,
    useInviteMeetingUserMutation,
    useRefreshMeetingLogSubscription,
} from "@/generates/graphql";
import { userAtom } from "@/state/userAtom";
import { UseMeetingLogProps } from "@/types";
import { initializeApp } from "@firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signInWithRedirect,
    signOut,
} from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useLocalStorage, useLogModal } from "./client";

export const useMeetingLog = ({ meetingId }: UseMeetingLogProps) => {
    const { errorHandle } = useLogModal();

    const { data: initialLog } = useGetMeetingLogQuery({
        variables: {
            meetingId: meetingId,
        },
        onError: (e) => {
            if (meetingId != "") {
                errorHandle({ message: `議事録の取得に失敗しました:${e}` });
            }
        },
    });
    const [{ log, meetingUsers, ownerId, title }, setMeeting] = useState({
        log: initialLog?.meetingLogByPk?.log,
        ownerId: initialLog?.meetingLogByPk?.ownerId,
        meetingUsers: initialLog?.meetingLogByPk?.meetingUsers,
        title: initialLog?.meetingLogByPk?.title,
    });

    const { data } = useRefreshMeetingLogSubscription({
        variables: {
            meetingId: meetingId,
        },
        onError: (e) => {
            if (meetingId != "") {
                console.log(e);
            }
        },
    });
    useEffect(() => {
        setMeeting({
            ownerId: data?.meetingLogByPk?.ownerId,
            log: data?.meetingLogByPk?.log,
            meetingUsers: data?.meetingLogByPk?.meetingUsers,
            title: data?.meetingLogByPk?.title,
        });
    }, [data]);
    return { log, ownerId, meetingUsers, title };
};
export const useAuthentication = () => {
    const router = useRouter();
    const [inviteUser, { loading }] = useInviteMeetingUserMutation();
    const [, setUserState] = useRecoilState(userAtom);
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
    const login = (isRedirect?: boolean) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserState({
                    userId: user.uid,
                    isLogin: true,
                    iconPath: user.photoURL ?? "",
                    userName: user.displayName ?? "匿名希望",
                    email: user.email ?? "",
                });
                user.getIdToken().then((token) => {
                    setLocalStorage({ authToken: token, userId: user.uid });
                    if (isRedirect) {
                        router.push("/meeting");
                    }
                });
                return user.email;
            }
        });
        return "";
    };
    const inviteLogin = (meetingId: string, redirectUrl: string) => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserState({
                    userId: user.uid,
                    isLogin: true,
                    iconPath: user.photoURL ?? "",
                    userName: user.displayName ?? "匿名希望",
                    email: user.email ?? "",
                });
                user.getIdToken().then((token) => {
                    setLocalStorage({ authToken: token, userId: user.uid });
                });
                if (user.email != undefined) {
                    inviteUser({
                        variables: { userEmail: user.email, meetingId },
                    });
                    router.push(redirectUrl);
                }
            }
        });
    };

    const logout = () => {
        signOut(auth);
        removeLocalStorage("authToken");
        router.reload();
    };
    return { login, logout, inviteLogin };
};

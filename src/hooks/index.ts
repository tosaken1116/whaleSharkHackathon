import { useRefreshMeetingLogSubscription } from "@/generates/graphql";
import { loadingModalAtom } from "@/state/loadingModalAtom";
import { userAtom } from "@/state/userAtom";
import { UseMeetingLogProps, loadingModalAtomType } from "@/types";
import { initializeApp } from "@firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

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
        return null;
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
export const useMeetingLog = ({ meetingId }: UseMeetingLogProps) => {
    const { data, loading, error } = useRefreshMeetingLogSubscription({
        variables: {
            meetingId: meetingId,
        },
    });
    return { log: data?.meetingLogByPk?.log, isLoading: loading, error };
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

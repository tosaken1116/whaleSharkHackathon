import { atom } from "recoil";

export const userAtom = atom({
    key: "userAtom",
    default: {
        userId: "",
        isLogin: false,
        userName: "",
        iconPath: "",
        email: "",
    },
});

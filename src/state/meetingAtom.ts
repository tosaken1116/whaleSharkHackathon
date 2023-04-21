import { atom } from "recoil";

export const meetingAtom = atom({
    key: "meetingAtom",
    default: {
        meetingId: "",
    },
});

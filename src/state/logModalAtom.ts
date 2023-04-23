import { logModalAtomType } from "@/types";
import { atom } from "recoil";

export const logModalAtom = atom<logModalAtomType>({
    key: "logModalAtom",
    default: {
        isOpen: false,
        message: "",
        status: undefined,
    },
});

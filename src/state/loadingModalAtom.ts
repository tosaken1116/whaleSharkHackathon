import { loadingModalAtomType } from "@/types";
import { atom } from "recoil";

export const loadingModalAtom = atom<loadingModalAtomType>({
    key: "loadingModalAtom",
    default: {
        isLoading: false,
        message: "",
    },
});

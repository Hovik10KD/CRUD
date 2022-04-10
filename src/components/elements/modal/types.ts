import { ReactNode } from "react";

export interface modalPropTypes {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
import { ReactNode } from "react";

export interface ButtonPropTypes {
    children: ReactNode;
    color?: 'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark';
    icon?: string;
    onButtonClick?: () => void;
    type?: string;
}
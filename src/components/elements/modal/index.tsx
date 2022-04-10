import { useEffect, useMemo } from "react"
import { createPortal } from "react-dom";
import { modalPropTypes } from "./types";
import styles from "./style.module.scss";

const modalRootElement = document.querySelector('#modal')

export const Modal = ({
    isOpen,
    onClose,
    children,
}: modalPropTypes) => {

    const element = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        if (isOpen) {
            modalRootElement?.appendChild(element);
            document.body.style.overflowY = 'hidden';
            return () => {
                document.body.style.overflowY = 'auto';
                modalRootElement?.removeChild(element);
            }
        }
    }, [isOpen])

    if (isOpen) {
        return createPortal(
            <div
                className={styles.modalBody}
                onClick={onClose}
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className={styles.modalContent}
                >
                    {children}
                    
                </div>
            </div>
            , element
        );
    }

    return null;
} 
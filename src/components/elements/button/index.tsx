import { ButtonPropTypes } from "./types"
import styles from "./style.module.scss";

export const Button = ({
    children,
    color = 'primary',
    icon,
    onButtonClick = ()=>{},
    type = 'button',
}: ButtonPropTypes) => {

    if (type === 'submit') {
        return (
            <button
                type="submit"
                className={`btn btn-${color} ${styles.button}`}
            >
                {icon && (
                    <img
                        className={styles.icon}
                        src={icon}
                        alt="icon"
                    />
                )}
                {children}
            </button>
        )
    }

    return (
        <button
            type="button"
            className={`btn btn-${color} ${styles.button}`}
            onClick={(e)=>{
                e.stopPropagation();
                onButtonClick();
            }}
        >
            {icon && (
                <img
                    className={styles.icon}
                    src={icon}
                    alt="icon"
                />
            )}
            {children}
        </button>
    )
}
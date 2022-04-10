import styles from "./style.module.scss";
import { progressBarPropTypes } from "./types";

export const ProgressBar = ({
    progress,
}: progressBarPropTypes) => {
    return (
        <div className={`progress ${styles.progressBar}`}>
            <div
                className="progress-bar progress-bar-striped bg-info"
                role="progressbar"
                style={{ width: `${progress}%` }}
            ></div>
            <span>{progress}%</span>
        </div>
    )
}
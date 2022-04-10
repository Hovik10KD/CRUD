import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { decrementProgress, incrementProgress, taskDelete } from "../../../redux/actions";
import { RootState } from "../../../redux/rootReducer";
import { Button } from "../../elements/button";
import { ProgressBar } from "../../elements/progress-bar";
import { UpdateTaskModal } from "../../elements/update-task-modal";
import styles from "./style.module.scss";

export const ItemDetails = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const navigate = useNavigate();

    const task = useSelector((state: RootState) => {
        const { tasksReducer } = state;
        // @ts-ignore
        const itemIndex = tasksReducer.tasks.findIndex(res => res.id === params?.taskId);
        // @ts-ignore
        return tasksReducer.tasks[itemIndex];
    })

    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

    return (
        <>
            <div className={styles.title}>
                <h3>{task?.title}</h3>
            </div>
            <div className={styles.descriptionAndProgress}>
                <div className={styles.description}>
                    <p>{task?.description}</p>
                </div>
                <div className={styles.taskData}>
                    <div className={styles.progress}>
                        <ProgressBar progress={task.progress}/>
                        <div className={styles.buttons}>
                            <Button onButtonClick={() => {dispatch(decrementProgress(task.id))}} color="danger">-</Button>
                            <Button onButtonClick={() => {dispatch(incrementProgress(task.id))}} color="success">+</Button>
                        </div>
                    </div>
                    <div className={styles.deadline}>
                        <h4>Deadline</h4>
                        <p>{task?.deadline}</p>
                    </div>
                    <div className={styles.createdAt}>
                        <h4>Created At</h4>
                        <p>{task?.createdAt}</p>
                    </div>
                    <div className={styles.updateDeleteButtons}>
                        <Button 
                            color="danger"
                            onButtonClick={()=>{
                                navigate('/');
                                dispatch(taskDelete(task.id));
                            }}
                        >
                            Delete
                        </Button>
                        <Button 
                            color="success"
                            onButtonClick={()=>{setUpdateModalIsOpen(true)}}
                        >
                            Update
                        </Button>
                    </div>
                    <div className={styles.goBackButton}>
                        <Button
                            color="success"
                            icon="icons/back.svg"
                            onButtonClick={()=>{navigate('/')}}
                        >
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>

            {updateModalIsOpen && (
                <UpdateTaskModal
                    isOpen={updateModalIsOpen}
                    onClose={() => { setUpdateModalIsOpen(false) }}
                    data={task}
                />
            )}
        </>
    )
}
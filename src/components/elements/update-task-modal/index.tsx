import { Modal } from "../modal";
import { updateTaskModalPropTypse } from "./types";
import styles from "./style.module.scss";
import { Button } from "../button";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { taskUpdate } from "../../../redux/actions";


export const UpdateTaskModal = ({
    isOpen,
    onClose,
    data,
}: updateTaskModalPropTypse) => {

    const dispatch = useDispatch();

    const [taskData, setTaskData] = useState({
        deadline: {
            data: data,
            hasError: false,
        },
        title: {
            data: '',
            hasError: false,
        },
        description: {
            data: '',
            hasError: false,
        },
        id: '',
        createdAt: '',
        progress: 0,
    })

    useEffect(()=>{
        if(data){
            setTaskData({
                deadline: {
                    data: data?.deadline,
                    hasError: false,
                },
                title: {
                    data: data?.title,
                    hasError: false,
                },
                description: {
                    data: data?.description,
                    hasError: false,
                },
                id: data?.id,
                createdAt: data?.createdAt,
                progress: data?.progress,
            })
        }
    },[data])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (taskData.title.data.trim() !== '' && taskData.description.data.trim() !== '') {
            let data = {
                deadline: taskData.deadline.data,
                title: taskData.title.data,
                description: taskData.description.data,
                createdAt: taskData.createdAt,
                progress: taskData.progress,
            };
            
            dispatch(taskUpdate(data, taskData.id));
    
            onClose();
        } else {
            setTaskData((taskData) => ({
                ...taskData,
                title: {
                    ...taskData.title,
                    hasError: taskData.title.data.trim() === '' ? true : false,
                },
                description: {
                    ...taskData.description,
                    hasError: taskData.description.data.trim() === '' ? true : false,
                }
        }));
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.contentBlock}>
                    <div className="mb-3">
                        <label className="form-label">Deadline</label>
                        <input
                            onChange={(e) => {
                                setTaskData((taskData) => ({
                                    ...taskData,
                                    deadline: { ...taskData.deadline, data: e.target.value }
                                }))
                            }}
                            value={taskData.deadline.data}
                            type="date"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            onChange={(e) => {
                                setTaskData((taskData) => ({
                                    ...taskData,
                                    title: { ...taskData.title, data: e.target.value }
                                }))
                            }}
                            value={taskData.title.data}
                            type="text"
                            className="form-control"
                            placeholder="Type your title"
                        />
                        {taskData.title.hasError && (
                            <div className={`alert alert-danger ${styles.errorMessage}`}>Title is required</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            onChange={(e) => {
                                setTaskData((taskData) => ({
                                    ...taskData,
                                    description: { ...taskData.description, data: e.target.value }
                                }))
                            }}
                            value={taskData.description.data}
                            placeholder="Type your description"
                            className="form-control"
                        />
                        {taskData.description.hasError && (
                            <div className={`alert alert-danger ${styles.errorMessage}`}>Description is required</div>
                        )}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button color="danger" onButtonClick={onClose}>Close</Button>
                    <Button type="submit" color="success">Update</Button>
                </div>
            </form>
        </Modal>
    )
}
import { Modal } from "../modal";
import { newTaskModalPropTypse } from "./types";
import styles from "./style.module.scss";
import { Button } from "../button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";
import { taskCreate } from "../../../redux/actions";


export const NewTaskModal = ({
    isOpen,
    onClose,
}: newTaskModalPropTypse) => {

    const dispatch = useDispatch();

    const [newTaskData, setNewTaskData] = useState({
        deadline: {
            data: new Date().toISOString().split('T')[0],
            hasError: false,
        },
        title: {
            data: '',
            hasError: false,
        },
        description: {
            data: '',
            hasError: false,
        }
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (newTaskData.title.data.trim() !== '' && newTaskData.description.data.trim() !== '') {
            const id = uniqid();
            let data = {
                deadline: newTaskData.deadline.data,
                title: newTaskData.title.data,
                description: newTaskData.description.data,
            };

            dispatch(taskCreate(data, id));

            onClose();
        } else {
            setNewTaskData((newTaskData) => ({
                    ...newTaskData,
                    title: {
                        ...newTaskData.title,
                        hasError: newTaskData.title.data.trim() === '' ? true : false,
                    },
                    description: {
                        ...newTaskData.description,
                        hasError: newTaskData.description.data.trim() === '' ? true : false,
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
                                setNewTaskData((newTaskData) => ({
                                    ...newTaskData,
                                    deadline: { ...newTaskData.deadline, data: e.target.value }
                                }))
                            }}
                            value={newTaskData.deadline.data}
                            type="date"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            onChange={(e) => {
                                setNewTaskData((newTaskData) => ({
                                    ...newTaskData,
                                    title: { ...newTaskData.title, data: e.target.value }
                                }))
                            }}
                            value={newTaskData.title.data}
                            type="text"
                            className="form-control"
                            placeholder="Type your title"
                        />
                        {newTaskData.title.hasError && (
                            <div className={`alert alert-danger ${styles.errorMessage}`}>Title is required</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            onChange={(e) => {
                                setNewTaskData((newTaskData) => ({
                                    ...newTaskData,
                                    description: { ...newTaskData.description, data: e.target.value }
                                }))
                            }}
                            value={newTaskData.description.data}
                            placeholder="Type your description"
                            className="form-control"
                        />
                        {newTaskData.description.hasError && (
                            <div className={`alert alert-danger ${styles.errorMessage}`}>Description is required</div>
                        )}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button color="danger" onButtonClick={onClose}>Close</Button>
                    <Button type="submit" color="success">Create</Button>
                </div>
            </form>
        </Modal>
    )
}
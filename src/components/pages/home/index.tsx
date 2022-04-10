import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { Button } from "../../elements/button";
import { Table } from "../../elements/table";
import styles from "./style.module.scss";
import { useState } from "react";
import { NewTaskModal } from "../../elements/new-task-modal";
import { taskSearch, updateSortType } from "../../../redux/actions";

export const Home = () => {

    const dispatch = useDispatch();

    const tasks = useSelector((state: RootState) => {
        const { tasksReducer } = state;
        // @ts-ignore
        return tasksReducer.tasks;
    })

    const searchParams = useSelector((state: RootState) => {
        return state.searchReducer.searchParams;
    })

    const sortType = useSelector((state: RootState) => {
        return state.sortReducer.sortType;
    })

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <div className={styles.controlPanel}>
                <Button
                    color="success"
                    icon="icons/add.svg"
                    onButtonClick={() => { setModalIsOpen(true) }}
                >
                    Add new task
                </Button>

                <input
                    className={`form-control ${styles.searchInput}`}
                    placeholder="Search ..."
                    value={searchParams}
                    onChange={(e) => {
                        dispatch(taskSearch(e.target.value));
                    }}
                />
                <select 
                    className={`form-select ${styles.sortSelect}`}
                    value={sortType}
                    onChange={(e)=>{
                        dispatch(updateSortType(e.target.value));
                    }}
                >
                    <option value="Date">Sort by date</option>
                    <option value="Alphabetically">Sort alphabetically</option>
                </select>
            </div>
            <Table tableData={tasks} />

            {modalIsOpen && (
                <NewTaskModal
                    isOpen={modalIsOpen}
                    onClose={() => { setModalIsOpen(false) }}
                />
            )}
        </>
    )
}
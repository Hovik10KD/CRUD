import { TablePropTypes } from "./types";
import styles from "./style.module.scss";
import { ProgressBar } from "../progress-bar";
import { Button } from "../button";
import { UpdateTaskModal } from "../update-task-modal";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskDelete } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/rootReducer";

export const Table = ({
    tableData,
}: TablePropTypes) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [selectedTaskData, setSelectedTaskData] = useState({});
    
    const searchValue = useSelector((state: RootState) => {
        return state.searchReducer.searchParams;
    })
    const sortType = useSelector((state: RootState) => {
        return state.sortReducer.sortType;
    })

    let filteredTasksList = useMemo(() => tableData.filter((task)=>{
            if (searchValue === '') return true;
            return task.title.toLowerCase().startsWith(searchValue.toLowerCase());
    }),[searchValue, tableData])

    filteredTasksList = useMemo(()=>filteredTasksList.sort(function (a, b) {
        if(sortType === 'Alphabetically') {
            if (a.title > b.title) { return 1;}
            if (a.title < b.title) { return -1;}
            return 0;
        }
        if (Date.parse(a.createdAt) > Date.parse(b.createdAt)) { return 1;}
        if (Date.parse(a.createdAt) < Date.parse(b.createdAt)) { return -1;}
        return 0;
    }),[sortType, searchValue, tableData])
    
    return (
        <>
            <table className={`table ${styles.table}`}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Progress</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasksList?.map((task) => {
                        return (
                            <tr onClick={()=>{navigate(`/${task.id}`)}} key={task.id}>
                                <td>{task.title}</td>
                                <td>
                                    <ProgressBar progress={task.progress} />
                                </td>
                                <td>
                                    <div style={{ display: 'flex', width: 'max-content' }}>
                                        <Button
                                            color="success"
                                            onButtonClick={() => {
                                                setSelectedTaskData(task);
                                                setUpdateModalIsOpen(true);
                                            }}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            color="danger"
                                            onButtonClick={()=>{
                                                dispatch(taskDelete(task.id));
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {updateModalIsOpen && (
                <UpdateTaskModal
                    isOpen={updateModalIsOpen}
                    onClose={() => { setUpdateModalIsOpen(false) }}
                    data={selectedTaskData}
                />
            )}
        </>
    )
}
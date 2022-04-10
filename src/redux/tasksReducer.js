import { DELETE_TASK, INCREMENT_PROGRESS, DECREMENT_PROGRESS, NEW_TASK, UPDATE_TASK } from "./types";

const updatesessionStorage = (state) => {
    window.sessionStorage.setItem(
        'tasksState',
        JSON.stringify(state)
    )
}

if (!window.sessionStorage.getItem('tasksState')) {
    updatesessionStorage({
        tasks: [
            {
                id: 'task_0',
                title: 'Lorem Ipsum',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                deadline: '2022-04-30',
                createdAt: '2022-03-10',
                progress: 5,
            },
            {
                id: 'task_1',
                title: 'WWW Lorem Ipsum',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                deadline: '2022-04-30',
                createdAt: '2022-04-04',
                progress: 90,
            },
            {
                id: 'task_2',
                title: 'TEST Lorem Ipsum',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                deadline: '2022-04-30',
                createdAt: '2021-03-10',
                progress: 30,
            },
            {
                id: 'task_3',
                title: 'New Lorem Ipsum',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                deadline: '2022-04-30',
                createdAt: '2019-03-10',
                progress: 14,
            }
        ],
    })
}



const initialState = JSON.parse(window.sessionStorage.getItem('tasksState'));

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_TASK:
            return (() => {
                const nextState = {
                    ...state,
                    tasks: [
                        ...state.tasks,
                        {
                            id: action.data.id,
                            title: action.data.data.title,
                            description: action.data.data.description,
                            deadline: action.data.data.deadline,
                            createdAt: new Date().toISOString().split('T')[0],
                            progress: 0,
                        }
                    ]
                }

                updatesessionStorage(nextState);

                return nextState;
            })()

        case UPDATE_TASK:
            return (() => {
                const { data } = action;
                const { tasks } = state;
                const itemIndex = tasks.findIndex(res => res.id === data.id);

                const nextState = {
                    ...state,
                    tasks: [
                        ...tasks.slice(0, itemIndex),
                        {
                            id: data.id,
                            title: data.data.title,
                            description: data.data.description,
                            deadline: data.data.deadline,
                            createdAt: data.data.createdAt,
                            progress: data.data.progress,
                        },
                        ...tasks.slice(itemIndex + 1),
                    ]
                };

                updatesessionStorage(nextState);

                return nextState;
            })()

        case DELETE_TASK:
            return (() => {
                const { id } = action;
                const { tasks } = state;
                const itemIndex = tasks.findIndex(res => res.id === id);

                const nextState = {
                    ...state,
                    tasks: [
                        ...tasks.slice(0, itemIndex),
                        ...tasks.slice(itemIndex + 1),
                    ]
                };

                updatesessionStorage(nextState);

                return nextState;
            })()

        case INCREMENT_PROGRESS:
            return (() => {
                const { id } = action;
                const { tasks } = state;
                const itemIndex = tasks.findIndex(res => res.id === id);

                if (tasks[itemIndex].progress < 100) {

                    const nextState = {
                        ...state,
                        tasks: [
                            ...tasks.slice(0, itemIndex),
                            { ...tasks[itemIndex], progress: tasks[itemIndex].progress + 1 },
                            ...tasks.slice(itemIndex + 1),
                        ]
                    };

                    updatesessionStorage(nextState);

                    return nextState;
                }

                return state;
            })()

        case DECREMENT_PROGRESS:
            return (() => {
                const { id } = action;
                const { tasks } = state;
                const itemIndex = tasks.findIndex(res => res.id === id);

                if (tasks[itemIndex].progress > 0) {

                    const nextState = {
                        ...state,
                        tasks: [
                            ...tasks.slice(0, itemIndex),
                            { ...tasks[itemIndex], progress: tasks[itemIndex].progress - 1 },
                            ...tasks.slice(itemIndex + 1),
                        ]
                    };

                    updatesessionStorage(nextState);

                    return nextState;
                }

                return state;
            })()

        default:
            return state;
    }
}

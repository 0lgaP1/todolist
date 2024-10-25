import {v1} from "uuid";
import {removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";


test('correct task should be deleted in correct way', () => {

    const startState: TasksStateType = {
        'todolistId1': [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        'todolistId2': [
            {id: v1(), title: 'Typescript', isDone: true},
            {id: v1(), title: 'RTK query', isDone: true},
        ]
    };

    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(6);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t=>t.id != '2')).toBeTruthy();
})

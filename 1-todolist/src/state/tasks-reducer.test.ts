import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";

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

test('correct task should be deleted in correct way', () => {

    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(6);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
})

test('correct task adding should be done', () => {

    const action = addTaskAC('New Task', v1(), 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(6);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('New Task');
    expect(endState['todolistId2'][0].isDone).toBe(false);
});

test('correct change task status should be done', () => {

    const action = changeTaskStatusAC('2', true, "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].isDone).toBe(false);
});


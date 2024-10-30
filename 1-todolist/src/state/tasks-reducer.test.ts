import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

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
    expect(endState['todolistId2'][0].isDone).toBe(true);
});

test('correct change task title should be saved', () => {
    const taskId = startState['todolistId2'][1].id;
    const action = changeTaskTitleAC(taskId, "New title", "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe("New title");
    expect(endState['todolistId1'][0].title).toBe("HTML");
});

test('new array should be added when new todolist is created', ()=>{
    const action = addTodoListAC('New todolist', v1());
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState)
    const newKey = keys.find(k=> k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    // expect(endState['todolistId2']).toBeUndefined()
})
import s from './Todolist.module.css'
import {FilteredType, TaskMainType, TaskStatuses} from "../../api";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {AddItemForm} from "../AddItemForm";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../store";
import {getTaskForEmptyTodoTC} from "../../reducers/taskReducer";
import {SuperTextField} from "../SuperTextField";


type TodolistType = {
    tasks: TaskMainType[]
    title: string
    todoId: string
    removeTask: (todoId: string, taskId: string) => void
    filteredTask: (todoId: string, filter: FilteredType) => void
    addTask: (todoId: string, newTitle: string) => void
    changeCompletedTask: (todoId: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todoId: string) => void
    changeTaskTitle:(todoId: string, taskId: string, newTitle: string)=>void
    changeTodolistTitle:(todoId: string, newTitle: string)=>void

}


export const Todolist = ({
                             tasks,
                             title,
                             todoId,
                             removeTask,
                             filteredTask,
                             addTask,
                             changeCompletedTask,
                             removeTodolist,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: TodolistType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTaskForEmptyTodoTC(todoId))
    }, [])

    return <div className={s.todolist}>
        <h3>
           <SuperTextField title={title} newTitleCallback={(newText)=>changeTodolistTitle(todoId, newText)} styleWidth={{width: '185px'}}/>
            <IconButton aria-label="delete" title={'Remove todolist'} style={removeButtonStyle}
                        onClick={() => removeTodolist(todoId)}>
                <DeleteForeverIcon/>
            </IconButton>
        </h3>
        <AddItemForm addNewForm={(newTitle) => addTask(todoId, newTitle)}
                     label={'Enter your task'}
                     variant={"standard"}
                     buttonTitle={'Add task'}/>
        <ul style={{'paddingLeft': '15px'}}>
            {tasks.map(el =>
                (
                    <li key={el.id} style={{'listStyleType': 'none'}}>
                        <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                            <div>
                                <Checkbox
                                    icon={<BookmarkBorderIcon/>}
                                    checkedIcon={<BookmarkIcon/>}
                                    checked={el.status === TaskStatuses.Completed}
                                    color={'error'}
                                    onChange={(e) => changeCompletedTask(todoId, el.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}/>
                                <SuperTextField title={el.title}
                                                newTitleCallback={(text)=>changeTaskTitle(todoId, el.id, text)}
                                styleWidth={{width: '140px'}}/>
                            </div>
                            <div>
                                <IconButton aria-label="delete"
                                            title={'Remove task'}
                                            style={removeButtonStyle}
                                            size={'small'}
                                            onClick={() => removeTask(todoId, el.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </li>
                ))}
        </ul>


        <div>
            <Button variant="contained" color='inherit' className={s.buttonFilter}
                    style={buttonFilteredStyle} title={'All tasks'}
                    onClick={() => filteredTask(todoId, 'all')}>All</Button>
            <Button variant="contained" color='inherit' className={s.buttonFilter}
                    style={buttonFilteredStyle} title={'Only active task'}
                    onClick={() => filteredTask(todoId, 'active')}>Active</Button>
            <Button variant="contained" color='inherit' className={s.buttonFilter}
                    style={buttonFilteredStyle} title={'Completed tasks'}
                    onClick={() => filteredTask(todoId, 'completed')}>Completed</Button>
        </div>
    </div>
}

const buttonFilteredStyle = {
    padding: '5px',
    margin: '5px',
    fontSize: '0.805rem',
    minWidth: '50px',
    color: '#5b3f01'
}

const removeButtonStyle = {
    color: '#8d650b',
}
import s from './Todolist.module.css'
import {FilteredType, TaskMainType} from "../../api";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useState} from "react";


type TodolistType = {
    tasks: TaskMainType[]
    title: string
    todoId: string
    filter: FilteredType
    removeTask: (todoId: string, taskId: string) => void
    filteredTask: (todoId: string, filter: FilteredType) => void
    addTask: (todoId: string, newTitle: string) => void

}


export const Todolist = ({tasks, title, todoId, removeTask, filteredTask, addTask}: TodolistType) => {
    const [text, setText] = useState('')

    const addTaskHandler = () => {
        if (text.trim() !== '') {
            addTask(todoId, text.trim())
            setText('')
        }
    }

    return <div className={s.todolist}>
        <h3>
            {title}
            <IconButton aria-label="delete" title={'Remove todolist'} style={removeButtonStyle}>
                <DeleteForeverIcon/>
            </IconButton>
        </h3>
        <div style={{'display': "flex", 'alignItems': 'flex-end'}}>
            <TextField id="outlined-basic" label="Enter your task" variant="standard" margin={'none'}
                       autoComplete={'off'}
                       value={text}
                       onChange={(e) => setText(e.currentTarget.value)}/>
            <IconButton title={'Add todolist'} onClick={addTaskHandler}>
                <AddCircleIcon/>
            </IconButton>
        </div>

        <ul style={{'paddingLeft': '15px'}}>
            {tasks.map(el =>
                (
                    <li key={el.id} style={{'listStyleType': 'none'}}>
                        <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                            <div>
                                <Checkbox
                                    icon={<BookmarkBorderIcon/>}
                                    checkedIcon={<BookmarkIcon/>}
                                    checked={el.completed}
                                    color={'error'}/>
                                <span>{el.title}</span>
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
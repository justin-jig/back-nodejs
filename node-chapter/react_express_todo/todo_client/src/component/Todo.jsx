
import { useState, useCallback } from 'react';

export default function Todo (props) {

    const {data, deleteTodo, modifiedTodo} = props;
    const [modified, setModified] = useState(false);
    const [title, setTitle] = useState(data.title);

    const changeModifiedMode = useCallback (() => {
        setModified((prev) => !prev)
    })
    const doneChangeEvent = useCallback(() => {
        modifiedTodo({
            ...data,
            done: !data.done
        });
  
    });

    const modifiedEvent = () => {
        if (data.title === title) return;
        modifiedTodo({
            ...data,
            title : title,
        }, changeModifiedMode() );
    }

    return (
        <li> 
            <input type="checkbox" defaultChecked={data.done} onClick={(e) => doneChangeEvent()} /> 
            {modified ? 
                <input type='text'  onChange={(e) => setTitle(e.target.value)}
                        defaultValue={data.title} onKeyDown={(e)=> e.key === 'Enter' ? modifiedEvent() :''} />
                : 
                <label onClick={(e) => changeModifiedMode()}>{data.title}</label> 
            }
            <button onClick={() => {deleteTodo(data)}}> DELETE </button>
        </li>
    )
}

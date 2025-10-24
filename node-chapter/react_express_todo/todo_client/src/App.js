import { useEffect, useState, Fragment, useRef } from "react";
import axios from "axios";
import './App.scss'

import Todo from './component/Todo';


function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const createTodoInputRef = useRef(); // schedule ref

    useEffect(() => {
        const todoData = async () => {
            const res = await axios({
                method: "GET",
                url: "http://localhost:8000/todos",
            });
            setTodos(res.data);
            setLoading(false);
        };
        todoData();
    }, []);


    const createTodo = async () => {
        if (createTodoInputRef.current.value === "") return alert('todo를 입력해주세요.');

        const reqData = {
            title : createTodoInputRef.current.value,
            done: false,
        }

        try {
            const res = await axios({
                method: "POST",
                url: "http://localhost:8000/todo",
                data : reqData
            });

            if (res.data.result) {
                const schedules = [...todos];
                schedules.push({...reqData, id:res.data.id});
                setTodos(schedules);
                createTodoInputRef.current.value = "";

            } else{
                alert ('관리자에게 문의해주세요.')
            }

        } catch (e) {
            alert ('잠시 후에 사용해주세요.')
        }
    }


    const modifiedTodo = async (data, callback) => {

        try {
            const res = await axios({
                method: "PATCH",
                url: `http://localhost:8000/todo/${data.id}`,
                data : data
            });

            if (res.data.result) { 

                const schedules = [...todos];

                schedules.forEach((value) => {
                    if ( value.id === data.id) {
                        value.title = data.title;
                        value.done = data.done;
                        return false;
                    }
                })
                setTodos(schedules)
          
            } else{
                alert ('관리자에게 문의해주세요.')
            }

        } catch (e) {
            alert ('잠시 후에 사용해주세요.')
        }
    }


    const deleteTodo = async (data) => {

        try {
            const res = await axios({
                method: "DELETE",
                url: `http://localhost:8000/todo/${data.id}`,
            });

            if (res.data.result) { 
                const result = todos.filter((value) => value.id != data.id);
                setTodos(result)

            } else{
                alert ('관리자에게 문의해주세요.')
            }
           

        } catch (e) {
            alert ('잠시 후에 사용해주세요.')
        }

    }

    return (

        <div className='todo_wrap'>
            <header> ✔ My todo App</header>
            <main>
                {loading ?  

                    <div className='loading_box'>loading<span>...</span></div>
                    :
                    <>
                        <div className="todo-create">
                            <input  placeholder="Add Todo here" ref={createTodoInputRef}
                                    onKeyDown={(e)=> e.key === 'Enter' ? createTodo() :''}
                            
                            />
                            <button onClick={() => createTodo()}> + </button>
                        </div>

                        <div className="todo-contents">
                            <h5 className="todo-count">🚀 {todos.length && todos.length ? todos.length : 0} Todos</h5>
                            <ul className='schedule_list_ul'> 
                                {todos.length > 0 ? 
                                    todos.map((data, idx) => {
                                        return (
                                            <Fragment key={idx}>
                                                <Todo data={data} deleteTodo={deleteTodo} modifiedTodo={modifiedTodo} />
                                            </Fragment>
                                            )
                                    })
                                    :
                                    <li className='none_data'> please create todo.. </li>
                                }
                            </ul>
                        </div>
                    </>
                }
            </main>
        </div> 
    );
}

export default App;

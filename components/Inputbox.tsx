import React, { useState } from "react";
import { TodoList } from "../pages";
  
const Inputbox: React.FC<{
  todoList: TodoList[]
  handleTodoListAdd: (todo: TodoList) => void
  handleTodoListEdit: (todo: TodoList) => void
}> = ({todoList, handleTodoListAdd, handleTodoListEdit}) => {
  
  const [txt, setTxt] = useState<string>("");
  const [txtedit, setTxtedit] = useState<string>("");
  const [myeditTxt, setMyeditTxt] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  // const [newTodos, setNewTodos] = useState<TodoList[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 1
        setTxt(e.target.value);
    
        // 2
        // const {value} =  e.target
        // setTxt(value)
    
        // // 3
        // setTxt(prev=> value)
    
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const todo = {
        value: txt,
        date: new Date(),
        completed: false
      }
      // setNewTodos(prev => ([...prev, todo]))
      handleTodoListAdd(todo);
      setTxt("");

      console.log(todo.value);
    }
  const onChangeEditHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTxtedit(e.target.value);
    console.log(txtedit);
    }

  const handleEdit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const todo = {
      value: txtedit,
      date: new Date(),
      completed: false
    }
    setMyeditTxt(txtedit);
    handleTodoListEdit(todo);
    setTxtedit("");
  }

  return(      
    <form className="inputbox_wrap">
    <input maxLength={20} className="todo_inputbox" placeholder='할 일 입력' value={txt} onChange={onChangeHandler}/>
    <button className="input_button inputbox_buttons" onClick={handleSubmit}>
        등록
    </button>
      <input maxLength={20} className="edit_inputbox" placeholder='수정할 내용' value={txtedit} onChange={onChangeEditHandler}/>
      <button className="edit_button inputbox_buttons" onClick={(e)=>{handleEdit(e)}}>수정할 내용 담기</button>
    <div className="edit_text">수정할 내용:
        <span>{myeditTxt}</span>
      </div>
    </form>
  )
}

export default Inputbox
import React, { useState } from "react";
import { TodoList } from "../pages";
  
const Inputbox: React.FC<{
  newTodos: TodoList[]
  handleTodoListAdd: (todo: TodoList) => void
}> = ({newTodos, handleTodoListAdd}) => {
  
  const [txt, setTxt] = useState<string>("");

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
        completed: false,
        id: newTodos.length,
        isEdit:false
      }
      handleTodoListAdd(todo);
      setTxt("");
      
      console.log(todo.value);
    }

  return(      
    <form className="inputbox_wrap">
    <input name="todoItem" 
    maxLength={20} 
    className="todo_inputbox" 
    placeholder='할 일 입력' 
    value={txt} 
    onChange={onChangeHandler}/>
    <button className="input_button inputbox_buttons" 
    onClick={handleSubmit}>
        등록
    </button>
    </form>
  )
}

export default Inputbox
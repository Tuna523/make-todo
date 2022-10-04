import React, { useState } from "react";
import { TodoList } from "../pages";
import styles from "styled-components";

const InputboxWrap = styles.form`
  margin: auto;
  width: 55%;
`

const TodoInputbox = styles.input`
  min-height: auto;
  padding: 0.45em 0.75em;
  background-color: #f0f0f5;
  border: 1px solid gray;
  border-radius: 5px;
  &:focus{
    background-color: #b2b2d1;
  }
`

const InputButton = styles.button`
  background-color: rgb(110 220 110 / 20%);
  padding: 0.5rem 1rem 0.5rem 1rem!important;
  width: 5em;
  height: fit-content;
  white-space: nowrap;
  cursor:pointer;
  border: 1px solid gray;
  border-radius: 5px;
  transition: width 2s 1s;
  &:hover{
    background-color:#99d6ad;
    width: 8rem;
  }
`

const Inputbox: React.FC<{
  newTodos: TodoList[]
  handleTodoListAdd: (todo: TodoList) => void
  saveList: () => void
}> = ({newTodos, handleTodoListAdd, saveList}) => {
  
  const [txt, setTxt] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 1
        setTxt(e.target.value);
        saveList();
    
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
      saveList();
      
      console.log(todo.value);
    }

  return(      
    <InputboxWrap>
    <TodoInputbox name="todoItem" 
    maxLength={20} 
    placeholder='할 일 입력' 
    value={txt} 
    onChange={onChangeHandler}/>
    <InputButton 
    onClick={handleSubmit}>
        등록
    </InputButton>
    </InputboxWrap>
  )
}

export default Inputbox
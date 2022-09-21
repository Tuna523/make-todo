import type { NextPage } from 'next'
import Head from 'next/head'
import React, { Component, useState } from "react"
import List from "../components/List"
import Inputbox from '../components/Inputbox'

export type TodoList = {
  value: string, // 사용자가 뭘 입력했는지.....
  date: Date, // 언제 입력했는지
  completed: boolean,
}

const Home: React.FC<NextPage> = () => {
  
  // 추가과제
  // 메롱 11111
  // 0. 코드정리 필수~ ✔︎
  // 1. checked 여부 : boolean 타입에다가 추가해봅시당~  ✔
  // 2. 컴포넌트로 쪼개봅시다... (필수 ><) ✔︎
  // 3. 수정기능 추가해보자 ~ ✔︎(?)
  

  const [newTodos, setNewTodos] = useState<TodoList[]>([]);
  const [edit, setEdit] = useState<TodoList[]>([]);
  // 추가 함수
  const handleTodoListAdd = (todo: TodoList) => {
    setNewTodos(prev => ([...prev, todo]));
  }

  // 수정할 값을 받는 수정 함수
  const handleTodoListEdit = (todo: TodoList) => {
    setEdit([todo]);
    
  }
  // 실제 값을 바꾸는 버튼의 수정 함수
  const realEdit = (todo: TodoList, index: number) => {
    newTodos[index].value = edit[index=0].value;

    handleTodoListEdit(todo);
  }

  // 제거 함수
  const handleTodoListRemove = (index: number) => {
    setNewTodos(prev => prev.filter((_, i) => i !== index));
  }

  // 버튼 체크의 값 (boolean)
  const onClickHandler = (index: number, checked: boolean) => {

    console.log(index, checked);
    
    const news = newTodos;
    news[index].completed = !checked;

    setNewTodos([...news]);
  
  }

  return (
    <section className='outside padding_top padding_bottom padding_side'>
        <Head>
          <title>my todo list</title>
        </Head>
      <div className='row padding_top padding_bottom justify_content_center'>
        <div className='list_tab'>
          <h2 className='list_title'>To do List</h2>
        
          <List todoList={newTodos} handleTodoListRemove={handleTodoListRemove} onClickHandler={onClickHandler} realEdit={realEdit}/>

          <Inputbox todoList={newTodos} handleTodoListAdd={handleTodoListAdd} handleTodoListEdit={handleTodoListEdit} />
          </div>
      </div>
    </section>
  )
}

export default Home

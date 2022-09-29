import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from "react"
import List from "../components/List"
import Inputbox from '../components/Inputbox'
import styled from "styled-components"

export type TodoList = {
  value: string, // 사용자가 뭘 입력했는지.....
  date: Date, // 언제 입력했는지
  completed: boolean,
  id:number,
  isEdit:boolean
}

const SectionRoot = styled.section`
  background-color: #eee;
  border-radius: 10px;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`
const Row = styled.div`
  display:flex;
  padding-top: 3rem;
  padding-bottom: 3rem;
  justify-content: center;
`

const ListTab = styled.div`
  padding: 1.75rem 2.5rem 2.5rem 2.5rem;
  border:0;
  box-shadow: 0px 2.5px 10px 5px rgb(0 0 0 / 15%);
  background-color: white;
  border-radius: 0.7rem;
`

const ListTitle = styled.h2`
  text-align: center;
  padding: 0.75rem;
`

const SaveButton = styled.button`
  background-color: aquamarine;
  border: 1px solid gray;
  border-radius: 5px;
  float: right;
  cursor: pointer;
  padding: 0.5rem
`

function formatDate(dateString) {
  const input = new Date(dateString); // 등록한 시간
  let day = input.getDate(); // 일
  let month = input.getMonth() + 1; // 월 + 1
  let year = input.getFullYear(); // 년도
  
  var hours_before = new Date().getHours() - input.getHours();
  if(hours_before < 0){
    hours_before = 24 + hours_before
  }
  var minutes_before = new Date().getMinutes() - input.getMinutes();
  if(minutes_before < 0){
    minutes_before = 60 + seconds_before;
    minutes_before = hours_before - 1;
  }
  var seconds_before = new Date().getSeconds() - input.getSeconds();
  if(seconds_before < 0){
    seconds_before = 60 + seconds_before;
    minutes_before = minutes_before - 1;
  }
  var ymd = year + "/" + month + "/" + day; // 년/월/일 표시
  console.log(ymd); // console 창에서 확인하기
  return (
    `${ymd} ${input.getHours()}:${input.getMinutes()}:${input.getSeconds()}
    , ${hours_before}시간 ${minutes_before}분 ${seconds_before}초 전`
  )
}

const Home: React.FC<NextPage> = () => {
  
  const [didMount, setDidMount] = useState(false)
  const [newTodos, setNewTodos] = useState<TodoList[]>([]);
  
  // 첫 렌더시 실행되는 로직
  useEffect(() => {
    if(!didMount) setDidMount(true)
    const data = localStorage.getItem('my_todo');
    if ( data !== null ) setNewTodos(JSON.parse(data));
  }, []);

  useEffect(() => {
    // didMount는 위에있는 로직이 실행되어야 true가 됨.
    // 즉 렌더가 되어야 실행되는 로직
    if (didMount) {
      localStorage.setItem('my_todo', JSON.stringify(newTodos))
    }
  }, [newTodos])
  
  function saveList(){
    localStorage.setItem('my_todo', JSON.stringify(newTodos));
  }
  
  // 추가 함수
  const handleTodoListAdd = (todo: TodoList) => {
    setNewTodos(prev => ([...prev, todo]));
    saveList()
  }
  
  // 제거 함수
  const handleTodoListRemove = (index: number) => {
    setNewTodos(prev => prev.filter((_, i) => i !== index));
    saveList()
  }
  
  // 버튼 체크의 값 (boolean)
  const onClickHandler = (index: number, checked: boolean) => {
    
    console.log(index, checked);
    
    const news = newTodos;
    news[index].completed = !checked;
    
    setNewTodos([...news]);
  }
  

  return (
    <SectionRoot>
        <Head>
          <title>my todo list</title>
        </Head>
      <Row>
        <ListTab>
          <ListTitle>To do List</ListTitle>
        
          <List handleTodoListRemove={handleTodoListRemove}
          onClickHandler={onClickHandler} newTodos={newTodos} setNewTodos={setNewTodos} formatDate={formatDate}
          saveList={saveList} />

          <Inputbox newTodos={newTodos} handleTodoListAdd={handleTodoListAdd} saveList={saveList}/>
          
          <SaveButton onClick={(event)=>{event.preventDefault(); saveList()}}>내용 저장</SaveButton>
          </ListTab>
      </Row>
    </SectionRoot>
  )
}

export default Home


// 추가과제
// 메롱 11111
// 0. 코드정리 필수~ ✔︎
// 1. checked 여부 : boolean 타입에다가 추가해봅시당~  ✔
// 2. 컴포넌트로 쪼개봅시다... (필수 ><) ✔︎
// 3. 수정기능 추가해보자 ~ ✔︎(?)

// 0921 ==============================================================================================================================
// 등록한 todo가 몇분전인지 ✔︎

// 수정버튼 수정 ✔︎(?)

// 로컬 스토리지
// 1. 페이지 접근시, 로컬스트리지에 이전에 저장한 투두리스트 목록이 있는지 검사
// 2. 만약 있다? -> 노출
// 3. 없다 -> 빈화면

// 사용자가 투두리스트를 추가한다
// 로컬스토리지에도 추가한다

// 사용자가 투두리스트를 수정하거나 삭제한다
// 로컬스토리지에 있는 값도 변경된다.



// 로컬스토리지에 저장하는 법
// 로컬스토리지에 가져오는 법 
// =================================================================================================================================

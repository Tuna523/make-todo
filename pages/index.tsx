import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from "react"
import List from "../components/List"
import Inputbox from '../components/Inputbox'

export type TodoList = {
  value: string, // 사용자가 뭘 입력했는지.....
  date: Date, // 언제 입력했는지
  completed: boolean,
  id:number,
  isEdit:boolean
}
function formatDate(dateString) {
  const input = new Date(dateString);
  let day = input.getDate(); // 일
  let month = input.getMonth() + 1; // 월 + 1
  let year = input.getFullYear(); // 년도
  var hours_before = new Date().getHours() - input.getHours();
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
  
  const [newTodos, setNewTodos] = useState<TodoList[]>([]);
  
  useEffect(() => {
    const data = localStorage.getItem('my_todo');
    if ( data !== null ) setNewTodos(JSON.parse(data));
  }, []);
  
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
    <section className='outside padding_top padding_bottom padding_side'>
        <Head>
          <title>my todo list</title>
        </Head>
      <div className='row padding_top padding_bottom justify_content_center'>
        <div className='list_tab'>
          <h2 className='list_title'>To do List</h2>
        
          <List handleTodoListRemove={handleTodoListRemove}
          onClickHandler={onClickHandler} newTodos={newTodos} setNewTodos={setNewTodos} formatDate={formatDate}
          saveList={saveList} />

          <Inputbox newTodos={newTodos} handleTodoListAdd={handleTodoListAdd} saveList={saveList}/>
          </div>
      </div>
    </section>
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

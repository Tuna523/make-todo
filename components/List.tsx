import React, { useState, useRef, useEffect } from "react";
import { TodoList } from "../pages";


const formatDate = (input: Date) => {
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

const List: React.FC<{

  handleTodoListRemove: (index:number) => void
  onClickHandler: (index:number, checked: boolean) => void
  newTodos:TodoList[]
  setNewTodos:React.Dispatch<React.SetStateAction<TodoList[]>>

}> = ({handleTodoListRemove,onClickHandler,newTodos,setNewTodos}) => {

    const editInputRef = useRef(null);

    // 삭제함수
    const handleRemove = (event:React.SyntheticEvent<HTMLButtonElement>,index:number) => {
      event.preventDefault();
      handleTodoListRemove(index);
    }
    
    // 버튼 체크의 값 (boolean)
    const booleanhandler = (event:React.ChangeEvent<HTMLInputElement>, index: number,checked: boolean) => {

      onClickHandler(index, checked);}

      const isEdit = (id:number) => {
        setNewTodos(
          newTodos.map((mytext)=>{
            if (mytext.id === id) {
              mytext.isEdit = !mytext.isEdit;
            }
            return mytext;
          })
          )
        }
        const editButton = (event,id:number) => {
          event.preventDefault()
          isEdit(id);
        }
        
    const onChange = (event:React.ChangeEvent<HTMLInputElement>, id:number) => {
      setNewTodos(
        newTodos.map((mytext) => {
          if (mytext.id === id) {
            mytext.value = event.target.value;
          }
          return mytext;
        })
      )
    }

    return(
    <div>
      {newTodos.map((mytext,index)=>{
      return(
      <form className="list_wrap" key={index}>
        <div className="list_content">
          <input id="checkButton"
          className={mytext.completed ? 'activated' : ''}
          type={'checkbox'}
          onChange={(event)=>{ booleanhandler(event, index, mytext.completed) }}
          />
          <span>{mytext.value} {formatDate(mytext.date)}</span>
          </div>
          <span className="list_button_wrap">
            {mytext.isEdit ? (
              <input
              maxLength={15}
              type="text"
              defaultValue={mytext.value}
              ref={editInputRef}
              autoFocus
              onChange={(event) => onChange(event, mytext.id)}
              />
            ) : (
              <span></span>
            )}
            {mytext.isEdit ? (
              <button className="edit_button list_buttons" onClick={() => editButton(event,mytext.id)}>완료</button>
            ):(
              <button className="edit_button list_buttons" onClick={() => editButton(event,mytext.id)}>수정</button>
            )}
            
            <button className="remove_button list_buttons" onClick={(event)=>{handleRemove(event, index)}}>제거</button>
          </span>
          <div className="time_wrap">
            <input type={'date'}></input>
            <input type={'time'}></input>
          </div>
        </form>
        )
    })}
  </div>
)
}

export default List;
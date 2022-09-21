import React, { useState } from "react";
import { TodoList } from "../pages";


const formatDate = (input: Date) => {
    let day = input.getDate(); // 일
    let month = input.getMonth() + 1; // 월 + 1
    let year = input.getFullYear(); // 년도
    var hours_before = new Date().getHours() - input.getHours();
    var minutes_before = new Date().getMinutes() - input.getMinutes();
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
  todoList: TodoList[]
  handleTodoListRemove: (index:number) => void
  onClickHandler: (index:number, checked: boolean) => void
  realEdit: (todo:TodoList, index:number) => void
}> = ({todoList,handleTodoListRemove,onClickHandler,realEdit}) => {

  //const [editmod, setEditmod] = useState(false);

    // 삭제함수
    const handleRemove = (event:React.SyntheticEvent<HTMLButtonElement>,index:number) => {
      event.preventDefault();
      handleTodoListRemove(index);
    // setNewTodos(prev => prev.filter((_, i) => i !== index))
    }
    
    // 버튼 체크의 값 (boolean)
    const booleanhandler = (event:React.ChangeEvent<HTMLInputElement>, index: number,checked: boolean) => {

      onClickHandler(index, checked);}

    const EditButton = (event:React.SyntheticEvent<HTMLButtonElement>, index: number, todo: TodoList) => {
      event.preventDefault();
      realEdit (todo,index);
    }
  
    console.log(todoList);
  
    return(
    <div>
      {todoList.map((mytext,index)=>{
      return(
      <form className="list_wrap" key={index}>
        <div className="list_content">
          <input id="checkButton"
          className={mytext.completed ? 'activated' : ''}
          /* id='CheckButton' */ type={'checkbox'}
          // defaultChecked={mytext.completed}
          onChange={(event)=>{ booleanhandler(event, index, mytext.completed) }}
          />
          <span>{mytext.value} {/* index:{index} */} {formatDate(mytext.date)}</span>
          </div>
          <span className="list_button_wrap">
            <button className="edit_button list_buttons" onClick={(event)=>{EditButton(event, index, mytext)}}>수정</button>
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
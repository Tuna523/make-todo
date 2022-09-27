import React, { useRef } from "react";
import { TodoList } from "../pages";
import Time from "./Time";

const List: React.FC<{

  handleTodoListRemove: (index:number) => void
  onClickHandler: (index:number, checked: boolean) => void
  newTodos:TodoList[]
  setNewTodos:React.Dispatch<React.SetStateAction<TodoList[]>>
  formatDate:(input:Date) => string
  saveList:() => void

}> = ({handleTodoListRemove,onClickHandler,newTodos,setNewTodos,formatDate,saveList}) => {

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
          saveList();
        }
        
    const onChange = (event:React.ChangeEvent<HTMLInputElement>, id:number) => {
      saveList();
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
          defaultChecked={mytext.completed}
          className={mytext.completed ? 'activated' : ''}
          type={'checkbox'}
          onChange={(event)=>{ booleanhandler(event, index, mytext.completed) }}
          onClick={()=>saveList()}
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
              <button className="edit_button list_buttons" onClick={(event) => editButton(event,mytext.id)}>완료</button>
            ):(
              <button className="edit_button list_buttons" onClick={(event) => editButton(event,mytext.id)}>수정</button>
            )}
            
            <button className="remove_button list_buttons" onClick={(event)=>{handleRemove(event, index)}}>제거</button>
          </span>
          <div className="time_wrap">
            <Time/>
          </div>
        </form>
        )
    })}
  </div>
)
}

export default List;
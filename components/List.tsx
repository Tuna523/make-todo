import React, { useRef } from "react";
import { TodoList } from "../pages";
import Time from "./Time";
import styles from "styled-components"

const ListWrap = styles.form`
  padding: 15px 15px 7.5px 15px;
  width: 40rem;
  border-bottom: 1.5px solid gray;
`

const ListContent = styles.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

const CheckButton = styles.input`
  cursor: pointer;
`

const TextSpace = styles.div`
  text-decoration: ${props => props.active  ? 'line-through' : 'none'};
  color: ${props => props.active ? 'gray' : 'black'};
  display: flex;
  gap: 4px;
`
const ListButtonWrap = styles.span`
  display:block;
  float:right;
`

const EditButton = styles.button`
  padding: 0.25rem 0.75rem 0.25rem 0.75rem;
  max-height: fit-content;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(110 220 110 / 60%);
  &: hover {
    background-color: #66c285;
  }
`

const RemoveButton = styles.button`
  padding: 0.25rem 0.75rem 0.25rem 0.75rem;
  max-height: fit-content;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(255 50 30 / 40%);
  &: hover {
    background-color: #ff8c8c;
  }
`

const TimeWrap = styles.div`
  display:flex;
  gap: 2rem;
`

const InputText = styles.input`
  background-color: ${props => props.editting ? '' : '#f0f0f5'};
  border: 1px solid black;
  border-radius: 5px;
`

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
      <ListWrap key={index}>
        <ListContent>
          <CheckButton
          defaultChecked={mytext.completed}
          type={'checkbox'}
          onChange={(event)=>{ booleanhandler(event, index, mytext.completed) }}
          onClick={()=>saveList()}
          />
          <TextSpace active={mytext.completed}>
              <span>{mytext.isEdit ? (
                  <InputText prop={mytext.isEdit}
                  maxLength={15}
                  type="text"
                  defaultValue={mytext.value}
                  ref={editInputRef}
                  autoFocus
                  onChange={(event) => onChange(event, mytext.id)}
                  />
                ) : (
                  mytext.value
                )}</span>
                <span>{formatDate(mytext.date)}</span>
             </TextSpace>
          </ListContent>
          <ListButtonWrap>
            {/* {mytext.isEdit ? (
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
            )} */}
            {mytext.isEdit ? (
              <EditButton onClick={(event) => editButton(event,mytext.id)}>완료</EditButton>
            ):(
              <EditButton onClick={(event) => editButton(event,mytext.id)}>수정</EditButton>
            )}
            
            <RemoveButton onClick={(event)=>{handleRemove(event, index)}}>제거</RemoveButton>
          </ListButtonWrap>
          <TimeWrap>
            <Time/>
          </TimeWrap>
        </ListWrap>
        )
    })}
  </div>
)
}

export default List;
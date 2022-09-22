import React, { useEffect, useRef, useState } from 'react';
import { TodoList } from '../pages';



const QPPO444123123odasfd231231231111oItem:React.FC<{
  todoItem
  todoList: TodoList[]
}> = ({ todoItem, todoList }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todoItem.text);
  const [newtodos, setNewTodos] = useState<TodoList[]>([]);
  const editInputRef = useRef(null);

  useEffect(() => {
    // edit 모드일때 포커싱을 한다.
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };

  const onClickSubmitButton = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      text: item.id === todoItem.id ? newText : item.value, // 새로운 아이템 내용을 넣어줌
    }));
    setNewTodos(nextTodoList);

    setEdited(false);
    console.log(newtodos)
  };

  return (
    <li className="todoapp__item">
      {
        edited ? (
          <input
            maxLength={15}
            type="text"
            className="todoapp__item-edit-input"
            value={newText||''}
            ref={editInputRef}
            onChange={onChangeEditInput}
          />
        ) : (
          <span
            className={`todoapp__item-ctx`}
          >
            {todoItem.text}
          </span>
        )
      }
      {
        // 수정 버튼
        // 완료한 일인 경우에는 null을 반환하여 보이지 않도록 함
          edited ? (
            <button
              type="button"
              className="edit_button list_buttons"
              onClick={onClickSubmitButton}
            >
              OK
            </button>
          ) : (
            <button
              type="button"
              className="edit_button list_buttons"
              onClick={onClickEditButton}
            >
              수수수
            </button>
          )
      }

    </li>
  );
};

export default QPPO444123123odasfd231231231111oItem;
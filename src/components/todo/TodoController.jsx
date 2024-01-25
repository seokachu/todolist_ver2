import React, { useState } from 'react';
import uuid from 'react-uuid';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoController() {
    /** form 요소 state */
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [todocards, setTodoCards] = useState([
        // {
        //     id: 0,
        //     title: '',
        //     contents: '',
        //     done: false,
        // },
    ]);

    //error
    const [titleError, setTitleError] = useState('');
    const [contentsError, setContentsError] = useState('');

    //random
    const [color, setColor] = useState([
        'ebebeb',
        'a9c4fc',
        '9df3fe',
        'fff199',
        'ffbfc0',
        'a6ff9e',
    ]);

    /** 함수선언 */
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
        if (e.target.value !== '') {
            setTitleError('');
        }
    };

    const onChangeContents = (e) => {
        setContents(e.target.value);
        if (e.target.value !== '') {
            setContentsError('');
        }
    };

    //제출 form
    const onHandleTodoSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            setTitleError('제목을 입력해 주세요.');
        } else {
            setTitleError('');
        }

        if (!contents) {
            setContentsError('내용을 입력해 주세요.');
        } else {
            setContentsError('');
        }

        if (title && contents) {
            alert('게시글이 등록되었습니다.');

            const newTodoListItems = {
                id: uuid(),
                title,
                contents,
                done: false,
                color: randomCardColor(),
            };

            setTodoCards([...todocards, newTodoListItems]);
            setTitle('');
            setContents('');
        }
    };

    //삭제Btn
    const onClickHandleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const delTodoListItem = todocards.filter((item) => item.id !== id);
            setTodoCards(delTodoListItem);
        } else {
            return false;
        }
    };

    //완료, 취소 Btn
    // const onClickHandleToggle = (id) => {
    //     const isDoneTodoList = todocards.map((item) => {
    //         if (item.id === id) {
    //             return { ...item, done: !item.done };
    //         }
    //         return item;
    //     });
    //     setTodoCards(isDoneTodoList);
    // };

    //완료, 취소 btn 클릭시 배열 뒤로 넣기
    const onClickHandleToggle = (id) => {
        const doneItemIndex = todocards.findIndex((item) => item.id === id);

        if (doneItemIndex !== -1) {
            //-1이 아닌경우, 즉 해당Id값을 가진 항목이 배열에 존재함
            const doneItem = todocards[doneItemIndex];
            const updatedTodoCard = [
                ...todocards.slice(0, doneItemIndex), //이전요소복사
                ...todocards.slice(doneItemIndex + 1), //이후요소복사
                { ...doneItem, done: !doneItem.done }, //객체속성초기화
            ];
            setTodoCards(updatedTodoCard);
        }
    };

    //Random color
    const randomCardColor = () => {
        const random = Math.floor(Math.random() * color.length);
        return `#${color[random]}`;
    };

    return (
        <main>
            <TodoForm
                props={{
                    title,
                    contents,
                    titleError,
                    contentsError,
                    onChangeTitle,
                    onChangeContents,
                    onHandleTodoSubmit,
                }}
            />
            <TodoList
                workingTodos={todocards.filter((todo) => !todo.done)}
                doneTodos={todocards.filter((todo) => todo.done)}
                onClickHandleDelete={onClickHandleDelete}
                onClickHandleToggle={onClickHandleToggle}
                randomCardColor={randomCardColor}
            />
        </main>
    );
}

export default TodoController;

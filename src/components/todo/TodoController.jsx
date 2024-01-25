import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoController() {
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
                id: todocards.length + 1,
                title,
                contents,
                done: false,
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
            // 사용자가 취소한 경우의 로직
            return false;
        }
    };

    //완료, 취소 Btn
    const onClickHandleToggle = (id) => {
        const isDoneTodoList = todocards.map((item) => {
            if (item.id === id) {
                return { ...item, done: !item.done };
            }
            return item;
        });
        setTodoCards(isDoneTodoList);
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
            />
        </main>
    );
}

export default TodoController;

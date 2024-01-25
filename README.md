`배포 링크 이동하기` : https://seokachu.github.io/todoList-develop
# React로 TodoList 만들기

![Jan-22-2024 15-25-45](https://github.com/seokachu/todo_list/assets/116704646/7877cf88-c99b-48dd-8095-d82c1665b749)

<br>
<br>

## features Ver.2
- UI 구현하기
- Todo 추가 하기
- Todo 삭제 하기
- Todo 완료 상태 변경하기 (완료 ↔ 진행중)
- `new`: 컴포넌트 분리
- `new`: 폼 벨리데이션 추가
  
<br>
<br>

## 이번 todoList를 만들며 공부한 내용
1. **JSX 문법**이란 무엇일까요?<br>
► javascript XML이라는 문법확장으로, 자바스크립트 코드안에서 html과 유사한 문법을 사용할 수 있게 해준다.<br>
자바스크립트와 같은 확장자 이지만, 컴포넌트끼리는 .jsx 확장자를 사용하여 컴포넌트끼리 묶어서 직관적으로 보여주게 해준다. 협업에 유용하다.

2. 사용자가 입력하는 값, 또는 이미 입력된 값, 투두의 타이들과 같은 **애플리케이션의 상태를 관리하기 위해 리액트의 어떤 기능을 사용하셨나요**?<br>
► useState(), hook 패턴을 사용해서 함수형 컴포넌트에서 상태와 생명주기를 사용하여 상태관리를 좀더 유용하게 해줄 수 있다.

3. 애플리케이션의 **상태 값들을 컴포넌트 간 어떤 방식으로 공유하셨나요**?<br>
► props전달 방식으로 부모 컨포넌트에서 자식 컴포넌트로 데이터 전달을 하여 상태를 공유하였다. 

4. 기능 구현을 위해 **불변성 유지가** 필요한 부분이 있었다면 하나만 설명해 주세요.<br>
► todoList안에 있는 카드 리스트에 있는 배열을 유지하려고 할때, 동일한 배열을 참조하기 때문에 기존 상태를 직접 수정하지 않고 상태 변경을 감지하여 컴포넌트를 효율적으로 다시 랜더링 해야하는것을 알게 되었다. <br> 스프레드 문법으로 새로운 배열을 다시 재배치하여 객체의 내용을 담는방식으로 진행하였다.<br> 원본 배열을 변형하게 된다면 유지보수가 어려워지고, 불변성을 유지해야 컴포넌트간의 데이터 변경을 더 효율적으로 감지하게되고 예측 가능할 수 있기 때문에 안정적인 어플리케이션을 유지할 수 있다.

5. 반복되는 컴포넌트를 파악하고 재사용할 수 있는 **컴포넌트로 분리해 보셨나요?** 그렇다면 **어떠한 이점이 있었나요?**<br>
► 반복되는 패턴은 컴포넌트를 함수로 분리하여 연결, 분리하였다. <br> 이렇게 진행하면 유지보수가 쉽고, 재사용성이 쉬워지고, 컴포넌트의 독립성, 가독성, UI적으로 개발을 좀더 용이하게 개발할 수 있다.

<br>
<br>

## develop 버전에서는 컴포넌트 재사용성을 위한 분리작업, 폼 벨리데이션을 추가하였다.
![image](https://github.com/seokachu/todoList-develop/assets/116704646/c18730ab-ac62-4052-9c3e-a7ada8ffb9c3)
<br><br>
![image](https://github.com/seokachu/todoList-develop/assets/116704646/d546da04-a844-42b9-9c3e-b7e0a1c0bc99)
<br><br>폼 벨리데이션, 알럿창 추가
<br><br><br><br>

![image](https://github.com/seokachu/todoList-develop/assets/116704646/d8ba0233-813e-4525-9297-e60633a31aa9)
<br><br>컴포넌트 분리작업
<br><br><br><br>


![image](https://github.com/seokachu/todoList-develop/assets/116704646/115259c8-dc00-448a-b6d2-48530d426d89)
<br><br>랜덤 카드 색상으로 사용자 UI/UX 향상
<br><br><br><br>

## 컴포넌트 중복 코드 함수화
```javascript

import TodoItems from './TodoItems';

function TodoList({
    workingTodos,
    doneTodos,
    onClickHandleDelete,
    onClickHandleToggle,
    randomCardColor,
}) {
    const renderTodoItems = (todos, title) => (
        <section>
            <h2>{title}</h2>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <TodoItems
                        key={todo.id}
                        todo={todo}
                        onClickHandleDelete={onClickHandleDelete}
                        onClickHandleToggle={onClickHandleToggle}
                        randomCardColor={randomCardColor}
                        style={{
                            backgroundColor: todo.color,
                        }}
                    />
                ))}
            </ul>
        </section>
    );

    return (
        <>
            {renderTodoItems(workingTodos, '✍️ WORKING')}
            {renderTodoItems(doneTodos, '🌟 DONE')}
        </>
    );
}

export default TodoList;

```

<br><br><br>
## TodoController.jsx에 함수 몰아넣기 (유지보수를 위해 모아둠)

```javascript
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

```


<br><br><br>
## 나머지 자식 컴파일러들은 props로 연결
### TodoForm.jsx
```javascript
export default function TodoForm({ props }) {
    const {
        title,
        contents,
        onChangeTitle,
        onChangeContents,
        onHandleTodoSubmit,
        titleError,
        contentsError,
    } = props;
    return (
        <form>
            <div className="input-form">
                <p>
                    <input
                        type="text"
                        placeholder="제목을 입력해 주세요."
                        autoFocus
                        value={title}
                        onChange={onChangeTitle}
                    />
                    <span className="error">{titleError}</span>
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="내용을 입력해 주세요."
                        value={contents}
                        onChange={onChangeContents}
                    />
                    <span className="error">{contentsError}</span>
                </p>
                <button type="submit" onClick={onHandleTodoSubmit}>
                    등록하기
                </button>
            </div>
        </form>
    );
}

```
<br><br>
### TodoList.jsx
```javascript
import TodoItems from './TodoItems';

function TodoList({
    workingTodos,
    doneTodos,
    onClickHandleDelete,
    onClickHandleToggle,
    randomCardColor,
}) {
    const renderTodoItems = (todos, title) => (
        <section>
            <h2>{title}</h2>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <TodoItems
                        key={todo.id}
                        todo={todo}
                        onClickHandleDelete={onClickHandleDelete}
                        onClickHandleToggle={onClickHandleToggle}
                        randomCardColor={randomCardColor}
                        style={{
                            backgroundColor: todo.color,
                        }}
                    />
                ))}
            </ul>
        </section>
    );

    return (
        <>
            {renderTodoItems(workingTodos, '✍️ WORKING')}
            {renderTodoItems(doneTodos, '🌟 DONE')}
        </>
    );
}

export default TodoList;

```

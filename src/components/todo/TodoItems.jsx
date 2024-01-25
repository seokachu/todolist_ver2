function TodoItems({ todo, onClickHandleToggle, onClickHandleDelete, style }) {
    return (
        <li className="todo-card-lists" style={style}>
            <article>
                <h3>{todo.title}</h3>
                <p>{todo.contents}</p>
                <div>
                    <button onClick={() => onClickHandleDelete(todo.id)}>
                        삭제하기
                    </button>
                    <button onClick={() => onClickHandleToggle(todo.id)}>
                        {todo.done ? '취소' : '완료'}
                    </button>
                </div>
            </article>
        </li>
    );
}

export default TodoItems;

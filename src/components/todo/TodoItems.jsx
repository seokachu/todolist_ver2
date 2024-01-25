function TodoItems({ todo, onClickHandleToggle, onClickHandleDelete }) {
    return (
        <div>
            <li>
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
        </div>
    );
}

export default TodoItems;

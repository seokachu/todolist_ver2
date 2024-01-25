import TodoItems from './TodoItems';

function TodoList({
    workingTodos,
    doneTodos,
    onClickHandleDelete,
    onClickHandleToggle,
}) {
    return (
        <div>
            <section>
                <h2>Working</h2>
                <ul>
                    {workingTodos.map((todo) => (
                        <TodoItems
                            key={todo.id}
                            todo={todo}
                            onClickHandleDelete={onClickHandleDelete}
                            onClickHandleToggle={onClickHandleToggle}
                        />
                    ))}
                </ul>
            </section>
            <section>
                <h2>Done</h2>
                <ul>
                    {doneTodos.map((todo) => (
                        <TodoItems
                            key={todo.id}
                            todo={todo}
                            onClickHandleDelete={onClickHandleDelete}
                            onClickHandleToggle={onClickHandleToggle}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default TodoList;

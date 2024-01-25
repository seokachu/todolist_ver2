import TodoItems from './TodoItems';

function TodoList({
    workingTodos,
    doneTodos,
    onClickHandleDelete,
    onClickHandleToggle,
}) {
    const renderTodoItems = (todos) => (
        <ul>
            {todos.map((todo) => (
                <TodoItems
                    key={todo.id}
                    todo={todo}
                    onClickHandleDelete={onClickHandleDelete}
                    onClickHandleToggle={onClickHandleToggle}
                />
            ))}
        </ul>
    );

    return (
        <div>
            <section>
                <h2>Working</h2>
                {renderTodoItems(workingTodos)}
            </section>
            <section>
                <h2>Done</h2>
                {renderTodoItems(doneTodos)}
            </section>
        </div>
    );
}

export default TodoList;

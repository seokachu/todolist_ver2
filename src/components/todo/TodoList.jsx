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

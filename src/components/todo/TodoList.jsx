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
            <ul>
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
        <div>
            {renderTodoItems(workingTodos, 'Working')}
            {renderTodoItems(doneTodos, 'Done')}
        </div>
    );
}

export default TodoList;

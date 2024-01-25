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

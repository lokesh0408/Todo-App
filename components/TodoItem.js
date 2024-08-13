import styles from "../styles/Home.module.css";

export default function TodoItem({
  todo,
  deleteTodo,
  startEditing,
  cancelEditing,
  editTodo,
  editingId,
  editingText,
  setEditingText
}) {
  const isEditing = editingId === todo.id;

  return (
    <li className={styles.todoItem}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className={styles.input}
          />
          <button onClick={() => editTodo(todo.id)} className={styles.button}>
            Save
          </button>
          <button onClick={cancelEditing} className={styles.button}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={() => startEditing(todo.id, todo.text)} className={styles.editButton}>
            Edit
          </button>
          <button onClick={() => deleteTodo(todo.id)} className={styles.deleteButton}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}

import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import styles from "../styles/Home.module.css";
import TodoItem from "../components/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const fetchTodos = async () => {
    const todosCollection = collection(db, "todos");
    const todosSnapshot = await getDocs(todosCollection);
    const todosList = todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(todosList);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    const docRef = await addDoc(collection(db, "todos"), {
      text: newTodo,
    });
    setTodos([...todos, { id: docRef.id, text: newTodo }]);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const editTodo = async (id) => {
    if (editingText.trim() === "") return;

    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { text: editingText });

    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editingText } : todo
    ));

    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="container">
      <h1 className={styles.header}>Todo List</h1>
      <span>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className={styles.input}
        placeholder="Enter new todo"
      />
      <button onClick={addTodo} className={styles.button}>Add</button>
      </span>
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            startEditing={startEditing}
            cancelEditing={cancelEditing}
            editTodo={editTodo}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
          />
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from "react"
import axios from "axios"
import Todo from "./Todo"
import CreateTodo from "./CreateTodo"
function TodoAll() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get("http://localhost:3001/todos")
      setTodos(data)
    }
    getTodos()
  }, [])

  useEffect(() => {
    setNewTodo("")
    if (popupActive) {
      document.getElementById("todo-input").focus()
    }
  }, [popupActive])

  const completeTodo = async (id) => {
    const { data } = await axios.put(
      `http://localhost:3001/todos/complete/${id}`
    )
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete
        }
        return todo
      })
    )
  }

  const deleteTodo = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:3001/todos/deleteTodo/${id}`
    )
    setTodos(todos.filter((todo) => todo._id !== data._id))
  }

  const addTodo = async (text) => {
    const { data } = await axios.post(`http://localhost:3001/todos/new/`, {
      text: text,
    })
    setTodos([...todos, data])
    setPopupActive(false)
  }
  return (
    <>
      {todos
        ? todos.map((todo) => {
            return (
              <div key={todo._id}>
                <Todo todo={todo} toggle={completeTodo} del={deleteTodo} />
              </div>
            )
          })
        : null}
      <CreateTodo set={setPopupActive} />
      {popupActive ? (
        <div className="popup">
          <div
            className="closePopup"
            onClick={() => {
              setPopupActive(false)
            }}
          >
            x
          </div>
          <div className="content">
            <h3>add task</h3>
            <input
              id="todo-input"
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
              onKeyDown={(e) => e.key === "Enter" && addTodo(newTodo)}
            />
            <div className="button" onClick={() => addTodo(newTodo)}>
              Create task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default TodoAll

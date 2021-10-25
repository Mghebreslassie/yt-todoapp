import React from "react"

function Todo({ todo, del, toggle }) {
  return (
    <div className={`todo ${todo.complete ? "is-complete" : ""}`}>
      <div className="checkbox" onClick={() => toggle(todo._id)}></div>
      <div className="text">{todo.text}</div>
      <div className="delete-todo" onClick={() => del(todo._id)}>
        x
      </div>
    </div>
  )
}

export default Todo

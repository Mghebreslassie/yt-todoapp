import React from "react"

function CreateTodo({ set }) {
  return (
    <div
      className="addPopup"
      onClick={() => {
        set(true)
      }}
    >
      +
    </div>
  )
}

export default CreateTodo

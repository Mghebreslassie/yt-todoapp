import TodoAll from "./components/TodoAll"
function App() {
  return (
    <div>
      <h1>Welcome</h1>
      <h4>Your tasks</h4>
      <div className="todos">
        <TodoAll />
      </div>
    </div>
  )
}

export default App

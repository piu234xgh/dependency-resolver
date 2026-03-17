import React, { useState } from "react"
import axios from "axios"
import "./App.css"

function App() {

  const [tasks,setTasks] = useState("")
  const [deps,setDeps] = useState("")
  const [result,setResult] = useState([])

  const resolveDependency = async () => {

    const taskList = tasks.split(",")

    const depList = deps.split(";").map(d=>{
      const pair = d.split(",")
      return [pair[0],pair[1]]
    })

    try{

      const res = await axios.post(
        "http://localhost:5000/resolve",
        {
          tasks:taskList,
          dependencies:depList
        }
      )

      setResult(res.data.executionOrder)

    }catch(err){

      alert("Error resolving dependencies")

    }

  }

  return (

    <div className="container">

      <h1>Smart Dependency Resolver</h1>

      <div className="card">

        <label>Tasks (comma separated)</label>

        <input
          value={tasks}
          onChange={(e)=>setTasks(e.target.value)}
          placeholder="A,B,C,D"
        />

        <label>Dependencies (A,B ; B,C)</label>

        <input
          value={deps}
          onChange={(e)=>setDeps(e.target.value)}
          placeholder="A,B;A,C;B,D;C,D"
        />

        <button onClick={resolveDependency}>
          Resolve Dependency
        </button>

      </div>

      <div className="result">

        <h2>Execution Order</h2>

        <p>
          {result.map((r,i)=>(
            <span key={i}>{r} → </span>
          ))}
        </p>

      </div>

    </div>

  )
}

export default App
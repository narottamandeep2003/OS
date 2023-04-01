import React, { useState } from 'react'
import SjfSolver from './SJF'
import SjrfSolver from './SJRF';


export default function HomeM() {
  const [SAlgo, setSAlgo] = useState(true);
  const [CView, SCView] = useState(true);
  const [sol, setSol] = useState([])
  const [AT, SAT] = useState("")
  const [BT, SBT] = useState("")
  const [AvgTat, SAvgTat] = useState(0)
  const [AvgWat, SAvgWat] = useState(0)


  const handleclick1 = () => {
    if (!SAlgo) {
      setSAlgo(!SAlgo)
    }

    let A = AT.trim().split(" ")
    let B = BT.trim().split(" ")
    if (AT.trim().length !== 0 && BT.trim().length !== 0) {

      A = A.map((s) => {
        if (isNaN(Number(s))) {
          return 0
        }
        return Number(s)
      })
      B = B.map((s) => {
        if (isNaN(Number(s))) {
          return 0
        }
        return Number(s)
      })

      if (A.length === B.length) {
        let obj = SjfSolver(A, B);
        let ans = obj.chart
        setSol(ans)
        SAvgTat((obj.avgTat).toPrecision(3))
        SAvgWat((obj.avgWat).toPrecision(3))
        SCView(!CView)
      }
      console.log(A)
      console.log(B)

    }

  }
  const handleclick2 = () => {

    if (SAlgo) {
      setSAlgo(!SAlgo)
    }

    let A = AT.trim().split(" ")
    let B = BT.trim().split(" ")
    if (AT.trim().length !== 0 && BT.trim().length !== 0) {
      A = A.map((s) => {
        if (isNaN(Number(s))) {
          return 0
        }
        return Number(s)
      })
      B = B.map((s) => {
        if (isNaN(Number(s))) {
          return 0
        }
        return Number(s)
      })
      if (A.length === 0 || B.length === 0) {
        return
      }
      if (A.length === B.length) {

        let obj = SjrfSolver(A, B)
        let ans = obj.chart
        SAvgTat((obj.avgTat).toPrecision(3))
        SAvgWat((obj.avgWat).toPrecision(3))
        setSol(ans)
        SCView(!CView)
      }
      console.log(A)
      console.log(B)
    }
  }
  return (
    <>
      {(CView) ? (
        <div className='conMain'>
          <div className="first">
            <h2>Shortest Job First</h2>
            <p>The shortest job first (SJF) or shortest job next, is a scheduling policy that selects the waiting process with the smallest execution time to execute next. SJN, also known as Shortest Job Next (SJN)</p>
            <div className="outerBtn">
              <button className='btn btn1' onClick={() => { window.open('https://www.geeksforgeeks.org/program-for-shortest-job-first-or-sjf-cpu-scheduling-set-1-non-preemptive/', '_blank', 'noreferrer'); }}>Learn more </button>
            </div>
          </div>
          <div className="second">
            <div className='box'>
              <div className="form-group input1">
                <label htmlFor="exampleFormControlInput1">Arrival Time</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" value={AT} placeholder="ex. 2 3 5 6" onChange={(e) => {
                  SAT(e.target.value)
                }} />
              </div>
              <div className="form-group input1">
                <label htmlFor="exampleFormControlInput2">Burst Time </label>
                <input type="text" className="form-control" id="exampleFormControlInput2" value={BT} placeholder="ex. 1 7 2 3" onChange={(e) => {
                  SBT(e.target.value)
                }} />
              </div>

              <div className='Btns'>
                <button className={`btn btn-primary sBtn ${(SAlgo) ? "active" : ""} `} onClick={handleclick1}>SJF</button>
                <button className={`btn btn-primary sBtn ${(SAlgo) ? "" : "active"} `} onClick={handleclick2}>SRJF</button>

              </div>
            </div>
          </div>


        </div>
      ) : (<>
        <button className='btn btn1 btn2' onClick={() => { SCView(!CView) }}>Back</button>
        <div className='con'>
          <table className="chart table caption-top">
            <caption>{(SAlgo) ? ("SJF Algo") : ("SRJF Algo")} </caption>
            <thead className="table-dark">
              <tr>
                <th scope="col">P Id</th>
                <th scope="col">AT</th>
                <th scope="col">BT</th>
                <th scope="col">CT</th>
                <th scope="col">TAT</th>
                <th scope="col">WAT</th>
              </tr>
            </thead>
            <tbody>
              {
                sol.map((ele, i) => (
                  <tr key={ele.index}>
                    <th scope="row" >{ele.index}</th>
                    <td >{ele.AT}</td>
                    <td >{ele.BT}</td>
                    <td >{ele.CT}</td>
                    <td >{ele.TAT}</td>
                    <td >{ele.WAT}</td>
                  </tr>
                ))
              }

            </tbody>
          </table>
          <div className="foot">
            <button className='btn btn1'>AVG TAT : {AvgTat}</button>
            <button className='btn btn1'>AVG WAT : {AvgWat}</button>
          </div>
        </div>
      </>
      )


      }
    </>
  )
}

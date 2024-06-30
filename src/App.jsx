import { useState } from "react";
import "./App.css";
import { FaSearch, FaTrash, FaPenFancy } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
const date1 = new Date().toLocaleDateString();
function App() {
  const [val, setVal] = useState(false);
  const[val2,setVal2]= useState(null);
  const [task, setTask] = useState({
    value: "",
    date: "",
  });
  const [list, setList] = useState([]);
  const [button, setButton] = useState(false);
  
  const [edit, setEdit] = useState(null);
  const handleAddTask = () => {
    setButton(!button);
  };
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  let { value, date } = task;
  const handlesubmit = () => {
    edit === null
      ? setList([...list, { value, date }])
      : setList(
          list.map((currrow, ind) => {
            if (ind !== edit) return currrow;
            else {
              return task;
            }
          })
        );
    setEdit(null);
    setTask({
      value: "",
      date: "",
    });
    setButton(!button);
  };
  const handleTaskDelete = (ind) => {
    let newList = [...list];
    newList.splice(ind, 1);
    setList(newList);
  };
  const handleEdit = (ind) => {
    setEdit(ind);
    setButton(!button);
  };
  const handlevalue = (ind) => {
     setVal(!val);
    
  };
  return (
    <>
      <div className="header">
        <h1 className="font-bold text-3xl"> wellcome dear</h1>
        <div className="header-time">
          <button className="search-btn">
            <FaSearch />
          </button>
          <p className="mr-4 mt-2">
            <SlCalender />
          </p>
          <p className="mt-1">{date1}</p>
        </div>
      </div>
      <div className="line"></div>
      <div className="container flex justify-center">
        <div className="body">
          <div className="info-content flex justify-between">
            <p>tasks : {list.length} </p>
            <button onClick={handleAddTask}>+ add new task</button>
          </div>
          {list.map((task, ind) => {
            return (
              <div className="task-container flex justify-between ">
                <div className=" flex flex-col gap-14 ">
                  <h2 className="text-xl">{task.value}</h2>
                  <p className={val ? "checked-date" : "date"}>{task.date}</p>
                </div>
                <div>
                  <button onClick={handleTaskDelete}>
                    <FaTrash />
                  </button>
                  <br />
                  <button onClick={() => handleEdit(ind)}>
                    <FaPenFancy />
                  </button>
                  <input type="checkbox" value={val} onClick={()=>handlevalue(ind)} className="checkbox" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="body">
          <div className="info-content flex justify-between">
            <p>finished :  </p>
            
          </div>
          

          </div>
        {button && (
          <div className="popup flex flex-col">
            <button
              className="popup-closer-btn"
              onClick={() => {
                setButton(!button);
              }}
            >
              X
            </button>
            <input
              type="text"
              placeholder="write your task"
              className="task-input"
              name="value"
              value={task.value}
              onChange={handleChange}
            />
            <input
              type="date"
              className="task-date"
              name="date"
              value={task.date}
              onChange={handleChange}
            />
            <button className="submit-task-btn" onClick={handlesubmit}>
              submit
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

import {Fragment, useRef, useState} from "react";

export default function Todo() {
    const [task, setTask] = useState([]) //task array
    const [update, setUpdate] = useState(false)
    const [className, setClassName] = useState("item-data-update")
    const [updateIndex,setUpdateIndex] = useState() // get the index of the updatedTaskBtn
    const [date, setDate] = useState("") //get the date
    let inputRef = useRef(null) //get the input value

    const current = new Date();
    function handleTask() {
        if (inputRef.current.value === "") {
            alert("Can not have an empty field! Add a Task.")
        } else {
            setTask([...task, inputRef.current.value])
            setDate(`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`)
            inputRef.current.value = ""
        }
    }

    function deleteTask(index) {
        const list = [...task]
        list.splice(index, 1)
        setTask(list)
    }

    function handleTaskUpdate() {
        task[updateIndex] = inputRef.current.value

        inputRef.current.value = ""
        setUpdate(false)
        setClassName("item-data")
    }

    function UpdateTaskBtn(eachTask,index) {
        inputRef.current.value = eachTask
        setUpdateIndex(index)
        setUpdate(true)
        setClassName("item-data-update")
    }

    const JsxElement = task.map((eachTask, index) => {
        return (
            <Fragment key={index}>
                <div key={index} className="table-data-container">
                    <div className={updateIndex === index ? className : "item-data"}>{eachTask}</div>
                    <div className="item-data">{date}</div>
                    <div className="item-data">
                        <div className="btn-data-container">
                            <div className="btn-data">
                                <div className="btn" onClick={() => deleteTask(index)}>Delete</div>
                            </div>
                            <div className="btn-data">
                                <div className="btn" onClick={() => UpdateTaskBtn(eachTask, index)}>Update</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                {task.length - 1 === index &&
                    <div className="input-update-container">
                        <div className="input-area">
                            <input
                                ref={inputRef}
                                type="text"
                            />
                        </div>
                        <div className="btn-update-add-container">
                            {update ?
                                <div className="btn-add" onClick={() => handleTaskUpdate(eachTask, index)}>Update
                                    Task</div>
                                :
                                <div className="btn-add" onClick={handleTask}>Add Task</div>
                            }
                        </div>
                    </div>
                }
            </Fragment>

        )
    })

    return (
        <div className="main-container">
            {task.length < 1 ?
                <>
                    <h2>Add new Task</h2>
                    <div className="input-update-container">
                        <div className="input-area">
                            <input
                                ref={inputRef}
                                type="text"
                            />
                        </div>
                        <div className="btn-update-add-container">
                            <div className="btn-add" onClick={handleTask}>Add Task</div>
                        </div>

                    </div>
                </>
                :
                <>
                    <div className="heading">
                        <h1>Task Master</h1>
                    </div>
                    <div className="table-heading">
                        <div className="item-head"><h2>Task</h2></div>
                        <div className="item-head"><h2>Added</h2></div>
                        <div className="item-head"><h2>Action</h2></div>
                    </div>
                </>
            }
            {JsxElement}
        </div>

    )
}
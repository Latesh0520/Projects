import { CheckCircle, Edit, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Input, Table } from "reactstrap";

export default function TodoTask() {
  let [task, setTask] = useState("");
  let [tasksList, setTaskList] = useState([]);
  let [doneTaskList, setDoneTaskList] = useState([]);
  let [selectAllToDone, setselectAllToDone] = useState([]);
  let [AllDeleteTaskList, setAllDeleteTaskList] = useState([]);
  useEffect((e) => {
    let getTask = JSON.parse(localStorage.getItem("TaskProject"));
    if (getTask) {
      setTaskList(getTask);
    }
    let getDoneTask = JSON.parse(localStorage.getItem("DoneTaskProject"));
    if (getDoneTask) {
      setDoneTaskList(getDoneTask);
    }
  }, []);
  const submitTask = (e) => {
    if (e == "Enter" || e == "submitBtn") {
      if (task) {
        setTaskList([...tasksList, task]);
        localStorage.setItem(
          "TaskProject",
          JSON.stringify([...tasksList, task])
        );
        setTask("");
      } else {
        toast.error("Please Enter task..");
      }
    }
  };
  const taskDoneHandler = (ele, i) => {
    let confirmation = confirm("Do You want to done this pending task!");
    if (confirmation) {
      tasksList?.splice(i, 1);

      setTaskList(tasksList);
      localStorage.setItem("TaskProject", JSON.stringify(tasksList));

      setDoneTaskList([...doneTaskList, ele]);
      localStorage.setItem(
        "DoneTaskProject",
        JSON.stringify([...doneTaskList, ele])
      );
      setselectAllToDone([]);
      toast.success('Task done');
    }
  };
  const taskDoneDeleteHandler = (ele, ind) => {
    let confirmDelete = confirm("Do you want delete submitted task... ");
    if (confirmDelete) {
      let upatedTask = doneTaskList?.filter((e, i) => i != ind);
      localStorage.setItem("DoneTaskProject", JSON.stringify(upatedTask));
      setDoneTaskList(upatedTask);
    }
  };
  const checkAllHandlerToDone = (e) => {
    let selectAll = Object.keys(tasksList).map((key) => +key);
    setselectAllToDone(selectAll);
  };
  const singleCheckedTaskTodone = (i) => {
    if (selectAllToDone.includes(i)) {
      let filterArray = selectAllToDone?.filter((e) => e != i);
      setselectAllToDone(filterArray);
    } else {
      setselectAllToDone([...selectAllToDone, i]);
    }
  };
  const taskDoneAllHandler = () => {
    if (selectAllToDone.length > 0) {
      let confirmation = confirm("Do You want to done all pending task!");
      if (confirmation) {
        // if (selectAllToDone?.length == tasksList?.length) {
        //   setDoneTaskList([...doneTaskList, ...tasksList]);
        //   localStorage.setItem(
        //     "DoneTaskProject",
        //     JSON.stringify([...doneTaskList, ...tasksList])
        //   );
        //   setTaskList([]);
        //   localStorage.setItem("TaskProject", JSON.stringify([]));
        // } else {
        let newDoneTasks = [...doneTaskList];
        selectAllToDone?.forEach((e, i) => {
          newDoneTasks.push(tasksList[e]);
        });
        let newTodoTasklist = tasksList?.filter(
          (e, i) => !newDoneTasks?.includes(e)
        );

        setDoneTaskList(newDoneTasks);
        localStorage.setItem("DoneTaskProject", JSON.stringify(newDoneTasks));

        setTaskList(newTodoTasklist);
        localStorage.setItem("TaskProject", JSON.stringify(newTodoTasklist));
        // }
        toast.success('Done all task successfully..')
      }
    } else {
      toast.success("Todo task are already done...");
    }
    setselectAllToDone([]);
  };
  let checkAllHandlerToDelete = () => {
    let selectAll = Object.keys(doneTaskList).map((key) => +key);
    setAllDeleteTaskList(selectAll);
  };
  let selectSingleToDelete = (i) => {
    if (AllDeleteTaskList.includes(i)) {
      let filterArray = AllDeleteTaskList?.filter((e) => e != i);
      setAllDeleteTaskList(filterArray);
    } else {
      setAllDeleteTaskList([...AllDeleteTaskList, i]);
    }
  };
  const taskAllDelete = () => {
    let confirmation = confirm("Do You want to delete all done task!");
    if (confirmation) {
      let alldelete = doneTaskList?.filter(
        (e, i) => !AllDeleteTaskList?.includes(i)
      );
      setDoneTaskList(alldelete);
      localStorage.setItem("DoneTaskProject", JSON.stringify(alldelete));
    }
    setAllDeleteTaskList([]);
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-8">
                <Input
                  placeholder="Enter task"
                  value={task}
                  onChange={(e) => {
                    setTask(e?.target?.value);
                  }}
                  onKeyDown={(e) => submitTask(e?.key)}
                />
              </div>
              <div className="col-md-4">
                <Button
                  onClick={() => {
                    submitTask("submitBtn");
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card p-2">
              <h1 className="text-center">Todo Task</h1>
              <div className="d-flex justify-content-end">
                <span>All</span>
                <Input
                  type="checkbox"
                  onChange={(e) => checkAllHandlerToDone(e)}
                  checked={
                    selectAllToDone?.length == tasksList?.length &&
                    selectAllToDone?.length > 0
                  }
                />
                <CheckCircle
                  onClick={() => {
                    taskDoneAllHandler();
                  }}
                />
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksList?.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <span>{i + 1}</span>
                        </td>
                        <td className="">
                          <span className="d-flex justify-content-between">
                            <span>{e}</span>
                            <span>
                              <Input
                                type="checkbox"
                                checked={selectAllToDone?.includes(i)}
                                onChange={() => singleCheckedTaskTodone(i)}
                              />
                              <CheckCircle
                                onClick={() => {
                                  taskDoneHandler(e, i);
                                }}
                              />
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-2">
              <h1 className="text-center">Done Task</h1>
              <div className="d-flex justify-content-end">
                <span>All</span>
                <Input
                  type="checkbox"
                  checked={
                    doneTaskList?.length == AllDeleteTaskList?.length &&
                    AllDeleteTaskList?.length > 0
                  }
                  onChange={() => checkAllHandlerToDelete()}
                />
                <Trash
                  onClick={() => {
                    taskAllDelete();
                  }}
                />
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                  </tr>
                </thead>
                <tbody>
                  {doneTaskList?.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <span>{i + 1}</span>
                        </td>
                        <td className="">
                          <span className="d-flex justify-content-between">
                            <span>{e}</span>
                            <span>
                              <Input
                                type="checkbox"
                                checked={AllDeleteTaskList?.includes(i)}
                                onChange={() => selectSingleToDelete(i)}
                              />
                              <Trash
                                onClick={() => {
                                  taskDoneDeleteHandler(e, i);
                                }}
                              />
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

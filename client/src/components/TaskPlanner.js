import React, { useEffect, useState } from "react";
import "./TaskPlanner.css";
import TaskItem from "./TaskItem";
import Filter from "./Filter";
import SortSelect from "./SortSelect";
import { TASK_API } from "../utils/constants";
import { TaskContext } from "../context/TaskContext";

export const TaskPlanner = () => {
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newPriority, setNewPriority] = useState("Low");
  const [newCategory, setNewCategory] = useState("Pending");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(TASK_API);
      const jsonData = await res.json();
      const { allTasks } = jsonData;
      setListData(allTasks);
      setIsLoading(false);
    } catch (err) {
      console.error(`an error occurred: ${err}`);
    }
  };

  const addActivity = async () => {
    try {
      if (isEdit) {
        const res = await fetch(`${TASK_API}${editIndex}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: activity,
            priority: newPriority,
            category: newCategory,
          }),
        });

        if (res.ok) {
          setIsEdit(false);
          setEditIndex(null);
          setActivity("");
          setNewPriority("Low");
          setNewCategory("Pending");
        }
      } else {
        const res = await fetch(TASK_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: activity,
            priority: newPriority,
            category: newCategory,
          }),
        });

        if (res.ok) {
          setActivity("");
          setNewPriority("Low");
          setNewCategory("Pending");
        }
      }

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const editTask = (id) => {
    const taskToEdit = listData.find((task) => task._id === id);
    setEditIndex(id);
    setIsEdit(true);
    setActivity(taskToEdit.name);
  };

  const removeActivity = async (id) => {
    try {
      const res = await fetch(`${TASK_API}${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filterTasks = () => {
    let filteredTasks = listData;

    if (filterPriority !== "All") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === filterPriority
      );
    }

    if (filterCategory !== "All") {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === filterCategory
      );
    }
    return filteredTasks;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedTasks = filterTasks().sort((a, b) => {
    if (a.priority === b.priority) {
      return a.category.localeCompare(b.category);
    }
    return b.priority.localeCompare(a.priority);
  });
  return (
    <>
      <div className="container">
        <div className="header">Task Planner</div>
        <input
          type="text"
          placeholder={isEdit ? "Update Task" : "Add Task"}
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />

        <TaskContext.Provider
          value={{
            editTask,
            removeActivity,
            newCategory,
            newPriority,
            setNewCategory,
            setNewPriority,
            filterCategory,
            filterPriority,
            setFilterCategory,
            setFilterPriority,
          }}
        >
          <Filter />
          <button
            className="add-button"
            onClick={addActivity}
            disabled={activity === ""}
          >
            {isEdit ? "Update Task" : "Add Task"}
          </button>
          {sortedTasks.length >= 1 ? (
            <>
              <p className="task-heading">Here are your tasks</p>
              <SortSelect />
            </>
          ) : (
            <p className="task-heading">There is no task, Try to add some</p>
          )}
          {sortedTasks.length >= 1 &&
            sortedTasks.map((data) => <TaskItem data={data} key={data._id} />)}
          {isLoading && <p className="loading">Loading....</p>}
        </TaskContext.Provider>
      </div>
    </>
  );
};

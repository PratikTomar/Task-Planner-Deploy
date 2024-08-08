import React, { useEffect, useState } from "react";
import "./TaskPlanner.css";
import TaskItem from "./TaskItem";
import Filter from "./Filter";
import SortSelect from "./SortSelect";
import { TASK_API } from "../utils/constants";
import { TaskContext } from "../context/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

export const TaskPlanner = ({ onToggleDarkMode, isDarkMode }) => {
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newPriority, setNewPriority] = useState("Low");
  const [newCategory, setNewCategory] = useState("Pending");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollToTop, setIsScrollToTop] = useState(false);

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
      toast.error("Failed to fetch tasks!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
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
          toast.success("Task updated successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });

        } else {
          toast.error("Failed to update task!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });
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
          toast.success("Task added successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });
        } else {
          toast.error("Failed to add task!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
      }
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const editTask = (id) => {
    const taskToEdit = listData.find((task) => task._id === id);
    setEditIndex(id);
    setIsEdit(true);
    setActivity(taskToEdit.name);
    setIsScrollToTop((prev) => !prev);
  };

  const removeActivity = async (id) => {
    try {
      const res = await fetch(`${TASK_API}${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
        toast.success("Task removed successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        toast.error("Failed to remove task!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
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

  useEffect(() => {
    if (isScrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsScrollToTop((prev) => !prev);
    }
  }, [isScrollToTop]);

  return (
    <>
      <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="action-buttons">
          <button onClick={onToggleDarkMode}>{isDarkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
          </button>
        </div>
        <div className="header">Taskee - Task Application</div>
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
          <SortSelect />
          {sortedTasks.length >= 1 ? (
            <>
              <p className="task-heading">Here are your tasks</p>
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

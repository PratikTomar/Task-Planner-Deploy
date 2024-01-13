import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const Filter = () => {
  const { newPriority, setNewCategory, setNewPriority, newCategory } =
    useContext(TaskContext);
  return (
    <>
      <select
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Working">Working</option>
        <option value="Completed">Completed</option>
      </select>
    </>
  );
};

export default Filter;

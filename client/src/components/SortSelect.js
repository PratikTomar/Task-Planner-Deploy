import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const SortSelect = () => {
  const {
    filterCategory,
    filterPriority,
    setFilterCategory,
    setFilterPriority,
  } = useContext(TaskContext);

  return (
    <>
      <select
        value={filterPriority}
        onChange={(e) => {
          console.log(e.target);
          setFilterPriority(e.target.value);
        }}
        className="priority-filter"
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="category-filter"
      >
        <option value="All">All Categories</option>
        <option value="Pending">Pending</option>
        <option value="Working">Working</option>
        <option value="Completed">Completed</option>
      </select>
    </>
  );
};

export default SortSelect;

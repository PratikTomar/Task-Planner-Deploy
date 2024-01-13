import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { TaskContext } from "../context/TaskContext";

const TaskItem = ({ data }) => {
  const { removeActivity, editTask } = useContext(TaskContext);
  const { _id, priority, category, name } = data;
  return (
    <div className="task" key={_id}>
      <div className={`priority-box priority-${priority.toLowerCase()}`}>
        {priority.toUpperCase()}
      </div>
      <div className={`category-box category-${category.toLowerCase()}`}>
        {category.toUpperCase()}
      </div>
      <div className="task-text">{name}</div>

      <div className="action-buttons">
        <button className="remove-task" onClick={() => removeActivity(_id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="edit-task" onClick={() => editTask(_id)}>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

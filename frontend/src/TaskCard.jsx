import React from "react";
import {
    FaEdit,
    FaTrash,
    FaCheckCircle,
    FaRegCircle
} from "react-icons/fa";

function TaskCard({ task, onEdit, onDelete, onToggle }) {

    return (
        <div className="card shadow-sm mb-3">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                    <div>
                        <h5 className={
                            task.completed
                                ? "text-decoration-line-through text-muted"
                                : ""
                        }>
                            {task.title}
                        </h5>

                        <p className="text-muted mb-2">
                            {task.description || "No description"}
                        </p>

                        <span className={
                            task.completed
                                ? "badge bg-success"
                                : "badge bg-warning text-dark"
                        }>
                            {task.completed ? "Completed" : "Pending"}
                        </span>
                    </div>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => onToggle(task)}
                            title="Toggle status"
                        >
                            {task.completed
                                ? <FaRegCircle />
                                : <FaCheckCircle />
                            }
                        </button>

                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onEdit(task)}
                        >
                            <FaEdit />
                        </button>

                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(task.id)}
                        >
                            <FaTrash />
                        </button>

                    </div>

                </div>

                <small className="text-muted d-block mt-3">
                    Created: {new Date(task.created_at).toLocaleDateString()}
                </small>

            </div>
        </div>
    );
}

export default TaskCard;
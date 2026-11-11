import React from "react";
import TaskCard from "./TaskCard";

function TaskList({ tasks, onEdit, onDelete, onToggle }) {

    return (
        <div>

            <h5 className="mb-3">
                My Tasks ({tasks.length})
            </h5>

            {tasks.length === 0 ? (

                <div className="alert alert-info">
                    No tasks found. Add your first task!
                </div>

            ) : (

                tasks.map((task) => (

                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggle={onToggle}
                    />

                ))

            )}

        </div>
    );
}

export default TaskList;
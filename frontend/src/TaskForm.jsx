import React, { useEffect, useState } from "react";

function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancel }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter task title");
            return;
        }

        const taskData = {
            title: title.trim(),
            description: description.trim(),
            completed: editingTask ? editingTask.completed : false
        };

        if (editingTask) {
            onUpdateTask(editingTask.id, taskData);
        } else {
            onAddTask(taskData);
        }

        setTitle("");
        setDescription("");
    };

    return (
        <div className="card shadow-sm p-4 mb-4">

            <h5 className="mb-3">
                {editingTask ? "Edit Task" : "Add New Task"}
            </h5>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">
                        Task Title
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Description
                    </label>

                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary me-2">
                    {editingTask ? "Update Task" : "Add Task"}
                </button>

                {editingTask && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                )}

            </form>
        </div>
    );
}

export default TaskForm;
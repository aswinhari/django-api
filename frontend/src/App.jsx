import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";

import {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    getStats
} from "./api";

function App() {

    const [tasks, setTasks] = useState([]);

    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0
    });

    const [editingTask, setEditingTask] = useState(null);

    const [filter, setFilter] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // Fetch tasks from Django
    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getTasks(filter);

            setTasks(response.data);

        } catch (error) {
            setError("Unable to load tasks. Check Django server.");
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    // Fetch statistics
    const fetchStats = async () => {
        try {
            const response = await getStats();
            setStats(response.data);

        } catch (error) {
            console.error("Stats error:", error);
        }
    };

    // Load data whenever filter changes
    useEffect(() => {
        fetchTasks();
    }, [filter]);

    // Initial statistics
    useEffect(() => {
        fetchStats();
    }, []);

    // Add task
    const handleAddTask = async (taskData) => {
        try {
            await addTask(taskData);

            alert("Task added successfully!");

            setEditingTask(null);

            fetchTasks();
            fetchStats();

        } catch (error) {
            console.error(error);
            alert("Unable to add task");
        }
    };

    // Update task
    const handleUpdateTask = async (id, taskData) => {
        try {
            await updateTask(id, taskData);

            alert("Task updated successfully!");

            setEditingTask(null);

            fetchTasks();
            fetchStats();

        } catch (error) {
            console.error(error);
            alert("Unable to update task");
        }
    };

    // Delete task
    const handleDeleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {
            await deleteTask(id);

            alert("Task deleted successfully!");

            if (editingTask?.id === id) {
                setEditingTask(null);
            }

            fetchTasks();
            fetchStats();

        } catch (error) {
            console.error(error);
            alert("Unable to delete task");
        }
    };

    // Mark completed or pending
    const handleToggleTask = async (task) => {
        try {
            await updateTask(task.id, {
                completed: !task.completed
            });

            fetchTasks();
            fetchStats();

        } catch (error) {
            console.error(error);
            alert("Unable to change task status");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container py-4">

                <h3 className="fw-bold mb-1">
                    Welcome to TaskMate!
                </h3>

                <p className="text-muted">
                    Manage your daily activities efficiently.
                </p>

                {/* Statistics */}
                <TaskStats stats={stats} />

                <div className="row">

                    {/* Task Form */}
                    <div className="col-lg-5">

                        <TaskForm
                            onAddTask={handleAddTask}
                            editingTask={editingTask}
                            onUpdateTask={handleUpdateTask}
                            onCancel={() => setEditingTask(null)}
                        />

                    </div>

                    {/* Task List */}
                    <div className="col-lg-7">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <h5 className="mb-0">
                                Task Management
                            </h5>

                            <select
                                className="form-select w-auto"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="">All Tasks</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>

                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {loading ? (

                            <p>Loading tasks...</p>

                        ) : (

                            <TaskList
                                tasks={tasks}
                                onEdit={setEditingTask}
                                onDelete={handleDeleteTask}
                                onToggle={handleToggleTask}
                            />

                        )}

                    </div>

                </div>

            </div>
        </>
    );
}

export default App;
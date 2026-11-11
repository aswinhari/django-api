import React from "react";

function TaskStats({ stats }) {

    return (
        <div className="row mb-4">

            <div className="col-md-4 mb-2">
                <div className="card bg-primary text-white p-3">
                    <h6>Total Tasks</h6>
                    <h2>{stats.total}</h2>
                </div>
            </div>

            <div className="col-md-4 mb-2">
                <div className="card bg-success text-white p-3">
                    <h6>Completed</h6>
                    <h2>{stats.completed}</h2>
                </div>
            </div>

            <div className="col-md-4 mb-2">
                <div className="card bg-warning text-dark p-3">
                    <h6>Pending</h6>
                    <h2>{stats.pending}</h2>
                </div>
            </div>

        </div>
    );
}

export default TaskStats;
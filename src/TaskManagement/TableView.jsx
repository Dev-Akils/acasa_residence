import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TableView() {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({ title: "", status: "Pending" });
    const [editingId, setEditingId] = useState(null);

    const fetchTasks = async () => {
        const res = await axios.get("http://localhost:5000/api/tasks");
        setTasks(res.data);
    };

    const formatDateInput = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };


    useEffect(() => {
        fetchTasks();
    }, []);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            created_at: new Date(formData.created_at),
            due_date: new Date(formData.due_date),
            completed_date: new Date(formData.completed_date),
        };

        if (editingId) {
            await axios.put(`http://localhost:5000/api/tasks/${editingId}`, payload);
            setEditingId(null);
        } else {
            await axios.post("http://localhost:5000/api/tasks", payload);
        }

        setFormData({
            title: "",
            description: "",
            created_at: "",
            due_date: "",
            completed_date: "",
            remarks: "",
            status: "Pending",
        });
        fetchTasks();
    };


    const handleEdit = (task) => {
        setFormData({
            title: task.title,
            description: task.description,
            created_at: formatDateInput(task.created_at),
            due_date: formatDateInput(task.due_date),
            completed_date: formatDateInput(task.completed_date),
            remarks: task.remarks,
            status: task.status,
        });

        setEditingId(task._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks();
    };

    const getStatusClasses = (status) => {
        const statusClasses = {
            Completed: "bg-green-100 text-green-700",
            Pending: "bg-yellow-100 text-yellow-700",
            Completed_Late: "bg-blue-100 text-blue-700",
            Completed_Early: "bg-red-100 text-red-700",
        };

        return statusClasses[status] || "bg-gray-100 text-gray-700";
    };


    return (
        <div className="bg-slate-100 min-h-screen py-10 px-4 flex flex-col items-center">
            <h1 className="font-semibold text-3xl mb-6">Task Management</h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl bg-white p-6 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    required
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className="border p-2 rounded"
                />
                <div className="relative">
                    <label className="absolute left-3 top-[-10px] bg-white px-1 text-sm text-gray-600">Create Date</label>
                    <input
                        type="date"
                        name="created_at"
                        placeholder="created_at"
                        value={formData.created_at}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full mt-2"
                    />
                </div>
                <div className="relative">
                    <label className="absolute left-3 top-[-10px] bg-white px-1 text-sm text-gray-600">Due Date</label>
                    <input
                        type="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full mt-2"
                    />
                </div>


                <div className="relative">
                    <label className="absolute left-3 top-[-10px] bg-white px-1 text-sm text-gray-600">Completed Date</label>
                    <input
                        type="date"
                        name="completed_date"
                        placeholder="completed_at"
                        value={formData.completed_date}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full mt-2"
                    /></div>

                <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Remarks"
                    required
                    className="border p-2 rounded"
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 md:col-span-2"
                >
                    {editingId ? "Update Task" : "Add Task"}
                </button>
            </form>


            {/* Table */}
            <div className="w-full max-w-6xl overflow-x-auto shadow rounded-lg">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-700">
                            <th className="p-4 border-b">Title</th>
                            <th className="p-4 border-b">Description</th>
                            <th className="p-4 border-b">Created At</th>
                            <th className="p-4 border-b">Due Date</th>
                            <th className="p-4 border-b">Completed Date</th>
                            <th className="p-4 border-b">Remarks</th>
                            <th className="p-4 border-b">Status</th>
                            <th className="p-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task._id}>
                                    <td className="p-4 border-b">{task.title}</td>
                                    <td className="p-4 border-b">{task.description}</td>
                                    <td className="p-4 border-b">{task.created_at}</td>
                                    <td className="p-4 border-b">{task.due_date}</td>
                                    <td className="p-4 border-b">{task.completed_date}</td>
                                    <td className="p-4 border-b">{task.remarks}</td>
                                    <td className="p-4 border-b">
                                        <span
                                            className={`px-4 py-1 text-sm rounded-full font-medium ${getStatusClasses(task.status)}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="p-4 border-b text-center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">
                                    The task list is empty
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>
        </div>
    );
}

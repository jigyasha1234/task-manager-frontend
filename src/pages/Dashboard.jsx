import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [filter, setFilter] = useState("all");
    const [editingTask, setEditingTask] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingTask) {
                const { data } = await API.put(
                    `/tasks/${editingTask._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                setTasks(
                    tasks.map((task) =>
                        task._id === editingTask._id
                            ? data
                            : task
                    )
                );

                setEditingTask(null);
                toast.success("Task updated successfully!");

            } else {

                const { data } = await API.post(
                    "/tasks",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                setTasks([data, ...tasks]);
                toast.success("Task created successfully!");
            }

            setFormData({
                title: "",
                description: "",
            });

        } catch (error) {
            console.log(error);
            toast.error("Failed to create task.");
        }
    };

    const fetchTasks = async () => {
        try {
            const { data } = await API.get(
                "/tasks",
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            setTasks(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTask = async (task) => {
        try {
            const { data } = await API.put(
                `/tasks/${task._id}`,
                {
                    completed: !task.completed,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            setTasks(
                tasks.map((t) =>
                    t._id === task._id ? data : t
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            setTasks(
                tasks.filter(
                    (task) => task._id !== id
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed")
            return task.completed;

        if (filter === "pending")
            return !task.completed;

        return true;
    });

    useEffect(() => {
        fetchTasks();
    }, []);


    return (
        <div className="min-h-screen bg-gray-100">

            <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Task Manager
                </h1>

                <div className="flex items-center gap-4">
                    <p className="font-medium">
                        {user?.name}
                    </p>

                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                        className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </header>


            <main className="max-w-5xl mx-auto p-6">

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Your Tasks
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="mb-6 space-y-4"
                    >
                        <input
                            type="text"
                            name="title"
                            placeholder="Task title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-xl"
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Task description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-xl"
                        />

                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-3 rounded-xl"
                        >
                            {
                                editingTask
                                    ? "Update Task"
                                    : "Add Task"
                            }
                        </button>

                    </form>


                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : tasks.length === 0 ? (
                        <p>No tasks yet.</p>
                    ) : (
                        <div className="grid gap-4">
                            {filteredTasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start">

                                        <div>
                                            <h3
                                                className={`text-xl font-semibold ${task.completed
                                                    ? "line-through text-gray-400"
                                                    : "text-gray-800"
                                                    }`}
                                            >
                                                {task.title}
                                            </h3>

                                            <p className="text-gray-600 mt-2">
                                                {task.description}
                                            </p>
                                        </div>


                                        <span
                                            className={`text-sm px-3 py-1 rounded-full ${task.completed
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {task.completed
                                                ? "Completed"
                                                : "Pending"}
                                        </span>
                                    </div>


                                    <div className="flex gap-3 mt-5">

                                        <button
                                            onClick={() => toggleTask(task)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Toggle
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingTask(task);

                                                setFormData({
                                                    title: task.title,
                                                    description: task.description,
                                                });
                                            }}
                                            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-3 mb-6">
                                <button
                                    onClick={() => setFilter("all")}
                                    className="bg-gray-200 px-4 py-2 rounded-lg"
                                >
                                    All
                                </button>

                                <button
                                    onClick={() => setFilter("completed")}
                                    className="bg-green-200 px-4 py-2 rounded-lg"
                                >
                                    Completed
                                </button>

                                <button
                                    onClick={() => setFilter("pending")}
                                    className="bg-yellow-200 px-4 py-2 rounded-lg"
                                >
                                    Pending
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
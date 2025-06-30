import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });
  const [shareEmail, setShareEmail] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTodo) {
        await API.put(`/todos/${editingTodo._id}`, formData);
        setEditingTodo(null);
      } else {
        await API.post('/todos', formData);
      }
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
      fetchTodos();
    } catch (err) {
      console.error('Error saving todo:', err);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate ? todo.dueDate.substring(0, 10) : '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await API.delete(`/todos/${id}`);
        fetchTodos();
      } catch (err) {
        console.error('Error deleting todo:', err);
      }
    }
  };

  const handleShare = async (todoId) => {
    try {
      await API.post(`/todos/${todoId}/share`, { email: shareEmail });
      setShareEmail('');
      alert('Todo shared successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to share.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Dashboard</h2>

      {/* Todo Form */}
      <form onSubmit={handleSubmit} className="mb-4 card p-3 shadow-sm">
        <h5>{editingTodo ? 'Edit Todo' : 'Create New Todo'}</h5>
        <div className="mb-2">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            name="description"
            className="form-control"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <select
            name="priority"
            className="form-select"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-2">
          <input
            type="date"
            name="dueDate"
            className="form-control"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingTodo ? 'Update' : 'Create'}
        </button>
      </form>

      {/* Todo List */}
      <div className="row">
        {todos.length === 0 ? (
          <p className="text-center">No todos found.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{todo.title}</h5>
                  <p className="card-text">{todo.description}</p>
                  <p className="card-text">
                    <strong>Priority:</strong> {todo.priority} <br />
                    <strong>Status:</strong> {todo.status} <br />
                    <strong>Due:</strong>{' '}
                    {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'N/A'}
                  </p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleEdit(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </button>
                  </div>

                  {/* Share input */}
                  {todo.owner === JSON.parse(localStorage.getItem('user'))?._id && (
                    <div className="mt-2">
                      <input
                        type="email"
                        className="form-control mb-1"
                        placeholder="Share with email"
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleShare(todo._id)}
                      >
                        Share
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

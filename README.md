# Todo App – Frontend

A modern and responsive Todo App built with **React** and **Bootstrap**, featuring:

- JWT authentication (Login/Register)
- OAuth login with **Google** and **GitHub**
- Token-based protected routes
- CRUD for todos (create, read, update, delete)
- Todo sharing with other users
- API communication with a Node.js/Express backend

---

## 🧰 Tech Stack

- **React** (with Hooks)
- **Bootstrap 5** (for styling)
- **Axios** (for API calls)
- **React Router** (for navigation)
- **JWT** (stored in localStorage)
- **Google/GitHub OAuth** via backend redirection

---

## 🔐 OAuth & JWT Flow

1. Users can login with email/password or via Google/GitHub.
2. OAuth redirects the user from frontend to backend, then back with a `JWT` in query param.
3. The frontend saves the token and uses it for authenticated requests.

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/todoapp-frontend.git
cd todoapp-frontend

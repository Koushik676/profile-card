import React, { useState, useEffect } from 'react'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const userData = await response.json()
      setUsers(userData)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleReloadUsers = () => {
    fetchUsers()
  }

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      
      <button 
        className="reload-button" 
        onClick={handleReloadUsers}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Reload Users'}
      </button>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <UserList />
    </div>
  )
}

export default App
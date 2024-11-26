import { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ram', email: 'ram@gmail.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sita', email: 'sita@gmail.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Avipsa', email: 'Avipsa@gmail.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'Deepak', email: 'deepak@gmail.com', role: 'Frontend Developer', status: 'Active' },
    { id: 5, name: 'Gopinath', email: 'gopinath@gmail.com', role: 'Backend Developer', status: 'Active' },
  ])

  const addUser = (user) => {
    setUsers([...users, { ...user, id: users.length + 1 }])
  }

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user))
  }

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers() {
  return useContext(UserContext)
}


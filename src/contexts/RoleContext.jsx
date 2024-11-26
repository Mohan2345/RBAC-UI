import { createContext, useState, useContext } from 'react'

const RoleContext = createContext()

export function RoleProvider({ children }) {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'Editor', permissions: ['read', 'write'] },
    { id: 3, name: 'Viewer', permissions: ['read'] },
    { id: 4, name: 'Frontend Developer', permissions: ['read', 'write'] },
    { id: 4, name: 'Backend Developer', permissions: ['read', 'write', 'delete'] }
  ])

  const addRole = (role) => {
    setRoles([...roles, { ...role, id: roles.length + 1 }])
  }

  const updateRole = (updatedRole) => {
    setRoles(roles.map(role => role.id === updatedRole.id ? updatedRole : role))
  }

  const deleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId))
  }

  return (
    <RoleContext.Provider value={{ roles, addRole, updateRole, deleteRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRoles() {
  return useContext(RoleContext)
}


import { useState, useMemo } from 'react'
import { useRoles } from '../contexts/RoleContext'
import { PlusCircle, Edit, Trash2, Search, ChevronUp, ChevronDown } from 'lucide-react'

export default function RoleManagement() {
  const { roles, addRole, updateRole, deleteRole } = useRoles()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const roleData = Object.fromEntries(formData.entries())
    roleData.permissions = Object.keys(roleData).filter(key => key.startsWith('perm_') && roleData[key] === 'on')
      .map(key => key.replace('perm_', ''))
    
    if (currentRole) {
      updateRole({ ...currentRole, ...roleData })
    } else {
      addRole(roleData)
    }
    
    setIsModalOpen(false)
    setCurrentRole(null)
  }

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const filteredAndSortedRoles = useMemo(() => {
    let filteredRoles = roles.filter(role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortConfig.key) {
      filteredRoles.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }

    return filteredRoles
  }, [roles, searchTerm, sortConfig])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Role Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <PlusCircle className="mr-2" /> Add Role
        </button>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search roles..."
          className="border rounded-md px-2 py-1 mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text-gray-400" />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name', 'Permissions'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-
wider cursor-pointer"
                  onClick={() => handleSort(header.toLowerCase())}
                >
                  {header}
                  {sortConfig.key === header.toLowerCase() && (
                    sortConfig.direction === 'ascending' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                  )}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedRoles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {role.permissions.map((perm, index) => (
                    <span key={perm} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      {perm}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setCurrentRole(role)
                      setIsModalOpen(true)
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={currentRole?.name}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Permissions</label>
                    <div className="mt-2 space-y-2">
                      {['read', 'write', 'delete'].map((perm) => (
                        <div key={perm} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={`perm_${perm}`}
                              name={`perm_${perm}`}
                              type="checkbox"
                              defaultChecked={currentRole?.permissions.includes(perm)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={`perm_${perm}`} className="font-medium text-gray-700 capitalize">{perm}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentRole ? 'Update' : 'Add'} Role
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setCurrentRole(null)
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


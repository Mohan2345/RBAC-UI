import { Users, Shield } from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="bg-blue-600 text-white w-64 min-h-screen p-4">
      <nav className="mt-8">
        <a
          href="#"
          className={`flex items-center mt-4 py-2 px-6 ${
            activeTab === 'users' ? 'bg-blue-700 rounded-lg' : ''
          }`}
          onClick={() => setActiveTab('users')}
        >
          <Users className="h-5 w-5 mr-3" />
          <span className="text-lg font-medium">Users</span>
        </a>
        <a
          href="#"
          className={`flex items-center mt-4 py-2 px-6 ${
            activeTab === 'roles' ? 'bg-blue-700 rounded-lg' : ''
          }`}
          onClick={() => setActiveTab('roles')}
        >
          <Shield className="h-5 w-5 mr-3" />
          <span className="text-lg font-medium">Roles</span>
        </a>
      </nav>
    </aside>
  )
}


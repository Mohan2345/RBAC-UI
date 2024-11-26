import { UserCircle } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">RBAC Dashboard</h1>
          <div className="flex items-center">
            <UserCircle className="h-8 w-8 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )
}


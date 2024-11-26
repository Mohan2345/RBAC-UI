import { useState } from 'react'
import { UserProvider } from './contexts/UserContext'
import { RoleProvider } from './contexts/RoleContext'
import Sidebar from './components/Sidebar'
import UserManagement from './components/UserManagement'
import RoleManagement from './components/RoleManagement'
import Header from './components/Header'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('users')

  return (
    <UserProvider>
      <RoleProvider>
        <div className="flex h-screen bg-gray-100">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header activeTab={activeTab} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
              {activeTab === 'users' ? <UserManagement /> : <RoleManagement />}
            </main>
          </div>
        </div>
      </RoleProvider>
    </UserProvider>
  )
}

export default App


import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Filter, MoreHorizontal, Edit2, X, ChevronDown } from 'lucide-react';

const initialUsers = [
  { 
    id: 1, 
    name: 'R. Sharma', 
    email: 'r.sharma@corrmill.com', 
    role: 'Administrator', 
    department: 'IT & Systems', 
    plant: 'Unit 2', 
    lastLogin: 'Today, 09:12', 
    status: 'Active' 
  }
];

const UserManagementPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { searchQuery } = useOutletContext() || { searchQuery: '' };
  const [users, setUsers] = useState(initialUsers);
  const [activeTab, setActiveTab] = useState('User');
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto bg-[#f8f9fb] flex flex-col relative">
      
      {/* Sub Navigation */}
      <div className="px-8 border-b border-gray-200 bg-white">
        <nav className="flex space-x-8">
          {['User', 'Roles & Permissions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {activeTab === 'User' && (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            {/* Page Toolbar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">All users</h2>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowDrawer(true)}
                  className="bg-[#2f62de] hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-2" strokeWidth={2} />
                  New
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" strokeWidth={2} />
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-max">
                <thead>
                  <tr className="bg-[#f8f9fb] border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 w-12 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
                    </th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4 text-center">Role</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Plant</th>
                    <th className="px-6 py-4">Last Login</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 text-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{user.name}</div>
                        <div className="text-[11px] font-medium text-blue-500 mt-0.5">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-500 border border-red-100">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold text-[13px]">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium text-[13px]">
                        {user.plant}
                      </td>
                      <td className="px-6 py-4 text-gray-800 text-[13px] font-medium">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium text-[13px]">
                        {user.status}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-3 border-t border-gray-100 bg-white text-xs text-gray-500 flex justify-between items-center mt-auto">
              <span>Showing {users.length} user(s)</span>
            </div>
          </div>
        )}
        
        {activeTab === 'Roles & Permissions' && (
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center text-gray-500">
            <h2 className="text-xl font-medium">Roles & Permissions - Coming Soon</h2>
          </div>
        )}
      </div>

      {/* New User Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 transition-opacity"
            onClick={() => setShowDrawer(false)}
          />
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-[500px] bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-2xl font-semibold text-[#1a233a]">New User</h2>
              <button 
                onClick={() => setShowDrawer(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="space-y-6">
                
                <div>
                  <label className="block text-sm font-semibold text-[#1a233a] mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter full name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a233a] mb-2">Employee ID <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. EMP-0001" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a233a] mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter phone number" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a233a] mb-2">Email ID</label>
                  <input type="email" placeholder="Enter email address" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a233a] mb-2">Department</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option value="">Select Department</option>
                        <option>IT & System</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a233a] mb-2">Plant</label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option value="">Select Plant</option>
                        <option>Unit-2</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a233a] mb-2">Default Shift</label>
                  <div className="relative">
                    <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#1a233a] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                      <option value="">Select Shift</option>
                      <option>Shift-A</option>
                      <option>Shift-B</option>
                      <option>Shift-C</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a233a] mb-3">Assign Role</label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Role items */}
                    {['Machine Operator', 'Shift Supervisor', 'QC Inspector', 'Production Planner', 'Store Keeper', 'Maintenance Technician'].map((role) => {
                      return (
                        <label key={role} className="flex items-center justify-between border border-blue-200 rounded-lg px-4 py-3 cursor-pointer hover:bg-blue-50/50 transition-colors bg-white">
                          <span className="text-[13px] text-gray-700 font-medium">{role}</span>
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" 
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm font-semibold text-[#1a233a]">Account Active</span>
                  <button className="w-11 h-6 bg-gray-200 rounded-full relative transition-colors focus:outline-none">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
                  </button>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-white flex justify-end space-x-3">
              <button 
                onClick={() => setShowDrawer(false)}
                className="px-6 py-2.5 border border-gray-200 text-gray-600 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                className="px-6 py-2.5 bg-[#b36b32] text-white font-medium text-sm rounded-lg hover:bg-[#9a5a28] transition-colors"
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserManagementPage;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Pass the search query down to whichever page is currently active */}
          <Outlet context={{ searchQuery }} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

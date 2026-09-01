import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { 
  LayoutDashboard,
  User,
  Users,
  UserCog,
  ShoppingCart,
  Network,
  Monitor,
  Truck,
  ClipboardList,
  UserPlus,
  ShieldCheck,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
  Settings
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard',       icon: LayoutDashboard, path: '/' },
  { name: 'Customer',        icon: User,            path: '/customers' },
  { name: 'Sales',           icon: Users,           path: '/sales' },
  { name: 'Vendors',         icon: UserCog,         path: '/vendors' },
  { name: 'Purchase',        icon: ShoppingCart,    path: '/purchase' },
  { name: 'Inventory',       icon: Network,         path: '/inventory' },
  { name: 'Machine',         icon: Settings,        path: '/machine' },
  { name: 'Production',      icon: Monitor,         path: '/production' },
  { name: 'Supply Chain',    icon: Truck,           path: '/supply-chain' },
  { name: 'Accounting',      icon: ClipboardList,   path: '/accounting' },
  { name: 'HRMS',            icon: UserPlus,        path: '/hrms' },
  { name: 'User Management', icon: ShieldCheck,     path: '/user-management' },
  { name: 'Report',          icon: FileText,        path: '/report' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0"
      style={{
        width: collapsed ? '68px' : '220px',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Logo / Brand */}
      <Link
        to="/"
        className="flex items-center flex-shrink-0 border-b border-[#e8ecef] h-[52px] hover:bg-gray-50/50 cursor-pointer"
        style={{
          padding: collapsed ? '0' : '0 20px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          transition: 'all 0.3s ease',
          textDecoration: 'none'
        }}
      >
        {/* Logo icon box */}
        <div
          className="flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
          }}
        >
          <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
        </div>

        {/* Brand text */}
        <div
          className="whitespace-nowrap flex flex-col justify-center"
          style={{
            marginLeft: collapsed ? '0px' : '-4px',
            opacity: collapsed ? 0 : 1,
            width: collapsed ? '0px' : 'auto',
            overflow: 'hidden',
            transition: 'opacity 0.2s ease, width 0.3s ease, margin-left 0.3s ease',
            pointerEvents: collapsed ? 'none' : 'auto',
          }}
        >
          <div className="text-[20px] font-extrabold leading-tight tracking-tight">
            <span className="text-[#132A5E]">ORR</span><span className="text-[#f97316]">NEX</span>
          </div>
        </div>
      </Link>

      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar"
        style={{
          padding: collapsed ? '16px 8px' : '16px 20px 16px 12px',
          transition: 'padding 0.3s ease',
        }}
      >
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              title={collapsed ? item.name : ''}
              className={({ isActive }) => `
                flex items-center rounded-[8px] mb-2 text-[14px] font-semibold whitespace-nowrap transition-all duration-200
                ${isActive 
                  ? 'bg-black text-white shadow-sm' 
                  : 'bg-transparent text-[#374151] hover:bg-gray-50 hover:text-black'}
              `}
              style={({ isActive }) => ({
                padding: collapsed ? '10px' : '10px 14px',
                justifyContent: collapsed ? 'center' : 'flex-start',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-[18px] h-[18px] min-w-[18px] ${isActive ? 'text-white' : 'text-gray-700'}`}
                    strokeWidth={isActive ? 2 : 1.8}
                  />
                  <span
                    style={{
                      marginLeft: collapsed ? '0px' : '14px',
                      opacity: collapsed ? 0 : 1,
                      maxWidth: collapsed ? '0px' : '160px',
                      overflow: 'hidden',
                      display: 'inline-block',
                      transition: 'opacity 0.2s ease, max-width 0.3s ease, margin-left 0.3s ease',
                    }}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div
        className="flex-shrink-0 border-t border-gray-100"
        style={{
          padding: collapsed ? '12px 8px' : '12px 14px',
          transition: 'padding 0.3s ease',
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className="w-full flex items-center justify-center py-2.5 rounded-lg border-none bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          {collapsed
            ? <PanelLeftOpen className="w-5 h-5" strokeWidth={1.8} />
            : <PanelLeftClose className="w-5 h-5" strokeWidth={1.8} />
          }
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

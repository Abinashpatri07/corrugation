import React, { useState, useEffect } from 'react';
import { Search, Calendar, HelpCircle, Bell } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/helpers';

const Header = ({ searchQuery, setSearchQuery }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      style={{
        height: '52px',
        background: '#ffffff',
        borderBottom: '1px solid #e8ecef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
        gap: '20px',
      }}
    >
      {/* Left Side (Search & Date/Time) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
        
        {/* Search Bar */}
        <div style={{ position: 'relative', width: '260px' }}>
          <Search
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              color: '#adb5bd',
            }}
            strokeWidth={1.8}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search customer, product or item..."
            style={{
              width: '100%',
              background: '#f4f6f8',
              border: '1px solid #e8ecef',
              borderRadius: '20px',
              padding: '6px 12px 6px 30px',
              fontSize: '12px',
              color: '#495057',
              outline: 'none',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#3a6878';
              e.target.style.boxShadow = '0 0 0 3px rgba(58,104,120,0.1)';
            }}
            onBlur={e => {
              e.target.style.borderColor = '#e8ecef';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Date & Time */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f3f4f6',
            borderRadius: '10px',
            padding: '4px 10px',
          }}
        >
          <Calendar style={{ width: '18px', height: '18px', color: '#2563eb' }} strokeWidth={2} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827', lineHeight: 1.1 }}>
              {formatDate(currentTime)}
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.1, marginTop: '2px' }}>
              {formatTime(currentTime)} IST
            </div>
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

        {/* Help Icon */}
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#1a233a',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            borderRadius: '6px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#343a40'}
          onMouseLeave={e => e.currentTarget.style.color = '#1a233a'}
        >
          <HelpCircle style={{ width: '22px', height: '22px' }} strokeWidth={2.2} />
        </button>

        {/* Bell Icon */}
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#1a233a',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            borderRadius: '6px',
            position: 'relative',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#343a40'}
          onMouseLeave={e => e.currentTarget.style.color = '#1a233a'}
        >
          <Bell style={{ width: '22px', height: '22px' }} strokeWidth={2.2} />
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '4px',
              width: '10px',
              height: '10px',
              background: '#fff',
              borderRadius: '50%',
              border: '2.5px solid #ff3344',
            }}
          />
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: '#e8ecef' }} />

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff3344 0%, #a044b7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            MT
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#000', lineHeight: 1.1 }}>
              Maruty Tandon
            </div>
            <div style={{ fontSize: '11px', color: '#868e96', lineHeight: 1.1, marginTop: '2px' }}>
              marutyon43@gmail.com
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

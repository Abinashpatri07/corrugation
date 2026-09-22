import React, { useState } from 'react';
import { Calendar, CalendarCheck, CalendarX2, CheckCircle2, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import ManufacturingCalendarDayView from './ManufacturingCalendarDayView';
import ManufacturingCalendarWeekView from './ManufacturingCalendarWeekView';
import ManufacturingCalendarMonthView from './ManufacturingCalendarMonthView';

const KPICard = ({ icon: Icon, title, value, bgColor, iconBgColor, iconColor, textColor = "text-slate-900" }) => (
  <div className={`rounded-xl p-4 flex items-center gap-4 w-full flex-1 min-w-[200px] ${bgColor}`}>
    <div className={`p-3 rounded-xl flex items-center justify-center ${iconBgColor}`}>
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div className="flex flex-col">
      <div className="text-xs font-semibold text-slate-700">{title}</div>
      <div className={`text-[22px] font-bold leading-tight mt-0.5 ${textColor}`}>{value}</div>
    </div>
  </div>
);

const ManufacturingCalendarPage = () => {
  const [view, setView] = useState('Month'); // Default to month based on user interest

  return (
    <div className="flex-1 bg-[#fafbfc] min-h-screen flex flex-col p-6 overflow-y-auto">
      
      {/* Title */}
      <h1 className="text-xl font-semibold mb-6 flex-shrink-0" style={{ background: 'linear-gradient(135deg, #ff3344 0%, #a044b7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Manufacturing Calendar
      </h1>

      {/* Top KPIs */}
      <div className="flex items-center gap-6 mb-6 overflow-x-auto pb-2 flex-shrink-0">
        <KPICard icon={Calendar} title="Due Today" value="12" bgColor="bg-blue-50" iconBgColor="bg-blue-200/60" iconColor="text-blue-700" />
        <KPICard icon={Calendar} title="Due This week" value="18" bgColor="bg-orange-50" iconBgColor="bg-orange-200/60" iconColor="text-orange-700" />
        <KPICard icon={CalendarX2} title="Overdue" value="06" bgColor="bg-red-50" iconBgColor="bg-red-200/60" iconColor="text-red-700" />
        <KPICard icon={CheckCircle2} title="Completed" value="32" bgColor="bg-green-50" iconBgColor="bg-green-300/60" iconColor="text-green-700" />
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6 flex-1 h-full min-h-[600px]">
        
        {/* Left Side: Calendar Grid */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          
          {/* Calendar Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                <button className="p-1.5 px-3 hover:bg-slate-50 border-r border-slate-200"><ChevronLeft className="w-4 h-4 text-slate-600" /></button>
                <button className="px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Today</button>
                <button className="p-1.5 px-3 hover:bg-slate-50 border-l border-slate-200"><ChevronRight className="w-4 h-4 text-slate-600" /></button>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 px-2 rounded-lg">
                <Calendar className="w-5 h-5 text-slate-500" />
                <span className="font-semibold text-slate-800 text-sm">
                  {view === 'Day' ? '24 August 2026' : view === 'Week' ? '24 - 30 August 2026' : 'August 2026'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
            </div>
            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
              <button onClick={() => setView('Day')} className={`px-5 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-colors ${view === 'Day' ? 'bg-black text-white' : 'text-slate-600 hover:text-slate-900'}`}>Day</button>
              <button onClick={() => setView('Week')} className={`px-5 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-colors ${view === 'Week' ? 'bg-black text-white' : 'text-slate-600 hover:text-slate-900'}`}>Week</button>
              <button onClick={() => setView('Month')} className={`px-5 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-colors ${view === 'Month' ? 'bg-black text-white' : 'text-slate-600 hover:text-slate-900'}`}>Month</button>
            </div>
          </div>

          {/* Render the selected view */}
          {view === 'Day' && <ManufacturingCalendarDayView />}
          {view === 'Week' && <ManufacturingCalendarWeekView />}
          {view === 'Month' && <ManufacturingCalendarMonthView />}
        </div>
      </div>
    </div>
  );
};



export default ManufacturingCalendarPage;

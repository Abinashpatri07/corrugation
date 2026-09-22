import React from 'react';

const WeekEventBlock = ({ time, title, subtitle, priority, top, height, theme }) => {
  // Theme can be 'pink', 'orange', 'blue', 'green'
  const themes = {
    pink: "bg-red-50 border-red-100",
    orange: "bg-orange-50 border-orange-100",
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100"
  };
  
  const textThemes = {
    pink: "text-red-500",
    orange: "text-orange-500",
    blue: "text-blue-500",
    green: "text-green-500"
  };

  return (
    <div 
      className={`absolute left-2 right-2 rounded-lg border p-3 flex flex-col justify-between shadow-sm ${themes[theme]}`}
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      <div>
        <div className={`text-[12px] font-bold ${textThemes[theme]} mb-1`}>{time}</div>
        <div className="text-[13px] font-bold text-slate-800 leading-tight">{title}</div>
        <div className="text-[11px] text-slate-400 mt-1">{subtitle}</div>
      </div>
      <div className={`text-[11px] font-bold mt-1 ${textThemes[theme]}`}>{priority}</div>
    </div>
  );
};

const ManufacturingCalendarWeekView = () => {
  const hours = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
  const days = [
    { name: 'MON', date: '24 Aug' },
    { name: 'TUE', date: '25 Aug' },
    { name: 'WED', date: '26 Aug' },
    { name: 'THU', date: '27 Aug' },
    { name: 'FRI', date: '28 Aug' },
    { name: 'SAT', date: '29 Aug' },
    { name: 'SUN', date: '30 Aug' }
  ];

  // Each hour slot is 96px (h-24) tall.
  const calculateTop = (hourIndex, minutes) => {
    return (hourIndex * 96) + ((minutes / 60) * 96);
  };

  return (
    <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[600px]">
      
      {/* Header Row */}
      <div className="flex border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="w-24 flex-shrink-0 border-r border-slate-200 flex items-center justify-center">
          <span className="text-xs font-bold text-slate-600">ALL DAY</span>
        </div>
        {days.map((day, idx) => (
          <div key={idx} className={`flex-1 min-w-[150px] py-4 flex items-center justify-center text-xs font-bold text-slate-600 ${idx !== days.length - 1 ? 'border-r border-slate-200' : ''}`}>
            {day.name} {day.date}
          </div>
        ))}
      </div>

      {/* Grid Area */}
      <div className="flex-1 overflow-y-auto relative bg-white">
        <div className="flex min-w-max">
          
          {/* Time Column */}
          <div className="w-24 flex-shrink-0 border-r border-slate-200 bg-white sticky left-0 z-10">
            {hours.map((time, idx) => (
              <div key={time} className="h-24 flex items-start justify-center pt-3 text-[11px] font-medium text-slate-400 border-b border-slate-100">
                {time}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {days.map((day, dayIdx) => (
            <div key={dayIdx} className={`flex-1 min-w-[150px] relative ${dayIdx !== days.length - 1 ? 'border-r border-slate-200' : ''}`}>
              {/* Grid Lines */}
              {hours.map((time, idx) => (
                <div key={time} className="h-24 border-b border-slate-100 w-full absolute left-0 right-0 pointer-events-none" style={{ top: `${idx * 96}px` }}></div>
              ))}

              {/* Events for MON 24 Aug */}
              {dayIdx === 0 && (
                <>
                  <WeekEventBlock time="09:00 AM" title="Material Issue Review" subtitle="Production" priority="High" top={calculateTop(1, 0)} height={90} theme="pink" />
                  <WeekEventBlock time="10:55 AM" title="Machine Maintenance Check" subtitle="Maintenance" priority="Medium" top={calculateTop(2, 55)} height={90} theme="orange" />
                  <WeekEventBlock time="02:55 PM" title="Customer Call ABC Corp" subtitle="Sales" priority="High" top={calculateTop(6, 55)} height={90} theme="pink" />
                </>
              )}

              {/* Events for TUE 25 Aug */}
              {dayIdx === 1 && (
                <>
                  <WeekEventBlock time="10:15 AM" title="Production Planning review" subtitle="Production" priority="Medium" top={calculateTop(2, 15)} height={90} theme="blue" />
                  <WeekEventBlock time="02:55 PM" title="Vendor Follow-up" subtitle="Sales" priority="Low" top={calculateTop(6, 55)} height={90} theme="green" />
                </>
              )}

              {/* Events for WED 26 Aug */}
              {dayIdx === 2 && (
                <>
                  <WeekEventBlock time="10:53 AM" title="Dispatch Schedule Planning" subtitle="Display" priority="Medium" top={calculateTop(2, 53)} height={90} theme="orange" />
                  <WeekEventBlock time="01:05 PM" title="Rat Maintains Check" subtitle="Inventory" priority="Low" top={calculateTop(5, 5)} height={90} theme="green" />
                </>
              )}

              {/* Events for THU 27 Aug */}
              {dayIdx === 3 && (
                <>
                  <WeekEventBlock time="09:30 AM" title="Quality Inception Planning" subtitle="Quality" priority="Medium" top={calculateTop(1, 30)} height={90} theme="orange" />
                  <WeekEventBlock time="12:20 PM" title="Sales Order Follow Up" subtitle="Sales" priority="Low" top={calculateTop(4, 20)} height={90} theme="blue" />
                  <WeekEventBlock time="03:30 PM" title="QC Report Review" subtitle="Production" priority="High" top={calculateTop(7, 30)} height={90} theme="pink" />
                </>
              )}

              {/* Events for FRI 28 Aug */}
              {dayIdx === 4 && (
                <>
                  <WeekEventBlock time="09:30 AM" title="Quality Inception Planning" subtitle="Quality" priority="Medium" top={calculateTop(1, 30)} height={90} theme="orange" />
                  <WeekEventBlock time="10:15 AM" title="Production Planning review" subtitle="Production" priority="Medium" top={calculateTop(6, 15)} height={90} theme="blue" />
                </>
              )}

              {/* Events for SAT 29 Aug */}
              {dayIdx === 5 && (
                <>
                  <WeekEventBlock time="09:30 AM" title="Quality Inception Planning" subtitle="Quality" priority="Medium" top={calculateTop(2, 30)} height={90} theme="orange" />
                  <WeekEventBlock time="10:15 AM" title="Production Planning review" subtitle="Production" priority="Medium" top={calculateTop(6, 15)} height={90} theme="blue" />
                </>
              )}

              {/* Events for SUN 30 Aug */}
              {dayIdx === 6 && (
                <>
                  <WeekEventBlock time="02:55 PM" title="Vendor Follow-up" subtitle="Sales" priority="Low" top={calculateTop(1, 55)} height={90} theme="green" />
                  <WeekEventBlock time="12:20 PM" title="Sales Order Follow Up" subtitle="Sales" priority="Low" top={calculateTop(4, 20)} height={90} theme="blue" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManufacturingCalendarWeekView;

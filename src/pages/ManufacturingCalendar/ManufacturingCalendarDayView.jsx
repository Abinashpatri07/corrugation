import React from 'react';
import { Calendar } from 'lucide-react';

export const EventBlock = ({ title, time, tag, colorClass, widthClass = "w-1/3", userAvatar }) => (
  <div className={`p-3 rounded-lg border-l-4 ${colorClass} ${widthClass} mb-2 mr-2 flex-shrink-0 bg-white shadow-sm border border-slate-100 flex flex-col justify-between`}>
    <div>
      <div className="text-[13px] font-semibold text-slate-800">{title}</div>
      <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
        <span>{time}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
        <span>{tag}</span>
      </div>
    </div>
    {userAvatar && (
      <div className="flex justify-end mt-1">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${userAvatar.bg}`}>
          {userAvatar.initials}
        </div>
      </div>
    )}
  </div>
);

export const TaskListItem = ({ title, time, tag, borderColor, userInitial, userBg }) => (
  <div className={`p-3 rounded-lg border border-slate-200 border-l-4 ${borderColor} bg-white mb-3 shadow-sm`}>
    <div className="text-[13px] font-semibold text-slate-800">{title}</div>
    <div className="flex items-center justify-between mt-2">
      <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
        <span>{time}</span>
        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
        <span>{tag}</span>
      </div>
      {userInitial && (
        <div className={`flex items-center gap-1.5`}>
           <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${userBg}`}>
            {userInitial}
           </div>
        </div>
      )}
    </div>
  </div>
);

const ManufacturingCalendarDayView = () => {
  return (
    <div className="flex gap-6 flex-1 h-full min-h-[500px] overflow-hidden">
      {/* Left Side: Calendar Grid */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {/* Grid Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Time Column */}
            <div className="w-24 flex-shrink-0 border-r border-slate-200 text-center relative z-20 bg-white">
              <div className="h-20 flex items-center justify-center text-xs font-semibold text-slate-500 border-b border-slate-200">All Day</div>
              {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((time, idx) => (
                <div key={time} className="h-24 flex items-start justify-center pt-2 text-[11px] font-medium text-slate-500 border-b border-slate-100 relative">
                  {time}
                  {time === '09:00 AM' && <div className="absolute left-full top-[50%] w-2 h-2 rounded-full bg-red-500 -ml-1 mt-1 z-30" />}
                </div>
              ))}
            </div>

            {/* Events Column */}
            <div className="flex-1 relative min-w-[700px]">
              <div className="h-20 border-b border-slate-200 flex items-center p-2 px-4 gap-4 overflow-x-auto">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 flex items-center gap-3 w-64 flex-shrink-0">
                  <div className="bg-blue-400 p-1.5 rounded text-white"><Calendar className="w-4 h-4" /></div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">PO Follow-up</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">8 Purchase</div>
                  </div>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2.5 flex items-center gap-3 w-64 flex-shrink-0">
                  <div className="bg-indigo-400 p-1.5 rounded text-white"><Calendar className="w-4 h-4" /></div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Monthly Production Plan</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">6 Production</div>
                  </div>
                </div>
              </div>

              {/* 08:00 AM Slot */}
              <div className="h-24 border-b border-slate-100"></div>

              {/* Red Current Time Line */}
              <div className="absolute left-0 right-0 h-px bg-red-500 z-20 top-[calc(5rem+6rem+0.5rem)]"></div>

              {/* 09:00 AM Slot */}
              <div className="h-24 border-b border-slate-100 p-2 flex overflow-x-auto relative z-10">
                <EventBlock title="Material Issue Review" time="09:00 - 10:00 AM" tag="Production" colorClass="border-l-blue-400 bg-blue-50/30" />
                <EventBlock title="Material Issue Review" time="09:00 - 10:00 Am" tag="Production" colorClass="border-l-blue-400 bg-blue-50/30" />
                <EventBlock title="Material Issue Review" time="09:00 - 10:00 Am" tag="Production" colorClass="border-l-blue-400 bg-blue-50/30" />
                <div className="sticky right-0 top-0 bottom-0 flex items-center pr-2 pl-12 bg-gradient-to-l from-white via-white to-transparent pointer-events-none">
                  <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">+5 more</span>
                </div>
              </div>

              {/* 10:00 AM Slot (Contains 10:30 event) */}
              <div className="h-24 border-b border-slate-100 p-2 pt-6 flex overflow-x-auto relative">
                <EventBlock title="Machine Maintenance Check" time="10:30 - 11:30 Am" tag="Maintenance" colorClass="border-l-green-400 bg-green-50/30" />
                <EventBlock title="Machine Maintenance Check" time="10:30 - 11:30 Am" tag="Maintenance" colorClass="border-l-green-400 bg-green-50/30" />
                <EventBlock title="Machine Maintenance Check" time="10:30 - 11:30 Am" tag="Maintenance" colorClass="border-l-green-400 bg-green-50/30" />
                <div className="sticky right-0 top-0 bottom-0 flex items-center pr-2 pl-12 bg-gradient-to-l from-white via-white to-transparent pointer-events-none">
                  <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">+3 more</span>
                </div>
              </div>

              {/* 11:00 AM Slot */}
              <div className="h-24 border-b border-slate-100"></div>

              {/* 12:00 PM Slot */}
              <div className="h-24 border-b border-slate-100 p-2 flex overflow-x-auto relative">
                <EventBlock title="Quality Inspection Planning" time="12:00 - 01:00 Pm" tag="Quality" colorClass="border-l-orange-400 bg-orange-50/30" />
                <EventBlock title="Quality Inspection Planning" time="12:00 - 01:00 Pm" tag="Quality" colorClass="border-l-orange-400 bg-orange-50/30" />
                <EventBlock title="Quality Inspection Planning" time="12:00 - 01:00 Pm" tag="Quality" colorClass="border-l-orange-400 bg-orange-50/30" />
                <div className="sticky right-0 top-0 bottom-0 flex items-center pr-2 pl-12 bg-gradient-to-l from-white via-white to-transparent pointer-events-none">
                  <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">+2 more</span>
                </div>
              </div>

              {/* 01:00 PM Slot */}
              <div className="h-24 border-b border-slate-100 p-2 pt-6 flex overflow-x-auto relative">
                <EventBlock title="Customer Call - ABC Corp" time="01:30 - 02:00 Pm" tag="Sale" colorClass="border-l-pink-400 bg-pink-50/30" />
                <EventBlock title="Customer Call - ABC Corp" time="01:30 - 02:00 Pm" tag="Sale" colorClass="border-l-pink-400 bg-pink-50/30" />
                <EventBlock title="Customer Call - ABC Corp" time="01:30 - 02:00 Pm" tag="Sale" colorClass="border-l-pink-400 bg-pink-50/30" />
                <div className="sticky right-0 top-0 bottom-0 flex items-center pr-2 pl-12 bg-gradient-to-l from-white via-white to-transparent pointer-events-none">
                  <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">+2 more</span>
                </div>
              </div>

              {/* 02:00 PM Slot */}
              <div className="h-24 border-b border-slate-100"></div>

              {/* 03:00 PM Slot */}
              <div className="h-24 border-b border-slate-100 p-2 flex overflow-x-auto">
                <EventBlock title="Production Order Review - MO-2458" time="03:00 - 04:00 Pm" tag="Production" colorClass="border-l-purple-400 bg-purple-50/30" widthClass="w-[45%]" />
                <EventBlock title="Production Order Review - MO-2458" time="03:00 - 04:00 Pm" tag="Production" colorClass="border-l-purple-400 bg-purple-50/30" widthClass="w-[45%]" />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Task Sidebar */}
      <div className="w-[300px] flex-shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-800">Tasks at 9:00 AM</div>
            <div className="text-[10px] text-slate-500">Total 10 Tasks</div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
          <TaskListItem title="Machine Maintenance Check" time="09:00 - 10:00 AM" tag="Maintenance" borderColor="border-l-blue-500" userInitial="VP" userBg="bg-teal-500" />
          <TaskListItem title="Quality Inspection Planning" time="09:00 - 10:00 AM" tag="Quality" borderColor="border-l-purple-500" userInitial="NS" userBg="bg-blue-600" />
          <TaskListItem title="Customer Call - ABC Corp" time="09:00 - 10:00 AM" tag="Sales" borderColor="border-l-green-500" userInitial="PD" userBg="bg-green-500" />
          <TaskListItem title="Store Material Verification" time="09:00 - 10:00 AM" tag="Inventory" borderColor="border-l-pink-500" userInitial="PV" userBg="bg-pink-600" />
          <TaskListItem title="Job Card Review - JC-4587" time="09:00 - 10:00 AM" tag="Inventory" borderColor="border-l-yellow-500" userInitial="RK" userBg="bg-yellow-500" />
          <TaskListItem title="Production Schedule Review" time="09:00 - 10:00 AM" tag="Production" borderColor="border-l-orange-500" userInitial="NK" userBg="bg-orange-500" />
          <TaskListItem title="Paper Reel Inspection" time="09:00 - 10:00 AM" tag="Quality" borderColor="border-l-teal-500" userInitial="PM" userBg="bg-teal-400" />
          <TaskListItem title="Box Sample Approval" time="09:00 - 10:00 AM" tag="Quality" borderColor="border-l-red-500" userInitial="AS" userBg="bg-red-500" />
        </div>
      </div>
    </div>
  );
};

export default ManufacturingCalendarDayView;

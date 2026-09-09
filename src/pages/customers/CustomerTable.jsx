import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const CustomerTable = ({
  customers,
  selectedIds,
  onToggleSelectAll,
  onToggleSelect,
  searchQuery
}) => {
  const navigate = useNavigate();

  const allSelected =
    customers.length > 0 &&
    selectedIds.length === customers.length;

  return (
    <div className="flex-1 pb-8 w-full overflow-x-auto">
      <div className="w-full">
        <table className="w-full text-left border-collapse">

          {/* =========================
              TABLE HEADER
          ========================= */}

          <thead>
            <tr className="bg-[#f4f6f8] border-b border-gray-200 text-sm">

              <th className="py-3 pl-6 pr-4 font-bold text-[#6b778c] w-16 text-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                />
              </th>

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                Name
              </th>

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                GST
              </th>

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                Primary Contact
              </th>

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                Email
              </th>

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                Phone
              </th>

              <th className="py-4 px-4 font-bold text-[#6b778c] whitespace-nowrap">
                Receivable
              </th>

              <th className="py-4 pr-6 pl-4 font-bold text-[#6b778c] whitespace-nowrap">
                <div className="flex items-center gap-1 cursor-pointer">
                  Status
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </th>

            </tr>
          </thead>


          {/* =========================
              TABLE BODY
          ========================= */}

          <tbody>

            {customers.length > 0 ? (

              customers.map((customer) => (

                <tr
                  key={customer.customerId}
                  onClick={() =>
                    navigate(`/customers/${customer.customerId}`)
                  }
                  className={`
                    border-b border-gray-100
                    hover:bg-gray-50/50
                    transition-colors
                    text-[13px]
                    cursor-pointer
                    ${
                      selectedIds.includes(customer.customerId)
                        ? 'bg-blue-50/50'
                        : ''
                    }
                  `}
                >

                  {/* CHECKBOX */}

                  <td
                    className="py-3 pl-6 pr-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      checked={selectedIds.includes(customer.customerId)}
                      onChange={() =>
                        onToggleSelect(customer.customerId)
                      }
                    />
                  </td>


                  {/* NAME */}

                  <td className="py-4 px-4 text-blue-600 font-medium hover:underline whitespace-nowrap">
                    {customer.displayName || '—'}
                  </td>


                  {/* GST */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">
                    {customer.gstin || '—'}
                  </td>


                  {/* PRIMARY CONTACT */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">
                    {customer.primaryContact || '—'}
                  </td>


                  {/* EMAIL */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">
                    {customer.email || '—'}
                  </td>


                  {/* PHONE */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">
                    {customer.phone || '—'}
                  </td>


                  {/* RECEIVABLE */}

                  <td className="py-4 px-4 text-[#1a233a] font-medium whitespace-nowrap">
                    {Number(customer.receivable || 0).toLocaleString(
                      'en-IN',
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )}
                  </td>


                  {/* STATUS */}

                  <td className="py-4 pr-6 pl-4 text-[#1a233a] font-medium whitespace-nowrap">

                    {customer.status === 'ACTIVE' ? (

                      <span className="bg-[#dcfce7] text-[#10b981] px-2 py-0.5 rounded-full font-medium text-[10px]">
                        Active
                      </span>

                    ) : (

                      <span className="bg-[#fee2e2] text-[#ef4444] px-2 py-0.5 rounded-full font-medium text-[10px]">
                        Inactive
                      </span>

                    )}

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="8"
                  className="py-8 text-center text-gray-500 text-[13px]"
                >
                  No customers found{' '}
                  {searchQuery
                    ? `matching "${searchQuery}"`
                    : ''}
                </td>
              </tr>

            )}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CustomerTable;

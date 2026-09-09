import React from 'react';

const CustomerSummary = ({ summary, currencyCode = 'INR' }) => {

    const data = summary || {};


    return (

        <div className="bg-white shrink-0 border border-gray-100 rounded-[20px] shadow-sm mb-1">

            <div className="px-3 lg:px-4 p-3">

                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">

                    {/* =========================================
                        Lifetime Orders
                    ========================================= */}

                    <SummaryCard
                        title="Lifetime Orders"
                        value={
                            Number(
                                data.lifetimeOrders || 0
                            ).toLocaleString('en-IN')
                        }
                        subtitle="Total Orders Placed"
                    />


                    {/* =========================================
                        Lifetime Value
                    ========================================= */}

                    <SummaryCard
                        title="Lifetime Value"
                        value={formatCurrency(
                            data.lifetimeValue,
                            currencyCode
                        )}
                        subtitle="Total Customer Value"
                    />


                    {/* =========================================
                        Outstanding Balance
                    ========================================= */}

                    <SummaryCard
                        title="Out-Standing Balance"
                        value={formatCurrency(
                            data.outstandingBalance,
                            currencyCode
                        )}
                        subtitle="Amount Due"
                    />


                    {/* =========================================
                        Active Orders
                    ========================================= */}

                    <SummaryCard
                        title="Active Order"
                        value={
                            Number(
                                data.activeOrders || 0
                            ).toLocaleString('en-IN')
                        }
                        subtitle="Orders In Progress"
                        valueClass="text-[#16a34a]"
                    />


                    {/* =========================================
                        On-Time Delivery
                    ========================================= */}

                    <SummaryCard
                        title="Ontime Delivery"
                        value={`${Number(
                            data.onTimeDeliveryPercentage || 0
                        ).toFixed(1)}%`}
                        subtitle="Last 12 Months"
                    />

                </div>

            </div>

        </div>
    );
};


// =====================================================
// SUMMARY CARD
// =====================================================

const SummaryCard = ({
    title,
    value,
    subtitle,
    valueClass = 'text-[#111827]'
}) => {

    return (

        <div className="bg-[#f9fafb] rounded-[12px] p-3 min-w-[140px] flex-1">

            <div className="text-[11px] text-gray-500 font-medium mb-0.5 truncate">
                {title}
            </div>

            <div
                className={`text-[24px] font-bold leading-none ${valueClass}`}
            >
                {value}
            </div>

            <div className="text-[9px] text-gray-400 mt-1 font-medium truncate">
                {subtitle}
            </div>

        </div>
    );
};


// =====================================================
// CURRENCY
// =====================================================

function formatCurrency(
    value,
    currencyCode = 'INR'
) {

    const amount =
        Number(value || 0);


    if (currencyCode === 'INR') {

        return `₹${amount.toLocaleString('en-IN')}`;
    }


    return new Intl.NumberFormat(
        'en-US',
        {
            style: 'currency',
            currency: currencyCode
        }
    ).format(amount);
}


export default CustomerSummary;
import React from 'react';

const CustomerHeader = ({ customer }) => {

    if (!customer) {
        return null;
    }


    const initials =
        (customer.displayName || 'CU')
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map(word => word[0])
            .join('')
            .toUpperCase();


    return (

        <div className="bg-white shrink-0 border border-gray-100 rounded-[20px] shadow-sm mb-1">

            <div className="px-3 lg:px-4 p-3">

                {/* Header */}

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-5">

                        {/* Customer Initials */}

                        <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#ff3b30] to-[#b82db8] flex items-center justify-center text-white text-[18px] font-bold shadow-sm shrink-0">
                            {initials}
                        </div>


                        {/* Customer Information */}

                        <div>

                            <div className="flex items-center gap-3">

                                <h1 className="text-[18px] font-bold text-[#1a233a] uppercase">
                                    {customer.displayName || '-'}
                                </h1>

                                <span className="text-[12px] text-gray-400 font-medium">
                                    {customer.customerCode || '-'}
                                </span>

                            </div>


                            <div className="text-[11.5px] text-gray-500 mt-1 font-medium">

                                {customer.customerType || '-'}

                                {customer.customerLanguage && (
                                    <>
                                        {' • '}
                                        {customer.customerLanguage}
                                    </>
                                )}

                                {customer.createdAt && (
                                    <>
                                        {' • Onboarded '}
                                        {formatDate(
                                            customer.createdAt
                                        )}
                                    </>
                                )}

                                {customer.ownerName && (
                                    <>
                                        {' • Owner: '}
                                        {customer.ownerName}
                                    </>
                                )}

                            </div>

                        </div>

                    </div>


                    {/* Status */}

                    <span className="px-3 py-1 bg-[#e0f2fe] text-[#0284c7] text-[11px] font-bold rounded-full">

                        {customer.status === 'ACTIVE'
                            ? 'In Good Standing'
                            : 'Inactive'}

                    </span>

                </div>

            </div>

        </div>
    );
};


// =====================================================
// DATE FORMATTER
// =====================================================

function formatDate(value) {

    if (!value) {
        return '-';
    }

    const date =
        new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString(
        'en-GB',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }
    );
}


export default CustomerHeader;
import React, { useState } from 'react';

import {
    Calendar,
    Download
} from 'lucide-react';


const CustomerQuotes = ({
    quotes = [],
    pagination,
    onPageChange,
    onSearch
}) => {

    const [search, setSearch] =
        useState('');


    const handleSearchChange = (
        event
    ) => {

        const value =
            event.target.value;

        setSearch(value);

        if (onSearch) {
            onSearch(value);
        }
    };


    return (

        <div className="space-y-6">

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="flex items-center justify-between p-4 lg:p-5 border-b border-gray-100">

                    <h3 className="text-[16px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] to-[#5a67d8]">
                        Quotes
                    </h3>


                    <div className="flex items-center gap-2">

                        <div className="relative">

                            <input
                                type="text"
                                value={search}
                                onChange={
                                    handleSearchChange
                                }
                                placeholder="Search quotes..."
                                className="w-[180px] h-8 px-3 text-[11px] border border-gray-200 rounded-md outline-none focus:border-purple-400"
                            />

                        </div>


                        <button
                            type="button"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            Select Date Range
                        </button>


                        <button
                            type="button"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <Download className="w-3.5 h-3.5 text-gray-400" />
                            Export
                        </button>

                    </div>

                </div>


                {/* =========================================
                    TABLE
                ========================================= */}

                <div className="overflow-x-auto">

                    <table className="w-full text-left text-[12px] whitespace-nowrap">

                        <thead>

                            <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">

                                <th className="py-3 pl-4 lg:pl-5 pr-3">
                                    Quote ID
                                </th>

                                <th className="py-3 px-3">
                                    Date
                                </th>

                                <th className="py-3 px-3">
                                    Items
                                </th>

                                <th className="py-3 px-3">
                                    Status
                                </th>

                                <th className="py-3 px-3">
                                    Total Value
                                </th>

                                <th className="py-3 pr-4 lg:pr-5 pl-3">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody className="text-[#1a233a]">

                            {quotes.length > 0 ? (

                                quotes.map(
                                    (quote, index) => (

                                        <tr
                                            key={
                                                quote.id ||
                                                index
                                            }
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >

                                            <td className="py-3 pl-4 lg:pl-5 pr-3 font-medium">
                                                {quote.id || '-'}
                                            </td>


                                            <td className="py-3 px-3 font-medium text-gray-600">
                                                {formatDate(
                                                    quote.createdAt
                                                )}
                                            </td>


                                            <td className="py-3 px-3 font-medium text-gray-700">
                                                {quote.items?.length || 0} Items
                                            </td>


                                            <td className="py-3 px-3 font-bold">
                                                <DeliveryStatus status={quote.status || 'DRAFT'} />
                                            </td>


                                            <td className="py-3 px-3 font-medium">
                                                {formatCurrency(
                                                    quote.totalValue || quote.items?.reduce((acc, curr) => acc + ((curr.boxWeight * 50) * curr.quantity), 0) || 0
                                                )}
                                            </td>


                                            <td className="py-3 pr-4 lg:pr-5 pl-3">

                                                <button className="text-blue-500 hover:underline text-[12px]">View</button>

                                            </td>

                                        </tr>

                                    )

                            )) 
                            
                            : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-4 py-10 text-center text-[12px] text-gray-500"
                                    >
                                        No quotes found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* =========================================
                    PAGINATION
                ========================================= */}

                {pagination && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">

                        <div className="text-[11px] text-gray-500">

                            Page {pagination.page}
                            {' '}of{' '}
                            {pagination.totalPages}

                            {' '}•

                            {' '}
                            {pagination.totalRecords}
                            {' '}quotes

                        </div>


                        <div className="flex items-center gap-2">

                            <button
                                type="button"
                                disabled={
                                    pagination.page <= 1
                                }
                                onClick={() =>
                                    onPageChange &&
                                    onPageChange(
                                        pagination.page - 1
                                    )
                                }
                                className="px-3 py-1.5 border border-gray-200 rounded-md text-[11px] disabled:opacity-40"
                            >
                                Previous
                            </button>


                            <button
                                type="button"
                                disabled={
                                    pagination.page >=
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    onPageChange &&
                                    onPageChange(
                                        pagination.page + 1
                                    )
                                }
                                className="px-3 py-1.5 border border-gray-200 rounded-md text-[11px] disabled:opacity-40"
                            >
                                Next
                            </button>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};


// =====================================================
// DELIVERY STATUS
// =====================================================

const DeliveryStatus = ({
    status
}) => {

    const normalized =
        (status || '')
            .toUpperCase();


    let classes =
        'bg-gray-100 text-gray-500';


    if (
        normalized === 'DELIVERED'
    ) {

        classes =
            'bg-[#e0f5e7] text-[#16a34a]';

    } else if (
        normalized.includes('PARTIAL')
    ) {

        classes =
            'bg-[#ffedd5] text-[#c2410c]';

    } else if (
        normalized === 'CANCELLED'
    ) {

        classes =
            'bg-red-50 text-red-600';

    } else if (
        normalized === 'IN TRANSIT'
    ) {

        classes =
            'bg-blue-50 text-blue-600';
    }


    return (

        <span
            className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-full ${classes}`}
        >
            {status || 'N/A'}
        </span>
    );
};


// =====================================================
// PAYMENT STATUS
// =====================================================

const PaymentStatus = ({
    status
}) => {

    const normalized =
        (status || '')
            .toUpperCase();


    let classes =
        'bg-gray-100 text-gray-500';


    if (normalized === 'PAID') {

        classes =
            'bg-[#e0f5e7] text-[#16a34a]';

    } else if (
        normalized === 'PENDING'
    ) {

        classes =
            'bg-indigo-50 text-indigo-600';

    } else if (
        normalized === 'OVERDUE'
    ) {

        classes =
            'bg-red-50 text-red-600';
    }


    return (

        <span
            className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-full ${classes}`}
        >
            {status || 'N/A'}
        </span>
    );
};


// =====================================================
// HELPERS
// =====================================================

function formatCurrency(value) {

    return `₹${Number(
        value || 0
    ).toLocaleString('en-IN')}`;
}


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


export default CustomerQuotes;
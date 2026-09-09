import React from 'react';
import {
    Calendar,
    Download
} from 'lucide-react';

const CustomerCommercialTerms = ({
    commercialTerms
}) => {

    if (!commercialTerms) {

        return (
            <div className="bg-white rounded-[12px] p-8 text-center text-[12px] text-gray-400">
                No commercial terms available.
            </div>
        );
    }


    const {
        creditLimit = 0,
        creditPeriod = 0,
        paymentTerms = '-',
        outstandingBalance = 0,
        availableCredit = 0,
        overdueStatus = 'No overdue',
        paymentActivity = []
    } = commercialTerms;


    return (

        <div className="bg-white rounded-[12px] p-2.5 shadow-sm border border-gray-100">

            <div className="space-y-4">

                {/* =========================================
                    CREDIT & PAYMENT
                ========================================= */}

                <div className="bg-white border border-gray-100 rounded-[12px] p-5 shadow-sm">

                    <h3 className="text-[14px] font-semibold text-[#1a233a] mb-4">
                        Credit & Payment
                    </h3>


                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        {/* Credit Limit */}

                        <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3">

                            <div className="text-[10px] text-gray-500 font-medium mb-1">
                                Credit Limit
                            </div>

                            <div className="text-[14px] font-bold text-[#1a233a] mb-1">
                                {formatCurrency(
                                    creditLimit
                                )}
                            </div>

                            <div className="text-[9px] text-gray-400 font-medium mb-1">
                                Overdue Status
                            </div>

                            <div
                                className={`inline-flex px-2 py-0.5 text-[9px] font-bold rounded ${
                                    overdueStatus === 'No overdue'
                                        ? 'bg-[#e0f5e7] text-[#16a34a]'
                                        : 'bg-red-50 text-red-600'
                                }`}
                            >
                                {overdueStatus}
                            </div>

                        </div>


                        {/* Credit Period */}

                        <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3">

                            <div className="text-[10px] text-gray-500 font-medium mb-1">
                                Credit Period
                            </div>

                            <div className="text-[12px] font-medium text-[#1a233a] mb-2">
                                {creditPeriod} Days
                            </div>

                            <div className="text-[9px] text-gray-400 font-medium mb-1">
                                Available Credit
                            </div>

                            <div className="text-[13px] font-bold text-[#1a233a]">
                                {formatCurrency(
                                    availableCredit
                                )}
                            </div>

                        </div>


                        {/* Payment Terms */}

                        <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3 flex flex-col justify-between">

                            <div>

                                <div className="text-[10px] text-gray-500 font-medium mb-1">
                                    Payment Terms
                                </div>

                                <div className="text-[12px] font-medium text-[#1a233a]">
                                    {paymentTerms}
                                </div>

                            </div>

                        </div>


                        {/* Outstanding Balance */}

                        <div className="bg-[#f8fbff] border border-[#e8f1f8] rounded-[8px] p-3 flex flex-col justify-between">

                            <div>

                                <div className="text-[10px] text-gray-500 font-medium mb-1">
                                    Outstanding Balance
                                </div>

                                <div className="text-[14px] font-bold text-[#1a233a]">
                                    {formatCurrency(
                                        outstandingBalance
                                    )}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================================
                    RECENT PAYMENT ACTIVITY
                ========================================= */}

                <div className="bg-white border border-gray-100 rounded-[12px] p-5 shadow-sm">

                    <div className="flex justify-between items-center mb-5">

                        <h3 className="text-[16px] font-bold text-[#1a233a]">
                            Recent Payment Activity
                        </h3>


                        <div className="flex items-center gap-3">

                            <button
                                type="button"
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-md text-[12px] text-gray-500 font-medium hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <Calendar className="w-3.5 h-3.5" />
                                Select Date Range
                            </button>


                            <button
                                type="button"
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-100 rounded-md text-[12px] text-gray-500 font-medium hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <Download className="w-3.5 h-3.5" />
                                Export
                            </button>

                        </div>

                    </div>


                    <div className="space-y-3">

                        {/* Header */}

                        <div className="grid grid-cols-4 px-4 py-2.5 border border-gray-200 rounded-[8px] text-[11px] text-gray-400 font-medium bg-white">

                            <div>Invoice No.</div>
                            <div>Amount</div>
                            <div>Due Date</div>
                            <div>Status</div>

                        </div>


                        {/* Data */}

                        {paymentActivity.length > 0 ? (

                            paymentActivity.map(
                                (invoice, index) => (

                                    <div
                                        key={
                                            invoice.invoiceId ||
                                            index
                                        }
                                        className="grid grid-cols-4 px-4 py-3 border border-gray-100 rounded-[8px] text-[12px] items-center bg-white hover:border-gray-200 transition-colors"
                                    >

                                        <div className="font-medium text-[#1a233a]">
                                            {invoice.invoiceNumber || '-'}
                                        </div>


                                        <div className="font-bold text-[#1a233a]">
                                            {formatCurrency(
                                                invoice.amount ||
                                                invoice.totalAmount
                                            )}
                                        </div>


                                        <div className="text-[#1a233a] font-medium">
                                            {formatDate(
                                                invoice.dueDate
                                            )}
                                        </div>


                                        <div>

                                            <PaymentStatus
                                                status={
                                                    invoice.paymentStatus
                                                }
                                            />

                                        </div>

                                    </div>

                                )

                            )

                        ) : (

                            <div className="text-center py-8 text-[12px] text-gray-400">
                                No payment activity found.
                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
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
            'bg-[#dcfce7] text-[#16a34a]';

    } else if (
        normalized === 'PENDING'
    ) {

        classes =
            'bg-[#fef3c7] text-[#d97706]';

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


export default CustomerCommercialTerms;
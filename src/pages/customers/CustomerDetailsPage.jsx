import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ChevronDown, Plus, MoreHorizontal, Search } from 'lucide-react';


// =====================================================
// COMPONENTS
// =====================================================

import CustomerHeader
    from "../../components/customer/CustomerHeader";

import CustomerSummary
    from "../../components/customer/CustomerSummary";

import CustomerOverview
    from "../../components/customer/CustomerOverview";

import CustomerCommercialTerms
    from "../../components/customer/CustomerCommercialTerms";

import BoxSpecifications
    from "../../components/customer/BoxSpecifications";

import OrderHistory
    from "../../components/customer/OrderHistory";


// =====================================================
// SERVICES
// =====================================================

import {
    getCustomerDetails,
    getCustomerCommercialTerms,
    getCustomerBoxSpecifications,
    getCustomerOrderHistory
} from "../../services/customerDetailsApi";

import {
    getCustomers
} from "../../services/customerlistApi";

const CustomerDetailsPage = () => {

    const navigate =
        useNavigate();


    const {
        customerId
    } = useParams();

    // =================================================
    // SIDEBAR CUSTOMER LIST
    // =================================================

    const [
        customers,
        setCustomers
    ] = useState([]);

    const [
        customerSearch,
        setCustomerSearch
    ] = useState('');

    const [
        loadingCustomers,
        setLoadingCustomers
    ] = useState(false);


    // =================================================
    // TAB
    // =================================================

    const [
        activeTab,
        setActiveTab
    ] = useState('Overview');


    // =================================================
    // CUSTOMER
    // =================================================

    const [
        customer,
        setCustomer
    ] = useState(null);


    // =================================================
    // SUMMARY
    // =================================================

    const [
        summary,
        setSummary
    ] = useState(null);

    // =================================================
    // OVERVIEW RELATED DATA
    // =================================================

    const [
        addresses,
        setAddresses
    ] = useState({
        billing: null,
        shipping: null
    });

    const [
        contacts,
        setContacts
    ] = useState([]);

    const [
        bankDetails,
        setBankDetails
    ] = useState([]);


    // =================================================
    // COMMERCIAL TERMS
    // =================================================

    const [
        commercialTerms,
        setCommercialTerms
    ] = useState(null);


    // =================================================
    // BOX SPECIFICATIONS
    // =================================================

    const [
        boxSpecifications,
        setBoxSpecifications
    ] = useState([]);


    // =================================================
    // ORDER HISTORY
    // =================================================

    const [
        orderHistory,
        setOrderHistory
    ] = useState([]);


    const [
        orderPagination,
        setOrderPagination
    ] = useState(null);


    const [
        orderSearch,
        setOrderSearch
    ] = useState('');


    // =================================================
    // LOADING
    // =================================================

    const [
        loadingCustomer,
        setLoadingCustomer
    ] = useState(true);


    const [
        loadingTab,
        setLoadingTab
    ] = useState(false);


    const [
        error,
        setError
    ] = useState(null);

    // =================================================
    // LOAD CUSTOMER LIST FOR SIDEBAR
    // =================================================

    useEffect(() => {

        const loadCustomers = async () => {

            try {

                setLoadingCustomers(true);

                const result = await getCustomers({
                    page: 1,
                    limit: 50,
                    search: customerSearch,
                    status: '',
                    sortBy: 'createdAt',
                    sortOrder: 'desc'
                });

                const data = result.data || {};

                const customerRows =
                    Array.isArray(data)
                        ? data
                        : (
                            data.customers ||
                            data.rows ||
                            []
                        );

                setCustomers(customerRows);

            } catch (err) {

                console.error(
                    'Customer list error:',
                    err
                );

            } finally {

                setLoadingCustomers(false);

            }

        };

        loadCustomers();

    }, [customerSearch]);


    // =================================================
    // LOAD CUSTOMER DETAILS
    // =================================================

    useEffect(() => {

        if (!customerId) {
            console.log('No customerId found');
            return;
        }

        const loadCustomer = async () => {

            console.log(
                '1. Starting customer load:',
                customerId
            );

            try {

                setLoadingCustomer(true);
                setError(null);

                console.log(
                    '2. Calling getCustomerDetails...'
                );

                const result =
                    await getCustomerDetails(customerId);

                console.log(
                    '3. Customer API completed:',
                    result
                );

                const data =
                    result.data || {};

                console.log(
                    '4. Customer data:',
                    data
                );

            setCustomer(
                data.customer || data
            );

            setSummary(
                data.summary || {}
            );

            setAddresses(
                data.addresses || {
                    billing: null,
                    shipping: null
                }
            );

            setContacts(
                data.contacts || []
            );

            setBankDetails(
                data.banks || []
            );

            } catch (err) {

                console.error(
                    '5. Customer details error:',
                    err
                );

                setError(
                    err.message ||
                    'Failed to load customer details'
                );

            } finally {

                console.log(
                    '6. Customer loading finished'
                );

                setLoadingCustomer(false);
            }
        };

        loadCustomer();

    }, [customerId]);


    // =================================================
    // LOAD TAB DATA
    // =================================================

    useEffect(() => {

        if (
            !customerId ||
            activeTab === 'Overview'
        ) {
            return;
        }


        const loadTab = async () => {

            try {

                setLoadingTab(true);


                // =========================================
                // COMMERCIAL TERMS
                // =========================================

                if (
                    activeTab === 'Commercial Terms' &&
                    !commercialTerms
                ) {

                    const result =
                        await getCustomerCommercialTerms(
                            customerId
                        );

                    setCommercialTerms(
                        result.data || {}
                    );
                }


                // =========================================
                // BOX SPECIFICATIONS
                // =========================================

                if (
                    activeTab === 'Box Specifications' &&
                    boxSpecifications.length === 0
                ) {

                    const result =
                        await getCustomerBoxSpecifications(
                            customerId
                        );

                    setBoxSpecifications(
                        result.data || []
                    );
                }


                // =========================================
                // ORDER HISTORY
                // =========================================

                if (
                    activeTab === 'Order History'
                ) {

                    /*
                     * Order history is paginated,
                     * therefore we intentionally load
                     * page 1 when opening the tab.
                     */

                    await loadOrders(
                        1,
                        orderSearch
                    );
                }

            } catch (err) {

                console.error(
                    'Tab data error:',
                    err
                );

                setError(
                    err.message ||
                    'Failed to load tab data'
                );

            } finally {

                setLoadingTab(false);
            }
        };


        loadTab();

    }, [
        activeTab,
        customerId
    ]);


    // =================================================
    // ORDER HISTORY API
    // =================================================

    const loadOrders =
        async (
            page = 1,
            search = ''
        ) => {

            try {

                setLoadingTab(true);


                const result =
                    await getCustomerOrderHistory(
                        customerId,
                        {
                            page,
                            limit: 10,
                            search
                        }
                    );


                setOrderHistory(
                    result.data || []
                );


                setOrderPagination(
                    result.pagination || null
                );

            } catch (err) {

                console.error(
                    'Order history error:',
                    err
                );


                setError(
                    err.message ||
                    'Failed to load order history'
                );

            } finally {

                setLoadingTab(false);
            }
        };


    // =================================================
    // ORDER PAGE
    // =================================================

    const handleOrderPageChange =
        (page) => {

            loadOrders(
                page,
                orderSearch
            );
        };


    // =================================================
    // ORDER SEARCH
    // =================================================

    const handleOrderSearch =
        (search) => {

            setOrderSearch(search);

            loadOrders(
                1,
                search
            );
        };


    // =================================================
    // LOADING SCREEN
    // =================================================

    if (loadingCustomer) {

        return (

            <div className="flex h-full items-center justify-center bg-[#f4f7f9]">

                <div className="text-[13px] text-gray-500">
                    Loading customer details...
                </div>

            </div>
        );
    }


    // =================================================
    // ERROR
    // =================================================

    if (
        error &&
        !customer
    ) {

        return (

            <div className="flex h-full items-center justify-center bg-[#f4f7f9]">

                <div className="bg-white rounded-xl p-6 shadow-sm border border-red-100">

                    <div className="text-[14px] font-semibold text-red-600 mb-1">
                        Unable to load customer
                    </div>

                    <div className="text-[12px] text-gray-500">
                        {error}
                    </div>

                </div>

            </div>
        );
    }


    return (

        <div className="flex h-full bg-[#f4f7f9] p-1.5 gap-1.5 overflow-hidden">


            {/* =================================================
                LEFT CUSTOMER LIST
            ================================================= */}

            <div className="w-full lg:w-[260px] shrink-0 flex flex-col bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">

                <div className="p-3 pb-2">

                    <div className="flex items-center justify-between mb-4">

                        <div className="flex items-center space-x-1 cursor-pointer">

                            <h2 className="text-xl tracking-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]">
                                All Customer
                            </h2>

                            <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />

                        </div>


                        <div className="flex gap-2">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        '/customers/new'
                                    )
                                }
                                className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>


                            <button
                                type="button"
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </button>

                        </div>

                    </div>


                    <div className="relative">

                        <Search
                            className="
                                        w-3.5
                                        h-3.5
                                        text-gray-400
                                        absolute
                                        left-3
                                        top-2.5
                                    "
                        />

                        <input
                            type="text"
                            value={customerSearch}
                            onChange={(e) =>
                                setCustomerSearch(e.target.value)
                            }
                            placeholder="Search customer..."
                            className="
                                        w-full
                                        pl-8
                                        pr-3
                                        py-2
                                        text-[12px]
                                        bg-gray-100
                                        border
                                        border-transparent
                                        rounded-md
                                        focus:bg-white
                                        focus:border-blue-500
                                        focus:outline-none
                                    "
                        />

                    </div>

                </div>


                {/* =================================================
                      CUSTOMER LIST
                    ================================================= */}

                <div className="flex-1 overflow-y-auto px-3 pb-3 hide-scrollbar">

                    {loadingCustomers ? (

                        <div className="py-6 text-center text-[12px] text-gray-400">
                            Loading customers...
                        </div>

                    ) : customers.length === 0 ? (

                        <div className="py-6 text-center text-[12px] text-gray-400">
                            No customers found.
                        </div>

                    ) : (

                        customers.map((item) => {

                            const isSelected =
                                String(item.customerId) ===
                                String(customerId);

                            return (
                                <div
                                    key={item.customerId}
                                    onClick={() =>
                                        navigate(
                                            `/customers/${item.customerId}`
                                        )
                                    }
                                    className={`
                        rounded-2xl
                        px-3
                        py-2.5
                        cursor-pointer
                        transition-all
                        mb-2.5
                        border
                        ${isSelected
                                            ? `
                                    bg-gradient-to-br
                                    from-[#ffede1]
                                    via-[#fae8f8]
                                    to-[#efdfff]
                                    border-transparent
                                    shadow-sm
                                `
                                            : `
                                    bg-white
                                    border-gray-100
                                    shadow-sm
                                    hover:shadow-md
                                    hover:bg-gradient-to-br
                                    hover:from-[#ffede1]
                                    hover:via-[#fae8f8]
                                    hover:to-[#efdfff]
                                    hover:border-transparent
                                `
                                        }
                    `}
                                >

                                    {/* Customer Code + Date */}

                                    <div className="flex justify-between items-center mb-0.5">

                                        <span className="text-[12px] font-medium text-[#374151]">
                                            {item.customerCode || '-'}
                                        </span>

                                        <span className="text-[9px] text-gray-400 font-medium tracking-wide">
                                            {formatDate(item.createdAt)}
                                        </span>

                                    </div>


                                    {/* Customer Name */}

                                    <h3
                                        className="
                            text-[11px]
                            font-bold
                            text-[#111827]
                            mb-1
                            uppercase
                            leading-snug
                            truncate
                        "
                                    >
                                        {item.displayName || '-'}
                                    </h3>


                                    {/* Receivable */}

                                    <div className="text-right">

                                        <span className="text-[14px] font-bold text-[#111827]">

                                            {formatCurrency(
                                                item.receivable ??
                                                item.openingBalance ??
                                                0
                                            )}

                                        </span>

                                    </div>

                                </div>
                            );

                        })

                    )}

                </div>
             </div>    

                {/* =================================================
                RIGHT AREA
                ================================================= */}

                <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-transparent">


                    {/* HEADER */}

                    <CustomerHeader
                        customer={customer}
                    />


                    {/* SUMMARY */}

                    <CustomerSummary
                        summary={summary}
                        currencyCode={
                            customer?.currencyCode ||
                            'INR'
                        }
                    />


                    {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                    <div className="bg-white flex-1 flex flex-col overflow-hidden border border-gray-100 rounded-[20px] shadow-sm">


                        {/* =============================================
                        TABS
                    ============================================= */}

                        <div className="flex gap-6 px-3 lg:px-4 pt-3 shrink-0 border-b border-gray-100">

                            {[
                                'Overview',
                                'Commercial Terms',
                                'Box Specifications',
                                'Order History'
                            ].map(tab => (

                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() =>
                                        setActiveTab(tab)
                                    }
                                    className={`relative pb-3 text-[13px] transition-colors ${activeTab === tab
                                        ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]'
                                        : 'font-semibold text-gray-500 hover:text-gray-700'
                                        }`}
                                >

                                    {tab}


                                    {activeTab === tab && (

                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff3b30] via-[#b82db8] to-[#5a67d8]"></div>

                                    )}

                                </button>

                            ))}

                        </div>


                        {/* =============================================
                        TAB CONTENT
                    ============================================= */}

                        <div className="flex-1 overflow-y-auto p-3 lg:p-4 bg-[#f8fafc] rounded-b-[20px]">


                            {/* =========================================
                            OVERVIEW
                        ========================================= */}

                            {activeTab === 'Overview' && (

                              <CustomerOverview
                                customer={customer}

                                billingAddress={
                                addresses.billing
                                }

                                shippingAddress={
                                addresses.shipping
                    }

                                contacts={contacts}

                                bankDetails={bankDetails}

                                onEdit={() =>
                                    console.log(
                                        'Edit customer:',
                                        customerId
                                    )
                                }
                            />
                            )}


                            {/* =========================================
                            COMMERCIAL TERMS
                            ========================================= */}

                            {activeTab === 'Commercial Terms' && (

                                loadingTab && !commercialTerms ? (

                                    <LoadingTab />

                                ) : (

                                    <CustomerCommercialTerms
                                        commercialTerms={commercialTerms}
                                    />

                                )

                            )}

                            {/* =========================================
                            BOX SPECIFICATIONS
                        ========================================= */}

                            {activeTab === 'Box Specifications' && (
                                loadingTab && boxSpecifications.length === 0
                                    ? <LoadingTab />
                                    : <BoxSpecifications
                                        specifications={boxSpecifications}
                                    />
                            )}


                            {/* =========================================
                            ORDER HISTORY
                        ========================================= */}

                            {activeTab === 'Order History' && (
                                loadingTab && orderHistory.length === 0
                                    ? <LoadingTab />
                                    : <OrderHistory
                                        orders={orderHistory}
                                        pagination={orderPagination}
                                        onPageChange={handleOrderPageChange}
                                        onSearch={handleOrderSearch}
                                    />
                            )}

                        </div>

                    </div>

                </div>

            </div>
            );
};


// =====================================================
// LOADING TAB
// =====================================================

const LoadingTab = () => {

    return (

            <div className="bg-white rounded-[12px] border border-gray-100 p-10 text-center">

                <div className="text-[12px] text-gray-400">
                    Loading...
                </div>

            </div>
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


            export default CustomerDetailsPage;
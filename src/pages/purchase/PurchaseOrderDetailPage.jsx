import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Plus,
  MoreHorizontal,
  Search,
  Edit,
  Send,
  Printer,
  ChevronDown,
  FileText,
  PackagePlus,
  ShoppingCart,
  Factory,
  Package,
  Truck,
  Receipt,
  Check,
  CheckCircle,
  CreditCard,
  PackageCheck,
  HandCoins,
  ArrowRightLeft
} from 'lucide-react';
import { getPurchaseOrderById } from '../../services/purchaseOrderDetailsApi';
import { getAllPurchaseOrders } from '../../services/purchaseOrderlistApi';
import { getVendorDetails } from '../../services/vendorDetailsApi';

const PurchaseOrderDetailPage = () => {
  const navigate = useNavigate();

  // Get purchase order ID from URL.
  // Example:
  // /purchase/order/11
  // id = "11"
  const { id } = useParams();

  // Stores the purchase order returned by backend.
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);

  // List of all purchase orders
  const [purchaseOrdersList, setPurchaseOrdersList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  // Used to show loading message while API request is running.
  const [loading, setLoading] = useState(true);

  // Used to show API/backend errors.
  const [error, setError] = useState('');


  const tabs = ['Expenses', 'Procurement', 'Purchase Order', 'Bills', 'Payment'];



  // ============================================================
  // GET ALL PURCHASE ORDERS
  // ============================================================
  useEffect(() => {
    const fetchPurchaseOrdersList = async () => {
      try {
        setLoadingList(true);
        const result = await getAllPurchaseOrders();
        setPurchaseOrdersList(result.data || []);
      } catch (err) {
        console.error('Purchase Orders List Error:', err);
      } finally {
        setLoadingList(false);
      }
    };
    
    fetchPurchaseOrdersList();
  }, []);

  // ============================================================
  // GET/FETCH PURCHASE ORDER DETAILS
  // ============================================================
  useEffect(() => {
    // Don't call API for "new" page.
    if (!id || id === 'new') {
      setLoading(false);
      return;
    }


    const fetchPurchaseOrder = async () => {
      try {
        setLoading(true);
        setError('');

        const result = await getPurchaseOrderById(id);

        console.log('Purchase Order Detail API Response:', result);


       
  // * ============================================================
  // * NORMALIZE PURCHASE ORDER RESPONSE
  // * ============================================================

        const rawData = result.data || {};

        const data = rawData?.purchase_order
          ? rawData
          : {
            purchase_order: rawData,
            items: rawData?.items || [],
          };

        setPurchaseOrder(data);

        // ------------------------------------------------------------
        // FETCH VENDOR DETAILS
        // ------------------------------------------------------------
        // Purchase Order header should contain vendor_id.
        // We use that ID to get the complete vendor information,
        // including Billing Address and Shipping Address.
        // ------------------------------------------------------------
        const vendorId = data?.purchase_order?.vendor_id;

        if (vendorId) {
          try {
            const vendorResult = await getVendorDetails(vendorId);

            console.log('Vendor Details API Response:', vendorResult);

            const vendorData =
              vendorResult?.data ||
              vendorResult;

            setVendorDetails(vendorData);

          } catch (vendorError) {
            console.error(
              'Vendor Details Error:',
              vendorError
            );

            // Do not stop the Purchase Order page
            // if only vendor details fail.
            setVendorDetails(null);
          }
        }

      } catch (err) {
        console.error('Purchase Order Details Error:', err);

        setError(
          err.message || 'Unable to load purchase order details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseOrder();
  }, [id]);

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================

  // Format amount:
  // 53900 -> 53,900.00
  const formatAmount = (value) => {
    const number = Number(value || 0);

    return number.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Create initials for the vendor avatar.
  // Example: "Climax Controls Pvt Ltd" -> "CC"
  const getInitials = (name) => {
    if (!name || name === 'Vendor') return 'VN';

    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  };


  // Format date:
  // 2026-06-30 -> 30/06/2026
  const formatDate = (value) => {
    if (!value) return '-';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString('en-GB');
  };
  

  
  // FORMAT VENDOR ADDRESS
  // ============================================================
  

  const formatVendorAddress = (address) => {
    if (!address || typeof address !== 'object') {
      return address || '-';
    }

    return [
      address.attention,
      address.street1,
      address.street2,
      address.city,
      address.state,
      address.country,
      address.zipCode,
      address.phone
        ? `Phone: ${address.phone}`
        : null
    ]
      .filter(Boolean)
      .join('\n');
  };



  // PURCHASE ORDER HEADER
  // ============================================================

  // The actual PO header returned by backend.
  const poHeader = purchaseOrder?.purchase_order || {};

  // ============================================================
  // VENDOR INFORMATION
  // ============================================================

  // Vendor object returned by:
  // GET /api/v1/vendors/:vendorId
  //
  // IMPORTANT:
  // This MUST be declared before vendorName,
  // vendorGstin, vendorContact, etc.
  // Otherwise JavaScript will throw:
  // "Cannot access 'vendor' before initialization"
  const vendor = vendorDetails?.vendor || {};

  // ============================================================
  // VENDOR NAME
  // ============================================================

  // First try the vendor API response.
  // If that is not available, use the vendor name
  // returned by the Purchase Order API.
  const vendorName =
    vendor?.displayName ||
    vendor?.companyName ||
    vendor?.display_name ||
    vendor?.company_name ||
    poHeader?.vendor_name ||
    'Vendor';

  // ============================================================
  // VENDOR GSTIN
  // ============================================================

  const vendorGstin =
    vendor?.gstin ||
    vendor?.GSTIN ||
    poHeader?.gstin ||
    '-';

  // ============================================================
  // VENDOR CONTACT
  // ============================================================

  const vendorContact =
    vendor?.primaryContactFirstName
      ? `${vendor.primaryContactFirstName} ${vendor.primaryContactLastName || ''
        }`.trim()
      : vendor?.primary_contact_first_name
        ? `${vendor.primary_contact_first_name} ${vendor.primary_contact_last_name || ''
          }`.trim()
        : poHeader?.primary_first_name ||
        poHeader?.primary_contact_name ||
        '-';

  // ============================================================
  // VENDOR BILLING ADDRESS
  // ============================================================
  // First use the vendor API address.
  // If it is unavailable, fall back to the address already
  // returned by the Purchase Order API.
  // ============================================================

  const billingAddress =
    vendorDetails?.addresses?.billing ||
    poHeader?.billing_address ||
    null;


  // ============================================================
  // VENDOR SHIPPING ADDRESS
  // ============================================================

  const shippingAddress =
    vendorDetails?.addresses?.shipping ||
    poHeader?.shipping_address ||
    null;



  // ============================================================
  // FORMAT ADDRESSES FOR DISPLAY
  // ============================================================

  const billingAddressText =
    formatVendorAddress(billingAddress);

  const shippingAddressText =
    formatVendorAddress(shippingAddress);
  // Order date
  const orderDate = formatDate(
    poHeader?.po_date
  );

  // Expected delivery date
  const deliveryDate = formatDate(
    poHeader?.expected_delivery_date
  );

  // Reference number
  const referenceNumber =
    poHeader?.pr_number ||
    poHeader?.reference_no ||
    poHeader?.reference_number ||
    '-';

  // Payment terms
  const paymentTerms =
    poHeader?.payment_terms ||
    '-';

  // Purchase order number
  const purchaseOrderNumber =
    poHeader?.purchase_order_number ||
    `PO-${String(id).padStart(5, '0')}`;

  // ============================================================
  // PURCHASE ORDER ITEMS
  // ============================================================

  // Items are returned separately by backend.
  const items = purchaseOrder?.items || [];

  // ============================================================
  // LOADING SCREEN
  // ============================================================
  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center bg-[#f4f7fb]">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-700">
            Loading Purchase Order...
          </div>

          <div className="text-sm text-gray-400 mt-1">
            Please wait
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // ERROR SCREEN
  // ============================================================
  if (error) {
    return (
      <main className="flex-1 flex items-center justify-center bg-[#f4f7fb]">
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 text-center">

          <h2 className="text-lg font-bold text-red-500">
            Unable to Load Purchase Order
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {error}
          </p>

          <button
            onClick={() => navigate('/purchase')}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm"
          >
            Back to Purchase Orders
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-hidden bg-[#f4f7fb] flex flex-col relative p-1.5 gap-1.5">
      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => navigate('/purchase', { state: { activeTab: tab } })}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                ${tab === 'Purchase Order'
                  ? 'border-[#1a233a] text-[#1a233a] font-bold'
                  : 'border-transparent text-gray-500 font-medium hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col gap-1.5 min-h-0">

        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            Purchase Order View
          </h2>

          <div className="flex items-center gap-0">
            {/* Step 1: Procurement */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-green-400 ring-2 ring-green-100 text-white flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-green-600">Procurement</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-green-400 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 2: Purchase order */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] ring-2 ring-pink-50 text-white flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-[10px] md:text-[11px] font-semibold text-[#1a233a] text-center leading-tight">Purchase order</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-gray-200 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 3: Bill */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-500">Bill</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-gray-200 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 4: Payment */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <HandCoins className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-500">Payment</span>
            </div>
          </div>
        </div>

        {/* Split View Content */}
        <div className="flex-1 flex overflow-hidden gap-1.5">

          {/* Left Sidebar (Quotes List) */}
          <div className="w-[270px] bg-white rounded-2xl border border-gray-200 flex flex-col flex-shrink-0 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <h3 className="text-[15px] font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">All Purchase Orders</h3>
                  <ChevronDown className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/purchase/new')}
                    className="w-7 h-7 bg-gray-900 hover:bg-black text-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="w-7 h-7 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full flex items-center justify-center transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search purchase orders..."
                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg pl-8 pr-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/30 text-[#1a2337] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              {loadingList ? (
                <div className="text-center text-xs text-gray-500 py-4">Loading list...</div>
              ) : purchaseOrdersList.length === 0 ? (
                <div className="text-center text-xs text-gray-500 py-4">No purchase orders found.</div>
              ) : (
                purchaseOrdersList.map((po) => {
                  const isActive = po.purchase_order_id.toString() === id;
                  
                  return (
                    <div
                      key={po.purchase_order_id}
                      onClick={() => navigate(`/purchase/order/${po.purchase_order_id}`)}
                      className={
                        isActive
                          ? "bg-gradient-to-br from-[#ffede1] via-[#fae8f8] to-[#efdfff] rounded-2xl px-3 py-2 cursor-pointer shadow-sm border border-transparent mb-2.5"
                          : "bg-white rounded-2xl px-3 py-2 cursor-pointer hover:shadow-md hover:bg-gradient-to-br hover:from-[#ffede1] hover:via-[#fae8f8] hover:to-[#efdfff] hover:border-transparent transition-all shadow-sm border border-gray-100 mb-2.5"
                      }
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[12px] font-medium text-[#374151]">{po.purchase_order_number || `PO-${po.purchase_order_id.toString().padStart(5, '0')}`}</span>
                        <span className="text-[9px] text-gray-400 font-medium tracking-wide">{formatDate(po.po_date)}</span>
                      </div>
                      <h3 className="text-[11px] font-bold text-[#111827] mb-1 uppercase leading-snug truncate">
                        {po.vendor_name || po.vendor_code || 'Vendor'}
                      </h3>
                      <div className="flex justify-between items-end mt-1">
                        <span className={
                          po.delivery_status === 'OPEN' || po.delivery_status === 'PENDING'
                            ? "bg-[#dcfce7] text-[#16a34a] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider leading-none"
                            : "bg-[#f3f4f6] text-[#4b5563] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider leading-none"
                        }>
                          {po.delivery_status || 'OPEN'}
                        </span>
                        <span className="text-[14px] font-bold text-[#111827]">₹{formatAmount(po.estimated_total)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 flex flex-col gap-1.5 overflow-hidden min-h-0">
            {/* Detail Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-2.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent inline-block w-fit">
                  {/* {id && id !== 'new' ? (isNaN(id) ? id : `PO-${id.toString().padStart(5, '0')}`) : 'PO-00001'} */}
                  {purchaseOrderNumber}
                </h2>
                <span className="bg-[#ffe8e8] text-[#ff6b6b] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Unpaid
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <Printer className="w-3.5 h-3.5" />
                </button>
                <button className="flex items-center px-4 py-1.5 bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 text-white rounded-full text-xs font-bold transition-opacity shadow-sm">
                  <ArrowRightLeft className="w-3 h-3 mr-1.5" />
                  Convert To Bill
                </button>
                <button className="w-8 h-8 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors shadow-sm">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Details Containers */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-2 pr-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-4 min-h-full">

                {/* Top Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Customer Profile Box */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <h3 className="text-[14px] font-semibold bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent">
                        Vendor Profile
                      </h3>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex items-center mb-3 pb-3 border-b border-gray-50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white flex items-center justify-center text-sm font-bold shadow-sm mr-3 flex-shrink-0">
                          {getInitials(vendorName)}
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-gray-900">
                            {vendorName}
                          </h4>

                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {purchaseOrderNumber}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-medium text-gray-400">GSTIN</span>
                          <span className="text-[12px] font-bold text-gray-900">{vendorGstin}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-medium text-gray-400">Point Of Contact</span>
                          <span className="text-[12px] font-bold text-gray-900"> {vendorContact}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Box */}
                  <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <h3 className="text-[14px] font-semibold bg-gradient-to-r from-[#ff5a4f] via-[#e94b9f] to-[#5b45ff] bg-clip-text text-transparent">Details</h3>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-medium text-gray-400">Order Date</span>
                          <span className="text-[12px] font-bold text-gray-900">{orderDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-medium text-gray-400">Delivery Date</span>
                          <span className="text-[12px] font-bold text-gray-900">{deliveryDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-medium text-gray-400">Reference No</span>
                          <span className="text-[12px] font-bold text-gray-900">{referenceNumber}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-medium text-gray-400">Payment Terms</span>
                          <span className="text-[12px] font-bold text-gray-900">{paymentTerms}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addresses Box */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row mt-2">
                  <div className="flex-1 px-5 py-4">
                    <h5 className="text-[14px] font-medium text-gray-500 mb-2">Billing Address</h5>
                    <p className="text-[13px] text-[#1a233a] font-medium leading-relaxed whitespace-pre-line">
                      {billingAddressText}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-auto mx-5 lg:mx-0 lg:w-[2px] h-[1px] lg:h-auto bg-pink-200/60 lg:my-4 rounded-full"></div>

                  <div className="flex-1 px-5 py-4">
                    <h5 className="text-[14px] font-medium text-gray-500 mb-2">Shipping Address</h5>
                    <p className="text-[13px] text-[#1a233a] font-medium leading-relaxed whitespace-pre-line">
                      {shippingAddressText}
                    </p>
                  </div>
                </div>



                {/* Calculation Box */}
                {/* ============================================================
                    CALCULATION BOX
                    ============================================================ */}
                <div className="bg-white rounded-xl shadow-sm border border-[#eef2f6] px-4 py-3">

                  {/* Calculation heading */}
                  <h3 className="text-[18px] font-semibold text-[#ff4f5e] pb-3 border-b border-gray-200 mb-2">
                    Calculation
                  </h3>

                  <div className="w-full">

                    {/* ============================================================
                            CALCULATION TABLE HEADER

                            Columns:
                            1. Items & Description
                            2. Quantity
                            3. Rate
                            4. Per
                            5. Amount
                            ============================================================ */}
                    <div className="grid grid-cols-12 text-[13px] font-medium text-gray-700 bg-[#f8f9fc] px-4 py-2.5 rounded-t-lg mb-1">

                      <div className="col-span-5 px-2">
                        Items & Description
                      </div>

                      <div className="col-span-2">
                        Quantity
                      </div>

                      <div className="col-span-2">
                        Rate
                      </div>

                      <div className="col-span-1 text-center">
                        Per
                      </div>

                      <div className="col-span-2 text-right px-2">
                        Amount
                      </div>

                    </div>

                    {/* ============================================================
                            PURCHASE ORDER ITEMS
                        ============================================================ */}

                    {items.length > 0 ? (

                      items.map((item, index) => {

                        // ----------------------------------------------------------
                        // Quantity ordered
                        // Database column:
                        // purchase_order_item.quantity
                        // ----------------------------------------------------------
                        const quantity = Number(item.quantity || 0);

                        // ----------------------------------------------------------
                        // Unit rate
                        // Database column:
                        // purchase_order_item.unit_rate
                        // ----------------------------------------------------------
                        const rate = Number(item.unit_rate || 0);

                        // ----------------------------------------------------------
                        // Total item amount
                        // Database column:
                        // purchase_order_item.total_amount
                        // ----------------------------------------------------------
                        const amount = Number(
                          item.total_amount ||
                          (quantity * rate)
                        );

                        // ----------------------------------------------------------
                        // Received quantity
                        // Currently your item API does not provide this field,
                        // so it will display 0 until backend provides it.
                        // ----------------------------------------------------------
                        const received = Number(
                          item.received_quantity || 0
                        );

                        // ----------------------------------------------------------
                        // Billed quantity
                        // Currently your item API does not provide this field,
                        // so it will display 0 until backend provides it.
                        // ----------------------------------------------------------
                        const billed = Number(
                          item.billed_quantity || 0
                        );

                        return (

                          <div
                            key={
                              item.po_item_id ||
                              item.purchase_order_item_id ||
                              index
                            }
                            className="grid grid-cols-12 text-[13px] items-start text-[#1a233a] py-3 px-4 border-b border-gray-200"
                          >

                            {/* ======================================================
                                    ITEM / REEL SPECIFICATION
                                ====================================================== */}
                            <div className="col-span-5 pr-4 px-2">

                              <p className="text-[13px] font-medium text-[#111827] mb-0.5">
                                {item.reel_spec || '-'}
                              </p>

                              <p className="text-[10px] text-gray-500 leading-tight">
                                {item.reel_description || ''}
                              </p>

                            </div>

                            {/* ======================================================
                                    ORDERED QUANTITY
                                ====================================================== */}
                            <div className="col-span-2 text-[13px] font-semibold text-[#111827]">

                              {quantity.toFixed(3)}KG

                              {/* Roll information, if available */}
                              {item.roll_count && (
                                <span className="block text-[9px] text-gray-400 font-normal">
                                  ({item.roll_count} ROLL)
                                </span>
                              )}

                            </div>

                            {/* ======================================================
                                RATE
                            ====================================================== */}
                            <div className="col-span-2 text-[13px] font-medium text-[#111827]">

                              {formatAmount(rate)}

                            </div>


                            {/* ======================================================
                                  PER
                                  ====================================================== */}
                            <div className="col-span-1 text-center text-[13px] font-medium text-[#111827]">

                              KG

                            </div>

                            {/* ======================================================
                                  ITEM TOTAL AMOUNT
                              ====================================================== */}
                            <div className="col-span-2 text-right text-[13px] font-medium text-[#111827] px-2">

                              {formatAmount(amount)}

                            </div>

                          </div>

                        );

                      })

                    ) : (

                      <div className="text-center text-sm text-gray-400 py-6">
                        No items found for this purchase order.
                      </div>

                    )}
                  </div>

                  <div className="flex justify-end mt-4">
                    <div className="w-[300px]">
                      <div className="flex justify-between py-1">

                        <span className="text-[20px] font-medium text-[#111827]">
                          Sub Total
                        </span>

                        <span className="text-[20px] font-medium text-[#111827]">
                          {formatAmount(
                            poHeader?.item_total ||
                            poHeader?.subtotal ||
                            0
                          )}
                        </span>

                      </div>

                      <div className="flex justify-between py-1">
                        <span className="text-[11px] text-gray-500">GST :</span>
                        <span className="text-[11px] text-gray-500">{formatAmount(poHeader?.gst_amount)}</span>
                      </div>
                      <div className="flex justify-between py-1 mb-2">
                        <span className="text-[11px] text-gray-500">Discount Rate</span>
                        <span className="text-[11px] text-gray-500">{formatAmount(poHeader?.discount_amount)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-t border-gray-200">
                        {/* Total Payable uses the red/pink style from the reference image. */}
                        <span className="text-[12px] font-semibold text-[#ff4f5e]">
                          Total Payable
                        </span>

                        {/* Keep the amount visually prominent with the reference gradient. */}
                        <span className="text-[14px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff4f5e] via-[#e94b9f] to-[#4f46e5]">
                          ₹{formatAmount(
                            poHeader?.estimated_total ||
                            poHeader?.total_payable ||
                            0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============================================================
                    CUSTOMER NOTE & TERM / CONDITION
                    ------------------------------------------------------------
                ============================================================ */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row mt-2">

                  {/* Customer Note */}
                  <div className="flex-1 px-5 py-4">
                    {/* Heading is black, matching the reference image. */}
                    <h5 className="text-[13px] font-semibold text-[#111827] mb-2">
                      Customer Note
                    </h5>

                    {/* Customer note text. */}
                    <p className="text-[11px] text-[#111827] leading-relaxed">
                      {poHeader?.customer_note ||
                        poHeader?.remarks ||
                        "Customer Requested Timely Delivery With Secure Packaging And Prior Dispatch Confirmation."}
                    </p>
                  </div>

                  {/* Pink vertical divider between the two sections. */}
                  <div className="w-auto mx-5 lg:mx-0 lg:w-[2px] h-[1px] lg:h-auto bg-pink-200 lg:my-3 rounded-full" />

                  {/* Term & Condition */}
                  <div className="flex-1 px-5 py-4">
                    {/* Heading is black, matching the reference image. */}
                    <h5 className="text-[13px] font-semibold text-[#111827] mb-2">
                      Term & Condition
                    </h5>

                    {/* Terms text. */}
                    <p className="text-[11px] text-[#111827] leading-relaxed pr-4">
                      {poHeader?.terms_and_conditions ||
                        poHeader?.terms_conditions ||
                        "Prices Are Exclusive Of Taxes. Payment Is Due Within 30 Days. Delivery Dates Are Estimated And Subject To Availability. Orders Cannot Be Cancelled After Production Begins. Goods Remain The Seller's Property Until Full Payment Is Received. All Disputes Are Subject To Local Jurisdiction."}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PurchaseOrderDetailPage;
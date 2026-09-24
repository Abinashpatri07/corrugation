import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ChevronDown,
  Plus,
  Minus,
  GripVertical,
  Bookmark,
  Check,
  HandCoins,
  Upload,
  Trash2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  MapPin,
  Paperclip
} from 'lucide-react';
import { getVendors } from '../../services/vendorlistApi';
import { getVendorById } from '../../services/vendorDetailsApi';
import { createPurchaseOrder } from '../../services/createPurchaseOrderApi';

const CreatePurchaseOrderPage = () => {
  const navigate = useNavigate();

  const [selectedVendor, setSelectedVendor] = useState(null);

  const [vendorDetails, setVendorDetails] = useState(null);

  const [vendorDetailsLoading, setVendorDetailsLoading] = useState(false);

  const [customerType, setCustomerType] = useState('Organization');
  const [rows, setRows] = useState([

    // Each item row stores its own quantity and rate so the amount
    // can be calculated independently for every product.

    {
      id: 1,
      itemDetails: '',
      note: '',
      quantity: 1,
      rate: 0,
      account: ''
    }
  ]);
  const [vendors, setVendors] = useState([]);

  // Values for the sections shown below the item table.

  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState('');
  const [reference, setReference] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Billing and shipping addresses received from
  // the Purchase Order backend.

  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [terms, setTerms] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('percent');
  const [taxRate, setTaxRate] = useState(0);
  const [attachment, setAttachment] = useState(null);

  const [formData, setFormData] = useState({
    vendor_id: '',
    vendor_code: '',
    po_date: '2026-09-16',
    expected_delivery_date: '2026-09-25',
    delivery_status: 'PENDING',
    gst_rate: 18,
    discount_rate: 0,
    created_by: 1,
  });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const result = await getVendors({ limit: 100 });
        console.log('FINAL VENDOR ARRAY:', result.data);
        setVendors(result.data || []);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
        setVendors([]);
      }
    };

    fetchVendors();
  }, []);


  // Add a new blank product row.

  const addRow = () =>
    setRows(prev => [
      ...prev,
      {
        id: Date.now(),
        itemDetails: '',
        note: '',
        quantity: 1,
        rate: 0,
        account: ''
      }
    ]);


  // Remove a product row. Keep one row visible so the table never becomes
  // completely empty.

  const removeRow = (id) =>
    setRows(prev => {
      const next = prev.filter(row => row.id !== id);
      return next.length ? next : [{
        id: Date.now(),
        itemDetails: '',
        note: '',
        quantity: 1,
        rate: 0,
        account: ''
      }];
    });

  // Update one field of one product row.
  const updateRow = (id, field, value) => {
    setRows(prev =>
      prev.map(row =>
        row.id === id
          ? {
            ...row,
            [field]:
              field === 'quantity' || field === 'rate'
                ? Number(value) || 0
                : value
          }
          : row
      )
    );
  };


  // Calculate totals from the actual item rows instead of displaying
  // hard-coded amounts.

  const totalQuantity = rows.reduce(
    (sum, row) => sum + (Number(row.quantity) || 0),
    0
  );

  const subtotal = rows.reduce(
    (sum, row) =>
      sum + (Number(row.quantity) || 0) * (Number(row.rate) || 0),
    0
  );

  const discountAmount =
    discountType === 'percent'
      ? (subtotal * (Number(discount) || 0)) / 100
      : Number(discount) || 0;

  const taxAmount =
    ((subtotal - discountAmount) * (Number(taxRate) || 0)) / 100;

  const grandTotal = Math.max(
    0,
    subtotal - discountAmount + taxAmount
  );

  // Format Indian currency consistently with the design.
  const formatCurrency = value =>
    `₹${Number(value || 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

  const tabs = ['Expenses', 'Procurement', 'Purchase Order', 'Bills', 'Payment'];
  const activeTab = 'Purchase Order';

  const handleSave = async () => {
    try {
      if (!formData.vendor_id) {
        alert('Please select a vendor');
        return;
      }

      const payload = {
        vendor_id: Number(formData.vendor_id),
        vendor_code: formData.vendor_code || null,

        po_date: formData.po_date,
        expected_delivery_date: formData.expected_delivery_date,

        delivery_status: formData.delivery_status,

        // =====================================================
        // CALCULATED PURCHASE ORDER TOTALS
        // =====================================================

        gst_rate: Number(taxRate) || 0,

        gst_amount: Number(taxAmount) || 0,

        discount_rate: Number(discount) || 0,

        discount_amount: Number(discountAmount) || 0,

        item_count: rows.length,

        item_total: Number(subtotal) || 0,

        estimated_total: Number(grandTotal) || 0,

        created_by: formData.created_by,
        // These values are kept in the UI for now. If your backend/database
        // has matching columns, they can be added to this payload later.

        purchase_order_number: purchaseOrderNumber || null,
        reference: reference || null,


        /*
 * Save the selected vendor's addresses with
 * the Purchase Order.
 *
 * Convert the address object into readable text
 * because purchase_order.billing_address and
 * purchase_order.shipping_address are being
 * inserted as single values by the backend.
 */


        billing_address: billingAddress
          ? [
            billingAddress.attention,
            billingAddress.street1,
            billingAddress.street2,
            billingAddress.city,
            billingAddress.state,
            billingAddress.country,
            billingAddress.zipCode,
            billingAddress.phone
          ]
            .filter(Boolean)
            .join(', ')
          : null,

        shipping_address: shippingAddress
          ? [
            shippingAddress.attention,
            shippingAddress.street1,
            shippingAddress.street2,
            shippingAddress.city,
            shippingAddress.state,
            shippingAddress.country,
            shippingAddress.zipCode,
            shippingAddress.phone
          ]
            .filter(Boolean)
            .join(', ')
          : null,

        delivery_address: deliveryAddress || null,
        remarks: remarks || null,
        terms_conditions: terms || null,

        // Send the rows entered in the Item Table to the backend.

        items: rows.map(row => {

          const quantity = Number(row.quantity) || 0;
          const unitRate = Number(row.rate) || 0;

          // Calculate amount for this individual item
          const totalAmount = quantity * unitRate;

          return {
            reel_id: null,

            reel_spec:
              row.itemDetails || 'TEST REEL',

            quantity,

            unit_rate: unitRate,

            // IMPORTANT:
            // Save the calculated amount in the database
            total_amount: totalAmount
          };
        })
      };

      console.log('Purchase Order Payload:', payload);

      const result = await createPurchaseOrder(payload);

      console.log('Purchase Order Response:', result);

      if (result.success) {
        alert('Purchase Order saved successfully');
        navigate('/purchase');
      } else {
        alert(result.message || 'Failed to save Purchase Order');
      }

    } catch (error) {
      console.error(
        'Save Error:',
        error
      );

      alert(
        error.message ||
        'Failed to save Purchase Order'
      );
    }
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-[#f4f7f9] p-1.5 gap-1.5">

      {/* ── Sub Navigation ── */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => navigate('/purchase', { state: { activeTab: tab } })}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab
                  ? 'text-[#1a233a] font-bold border-[#1a233a]'
                  : 'text-gray-500 font-medium border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Content ── */}

      <div className="flex-1 overflow-hidden flex flex-col gap-1.5">

        {/* Top Banner with Stepper */}

        <div className="bg-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            Create Purchase Order
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

        {/* ── Scrollable Form Area ── */}

        <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 custom-scrollbar">

          {/* ── Section 1: Product Details ── */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 shrink-0">
            <h3 className="text-[15px] font-bold text-[#1a233a] mb-4">
              Product Details
            </h3>

            {/* Vendor selection occupies the full width, as in the reference UI. */}

            <div className="mb-2">
              <label className="block text-[13px] font-semibold text-[#1a233a] mb-1.5">
                Vendor Name <span className="text-red-500">*</span>
              </label>
              <select
                value={
                  selectedVendor?.vendor_id ??
                  selectedVendor?.vendorId ??
                  selectedVendor?.id ??
                  ""
                }
                onChange={async (e) => {
                  const vendorId = e.target.value;

                  // No vendor selected

                  if (!vendorId) {

                    setSelectedVendor(null);

                    setVendorDetails(null);

                    // Clear previously selected vendor addresses.
                    setBillingAddress(null);
                    setShippingAddress(null);

                    setFormData(prev => ({
                      ...prev,
                      vendor_id: '',
                      vendor_code: ''
                    }));

                    return;
                  }

                  const vendor = vendors.find((item) => {
                    const id =
                      item.vendor_id ??
                      item.vendorId ??
                      item.id;

                    return String(id) === String(vendorId);
                  });

                  console.log('Selected vendor:', vendor);

                  console.log("Selected vendor:", vendor);

                  setSelectedVendor(vendor || null);

                  // Store selected vendor in formData for Save
                  setFormData(prev => ({
                    ...prev,
                    vendor_id:
                      vendor?.vendor_id ??
                      vendor?.vendorId ??
                      vendor?.id ??
                      '',

                    vendor_code:
                      vendor?.vendor_code ??
                      vendor?.vendorCode ??
                      ''
                  }));



                  try {

                    setVendorDetailsLoading(true);

                    /*
                     * IMPORTANT:
                     *
                     * We now use the Purchase Order backend to get
                     * the selected vendor's billing and shipping
                     * addresses.
                     *
                     * Vendor backend is NOT modified.
                     */


                    const result = await getVendorById(vendorId);

                    console.log(
                      "Vendor Details Response:",
                      result
                    );

                    const addresses =
                      result.data?.addresses || {};


                    /*
                     * Save billing and shipping addresses separately.
                     */
                    setBillingAddress(
                      addresses.billing || null
                    );

                    setShippingAddress(
                      addresses.shipping || null
                    );


                    /*
                     * Keep vendor details for displaying the
                     * vendor name if needed.
                     */
                    setVendorDetails({
                      vendor: vendor || null,
                      addresses: addresses
                    });


                  } catch (error) {

                    console.error(
                      "Failed to fetch vendor addresses:",
                      error.response?.data || error
                    );


                    setBillingAddress(null);
                    setShippingAddress(null);

                    setVendorDetails(null);

                  } finally {

                    setVendorDetailsLoading(false);

                  }
                }}
                className="w-full border border-gray-200 rounded-md px-3 py-2.5"
              >
                <option value="">
                  Select Vendor
                </option>

                {vendors.map((vendor, index) => {

                  // Support both snake_case and camelCase
                  // depending on what your backend returns.

                  const vendorId =
                    vendor.vendor_id ??
                    vendor.vendorId ??
                    vendor.id;

                  const vendorCode =
                    vendor.vendor_code ??
                    vendor.vendorCode ??
                    '';

                  const vendorName =
                    vendor.display_name ??
                    vendor.displayName ??
                    vendor.company_name ??
                    vendor.companyName ??
                    vendor.vendor_name ??
                    vendor.vendorName ??
                    vendorCode ??
                    `Vendor ${index + 1}`;

                  return (
                    <option
                      key={vendorId ?? `vendor-${index}`}
                      value={vendorId ?? ''}
                    >
                      {vendorName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* ============================================================
                BILLING AND SHIPPING ADDRESS
                ------------------------------------------------------------
                Address information comes from the selected vendor API.
                Backend response structure:

                data: {
                  vendor: {...},
                  addresses: {
                    billing: {...},
                    shipping: {...}
                  }
                }
            ============================================================ */}

            {/* ============================================================
                BILLING + SHIPPING ADDRESS
                ------------------------------------------------------------
                These addresses come from the Purchase Order backend.
                We are NOT changing the Vendor backend.
              ============================================================ */}

            <div className="border border-[#cbdcff] rounded-xl p-3 grid grid-cols-2 gap-8 mb-4">

              {/* ==========================================================
                    BILLING ADDRESS
                  ========================================================== */}

              <div className="relative pr-8 border-r border-pink-300">

                <p className="text-[12px] font-medium text-gray-500 mb-1">
                  Billing Address
                </p>

                <div className="flex gap-2">

                  <MapPin className="w-3 h-3 text-gray-500 mt-0.5 shrink-0" />

                  <div className="text-[13px] leading-[20px] text-gray-700">

                    {/* Show loading message while API request is running */}
                    {vendorDetailsLoading && (
                      <p className="text-[13px] text-gray-400">
                        Loading vendor address...
                      </p>
                    )}

                    {/* Show billing address after API response */}
                    {!vendorDetailsLoading && billingAddress && (
                      <div>

                        {/* Contact / Vendor name */}
                        {billingAddress.attention && (
                          <p className="font-semibold">
                            {billingAddress.attention}
                          </p>
                        )}

                        {/* Address line 1 */}
                        {billingAddress.street1 && (
                          <p>
                            {billingAddress.street1}
                          </p>
                        )}

                        {/* Address line 2 */}
                        {billingAddress.street2 && (
                          <p>
                            {billingAddress.street2}
                          </p>
                        )}

                        {/* City / State / PIN */}
                        {(billingAddress.city ||
                          billingAddress.state ||
                          billingAddress.zipCode) && (
                            <p>

                              {billingAddress.city || ''}

                              {billingAddress.state
                                ? `, ${billingAddress.state}`
                                : ''}

                              {billingAddress.zipCode
                                ? ` - ${billingAddress.zipCode}`
                                : ''}

                            </p>
                          )}

                        {/* Country */}
                        {billingAddress.country && (
                          <p>
                            {billingAddress.country}
                          </p>
                        )}

                        {/* Phone */}
                        {billingAddress.phone && (
                          <p>
                            Phone: {billingAddress.phone}
                          </p>
                        )}

                      </div>
                    )}

                    {/* No billing address returned by backend */}
                    {!vendorDetailsLoading && !billingAddress && (
                      <p className="text-[13px] text-gray-400">
                        Billing address not available
                      </p>
                    )}

                  </div>

                </div>

              </div>


              {/* ==========================================================
                    SHIPPING ADDRESS
                  ========================================================== */}

              <div className="relative">

                <p className="text-[12px] font-medium text-gray-500 mb-1">
                  Shipping Address
                </p>

                <Paperclip className="absolute right-0 top-0 w-3 h-3 text-gray-400" />

                <div className="flex gap-2">

                  <MapPin className="w-3 h-3 text-gray-500 mt-0.5 shrink-0" />

                  <div className="text-[13px] leading-[20px] text-gray-700">

                    {/* Show loading message while API request is running */}
                    {vendorDetailsLoading && (
                      <p className="text-[13px] text-gray-400">
                        Loading vendor address...
                      </p>
                    )}

                    {/* Show shipping address after API response */}
                    {!vendorDetailsLoading && shippingAddress && (
                      <div>

                        {/* Contact / Vendor name */}
                        {shippingAddress.attention && (
                          <p className="font-semibold">
                            {shippingAddress.attention}
                          </p>
                        )}

                        {/* Address line 1 */}
                        {shippingAddress.street1 && (
                          <p>
                            {shippingAddress.street1}
                          </p>
                        )}

                        {/* Address line 2 */}
                        {shippingAddress.street2 && (
                          <p>
                            {shippingAddress.street2}
                          </p>
                        )}

                        {/* City / State / PIN */}
                        {(shippingAddress.city ||
                          shippingAddress.state ||
                          shippingAddress.zipCode) && (
                            <p>

                              {shippingAddress.city || ''}

                              {shippingAddress.state
                                ? `, ${shippingAddress.state}`
                                : ''}

                              {shippingAddress.zipCode
                                ? ` - ${shippingAddress.zipCode}`
                                : ''}

                            </p>
                          )}

                        {/* Country */}
                        {shippingAddress.country && (
                          <p>
                            {shippingAddress.country}
                          </p>
                        )}

                        {/* Phone */}
                        {shippingAddress.phone && (
                          <p>
                            Phone: {shippingAddress.phone}
                          </p>
                        )}

                      </div>
                    )}

                    {/* No shipping address returned by backend */}
                    {!vendorDetailsLoading && !shippingAddress && (
                      <p className="text-[13px] text-gray-400">
                        Shipping address not available
                      </p>
                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* Delivery destination selector. */}
            < div className="flex items-start gap-4 mb-5" >
              <label className="text-[13px] font-semibold text-[#1a233a] pt-1 w-24 shrink-0">
                Delivery Address <span className="text-red-500">*</span>
              </label>

              <div className="flex flex-col gap-2">
                {/* Delivery address type selection */}
                <div className="flex items-center gap-5">
                  {['Organization', 'Customer', 'Other'].map(type => (
                    <label
                      key={type}
                      className="flex items-center gap-1.5 text-[13px] text-gray-600 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="deliveryAddressType"
                        className="accent-pink-500"
                        checked={customerType === type}
                        onChange={() => setCustomerType(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>


                {/* Organization delivery address box */}
                <button
                  type="button"
                  className="w-[170px] text-left border border-[#b9cdfc] rounded-xl px-3 py-2 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-[13px] font-semibold text-[#1a233a]">
                    Odisha
                  </p>

                  <p className="text-[12px] text-gray-600">
                    India,
                  </p>

                  <p className="text-[12px] text-gray-600">
                    Phone: +91-9876543222
                  </p>

                  <p className="text-[10px] text-gray-500 mt-1">
                    Change destination to deliver
                  </p>
                </button>
              </div>
            </div >


            {/* Order information is arranged in two columns like the screenshot. */}
            < div className="grid grid-cols-2 gap-x-5 gap-y-3" >
              <div>
                <label className="block text-[13px] font-semibold text-[#1a233a] mb-1.5">
                  Purchase Order
                </label>
                <input
                  type="text"
                  value={purchaseOrderNumber}
                  onChange={e => setPurchaseOrderNumber(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1a233a] mb-1.5">
                  Reference
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={e => setReference(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1a233a] mb-1.5">
                  Order Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.po_date}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      po_date: e.target.value
                    }))
                  }
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1a233a] mb-1.5">
                  Delivery Date
                </label>
                <input
                  type="date"
                  value={formData.expected_delivery_date}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      expected_delivery_date: e.target.value
                    }))
                  }
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                />
              </div>


              {/* Full-width delivery address field shown under the dates. */}
              {/* Subject field shown below Order Date and Delivery Date. */}
              <div>
                <label className="block text-[13px] font-semibold text-[#1a233a] mb-1.5">
                  Subject
                </label>

                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                />
              </div>
            </div >
          </div >

          {/* ── Item Table ── */}
          < div className="bg-white rounded-2xl border border-gray-200 shadow-sm shrink-0" >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-[15px] font-bold text-[#1a233a]">
                Item Table
              </h2>

              {/* Bulk Action is kept as a UI control to match the reference. */}
              <button
                type="button"
                className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1.5 text-[11px] font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Bulk Action
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>

            <div className="overflow-x-auto">

              {/* Table header */}

              <div
                className="grid gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 min-w-[900px]"
                style={{
                  gridTemplateColumns: '32px 1.5fr 1.1fr 150px 150px 150px 36px'
                }}
              >
                <div />
                <div className="text-[11px] font-medium text-gray-600">Item Details</div>
                <div className="text-[11px] font-medium text-gray-600">Note</div>
                <div className="text-[11px] font-medium text-gray-600">Quantity</div>
                <div className="text-[11px] font-medium text-gray-600">Rate</div>
                <div className="text-[11px] font-medium text-gray-600">Amount</div>
                <div />
              </div>


              {/* Product rows */}
              {rows.map(row => {
                const amount =
                  (Number(row.quantity) || 0) * (Number(row.rate) || 0);

                return (
                  <div
                    key={row.id}
                    className="grid gap-2 items-center px-4 py-4 border-b border-gray-100 min-w-[900px]"
                    style={{
                      gridTemplateColumns:
                        '32px 1.5fr 1.1fr 150px 150px 150px 36px'
                    }}
                  >
                    <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />


                    {/* Item name / product details */}
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d54a88] to-[#402de8] flex items-center justify-center text-white shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                          />
                        </svg>
                      </div>

                      <input
                        type="text"
                        value={row.itemDetails}
                        onChange={e =>
                          updateRow(row.id, 'itemDetails', e.target.value)
                        }
                        placeholder=""
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                      />
                    </div>


                    {/* Optional note for the item */}
                    <input
                      type="text"
                      value={row.note}
                      onChange={e =>
                        updateRow(row.id, 'note', e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                    />


                    {/* Quantity control with minus and plus buttons */}
                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          updateRow(
                            row.id,
                            'quantity',
                            Math.max(0, Number(row.quantity) - 1)
                          )
                        }
                        className="px-2.5 py-2 hover:bg-gray-100 text-gray-500"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <input
                        type="number"
                        min="0"
                        value={row.quantity}
                        onChange={e =>
                          updateRow(row.id, 'quantity', e.target.value)
                        }
                        className="flex-1 min-w-0 text-center text-[12px] py-2 focus:outline-none"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          updateRow(
                            row.id,
                            'quantity',
                            Number(row.quantity) + 1
                          )
                        }
                        className="px-2.5 py-2 hover:bg-gray-100 text-gray-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>



                    {/* Rate entered by the user */}
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-[12px]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={row.rate}
                        onChange={e =>
                          updateRow(row.id, 'rate', e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md pl-7 pr-2 py-2 text-[12px] focus:outline-none focus:border-blue-500"
                      />
                    </div>



                    {/* Amount is calculated automatically: Quantity × Rate */}
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400 text-[12px]">
                        ₹
                      </span>
                      <input
                        type="text"
                        value={amount.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                        readOnly
                        className="w-full border border-gray-200 rounded-md pl-7 pr-2 py-2 text-[12px] bg-gray-50 focus:outline-none"
                      />
                    </div>



                    {/* Delete current row */}
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="flex justify-center text-red-400 hover:text-red-600"
                      title="Delete row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>


            {/* Add row button and helper message */}
            <div className="flex items-center justify-between px-6 py-4">
              <button
                type="button"
                onClick={addRow}
                className="flex items-center gap-1.5 text-[11px] text-white bg-gradient-to-r from-[#ff3b30] to-[#a43bd2] rounded-lg px-3 py-2 hover:opacity-90 font-semibold"
              >
                Add new row
                <Plus className="w-3.5 h-3.5" />
              </button>



              {/* <p className="text-[10px] text-gray-500">
                Items Selected Dynamically Synchronize With Central Ledger Accounts Automatically.
              </p> */}
            </div>
          </div >


          {/* ── Attachment ── */}
          < div className="bg-white rounded-2xl border border-gray-200 shadow-sm shrink-0" >
            <label
              htmlFor="po-attachment"
              className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                <Upload className="w-5 h-5" />
              </div>

              <div>
                <p className="text-[15px] font-medium text-gray-800">
                  click here to Upload
                </p>
                <p className="text-[12px] text-gray-400">
                  Supporting Format IMG, PDF, JPG, PNG Format (Max 10 Mb)
                </p>

                {attachment && (
                  <p className="text-[10px] text-green-600 mt-1">
                    Selected: {attachment.name}
                  </p>
                )}
              </div>
            </label>

            <input
              id="po-attachment"
              type="file"
              accept=".img,.pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={e => setAttachment(e.target.files?.[0] || null)}
            />
          </div >



          {/* ── Lower Content: Upload/Notes on the left + Invoice Totals on the right ── */}
          {/* The columns start at the same top position. Invoice Totals has slightly
              less bottom padding so its box ends a little above Terms & Conditions. */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch shrink-0 mb-4">


            {/* Left column: attachment, remarks and terms. */}
            <div className="flex flex-col gap-3">


              {/* ── Remarks & Note ── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 shrink-0">
                <h2 className="text-[15px] font-bold text-gray-900 pb-2 border-b border-gray-200">
                  Remarks &amp; Note
                </h2>

                <textarea
                  rows={3}
                  maxLength={500}
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  className="w-full mt-2 border border-gray-200 rounded-md px-3 py-2.5 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 resize-none"
                />

                <div className="flex justify-between mt-1">
                  <p className="text-[11px] text-gray-400">
                    It Will Not Be Shown In PDF
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {remarks.length} / 500 Character
                  </p>
                </div>
              </div>


              {/* ── Terms & Conditions ── */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 shrink-0">
                <h2 className="text-[15px] font-bold text-gray-900 pb-2 border-b border-gray-200">
                  Terms &amp; Conditions
                </h2>


                {/* Simple formatting toolbar. The buttons are visual controls;
                the actual terms text remains in a normal textarea. */}
                <div className="border border-gray-200 rounded-md mt-2 overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 px-3 py-1.5 flex items-center gap-4">
                    <button type="button" className="text-gray-500 hover:text-gray-800">
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="text-gray-500 hover:text-gray-800">
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="text-gray-500 hover:text-gray-800">
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="text-gray-500 hover:text-gray-800">
                      <ListOrdered className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="text-gray-500 hover:text-gray-800">
                      <LinkIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    maxLength={1000}
                    value={terms}
                    onChange={e => setTerms(e.target.value)}
                    placeholder="Enter terms & conditions..."
                    className="w-full px-3 py-2.5 text-[13px] text-gray-600 focus:outline-none border-none resize-none placeholder-gray-300"
                  />
                </div>

                <div className="flex justify-between mt-1">
                  <p className="text-[11px] text-gray-400">
                    It Will Not Be Shown In PDF
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {terms.length} / 1000 Character
                  </p>
                </div>
              </div>
            </div>


            {/* Right column: invoice totals. */}
            {/* ── Invoice Totals ── */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 pt-5 pb-3 shrink-0 h-full">


              {/* Invoice Totals uses the same larger typography scale as the reference page. */}
              <h2 className="text-[15px] font-bold text-[#1a233a] mb-4">
                Invoice Totals
              </h2>

              {/* Total quantity is derived from all product rows. */}
              <p className="text-[14px] font-semibold text-[#1a233a] mb-5">
                Total Quantity : {totalQuantity}
              </p>

              {/* TDS / TCS choice */}
              <div className="flex items-center gap-5 mb-5">
                <label className="flex items-center gap-2 text-[13px] text-gray-600">
                  <input type="radio" name="taxType" className="accent-pink-500" />
                  TDS
                </label>

                <label className="flex items-center gap-2 text-[13px] text-gray-600">
                  <input
                    type="radio"
                    name="taxType"
                    defaultChecked
                    className="accent-pink-500"
                  />
                  TCS
                </label>
              </div>

              {/* Discount row */}
              <div className="mb-5 max-w-[540px]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[13px] font-semibold text-[#1a233a]">
                    Discount
                  </label>

                  <div className="flex border border-gray-200 rounded-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setDiscountType('percent')}
                      className={`px-2 py-1 text-[11px] font-semibold ${discountType === 'percent'
                        ? 'bg-white text-gray-700'
                        : 'bg-gray-50 text-gray-400'
                        }`}
                    >
                      %
                    </button>

                    <button
                      type="button"
                      onClick={() => setDiscountType('amount')}
                      className={`px-2 py-1 text-[11px] font-semibold border-l border-gray-200 ${discountType === 'amount'
                        ? 'bg-gradient-to-r from-[#ff3b30] to-[#a43bd2] text-white'
                        : 'bg-white text-gray-400'
                        }`}
                    >
                      ₹
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500"
                  />

                  <span className="w-24 text-right text-[13px] text-gray-700">
                    {formatCurrency(discountAmount)}
                  </span>
                </div>
              </div>


              {/* Tax selector and calculated tax */}
              <div className="mb-5 max-w-[540px]">
                <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                  Tax
                </label>

                <div className="flex items-center gap-8">
                  <select
                    value={taxRate}
                    onChange={e => setTaxRate(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value={0}>Select Tax</option>
                    <option value={5}>GST 5%</option>
                    <option value={12}>GST 12%</option>
                    <option value={18}>GST 18%</option>
                    <option value={28}>GST 28%</option>
                  </select>

                  <span className="w-24 text-right text-[13px] text-gray-700">
                    - {formatCurrency(taxAmount)}
                  </span>
                </div>
              </div>


              {/* Final calculated amount */}
              <div className="bg-gradient-to-r from-[#fff1f5] to-[#f3efff] rounded-xl px-5 py-4 border border-[#eee6fa] flex justify-between items-center">
                <div>
                  <div className="text-[20px] font-bold text-[#1a233a]">
                    Grand Total
                  </div>
                  <div className="text-[11px] text-gray-600 mt-0.5">
                    (Charges - Allowances + Adjustment)
                  </div>
                </div>

                <div className="text-[24px] font-bold text-[#5a32ea]">
                  {formatCurrency(grandTotal)}
                </div>
              </div>
            </div>
          </div>

        </div >
      </div >


      {/* ── Fixed Footer ── */}
      < div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-3 flex justify-end items-center gap-3" >
        <button
          onClick={() => navigate('/purchase')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button


          //   onClick={() => navigate('/purchase')}
          //   className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors"
          // >


          onClick={handleSave}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold"
        >
          Save
        </button>
      </div >

    </main >
  );
};

export default CreatePurchaseOrderPage;
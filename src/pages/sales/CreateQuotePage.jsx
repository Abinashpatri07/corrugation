import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus, FileText, Box, Calculator, Layers, Palette, ChevronDown, Calendar, Bookmark,
  Package, Truck, Receipt, CheckCircle, CreditCard, Factory, Search, Plus, UploadCloud, ClipboardList,
  PackagePlus, PackageCheck, HandCoins, Check, Phone
} from 'lucide-react';

const CreateQuotePage = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [orderType, setOrderType] = useState('Normal');
  const [errors, setErrors] = useState({});

  // Customer state
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const selectedCustomerObj = customers.find(c => String(c.customerId) === String(selectedCustomer));

  const [boxType, setBoxType] = useState('');
  const [printType, setPrintType] = useState('');
  const [paperType, setPaperType] = useState('NS');
  const [boxSize, setBoxSize] = useState('medium');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/customers');
        const data = await res.json();
        if (data.success && data.data) {
          setCustomers(data.data);
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
      }
    };
    fetchCustomers();
  }, []);

  // Calculation state
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [plyType, setPlyType] = useState('3 Ply');
  const [boardSize, setBoardSize] = useState('');
  const [boardFactor, setBoardFactor] = useState('');
  const [numberOfPaper, setNumberOfPaper] = useState('');
  const [numberOfTwoPly, setNumberOfTwoPly] = useState('');
  const [boxWeight, setBoxWeight] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [topPaperGsm, setTopPaperGsm] = useState('');
  const [topPaperBf, setTopPaperBf] = useState('');
  const [linerGsm, setLinerGsm] = useState('');
  const [linerBf, setLinerBf] = useState('');
  const [fluteGsm, setFluteGsm] = useState('');
  const [fluteBf, setFluteBf] = useState('');

  const [materialAvailabilityData, setMaterialAvailabilityData] = useState([]);

  const handleCalculate = async () => {
    try {
      if (!length || !width || !height) {
        alert('Please enter length, width, and height');
        return;
      }
      
      if (!topPaperGsm || !linerGsm || !fluteGsm) {
        alert('Please enter GSM values for Top Paper, Liner, and Flute');
        return;
      }
      
      const response = await fetch('http://localhost:3000/api/v1/quotes/calculate-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ length, width, height, qty: quantity, ply: plyType, topGsm: topPaperGsm, linerGsm: linerGsm, fluteGsm: fluteGsm, paperType, topBf: topPaperBf, linerBf: linerBf, fluteBf: fluteBf })
      });
      
      const data = await response.json();
      
      if (data.success && data.data && data.data.boardSize) {
        const [l, w] = data.data.boardSize;
        const pieces = data.data.pieces;
        const ups = data.data.ups;
        const papers = data.data.papers;
        const twoPly = data.data.twoPly;
        
        setBoardSize(`${l} x ${w}`);
        setBoardFactor(data.data.boardFactor ? data.data.boardFactor.toString() : '');
        setNumberOfPaper(papers ? papers.toString() : '');
        setNumberOfTwoPly(twoPly ? twoPly.toString() : '');
        
        if (data.data.materialAvailability) {
            setMaterialAvailabilityData(data.data.materialAvailability);
        } else {
            setMaterialAvailabilityData([]);
        }
        
        if (data.data.weight) {
            setBoxWeight(`${data.data.weight.grossWeightKg} kg`);
            const totalKg = (data.data.weight.grossWeightKg * Number(quantity || 1)).toFixed(2);
            setTotalWeight(`${totalKg} kg`);
        } else {
            setBoxWeight('');
            setTotalWeight('');
        }
      } else {
        alert(data.message || 'Calculation failed');
      }
    } catch (error) {
      console.error('Calculation error:', error);
      alert('Error connecting to calculation server');
    }
  };

  const handleSaveClick = () => {
    const newErrors = {};

    if (!selectedCustomer) newErrors.customer = "Customer is required";
    if (!itemName) newErrors.itemName = "Item name is required";
    if (!itemDescription) newErrors.itemDescription = "Item description is required";
    if (!quantity) newErrors.quantity = "Quantity is required";
    
    if (!boxType) newErrors.boxType = "Box type is required";
    if (!plyType) newErrors.plyType = "Ply type is required";
    
    if (!length) newErrors.length = "Length is required";
    if (!width) newErrors.width = "Width is required";
    if (!height) newErrors.height = "Height is required";
    
    if (!topPaperGsm) newErrors.topPaperGsm = "Top GSM is required";
    if (!linerGsm) newErrors.linerGsm = "Liner GSM is required";
    if (!fluteGsm) newErrors.fluteGsm = "Flute GSM is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowPreview(true);
    } else {
      console.warn("Validation failed", newErrors);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      if (!selectedCustomer) {
        alert('Please select a customer first');
        setShowPreview(false);
        return;
      }

      const payload = {
        customerId: selectedCustomer,
        salesMan: 1, // Defaulting to Manoj Kumar (id 1)
        projectName: '', // Can be extracted if a state was added for this
        referenceNo: '', // Can be extracted if a state was added for this
        items: [
          {
            itemName: itemName,
            itemDescription: itemDescription,
            length: Number(length),
            width: Number(width),
            height: Number(height),
            quantity: Number(quantity) || 1,
            plyType: Number(plyType?.replace(/\D/g, '')) || 3,
            topGsm: Number(topPaperGsm),
            linerGsm: Number(linerGsm),
            fluteGsm: Number(fluteGsm),
            boardSize: boardSize,
            boxWeight: parseFloat(boxWeight) || 0,
            totalWeight: parseFloat(totalWeight) || 0,
            boxType: boxType,
            paperType: paperType,
            boxSize: boxSize
          }
        ]
      };

      const response = await fetch('http://localhost:3000/api/v1/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (data.success) {
        setShowPreview(false);
        navigate('/sales/quotes');
      } else {
        alert(data.message || 'Failed to save quote');
      }
    } catch (error) {
      console.error('Error saving quote:', error);
      alert('Error connecting to server to save quote');
    }
  };

  const tabs = [
    { name: 'Quotes', path: '/sales/quotes' },
    { name: 'Sales Orders', path: '/sales/orders' },
    { name: 'Invoices', path: '/sales/invoices' },
    { name: 'Payments', path: '/sales/payments' }
  ];

  const steps = [
    { name: 'Quote', icon: PackagePlus, active: true },
    { name: 'Sales order', icon: FileText, active: false },
    { name: 'Production', icon: Factory, active: false },
    { name: 'Package', icon: Package, active: false },
    { name: 'Ship', icon: Truck, active: false },
    { name: 'Invoice', icon: Receipt, active: false },
    { name: 'Delivered', icon: PackageCheck, active: false },
    { name: 'Payment', icon: HandCoins, active: false },
  ];

  const materials = [
    { id: 1, name: 'Reel 121', spec: 'GSM 230-100x150 BF 18', weight: '1200 Kg', selected: true },
    { id: 2, name: 'Reel 122', spec: 'GSM 230-100x150 BF 18', weight: '1300 Kg', selected: false },
    { id: 3, name: 'Reel 123', spec: 'GSM 230-100x150 BF 18', weight: '1000 Kg', selected: true },
    { id: 4, name: 'Reel 124', spec: 'GSM 230-100x150 BF 18', weight: '800 Kg', selected: false },
    { id: 5, name: 'Reel 125', spec: 'GSM 230-100x150 BF 18', weight: '900 Kg', selected: false },
    { id: 6, name: 'Reel 126', spec: 'GSM 230-100x150 BF 18', weight: '1100 Kg', selected: false },
  ];

  const [selectedMaterials, setSelectedMaterials] = useState([1, 3]);

  const toggleMaterial = (id) => {
    if (selectedMaterials.includes(id)) {
      setSelectedMaterials(selectedMaterials.filter(mId => mId !== id));
    } else {
      setSelectedMaterials([...selectedMaterials, id]);
    }
  };

  const parsedBoxWeight = parseFloat(boxWeight) || 0;
  const parsedTotalWeight = parseFloat(totalWeight) || 0;
  const parsedQuantity = parseInt(quantity) || 1;
  
  const calculatedBoxValue = parsedBoxWeight * 50;
  const calculatedSubTotal = calculatedBoxValue * parsedQuantity;
  const calculatedGST = calculatedSubTotal * 0.18;
  const calculatedTotal = calculatedSubTotal + calculatedGST;
  
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  return (
    <main className="flex-1 overflow-hidden bg-[#f4f7f9] flex flex-col relative p-1.5 gap-1.5 font-sans">

      {/* Sub Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap ${tab.name === 'Quotes'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col gap-1.5 min-h-0">
        {/* Header and Stepper */}
        <div className="bg-white px-6 py-2 rounded-xl border border-gray-200 shadow-sm shrink-0">
          <h2 className="text-[20px] font-bold tracking-tight bg-gradient-to-r from-[#ff6b6b] via-[#9333ea] to-[#4338ca] bg-clip-text text-transparent inline-block mb-1">
            Quote Creation
          </h2>

          <div className="flex items-center w-full relative px-6 z-0">
            {/* Connecting Line */}
            <div className="absolute top-4 left-10 right-10 h-[2px] bg-gray-200 z-[-1]"></div>
            <div className="absolute top-4 left-10 w-[calc(100%-5rem)] max-w-[calc(100%/7)] h-[2px] bg-gradient-to-r from-[#ff6b6b] via-[#9333ea] to-[#4338ca] z-[-1]"></div>

            <div className="flex items-center justify-between w-full">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.name} className="flex flex-col items-center px-2 relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 relative z-10 ${step.active
                        ? 'bg-gradient-to-br from-[#ff6b6b] via-[#9333ea] to-[#4338ca] text-white shadow-md'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                      }`}>
                      <Icon className="w-3.5 h-3.5" strokeWidth={step.active ? 2.5 : 2} />
                    </div>
                    <span className={`text-[10px] font-semibold ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto custom-scrollbar pb-4 pr-1">

          {/* Section 1: Customer Selection */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-[#ff5a6e] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Customer Selection</h3>
                <p className="text-xs text-gray-400 mt-1">Define corporate account details for dynamic tax and billing mapping.</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Search Customer <span className="text-red-500">*</span></label>
              <div className="relative">
                <select 
                  className={`w-full border ${errors.customer ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-white shadow-sm`}
                  value={selectedCustomer}
                  onChange={(e) => {
                    setSelectedCustomer(e.target.value);
                    if (errors.customer) setErrors({ ...errors, customer: null });
                  }}
                >
                  <option value="">Select a customer</option>
                  {customers.map((c) => (
                    <option key={c.customerId} value={c.customerId}>
                      {c.displayName} {c.gstin ? `- GST: ${c.gstin}` : ''} {c.primaryContact ? `| POC: ${c.primaryContact}` : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
              </div>
              {errors.customer && <p className="text-red-500 text-[11px] mt-1">{errors.customer}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-500 mb-2">Name</label>
                <div className="border border-gray-200 rounded-md px-3 py-2 bg-white flex items-center text-[13px] text-[#1a233a] shadow-sm min-h-[38px]">
                  <Box className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                  <span className="truncate">{selectedCustomerObj?.displayName || '-'}</span>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-500 mb-2">GST</label>
                <div className="border border-gray-200 rounded-md px-3 py-2 bg-white flex items-center text-[13px] text-[#1a233a] shadow-sm min-h-[38px]">
                  <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 text-[10px] mr-3 shrink-0">$</span>
                  <span className="truncate">{selectedCustomerObj?.gstin || '-'}</span>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-500 mb-2">Phone</label>
                <div className="border border-gray-200 rounded-md px-3 py-2 bg-white flex items-center text-[13px] text-[#1a233a] shadow-sm min-h-[38px]">
                  <Phone className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                  <span className="truncate">{selectedCustomerObj?.phone || '-'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Quote Details */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#b649d8] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a233a]">Quote Details</h3>
                  <p className="text-xs text-gray-400 mt-1">Determine product size limits, raw material configurations, and volume structures.</p>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Order Type <span className="text-red-500">*</span></label>
                <div className="flex items-center space-x-2">
                  {['Normal', 'Urgent', 'High Priority'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`text-[11px] font-semibold px-4 py-1.5 rounded-full shadow-sm transition-all duration-200 border ${
                        orderType === type
                          ? 'text-[#f97316] bg-[#fff7ed] border-[#fdba74]/50 scale-105'
                          : 'text-gray-500 bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Reference# <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Optional Reference" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Quote Date</label>
                <input type="date" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Expire Date</label>
                <input type="date" className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
              </div>

              <div className="md:col-span-3">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Sales Persons</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>Manoj Kumar</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>
              <div className="md:col-span-3">
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Project Name</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none bg-white">
                    <option>Select Project</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Product Specification */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-5">
              <div className="w-10 h-10 bg-[#7b46ef] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Product Specification</h3>
                <p className="text-xs text-gray-400 mt-1">Fill each section in order for accurate product configuration.</p>
              </div>
            </div>

            {/* Sub-section 1: Basic Info */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#7b46ef] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">1</div>
                <span className="text-[12px] font-bold text-[#7b46ef] uppercase tracking-wide">Item Information</span>
                <div className="flex-1 h-px bg-[#7b46ef]/15 ml-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Item Name <span className="text-red-500">*</span></label>
                  <input type="text" value={itemName} onChange={(e) => { setItemName(e.target.value); if (errors.itemName) setErrors({ ...errors, itemName: null }); }} className={`w-full border ${errors.itemName ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm`} />
                  {errors.itemName && <p className="text-red-500 text-[11px] mt-1">{errors.itemName}</p>}
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Item Description <span className="text-red-500">*</span></label>
                  <input type="text" value={itemDescription} onChange={(e) => { setItemDescription(e.target.value); if (errors.itemDescription) setErrors({ ...errors, itemDescription: null }); }} className={`w-full border ${errors.itemDescription ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm`} />
                  {errors.itemDescription && <p className="text-red-500 text-[11px] mt-1">{errors.itemDescription}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Quantity <span className="text-red-500">*</span></label>
                  <input type="number" value={quantity} onChange={(e) => { setQuantity(e.target.value); if (errors.quantity) setErrors({ ...errors, quantity: null }); }} className={`w-full border ${errors.quantity ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm`} />
                  {errors.quantity && <p className="text-red-500 text-[11px] mt-1">{errors.quantity}</p>}
                </div>
              </div>
            </div>

            {/* Sub-section 2: Box Configuration */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#4f67ff] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">2</div>
                <span className="text-[12px] font-bold text-[#4f67ff] uppercase tracking-wide">Box Configuration</span>
                <div className="flex-1 h-px bg-[#4f67ff]/15 ml-1"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box Type <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select 
                      value={boxType}
                      onChange={(e) => { setBoxType(e.target.value); if (errors.boxType) setErrors({ ...errors, boxType: null }); }}
                      className={`w-full border ${errors.boxType ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none`}
                    >
                      <option value="">Select Box Type</option>
                      <option value="Universal">Universal</option>
                      <option value="Dye cut">Dye cut</option>
                      <option value="Telescopic">Telescopic</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                  </div>
                  {errors.boxType && <p className="text-red-500 text-[11px] mt-1">{errors.boxType}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Paper <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={paperType} onChange={(e) => setPaperType(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none">
                      <option value="NS">NS</option>
                      <option value="GYS">GYS</option>
                      <option value="Duplex">Duplex</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box Size <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={boxSize} onChange={(e) => setBoxSize(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none">
                      <option value="small">small</option>
                      <option value="medium">medium</option>
                      <option value="large">large</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Ply Type <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={plyType} onChange={(e) => { setPlyType(e.target.value); if (errors.plyType) setErrors({ ...errors, plyType: null }); }} className={`w-full border ${errors.plyType ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none`}>
                      <option>3 Ply</option>
                      <option>5 Ply</option>
                      <option>7 Ply</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                  </div>
                  {errors.plyType && <p className="text-red-500 text-[11px] mt-1">{errors.plyType}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Print Type <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm appearance-none">
                      <option>Plain</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#1a233a] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-section 3: Measurements */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#f97316] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">3</div>
                <span className="text-[12px] font-bold text-[#f97316] uppercase tracking-wide">Measurements <span className="text-[10px] text-gray-400 normal-case font-normal">(in cm)</span></span>
                <div className="flex-1 h-px bg-[#f97316]/15 ml-1"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Length <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" value={length} onChange={(e) => { setLength(e.target.value); if (errors.length) setErrors({ ...errors, length: null }); }} placeholder="0" className={`w-full border ${errors.length ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm`} />
                    <span className="absolute right-3 top-2.5 text-[11px] text-gray-400 font-medium">cm</span>
                  </div>
                  {errors.length && <p className="text-red-500 text-[11px] mt-1">{errors.length}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Width <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" value={width} onChange={(e) => { setWidth(e.target.value); if (errors.width) setErrors({ ...errors, width: null }); }} placeholder="0" className={`w-full border ${errors.width ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm`} />
                    <span className="absolute right-3 top-2.5 text-[11px] text-gray-400 font-medium">cm</span>
                  </div>
                  {errors.width && <p className="text-red-500 text-[11px] mt-1">{errors.width}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Height <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" value={height} onChange={(e) => { setHeight(e.target.value); if (errors.height) setErrors({ ...errors, height: null }); }} placeholder="0" className={`w-full border ${errors.height ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm`} />
                    <span className="absolute right-3 top-2.5 text-[11px] text-gray-400 font-medium">cm</span>
                  </div>
                  {errors.height && <p className="text-red-500 text-[11px] mt-1">{errors.height}</p>}
                </div>
              </div>
            </div>

            {/* Sub-section 4: Kraft Details */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#16a34a] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">4</div>
                <span className="text-[12px] font-bold text-[#16a34a] uppercase tracking-wide">Kraft Details</span>
                <div className="flex-1 h-px bg-[#16a34a]/15 ml-1"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Top Paper <span className="text-red-500">*</span></label>
                  <div className="flex items-center space-x-2">
                    <input type="text" placeholder="GSM" value={topPaperGsm} onChange={(e) => { setTopPaperGsm(e.target.value); if (errors.topPaperGsm) setErrors({ ...errors, topPaperGsm: null }); }} className={`w-full border ${errors.topPaperGsm ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm`} />
                    <span className="text-gray-400 font-bold">/</span>
                    <input type="text" placeholder="BF" value={topPaperBf} onChange={(e) => setTopPaperBf(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                  </div>
                  {errors.topPaperGsm && <p className="text-red-500 text-[11px] mt-1">{errors.topPaperGsm}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Liner <span className="text-red-500">*</span></label>
                  <div className="flex items-center space-x-2">
                    <input type="text" placeholder="GSM" value={linerGsm} onChange={(e) => { setLinerGsm(e.target.value); if (errors.linerGsm) setErrors({ ...errors, linerGsm: null }); }} className={`w-full border ${errors.linerGsm ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm`} />
                    <span className="text-gray-400 font-bold">/</span>
                    <input type="text" placeholder="BF" value={linerBf} onChange={(e) => setLinerBf(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                  </div>
                  {errors.linerGsm && <p className="text-red-500 text-[11px] mt-1">{errors.linerGsm}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Flute <span className="text-red-500">*</span></label>
                  <div className="flex items-center space-x-2">
                    <input type="text" placeholder="GSM" value={fluteGsm} onChange={(e) => { setFluteGsm(e.target.value); if (errors.fluteGsm) setErrors({ ...errors, fluteGsm: null }); }} className={`w-full border ${errors.fluteGsm ? 'border-red-500' : 'border-gray-200'} rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm`} />
                    <span className="text-gray-400 font-bold">/</span>
                    <input type="text" placeholder="BF" value={fluteBf} onChange={(e) => setFluteBf(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                  </div>
                  {errors.fluteGsm && <p className="text-red-500 text-[11px] mt-1">{errors.fluteGsm}</p>}
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-end mt-2">
              <button type="button" onClick={handleCalculate} className="px-8 py-2 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-md hover:opacity-90 transition-opacity">
                Calculate
              </button>
            </div>
          </div>

          {/* Section 4: Board Calculation */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-5">
              <div className="w-10 h-10 bg-[#4f67ff] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Board Calculation</h3>
                <p className="text-xs text-gray-400 mt-1">Calculate board dimensions, paper usage, and production requirements.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Left inputs */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Board Size (L x W)</label>
                  <input type="text" value={boardSize} readOnly className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] font-bold text-[#1a233a] focus:outline-none focus:border-blue-500 bg-blue-50/30 shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">BF (Bursting Factor)</label>
                  <div className="relative">
                    <input type="text" value={boardFactor} readOnly className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] font-bold text-[#1a233a] focus:outline-none focus:border-blue-500 bg-blue-50/30 shadow-sm pr-12" />
                    <span className="absolute right-3 top-2.5 text-[11px] text-gray-400 font-medium">kg/cm²</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Number of Top Paper</label>
                  <input type="text" value={numberOfPaper} onChange={(e) => setNumberOfPaper(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] font-bold text-[#1a233a] focus:outline-none focus:border-blue-500 bg-blue-50/30 shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Number of Two Ply</label>
                  <input type="text" value={numberOfTwoPly} onChange={(e) => setNumberOfTwoPly(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] font-bold text-[#1a233a] focus:outline-none focus:border-blue-500 bg-blue-50/30 shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box Weight (Per Box)</label>
                  <input type="text" value={boxWeight} onChange={(e) => setBoxWeight(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] font-bold text-[#1a233a] focus:outline-none focus:border-blue-500 bg-blue-50/30 shadow-sm" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Total Weight (Order)</label>
                  <input type="text" value={totalWeight} onChange={(e) => setTotalWeight(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] font-bold text-[#1a233a] focus:outline-none focus:border-blue-500 bg-blue-50/30 shadow-sm" />
                </div>
                </div>
              </div>

              {/* Right Summary */}
              <div className="w-full md:w-[350px] bg-gradient-to-br from-[#fff5f5] to-[#f5f3ff] rounded-2xl p-5 flex flex-col justify-center border border-white/50 shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-dashed border-[#dce4f0]">
                  <span className="text-[11px] font-semibold text-gray-500">Box Value</span>
                  <span className="text-[12px] font-medium text-[#1a233a]">{formatCurrency(calculatedBoxValue)}/BOX</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-[#dce4f0]">
                  <span className="text-[11px] font-semibold text-gray-500">Sub Total</span>
                  <span className="text-[12px] font-medium text-[#1a233a]">{formatCurrency(calculatedSubTotal)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-[#dce4f0]">
                  <span className="text-[11px] font-semibold text-gray-500">GST <span className="ml-1 text-[#1a233a]">(18%)</span></span>
                  <span className="text-[12px] font-medium text-[#1a233a]">{formatCurrency(calculatedGST)}</span>
                </div>

                <div className="mt-2">
                  <span className="text-[11px] font-bold text-gray-500 block mb-0.5">ESTIMATED TOTAL</span>
                  <div className="text-[32px] leading-tight font-bold text-[#1a233a]">{formatCurrency(calculatedTotal)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Material Availability */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-[#089dd2] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a233a]">Material Availability</h3>
                  <p className="text-xs text-gray-400 mt-1">Check available stock and material readiness for production.</p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto mt-2 border border-gray-200 rounded-lg">
              <table className="w-full text-left border-collapse bg-white">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-[12px] font-bold text-gray-700 whitespace-nowrap">Item Code</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-gray-700 whitespace-nowrap">Item Name</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-gray-700 whitespace-nowrap">Total Weight</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-gray-700 whitespace-nowrap">Required Weight</th>
                    <th className="py-3 px-4 text-[12px] font-bold text-gray-700 whitespace-nowrap">Indicator</th>
                  </tr>
                </thead>
                <tbody>
                  {materialAvailabilityData && materialAvailabilityData.length > 0 ? (
                    materialAvailabilityData.map((mat, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-4 text-[13px] text-[#1a233a] font-medium">{mat.itemCode}</td>
                        <td className="py-3 px-4 text-[13px] text-[#1a233a]">{mat.itemName}</td>
                        <td className="py-3 px-4 text-[13px] text-gray-600">{mat.totalWeight} kg</td>
                        <td className="py-3 px-4 text-[13px] font-semibold text-[#1a233a]">{mat.requiredWeight} kg</td>
                        <td className="py-3 px-4 text-[13px]">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${mat.indicator === 'Green' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'}`}>
                            {mat.indicator === 'Green' ? 'Available' : 'Shortage'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-[13px] text-gray-400 font-medium">
                        Enter specifications and click Calculate to view material availability.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 6: Print Specifications */}
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-[#15b79e] rounded-xl flex items-center justify-center text-white mr-4 shadow-sm flex-shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a233a]">Print Specifications</h3>
                <p className="text-xs text-gray-400 mt-1">Required for printed boxes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Number of Colors <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">
                    <Palette className="w-4 h-4" />
                  </span>
                  <input type="text" defaultValue="" className="w-full min-w-0 border border-gray-200 rounded-md pl-10 pr-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Print Area <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">
                    <Layers className="w-4 h-4" />
                  </span>
                  <input type="text" defaultValue="" className="w-full min-w-0 border border-gray-200 rounded-md pl-10 pr-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Artwork Upload <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-[#a3c2fa] rounded-lg p-4 flex items-center bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <UploadCloud className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1a233a]">Drop artwork or click to upload</p>
                    <p className="text-[10px] text-gray-400 font-medium">PDF, AI, PSD, PNG or JPG up to 25 MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Printing Notes</label>
                <textarea
                  rows="3"
                  defaultValue=""
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-[#1a233a] focus:outline-none focus:border-blue-500 bg-white shadow-sm resize-none h-[76px]"
                ></textarea>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Floating Footer Actions */}
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 px-6 py-2 flex items-center justify-end space-x-3 z-50 mt-auto">
        <button
          onClick={() => navigate('/sales/quotes')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button
          onClick={handleSaveClick}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-opacity"
        >
          Save
        </button>
      </div>

      {/* Live Order Summary Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4">
          <div className="bg-[#f4f7fb] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh]">

            {/* Header */}
            <div className="bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] px-6 py-4 flex justify-between items-center rounded-t-xl">
              <div>
                <p className="text-white/80 text-xs font-medium mb-0.5">Live Order Summary</p>
                <h3 className="text-2xl font-bold text-white tracking-wide">Preview</h3>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <Package className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">

              {/* Customer */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1a233a]">Customer</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Name</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">
                      {selectedCustomerObj?.displayName || 'Not Selected'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">GST Number</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{selectedCustomerObj?.gstin || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-gray-500 font-medium">Phone</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{selectedCustomerObj?.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1a233a]">Product Specifications</h4>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Box Type</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{boxType || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Box Measurement</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{length || 0} x {width || 0} x {height || 0}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Ply Type</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{plyType || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Top Paper GSM</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{topPaperGsm || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Liner GSM</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{linerGsm || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Flute GSM</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{fluteGsm || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Print Type</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{printType || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[12px] text-gray-500 font-medium">Quantity</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{quantity || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Board Calculation */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1a233a]">Board Calculation</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Board Size</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{boardSize || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Number of Paper</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{numberOfPaper || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Number of Two Ply</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{numberOfTwoPly || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-[13px] text-gray-500 font-medium">Box Weight</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{boxWeight || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-[13px] text-gray-500 font-medium">Total Weight</span>
                    <span className="text-[13px] text-[#1a233a] font-bold">{totalWeight || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Material Available */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1a233a]">Material Available</h4>
                </div>

                <div className="space-y-4">
                  {materialAvailabilityData.length > 0 ? (
                    materialAvailabilityData.map((mat, index) => (
                      <div key={index} className="border border-gray-100 rounded-xl p-4 bg-[#fafbfc]">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-[14px] font-bold text-[#1a233a]">{mat.itemName || mat.itemCode}</h5>
                          <span className={`px-2 py-1 rounded text-[11px] font-bold ${
                            mat.indicator === 'Green' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'
                          }`}>
                            {mat.indicator === 'Green' ? 'Available' : 'Shortage'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <p className="text-[11px] text-gray-400 font-semibold mb-1">Item Code</p>
                            <p className="text-[13px] text-[#1a233a] font-bold">{mat.itemCode}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 font-semibold mb-1">Total Found</p>
                            <p className="text-[13px] text-[#1a233a] font-bold">{mat.totalWeight} Kg</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-400 font-semibold mb-1">Required</p>
                            <p className="text-[13px] text-[#1a233a] font-bold">{mat.requiredWeight} Kg</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl">
                      <p className="text-[13px] text-gray-500 font-medium">No material data available</p>
                      <p className="text-[11px] text-gray-400 mt-1">Please calculate board first</p>
                    </div>
                  )}

                  <div className="pt-4 px-2 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-[#1a233a] font-bold">Total Reels</span>
                      <span className="text-[14px] text-[#1a233a] font-bold">{materialAvailabilityData?.length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-[#1a233a] font-bold">Total Quantity Required</span>
                      <span className="text-[14px] text-[#1a233a] font-bold">
                        {materialAvailabilityData?.reduce((acc, curr) => acc + (Number(curr.requiredWeight) || 0), 0).toFixed(2)} Kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated Total Block */}
              <div className="bg-[#fff1f2] rounded-xl p-5 flex justify-between items-end border border-[#ffe4e6]">
                <div>
                  <p className="text-[11px] font-bold text-[#ff6b6b] uppercase tracking-wider mb-2">Estimated Total</p>
                  <h2 className="text-[32px] leading-none font-bold text-[#1a233a]">{formatCurrency(calculatedTotal)}</h2>
                </div>
                <div className="text-[14px] font-bold text-gray-500">
                  @ {formatCurrency(calculatedBoxValue)} /BOX
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-between items-center pt-4 pb-2">
                <button
                  onClick={() => setShowPreview(false)}
                  className="w-[48%] py-3 bg-white text-[#1a233a] rounded-full text-sm font-bold border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm flex items-center justify-center"
                >
                  Edit Order
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="w-[48%] py-3 bg-gradient-to-r from-[#f86583] to-[#4534e1] text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center"
                >
                  Confirm Order
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      </main>
  );
};

export default CreateQuotePage;

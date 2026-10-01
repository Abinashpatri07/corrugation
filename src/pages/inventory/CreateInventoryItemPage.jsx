import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Upload, Package, FileText, ShoppingCart, Box, List, Bookmark, Check } from 'lucide-react';
import { createInventoryItem } from '../../services/createInventoryItemApi';
import { getVendors } from '../../services/vendorlistApi';

const CreateInventoryItemPage = () => {
  const navigate = useNavigate();
  const [showPurchaseInfo, setShowPurchaseInfo] = useState(true);
  const [showSalesInfo, setShowSalesInfo] = useState(true);
  const [category, setCategory] = useState('');
  
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdItemCode, setCreatedItemCode] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await getVendors({ limit: 100 });
        if (response.data) {
          setVendors(response.data);
        } else if (response.rows) {
          setVendors(response.rows); // Handle case where API response puts data in 'rows'
        }
      } catch (err) {
        console.error('Failed to load vendors', err);
      }
    };
    fetchVendors();
  }, []);
  const [formData, setFormData] = useState({
    itemName: '', itemDesc: '', unit: '', brand: '',
    purPrice: '', purAccount: '', purDesc: '', purVendor: '',
    sellingPrice: '', sellingAccount: '', sellingDescription: '',
    inventoryAccount: '', openingStock: '', openingStockRate: '',
    // Reel
    reelType: '', reelSize: '', reelGsm: '', reelBf: '',
    // Glue
    glueTensile: '', gluePeel: '', glueShear: '',
    // Paper
    paperGsm: '', paperBf: '', paperLength: '', paperWidth: '',
    // 2 Ply
    plyPly: '', plyBf: '', plyLength: '', plyWidth: '',
    // Board
    boardPly: '', boardBf: '', boardLength: '', boardWidth: '',
    // Box
    boxType: '', boxPaper: '', boxPly: '', boxBf: '', boxLength: '', boxWidth: '', boxHeight: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!formData.itemName || !category) {
        alert('Name and Category are required!');
        return;
      }
      setIsLoading(true);
      const payload = {
        itemName: formData.itemName,
        itemDesc: formData.itemDesc,
        category: category,
        unit: formData.unit,
        brand: formData.brand,
        purPrice: formData.purPrice ? Number(formData.purPrice) : null,
        purAccount: formData.purAccount,
        purDesc: formData.purDesc,
        purVendor: formData.purVendor ? Number(formData.purVendor) : null,
        sellingPrice: formData.sellingPrice ? Number(formData.sellingPrice) : null,
        sellingAccount: formData.sellingAccount,
        sellingDescription: formData.sellingDescription,
        inventoryAccount: formData.inventoryAccount,
        openingStock: formData.openingStock ? Number(formData.openingStock) : null,
        openingStockRate: formData.openingStockRate ? Number(formData.openingStockRate) : null,
      };

      if (category === 'Reel') {
        payload.reelSpec = { reelType: formData.reelType, reelSize: formData.reelSize, reelGsm: formData.reelGsm, reelBf: formData.reelBf };
      } else if (category === 'Glue') {
        payload.glueSpec = { glueTensile: formData.glueTensile, gluePeel: formData.gluePeel, glueShear: formData.glueShear };
      } else if (category === 'Paper') {
        payload.paperSpec = { paperGsm: formData.paperGsm, paperBf: formData.paperBf, paperLength: formData.paperLength, paperWidth: formData.paperWidth };
      } else if (category === '2 Ply') {
        payload.twoPlySpc = { plyPly: formData.plyPly, plyBf: formData.plyBf, plyLength: formData.plyLength, plyWidth: formData.plyWidth };
      } else if (category === 'Board') {
        payload.boardSpec = { boardPly: formData.boardPly, boardBf: formData.boardBf, boardLength: formData.boardLength, boardWidth: formData.boardWidth };
      } else if (category === 'Box') {
        payload.boxSpec = { boxType: formData.boxType, boxPaper: formData.boxPaper, boxPly: formData.boxPly, boxBf: formData.boxBf, boxLength: formData.boxLength, boxWidth: formData.boxWidth, boxHeight: formData.boxHeight };
      }

      const data = await createInventoryItem(payload);
      if (data.success) {
        setCreatedItemCode(data.data.itemCode);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/inventory');
        }, 3000);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to save item');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { name: 'Items', path: '/inventory', active: true },
    { name: 'Inventory Control', path: '/inventory/control', active: false }
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-[#f4f7f9] p-1.5 gap-1.5">
      {/* ── Sub Navigation ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm shrink-0 px-8">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-1 px-4 py-2 text-[13px] border-b-2 transition-colors whitespace-nowrap ${
                tab.active
                  ? 'text-[#1a233a] font-bold border-[#1a233a]'
                  : 'text-gray-500 font-medium border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.name === 'Items' && <ChevronDown className="w-3.5 h-3.5 ml-1" />}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-hidden flex flex-col gap-1.5">

        {/* Top Banner with Stepper */}
        <div className="bg-white px-6 py-2 md:px-8 md:py-3 flex items-center justify-between border border-gray-200 rounded-2xl shadow-sm shrink-0">
          <h2 className="text-[17px] md:text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
            Create Inventory Item
          </h2>

          <div className="flex items-center gap-0">
            {/* Step 1: Item Creation */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7a59] via-[#d54a88] to-[#402de8] ring-2 ring-pink-50 text-white flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <Box className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="text-[10px] md:text-[11px] font-semibold text-[#1a233a] text-center leading-tight">Item Creation</span>
            </div>

            {/* Line */}
            <div className="w-6 md:w-10 h-[2px] bg-gray-200 -ml-4 -mr-4 mb-4 z-0" />

            {/* Step 2: Item Listed */}
            <div className="flex flex-col items-center flex-shrink-0 w-16 md:w-20">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-semibold mb-1 z-10 relative shadow-sm">
                <List className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="text-[10px] md:text-[11px] font-medium text-gray-500 text-center leading-tight">Item Listed</span>
            </div>
          </div>
        </div>

        {/* ── Scrollable Form Area ── */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 custom-scrollbar">
          <div className="flex flex-col gap-1.5 pb-2">
            
            {/* Top Section: Basic Info & Upload Document */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a233a]">Basic Information</h3>
              </div>
              
              <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Form */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input name="itemName" value={formData.itemName} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                      Item Description
                    </label>
                    <div className="relative">
                      <textarea 
                        name="itemDesc" value={formData.itemDesc} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white min-h-[60px] resize-y"
                        placeholder="Enter description..."
                      ></textarea>
                      <div className="absolute bottom-2 right-3 text-[11px] text-gray-400">{formData.itemDesc.length} / 500 Character</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white text-gray-500"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          <option value="Reel">Reel</option>
                          <option value="Glue">Glue</option>
                          <option value="Paper">Paper</option>
                          <option value="2 Ply">2 Ply</option>
                          <option value="Board">Board</option>
                          <option value="Box">Box</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                        Unit <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select name="unit" value={formData.unit} onChange={handleChange} className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white text-gray-500">
                          <option value="">Select or type to add</option>
                          <option value="Kg">Kg</option>
                          <option value="Ton">Ton</option>
                          <option value="Pcs">Pcs</option>
                          <option value="Box">Box</option>
                          <option value="Meters">Meters</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-1.5">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select name="brand" value={formData.brand} onChange={handleChange} className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white text-gray-500">
                        <option value="">Select Brand</option>
                        <option value="Shree Paper">Shree Paper</option>
                        <option value="ITC">ITC</option>
                        <option value="JK Paper">JK Paper</option>
                        <option value="BILT">BILT</option>
                        <option value="WestRock">WestRock</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Right Upload Document */}
                <div className="lg:col-span-1">
                  <h3 className="text-[15px] font-bold text-[#1a233a] mb-3">Upload Document</h3>
                  
                  {/* Outer Box */}
                  <div className="relative rounded-2xl p-5 flex flex-col gap-4">
                    {/* Faint Background Gradient for Outer Box */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f64f59]/5 via-[#c471ed]/5 to-[#5a32fa]/5 rounded-2xl pointer-events-none"></div>
                    
                    {/* Gradient Dashed Border for Outer Box */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                      <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="15" fill="none" stroke="url(#uploadGrad)" strokeWidth="1.5" strokeDasharray="10 8" />
                      <defs>
                        <linearGradient id="uploadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f64f59" />
                          <stop offset="50%" stopColor="#c471ed" />
                          <stop offset="100%" stopColor="#5a32fa" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Front View Section */}
                    <div className="relative z-10 w-full flex flex-col">
                      <span className="text-[13px] font-medium text-[#1a233a] mb-2">Front View</span>
                      
                      {/* Inner Box 1 */}
                      <div className="relative rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/40 transition-colors min-h-[90px]">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="11" fill="none" stroke="url(#uploadGrad)" strokeWidth="1" strokeDasharray="8 6" />
                        </svg>
                        <Upload className="w-5 h-5 text-gray-500 mb-1.5 relative z-10" strokeWidth={1.5} />
                        <span className="text-[12px] text-gray-600 font-medium relative z-10">Upload Front Image</span>
                      </div>
                    </div>

                    {/* Rear View Section */}
                    <div className="relative z-10 w-full flex flex-col">
                      <span className="text-[13px] font-medium text-[#1a233a] mb-2">Rear View</span>
                      
                      {/* Inner Box 2 */}
                      <div className="relative rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/40 transition-colors min-h-[90px]">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="11" fill="none" stroke="url(#uploadGrad)" strokeWidth="1" strokeDasharray="8 6" />
                        </svg>
                        <Upload className="w-5 h-5 text-gray-500 mb-1.5 relative z-10" strokeWidth={1.5} />
                        <span className="text-[12px] text-gray-600 font-medium relative z-10">Upload Rear Image</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Specification Section */}
            {category && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#1a233a]">
                    {category === '2 Ply' ? 'Ply' : category} Specification
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    
                    {/* Reel Specification */}
                    {category === 'Reel' && (
                      <>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Paper Type</label>
                          <input name="reelType" value={formData.reelType} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Size</label>
                          <input name="reelSize" value={formData.reelSize} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">GSM</label>
                          <input name="reelGsm" value={formData.reelGsm} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">BF</label>
                          <input name="reelBf" value={formData.reelBf} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                      </>
                    )}

                    {/* Glue Specification */}
                    {category === 'Glue' && (
                      <>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Tensile</label>
                          <input name="glueTensile" value={formData.glueTensile} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Peel</label>
                          <input name="gluePeel" value={formData.gluePeel} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Shear</label>
                          <input name="glueShear" value={formData.glueShear} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                      </>
                    )}

                    {/* Paper Specification */}
                    {category === 'Paper' && (
                      <>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">GSM</label>
                          <input name="paperGsm" value={formData.paperGsm} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">BF</label>
                          <input name="paperBf" value={formData.paperBf} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Paper_Length</label>
                          <input name="paperLength" value={formData.paperLength} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Paper_Width</label>
                          <input name="paperWidth" value={formData.paperWidth} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                      </>
                    )}

                    {/* 2 Ply Specification */}
                    {category === '2 Ply' && (
                      <>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Ply</label>
                          <input name="plyPly" value={formData.plyPly} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">BF</label>
                          <input name="plyBf" value={formData.plyBf} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Ply_Length</label>
                          <input name="plyLength" value={formData.plyLength} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Ply_Width</label>
                          <input name="plyWidth" value={formData.plyWidth} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                      </>
                    )}

                    {/* Board Specification */}
                    {category === 'Board' && (
                      <>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Ply</label>
                          <input name="boardPly" value={formData.boardPly} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">BF</label>
                          <input name="boardBf" value={formData.boardBf} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Board_Length</label>
                          <input name="boardLength" value={formData.boardLength} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Board_Width</label>
                          <input name="boardWidth" value={formData.boardWidth} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                      </>
                    )}

                    {/* Box Specification */}
                    {category === 'Box' && (
                      <>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Type</label>
                          <input name="boxType" value={formData.boxType} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Paper Type</label>
                          <input name="boxPaper" value={formData.boxPaper} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Ply</label>
                          <input name="boxPly" value={formData.boxPly} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">BF</label>
                          <input name="boxBf" value={formData.boxBf} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box_Len</label>
                          <input name="boxLength" value={formData.boxLength} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box_Wid</label>
                          <input name="boxWidth" value={formData.boxWidth} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#1a233a] mb-2">Box_Hei</label>
                          <input name="boxHeight" value={formData.boxHeight} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </div>
            )}

            {/* Purchase & Sales Information Combined */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-1">
              
              {/* Purchase Information Header */}
              <div className={`p-5 flex items-center gap-3 ${showPurchaseInfo ? 'border-b border-gray-100' : ''}`}>
                <div 
                  onClick={() => setShowPurchaseInfo(!showPurchaseInfo)}
                  className={`w-[22px] h-[22px] flex items-center justify-center rounded-full cursor-pointer transition-all ${
                    showPurchaseInfo 
                      ? 'bg-gradient-to-br from-[#f64f59] to-[#c471ed] shadow-sm' 
                      : 'border-2 border-gray-300 bg-gray-50'
                  }`}
                >
                  {showPurchaseInfo && <div className="w-[10px] h-[10px] bg-white rounded-full"></div>}
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a233a]">Purchase Information</h3>
              </div>

              {showPurchaseInfo && (
                <div className="p-6 border-b border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                        Cost Price <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <input name="purPrice" value={formData.purPrice} onChange={handleChange} type="text" className="w-full border border-r-0 border-gray-200 rounded-l-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        <span className="bg-gray-50 border border-gray-200 rounded-r-md px-3 py-2 text-[12px] text-gray-500 font-medium">INR</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                        Account <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select name="purAccount" value={formData.purAccount} onChange={handleChange} className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                          <option value="">Select Purchase Account</option>
                          <option value="Cost of Goods Sold">Cost of Goods Sold</option>
                          <option value="Inventory Asset">Inventory Asset</option>
                          <option value="Purchases">Purchases</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                        Description
                      </label>
                      <textarea 
                        name="purDesc" value={formData.purDesc} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white min-h-[80px] resize-y"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                        Preferred Vendor
                      </label>
                      <div className="relative">
                        <select name="purVendor" value={formData.purVendor} onChange={handleChange} className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                          <option value="">Select Vendor</option>
                          {vendors.map(vendor => (
                            <option key={vendor.vendorId} value={vendor.vendorId}>
                              {vendor.companyName || vendor.displayName}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sales Information Header */}
              <div className={`p-5 flex items-center gap-3 ${showSalesInfo ? 'border-b border-gray-100' : ''}`}>
                <div 
                  onClick={() => setShowSalesInfo(!showSalesInfo)}
                  className={`w-[22px] h-[22px] flex items-center justify-center rounded-full cursor-pointer transition-all ${
                    showSalesInfo 
                      ? 'bg-gradient-to-br from-[#f64f59] to-[#c471ed] shadow-sm' 
                      : 'border-2 border-gray-300 bg-gray-50'
                  }`}
                >
                  {showSalesInfo && <div className="w-[10px] h-[10px] bg-white rounded-full"></div>}
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a233a]">Sales Information</h3>
              </div>

              {showSalesInfo && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                        Selling Price <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <input name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} type="text" className="w-full border border-r-0 border-gray-200 rounded-l-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                        <span className="bg-gray-50 border border-gray-200 rounded-r-md px-3 py-2 text-[12px] text-gray-500 font-medium">INR</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                        Sales Account <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select name="sellingAccount" value={formData.sellingAccount} onChange={handleChange} className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                          <option value="">Select Sales Account</option>
                          <option value="Sales">Sales</option>
                          <option value="Discount">Discount</option>
                          <option value="General Income">General Income</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                        Description
                      </label>
                      <textarea 
                        name="sellingDescription" value={formData.sellingDescription} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white min-h-[80px] resize-y"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Track Inventory for this Item */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-1">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f64f59] to-[#c471ed] flex items-center justify-center text-white shadow-sm">
                  <Box className="w-4 h-4" />
                </div>
                <h3 className="text-[16px] font-bold text-[#1a233a]">Track Inventory for this Item</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Inventory Account <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select name="inventoryAccount" value={formData.inventoryAccount} onChange={handleChange} className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option value="">Select Inventory Account</option>
                        <option value="Inventory Asset">Inventory Asset</option>
                        <option value="Stock in Hand">Stock in Hand</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Inventory Valuation Method <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option value="">Select Valuation Method</option>
                        <option value="FIFO">FIFO</option>
                        <option value="LIFO">LIFO</option>
                        <option value="Weighted Average">Weighted Average</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Good Received Not Invoiced Account <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 appearance-none bg-white">
                        <option value="">Select Account</option>
                        <option value="Unbilled Inventory">Unbilled Inventory</option>
                        <option value="Accrued Purchases">Accrued Purchases</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Reorder Point
                    </label>
                    <input type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Opening Stock
                    </label>
                    <input name="openingStock" value={formData.openingStock} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#1a233a] mb-2">
                      Opening Stock Rate/ Unit
                    </label>
                    <div className="flex">
                      <input name="openingStockRate" value={formData.openingStockRate} onChange={handleChange} type="text" className="w-full border border-r-0 border-gray-200 rounded-l-md shadow-sm px-3 py-2 text-[13px] focus:outline-none focus:border-blue-500 bg-white" />
                      <span className="bg-gray-50 border border-gray-200 rounded-r-md px-3 py-2 text-[12px] text-gray-500 font-medium">INR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Fixed Footer ── */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-8 py-3 flex justify-end items-center gap-3">
        <button 
          onClick={() => navigate('/inventory')}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm"
        >
          Cancel
        </button>
        <button className="px-4 py-1.5 rounded-lg bg-gray-100 text-[13px] font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex items-center shadow-sm">
          <Bookmark className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
          Save Draft
        </button>
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] text-white text-[13px] font-bold shadow-sm hover:opacity-90 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
      {/* ── Success Modal ── */}
      {showSuccessModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-[450px] min-h-[400px] flex flex-col items-center relative overflow-hidden">

            {/* Gradient Curved Header */}
            <div className="absolute top-0 left-0 w-full h-40 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[150%] h-[280px] bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] rounded-b-[50%]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full px-8 pt-[85px] pb-8">

              {/* Checkmark Circle */}
              <div className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.15)] mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8]">
                  <Check className="w-6 h-6 text-white" strokeWidth={4} />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-[22px] font-bold text-center mb-2 leading-snug bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] bg-clip-text text-transparent">
                Inventory Item<br />Successfully Created.
              </h3>

              <p className="text-[12px] font-bold text-gray-400 mb-1">
                Item Code: <span className="text-[#402de8]">{createdItemCode}</span>
              </p>

              <p className="text-[10px] font-bold text-gray-400 mb-6 tracking-wide">
                *Redirect in 3 Sec*
              </p>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/inventory');
                }}
                className="px-10 py-1.5 rounded-[10px] font-bold text-sm text-white bg-gradient-to-r from-[#ff7a59] via-[#d54a88] to-[#402de8] hover:opacity-90 transition-opacity shadow-sm"
              >
                Okay
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
};

export default CreateInventoryItemPage;

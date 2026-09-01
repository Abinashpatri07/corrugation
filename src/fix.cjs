const fs = require('fs');
const file = 'c:/New folder/ERPSystem/src/pages/sales/CreateQuotePage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/border -2\.5/g, 'border border-[#c4d6eb] rounded-lg px-4 py-2.5');

// For the Box Measurement fields, they should be px-2 instead of px-4 to fit properly
content = content.replace(/border border-\[#c4d6eb\] rounded-lg px-4 py-2\.5 text-sm text-\[#1a233a\] font-medium focus:outline-none focus:border-\[#3ca0d3\] text-center/g, 'border border-[#c4d6eb] rounded-lg px-2 py-2.5 text-sm text-[#1a233a] font-medium focus:outline-none focus:border-[#3ca0d3] text-center');

fs.writeFileSync(file, content);
console.log('Fixed corruption');

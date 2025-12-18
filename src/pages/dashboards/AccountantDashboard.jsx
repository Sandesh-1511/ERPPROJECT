// import React from 'react';

// // Placeholder components - Replace these with your actual chart components
// const Chart = ({ title, type }) => <div className="card p-3 shadow-sm h-100">
//   <h5>{title}</h5>
//   <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
//     {type} Chart Placeholder
//   </div>
// </div>;

// const DonutChart = ({ title, categories }) => <div className="card p-3 shadow-sm h-100">
//   <h5>{title}</h5>
//   <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
//     Donut Chart Placeholder<br />
//     Categories: {categories.join(', ')}
//   </div>
// </div>;

// const FeesOverviewCard = () => <div className="card p-3 shadow-sm">
//   <h5>Fees Overview</h5>
//   <div className="mt-3">
//     <div className="d-flex justify-content-between mb-2">
//       <span>88 UNPAID</span>
//       <span>78.57%</span>
//     </div>
//     <div className="progress mb-3">
//       <div className="progress-bar bg-primary" role="progressbar" style={{ width: '78.57%' }}></div>
//     </div>
    
//     <div className="d-flex justify-content-between mb-2">
//       <span>8 PARTIAL</span>
//       <span>7.14%</span>
//     </div>
//     <div className="progress mb-3">
//       <div className="progress-bar bg-info" role="progressbar" style={{ width: '7.14%' }}></div>
//     </div>
    
//     <div className="d-flex justify-content-between mb-2">
//       <span>16 PAID</span>
//       <span>14.29%</span>
//     </div>
//     <div className="progress">
//       <div className="progress-bar bg-success" role="progressbar" style={{ width: '14.29%' }}></div>
//     </div>
//   </div>
// </div>;

// function AccountantDashboard() {
//   return (
//     <div className=' container'>
//       <h3>Accountant Dashboard</h3>
      
//       {/* Top Summary Cards */}
//       <div className="row mt-4 mb-4">
//         <div className="col-md-4">
//           <div className="card p-3 shadow-sm">
//             <div className="d-flex align-items-center">
//               <i className="bi bi-cash me-2" style={{ fontSize: '1.5rem' }}></i>
//               <div>
//                 <h6 className="mb-0">Fees Awaiting Payment</h6>
//                 <p className="mb-0 fw-bold">16/112</p>
//                 <div className="progress mt-2" style={{ height: '4px' }}>
//                   <div className="progress-bar bg-primary" role="progressbar" style={{ width: '14.29%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="col-md-4">
//           <div className="card p-3 shadow-sm">
//             <div className="d-flex align-items-center">
//               <i className="bi bi-clipboard-check me-2" style={{ fontSize: '1.5rem' }}></i>
//               <div>
//                 <h6 className="mb-0">Staff Present Today</h6>
//                 <p className="mb-0 fw-bold">0/10</p>
//                 <div className="progress mt-2" style={{ height: '4px' }}>
//                   <div className="progress-bar bg-secondary" role="progressbar" style={{ width: '0%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="col-md-4">
//           <div className="card p-3 shadow-sm">
//             <div className="d-flex align-items-center">
//               <i className="bi bi-people me-2" style={{ fontSize: '1.5rem' }}></i>
//               <div>
//                 <h6 className="mb-0">Student Present Today</h6>
//                 <p className="mb-0 fw-bold">26/66</p>
//                 <div className="progress mt-2" style={{ height: '4px' }}>
//                   <div className="progress-bar bg-warning" role="progressbar" style={{ width: '39.39%' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Dashboard Grid */}
//       <div className="row g-4">
//         {/* Left Column - Charts */}
//         <div className="col-lg-8">
//           <div className="row g-4">
//             <div className="col-12">
//               <Chart 
//                 title="Fees Collection & Expenses For December 2025" 
//                 type="Bar Line"
//               />
//             </div>
            
//             <div className="col-12">
//               <Chart 
//                 title="Fees Collection & Expenses For Session 2025-26" 
//                 type="Line"
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Right Column - Charts and Overview */}
//         <div className="col-lg-4">
//           <div className="row g-4">
//             <div className="col-12">
//               <DonutChart 
//                 title="Income - December 2025" 
//                 categories={['Donation', 'Rent', 'Miscellaneous', 'Book Sale', 'Uniform Sale']}
//               />
//             </div>
            
//             <div className="col-12">
//               <DonutChart 
//                 title="Expense - December 2025" 
//                 categories={['Stationery Purchase', 'Electricity Bill', 'Telephone Bill', 'Miscellaneous', 'Flower']}
//               />
//             </div>
            
//             <div className="col-12">
//               <FeesOverviewCard />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountantDashboard;



import React from 'react';

// ================================
// Placeholder Chart Components
// ================================

// --- Bar + Line Combo Chart for Daily Fees/Expenses ---
// --- Bar + Line Combo Chart for Daily Fees/Expenses ---
const DailyFeesExpensesChart = () => {
  // This represents the "Fees Collection & Expenses For December 2025" chart
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const feesData = [3500, 5000, 800, 0, 700, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const expensesData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="card p-3 shadow-sm h-100 w-100">
      <h5>Fees Collection & Expenses For December 2025</h5>
      <div className="mt-3" style={{ height: '250px', position: 'relative' }}>
        {/* Y-Axis Labels */}
        <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.8rem' }}>
          <span>0</span><span>1000</span><span>2000</span><span>3000</span><span>4000</span><span>5000</span><span>6000</span>
        </div>

        {/* Chart Area - Fixed Layout */}
        <div 
          className="d-flex align-items-end" 
          style={{ 
            height: '180px', 
            gap: '0', 
            padding: '0 10px', 
            overflowX: 'hidden',
            backgroundColor: '#f8f9fa'
          }}
        >
          {days.map((day, idx) => (
            <div 
              key={day} 
              className="d-flex flex-column align-items-center" 
              style={{ 
                flex: '1 1 auto', 
                minWidth: '12px',
                maxWidth: '20px',
                textAlign: 'center'
              }}
            >
              <div 
                style={{
                  width: '8px',
                  backgroundColor: feesData[idx] > 0 ? '#4CAF50' : '#FFC107',
                  height: `${Math.min(feesData[idx] / 100, 180)}px`,
                  marginBottom: '2px',
                  borderRadius: '2px 2px 0 0'
                }}
              ></div>
              <small>{day}</small>
            </div>
          ))}
        </div>

        <div className="mt-2 text-center" style={{ fontSize: '0.8rem', color: '#666' }}>
          Days of December 2025
        </div>
      </div>
    </div>
  );
};

// --- Donut Chart for Income ---
const IncomeDonutChart = () => {
  const categories = [
    { name: 'Donation', value: 25, color: '#4CAF50' },
    { name: 'Rent', value: 15, color: '#FFC107' },
    { name: 'Miscellaneous', value: 30, color: '#00BCD4' },
    { name: 'Book Sale', value: 10, color: '#9E9E9E' },
    { name: 'Uniform Sale', value: 20, color: '#795548' }
  ];

  return (
    <div className="card p-3 shadow-sm h-100">
      <h5>Income - December 2025</h5>
      <div className="mt-3" style={{ height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Legend */}
        <div className="d-flex flex-wrap justify-content-center mb-3">
          {categories.map(cat => (
            <div key={cat.name} className="d-flex align-items-center me-3 mb-2">
              <div style={{ width: '15px', height: '15px', backgroundColor: cat.color, marginRight: '5px' }}></div>
              <span style={{ fontSize: '0.8rem' }}>{cat.name}</span>
            </div>
          ))}
        </div>
        
        {/* Semi-Circle Donut */}
        <div style={{ 
          width: '180px', 
          height: '90px', 
          borderRadius: '90px 90px 0 0', 
          backgroundColor: '#f8f9fa', 
          position: 'relative',
          overflow: 'hidden'
        }}>
          {categories.reduce((acc, cat, index) => {
            const startAngle = acc.start;
            const endAngle = startAngle + (cat.value / 100) * 180;
            const transform = `rotate(${startAngle}deg)`;
            const clipPath = `polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`;
            
            return {
              start: endAngle,
              elements: [...acc.elements, (
                <div 
                  key={cat.name}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    clipPath: clipPath,
                    transform: transform,
                    transformOrigin: 'bottom center',
                    backgroundColor: cat.color,
                    border: '2px solid white'
                  }}
                />
              )]
            };
          }, { start: 0, elements: [] }).elements}
        </div>
      </div>
    </div>
  );
};

// --- Line Chart for Session Fees/Expenses ---
const SessionFeesExpensesChart = () => {
  const months = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
  const feesData = [28000, 5000, 7000, 6500, 6000, 5500, 6000, 7000, 10000, 3000, 2000, 1000];
  const expensesData = [1000, 800, 1200, 900, 1100, 1300, 1500, 1800, 2000, 1500, 1200, 1000];

  return (
  <div className="card p-3 shadow-sm h-100">
  <h5>Fees Collection & Expenses For Session 2025-26</h5>
  <div className="mt-3" style={{ height: '250px', position: 'relative' }}>
    {/* Y-Axis Labels */}
    <div className="d-flex flex-column" style={{ position: 'absolute', left: '0', top: '0', bottom: '0', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0 5px' }}>
      <span>30000</span>
      <span>20000</span>
      <span>10000</span>
      <span>0</span>
    </div>
    
    {/* Chart Area - Combined Bar + Line */}
    <div 
      style={{ 
        marginLeft: '40px', 
        height: '180px', 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: '10px',
        position: 'relative',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }}
    >
      {months.map((month, idx) => (
        <div 
          key={month} 
          className="d-flex flex-column align-items-center" 
          style={{ 
            flex: '1 1 auto', 
            minWidth: '20px',
            textAlign: 'center'
          }}
        >
          {/* Fee Bar */}
          <div 
            style={{
              width: '10px',
              height: `${feesData[idx] / 300}px`,
              backgroundColor: '#4CAF50',
              marginBottom: '2px',
              borderRadius: '2px 2px 0 0'
            }}
          ></div>

          {/* Expense Line Point */}
          <div 
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#FF5722',
              marginBottom: '2px',
              transform: `translateY(-${expensesData[idx] / 20}px)`
            }}
          ></div>

          <small>{month}</small>
        </div>
      ))}
    </div>

    {/* X-Axis Label */}
    <div className="mt-2 text-center" style={{ fontSize: '0.8rem', color: '#666' }}>
      Months of Session 2025-26
    </div>
  </div>
</div>
  );
};

// --- Donut Chart for Expenses ---
const ExpenseDonutChart = () => {
  const categories = [
    { name: 'Stationery Purchase', value: 20, color: '#9C27B0' },
    { name: 'Electricity Bill', value: 25, color: '#2196F3' },
    { name: 'Telephone Bill', value: 15, color: '#FF9800' },
    { name: 'Miscellaneous', value: 30, color: '#795548' },
    { name: 'Flower', value: 10, color: '#9E9E9E' }
  ];

  return (
    <div className="card p-3 shadow-sm h-100">
      <h5>Expense - December 2025</h5>
      <div className="mt-3" style={{ height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Legend */}
        <div className="d-flex flex-wrap justify-content-center mb-3">
          {categories.map(cat => (
            <div key={cat.name} className="d-flex align-items-center me-3 mb-2">
              <div style={{ width: '15px', height: '15px', backgroundColor: cat.color, marginRight: '5px' }}></div>
              <span style={{ fontSize: '0.8rem' }}>{cat.name}</span>
            </div>
          ))}
        </div>
        
        {/* Semi-Circle Donut */}
        <div style={{ 
          width: '180px', 
          height: '90px', 
          borderRadius: '90px 90px 0 0', 
          backgroundColor: '#f8f9fa', 
          position: 'relative',
          overflow: 'hidden'
        }}>
          {categories.reduce((acc, cat, index) => {
            const startAngle = acc.start;
            const endAngle = startAngle + (cat.value / 100) * 180;
            const transform = `rotate(${startAngle}deg)`;
            const clipPath = `polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`;
            
            return {
              start: endAngle,
              elements: [...acc.elements, (
                <div 
                  key={cat.name}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    clipPath: clipPath,
                    transform: transform,
                    transformOrigin: 'bottom center',
                    backgroundColor: cat.color,
                    border: '2px solid white'
                  }}
                />
              )]
            };
          }, { start: 0, elements: [] }).elements}
        </div>
      </div>
    </div>
  );
};

// --- Fees Overview Card ---
const FeesOverviewCard = () => {
  const overviewData = [
    { status: 'UNPAID', count: 88, percentage: 78.57, color: 'bg-primary' },
    { status: 'PARTIAL', count: 8, percentage: 7.14, color: 'bg-info' },
    { status: 'PAID', count: 16, percentage: 14.29, color: 'bg-success' }
  ];

  return (
    <div className="card p-3 shadow-sm">
      <h5>Fees Overview</h5>
      <div className="mt-3">
        {overviewData.map((item, index) => (
          <div key={item.status} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span>{item.count} {item.status}</span>
              <span>{item.percentage.toFixed(2)}%</span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div 
                className={`progress-bar ${item.color}`} 
                role="progressbar" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ================================
// Main Dashboard Component
// ================================

function AccountantDashboard() {
  return (
    <>
      <h3>Accountant Dashboard</h3>
      
      {/* Top Summary Cards */}
      <div className="row mt-4 mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-cash me-2" style={{ fontSize: '1.5rem' }}></i>
              <div>
                <h6 className="mb-0">Fees Awaiting Payment</h6>
                <p className="mb-0 fw-bold">16/112</p>
                <div className="progress mt-2" style={{ height: '4px' }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '14.29%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-clipboard-check me-2" style={{ fontSize: '1.5rem' }}></i>
              <div>
                <h6 className="mb-0">Staff Present Today</h6>
                <p className="mb-0 fw-bold">0/10</p>
                <div className="progress mt-2" style={{ height: '4px' }}>
                  <div className="progress-bar bg-secondary" role="progressbar" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <i className="bi bi-people me-2" style={{ fontSize: '1.5rem' }}></i>
              <div>
                <h6 className="mb-0">Student Present Today</h6>
                <p className="mb-0 fw-bold">26/66</p>
                <div className="progress mt-2" style={{ height: '4px' }}>
                  <div className="progress-bar bg-warning" role="progressbar" style={{ width: '39.39%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="row g-4">
        {/* Left Column - Charts */}
        <div className="col-lg-8">
          <div className="row g-4">
            <div className="col-12">
              <DailyFeesExpensesChart />
            </div>
            
            <div className="col-12">
              <SessionFeesExpensesChart />
            </div>
          </div>
        </div>
        
        {/* Right Column - Charts and Overview */}
        <div className="col-lg-4">
          <div className="row g-4">
            <div className="col-12">
              <IncomeDonutChart />
            </div>
            
            <div className="col-12">
              <ExpenseDonutChart />
            </div>
            
            <div className="col-12">
              <FeesOverviewCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountantDashboard;
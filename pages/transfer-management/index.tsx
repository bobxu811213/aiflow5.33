import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingTab from './onboarding';
import RegularizationTab from './regularization';
import TransferTab from './transfer';
import ResignationTab from './resignation';
import TransferRecordsTab from './transfer-records';

const TransferManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('onboarding');
  const [isDetailView, setIsDetailView] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { label: '入职', key: 'onboarding' },
    { label: '转正', key: 'regularization' },
    { label: '调动', key: 'transfer' },
    { label: '离职', key: 'resignation' },
    { label: '异动记录', key: 'records' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'onboarding': return <OnboardingTab />;
      case 'regularization': return <RegularizationTab />;
      case 'transfer': return <TransferTab onDetailViewToggle={setIsDetailView} />;
      case 'resignation': return <ResignationTab onDetailViewToggle={setIsDetailView} />;
      case 'records': return <TransferRecordsTab />;
      default: return <OnboardingTab />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Main Tabs */}
      {!isDetailView && (
        <div className="bg-white border-b border-gray-200 px-6 flex justify-between items-center">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`${
                  activeTab === tab.key
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
             {activeTab === 'onboarding' && (
               <>
                 <button 
                   onClick={() => navigate('/transfer-management/registration-forms')}
                   className="bg-white border border-gray-300 text-teal-600 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap"
                 >
                   入职登记表(6)
                 </button>
                 <button className="bg-white border border-gray-300 text-teal-600 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">入职审批(1)</button>
                 <button className="bg-white border border-gray-300 text-teal-600 px-3 py-1.5 rounded text-sm hover:bg-gray-50 whitespace-nowrap">历史入职审批(1)</button>
               </>
             )}
          </div>
        </div>
      )}

      {/* Content Area */}
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        {renderContent()}
      </Suspense>
    </div>
  );
};

export default TransferManagementPage;

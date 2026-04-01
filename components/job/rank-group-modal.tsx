import React, { useState } from 'react';
import { X, ChevronDown, Plus, Search, ChevronRight, Trash2, ChevronUp } from 'lucide-react';
import { Modal } from '../ui/modal';

interface RankGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RankItem {
  id: string;
  name: string;
}

export const RankGroupModal: React.FC<RankGroupModalProps> = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [sequence, setSequence] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [ranks, setRanks] = useState<RankItem[]>([]);

  const handleAddRank = () => {
    setRanks([...ranks, { id: Date.now().toString(), name: '' }]);
  };

  const handleDeleteRank = (id: string) => {
    setRanks(ranks.filter(rank => rank.id !== id));
  };

  const handleRankChange = (id: string, value: string) => {
    setRanks(ranks.map(rank => rank.id === id ? { ...rank, name: value } : rank));
  };

  const handleMoveRank = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === ranks.length - 1) return;

    const newRanks = [...ranks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newRanks[index], newRanks[targetIndex]] = [newRanks[targetIndex], newRanks[index]];
    setRanks(newRanks);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="创建分组"
      width="w-[800px]"
      className="h-[700px]"
      footer={
        <>
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            className="px-4 py-2 bg-[#13A695] text-white rounded text-sm hover:bg-[#13A695]/90 transition-colors"
          >
            确定
          </button>
        </>
      }
    >
      <div className="flex flex-col h-full">
        {/* Header Tabs - Visual Only now, or removed? User said "put in one page". 
            I will keep a simple header or just remove the tabs and use section headers.
            The screenshot showed "Basic Info" and "Details (1)" at the top, but maybe that was the *before* state or a *nav* state?
            "Details and Basic Information should not be separated into two tab pages, put them in one page" implies a single scrollable view.
            I will use the section headers to distinguish them.
        */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-6 px-2">
           <div className="py-2 text-sm font-medium text-[#13A695] border-b-2 border-[#13A695]">
             基础信息
           </div>
           <div className="py-2 text-sm font-medium text-gray-600">
             明细 {ranks.length > 0 && `(${ranks.length})`}
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-8 px-2 pb-4">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <div className="w-1 h-4 bg-[#13A695] rounded-full"></div>
              基础信息
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="flex items-center">
                <label className="w-24 text-sm text-gray-600 text-right mr-4">
                  <span className="text-red-500 mr-1">*</span>
                  分组名称：
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#13A695]"
                  placeholder="请输入"
                />
              </div>

              <div className="flex items-center">
                <label className="w-24 text-sm text-gray-600 text-right mr-4">
                  是否启用：
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={isEnabled}
                      onChange={() => setIsEnabled(true)}
                      className="text-[#13A695] focus:ring-[#13A695]"
                    />
                    <span className="text-sm text-gray-600">启用</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!isEnabled}
                      onChange={() => setIsEnabled(false)}
                      className="text-[#13A695] focus:ring-[#13A695]"
                    />
                    <span className="text-sm text-gray-600">禁用</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <label className="w-24 text-sm text-gray-600 text-right mr-4">
                  <span className="text-red-500 mr-1">*</span>
                  适用序列：
                </label>
                <div className="flex-1 relative">
                  <select
                    value={sequence}
                    onChange={(e) => setSequence(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#13A695] appearance-none bg-white pr-8"
                  >
                    <option value="">请选择</option>
                    <option value="tech">技术序列</option>
                    <option value="market">营销序列</option>
                    <option value="product">产品序列</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <div className="w-1 h-4 bg-[#13A695] rounded-full"></div>
              明细 {ranks.length > 0 && `(${ranks.length})`}
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-900 font-medium cursor-pointer">
                  <span>1级职级(不含子职级)</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                <button 
                  className="px-3 py-1.5 border border-[#13A695] text-[#13A695] rounded text-sm hover:bg-[#13A695]/10 transition-colors"
                  onClick={handleAddRank}
                >
                  添加职级
                </button>
              </div>
              
              <div className="bg-gray-50 px-4 py-2 text-sm text-gray-500 border-b border-gray-200 flex items-center">
                <span className="text-red-500 mr-1">*</span>
                职级
              </div>

              {ranks.length === 0 ? (
                <div className="bg-white p-12 flex flex-col items-center justify-center text-gray-400 min-h-[200px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search size={32} className="text-gray-300" />
                  </div>
                  <span className="text-sm">没有搜索到数据</span>
                </div>
              ) : (
                <div className="bg-white">
                  {ranks.map((rank, index) => (
                    <div key={rank.id} className="px-4 py-3 border-b border-gray-100 flex items-center gap-4 hover:bg-gray-50">
                      <input
                        type="text"
                        value={rank.name}
                        onChange={(e) => handleRankChange(rank.id, e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#13A695]"
                        placeholder="请输入职级名称"
                      />
                      <div className="flex items-center gap-2 text-gray-400">
                        <button 
                          className="p-1 hover:text-[#13A695] transition-colors"
                          onClick={() => handleDeleteRank(rank.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                        <button 
                          className={`p-1 hover:text-[#13A695] transition-colors ${index === ranks.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                          onClick={() => handleMoveRank(index, 'down')}
                          disabled={index === ranks.length - 1}
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button 
                          className={`p-1 hover:text-[#13A695] transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                          onClick={() => handleMoveRank(index, 'up')}
                          disabled={index === 0}
                        >
                          <ChevronUp size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

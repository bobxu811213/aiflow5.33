
import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronRight, X, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalaryAnalysisCardProps {
    sectionNumber?: string | number;
    initialFilters?: {
        rankId: string;
        locationId: string;
        tenureStart: string;
        tenureEnd: string;
    };
}

export const SalaryAnalysisCard: React.FC<SalaryAnalysisCardProps> = ({ sectionNumber, initialFilters }) => {
    // Mock data for the chart
    const salaryData = [
        { date: '2022-10', value: 8500 },
        { date: '2022-12', value: 9800 },
        { date: '2023-06', value: 10500 },
        { date: '2024-06', value: 15000 },
    ];

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterValues, setFilterValues] = useState(initialFilters || {
        rankId: '',
        locationId: '',
        tenureStart: '',
        tenureEnd: ''
    });
    const filterRef = useRef<HTMLDivElement>(null);

    // Mock options
    const rankOptions = ['P1', 'P2', 'P3', 'M1', 'M2'];
    const locationOptions = ['北京', '上海', '深圳', '杭州'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };

        if (isFilterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen]);

    const formatYAxis = (value: number) => {
        if (value >= 10000) {
            return `${(value / 10000).toFixed(2)}万`;
        }
        return value.toString();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-l-4 border-[#13A695] pl-3">
                <h3 className="font-bold text-gray-800 text-base">
                    薪酬数据
                </h3>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column */}
                <div className="w-full lg:w-1/3 space-y-4">
                    {/* Current Salary Card */}
                    <div className="bg-[#F0F7FF] rounded-lg p-6">
                        <div className="text-gray-500 text-sm mb-2">当前薪酬/月</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-medium text-gray-900">15000</span>
                            <span className="text-gray-500">元</span>
                        </div>
                    </div>

                    {/* Percentile Card */}
                    <div className="border border-gray-100 rounded-lg p-6 relative">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-gray-600 text-sm">职位年薪收入分位值</span>
                            <button 
                                onClick={() => setIsFilterOpen(true)}
                                className="flex items-center gap-1 text-gray-500 text-xs border border-gray-200 rounded px-2 py-1 hover:bg-gray-50 transition-colors"
                            >
                                <Filter size={12} />
                                筛选
                            </button>
                        </div>

                        {/* Filter Popup - Modal */}
                        {isFilterOpen && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center">
                                {/* Backdrop */}
                                <div 
                                    className="absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity" 
                                    onClick={() => setIsFilterOpen(false)}
                                ></div>
                                
                                {/* Modal Content */}
                                <div 
                                    ref={filterRef} 
                                    className="relative z-10 w-[360px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 animate-in fade-in zoom-in-95 duration-200"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-gray-800 text-lg">筛选</h3>
                                        {/* Close button is optional as we have Cancel, but good for UX */}
                                    </div>
                                    
                                    <div className="space-y-5">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700">职级ID：</label>
                                            <div className="relative">
                                                <select 
                                                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 appearance-none bg-white focus:outline-none focus:border-[#13A695] focus:ring-1 focus:ring-[#13A695] text-gray-700 transition-shadow"
                                                    value={filterValues.rankId}
                                                    onChange={(e) => setFilterValues({...filterValues, rankId: e.target.value})}
                                                >
                                                    <option value="">请选择</option>
                                                    {rankOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700">工作地点ID：</label>
                                            <div className="relative">
                                                <select 
                                                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 appearance-none bg-white focus:outline-none focus:border-[#13A695] focus:ring-1 focus:ring-[#13A695] text-gray-700 transition-shadow"
                                                    value={filterValues.locationId}
                                                    onChange={(e) => setFilterValues({...filterValues, locationId: e.target.value})}
                                                >
                                                    <option value="">请选择</option>
                                                    {locationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700">历史工龄：</label>
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="text" 
                                                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#13A695] focus:ring-1 focus:ring-[#13A695] transition-shadow"
                                                    value={filterValues.tenureStart}
                                                    onChange={(e) => setFilterValues({...filterValues, tenureStart: e.target.value})}
                                                />
                                                <span className="text-gray-400 font-medium">-</span>
                                                <input 
                                                    type="text" 
                                                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#13A695] focus:ring-1 focus:ring-[#13A695] transition-shadow"
                                                    value={filterValues.tenureEnd}
                                                    onChange={(e) => setFilterValues({...filterValues, tenureEnd: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-50">
                                        <button 
                                            onClick={() => setIsFilterOpen(false)}
                                            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            取消
                                        </button>
                                        <button 
                                            onClick={() => setFilterValues({ rankId: '', locationId: '', tenureStart: '', tenureEnd: '' })}
                                            className="px-4 py-2 text-sm text-[#13A695] border border-[#13A695] rounded-lg hover:bg-[#E6F8F6] transition-colors"
                                        >
                                            清空
                                        </button>
                                        <button 
                                            onClick={() => setIsFilterOpen(false)}
                                            className="px-4 py-2 text-sm text-white bg-[#13A695] rounded-lg hover:bg-[#0E8F7F] shadow-sm hover:shadow transition-all"
                                        >
                                            确定
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Progress Bar */}
                        <div className="relative mb-2 pt-6">
                            {/* Tooltip */}
                            <div 
                                className="absolute -top-2 left-[75%] -translate-x-1/2 bg-white border border-gray-200 shadow-sm text-xs px-2 py-1 rounded text-gray-600 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-white after:border-t-[6px] z-10"
                            >
                                75分位
                            </div>
                            
                            {/* Bar Track */}
                            <div className="h-2 bg-gray-100 rounded-full w-full relative">
                                {/* Active Bar */}
                                <div className="absolute left-0 top-0 h-full bg-[#3B82F6] rounded-full w-[75%]"></div>
                                {/* Thumb */}
                                <div className="absolute left-[75%] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#3B82F6] border-2 border-white rounded-full shadow-sm"></div>
                            </div>
                            
                            {/* Labels */}
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                                <span>低</span>
                                <span>中</span>
                                <span>高</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-1">
                            <div className="text-sm text-gray-600">
                                员工近一年收入 <span className="text-xl font-medium text-gray-900 mx-1">18</span> 万元
                            </div>
                            <div className="text-sm text-gray-500">在公司同职位薪酬体系中位置</div>
                            <div className="text-xl font-medium text-[#FAAD14] mt-2">较高</div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-2/3">
                    {/* Summary Banner */}
                    <div className="bg-gray-50 rounded-lg py-3 px-4 mb-6 text-sm text-gray-600">
                        近2年薪资调整了 <span className="text-[#3B82F6] font-medium mx-1">4</span> 次
                    </div>

                    {/* Chart Legend */}
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-2 h-2 rounded-full border border-[#3B82F6]"></span>
                            合计
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salaryData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={true} 
                                    tickLine={true} 
                                    tick={{ fontSize: 12, fill: '#6B7280' }} 
                                    dy={10}
                                    angle={45}
                                    textAnchor="start"
                                    stroke="#E5E7EB"
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: '#6B7280' }} 
                                    tickFormatter={formatYAxis}
                                    domain={[0, 15000]}
                                    ticks={[0, 3000, 6000, 9000, 12000, 15000]}
                                    width={50}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    formatter={(value: number) => [`${value}元`, '合计']}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#3B82F6" 
                                    fillOpacity={1} 
                                    fill="url(#colorSalary)" 
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: "white", stroke: "#3B82F6", strokeWidth: 2 }}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

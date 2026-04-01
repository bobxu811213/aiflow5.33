
import React, { useState } from 'react';
import { Check, Sparkles, ChevronDown } from 'lucide-react';

interface AnalysisScopeSelectorProps {
    data: any;
    onAnalyze: (selectedScopes: string[], timeRange?: string, salaryFilters?: any, talentModes?: string[], talentOptions?: { timelineTimeRange: string, gridScheme: string }) => void;
}

export const AnalysisScopeSelector: React.FC<AnalysisScopeSelectorProps> = ({ data, onAnalyze }) => {
    const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
    const [attendanceTimeRange, setAttendanceTimeRange] = useState<string>('本季度');
    const [talentModes, setTalentModes] = useState<string[]>(['timeline']); // Default to timeline
    const [salaryFilters, setSalaryFilters] = useState({
        rankId: '',
        locationId: '',
        tenureStart: '',
        tenureEnd: ''
    });
    
    const [timelineTimeRange, setTimelineTimeRange] = useState('全部');
    const [gridScheme, setGridScheme] = useState('绩效-能力盘点方案');

    const [isGridSchemeOpen, setIsGridSchemeOpen] = useState(false);

    const timelineTimeOptions = ['本年度', '上年度', '近2年', '近3年', '全部'];
    const gridSchemeOptions = ['绩效-能力盘点方案', '潜力-绩效盘点方案', '价值观-业绩盘点方案', '绩效-职级盘点方案'];

    const scopes = [
        { id: 'basic', label: '基础信息' },
        { id: 'attendance', label: '考勤汇总' },
        { id: 'experience', label: '工作经历' },
        { id: 'talent', label: '人才盘点' },
        { id: 'salary', label: '薪酬数据' }
    ];

    const timeOptions = ['本年度', '上年度', '本月', '上月', '本季度', '上季度'];
    const rankOptions = ['P1', 'P2', 'P3', 'M1', 'M2'];
    const locationOptions = ['北京', '上海', '深圳', '杭州'];

    const toggleScope = (id: string) => {
        if (selectedScopes.includes(id)) {
            setSelectedScopes(selectedScopes.filter(s => s !== id));
        } else {
            setSelectedScopes([...selectedScopes, id]);
        }
    };

    const toggleTalentMode = (mode: string) => {
        if (talentModes.includes(mode)) {
            setTalentModes(talentModes.filter(m => m !== mode));
        } else {
            setTalentModes([...talentModes, mode]);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-[320px] my-2">
            <div className="bg-gradient-to-r from-[#13A695] to-[#0E8F7F] p-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={16} className="text-white/90" />
                    <h3 className="font-bold text-sm">AI 深度分析助手</h3>
                </div>
                <p className="text-xs text-white/80">请选择您需要分析的维度，AI将为您生成综合报告。</p>
            </div>
            
            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">分析范围</div>
                    <div 
                        onClick={() => {
                            if (selectedScopes.length === scopes.length) {
                                setSelectedScopes([]);
                            } else {
                                setSelectedScopes(scopes.map(s => s.label));
                            }
                        }}
                        className="flex items-center gap-1.5 cursor-pointer group"
                    >
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                            selectedScopes.length === scopes.length
                            ? 'bg-[#13A695] border-[#13A695]'
                            : 'border-gray-300 bg-white group-hover:border-[#13A695]'
                        }`}>
                            {selectedScopes.length === scopes.length && <Check size={10} className="text-white" />}
                        </div>
                        <span className="text-xs text-gray-500 group-hover:text-[#13A695]">全选</span>
                    </div>
                </div>
                <div className="space-y-2">
                    {scopes.map(scope => (
                        <div key={scope.id}>
                            <div 
                                onClick={() => toggleScope(scope.label)}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                    selectedScopes.includes(scope.label) 
                                    ? 'border-[#13A695] bg-[#E6F8F6]' 
                                    : 'border-gray-200 hover:border-[#13A695]/50 hover:bg-gray-50'
                                }`}
                            >
                                <span className={`text-sm ${selectedScopes.includes(scope.label) ? 'font-medium text-[#13A695]' : 'text-gray-700'}`}>
                                    {scope.label}
                                </span>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                    selectedScopes.includes(scope.label)
                                    ? 'bg-[#13A695] border-[#13A695]'
                                    : 'border-gray-300 bg-white'
                                }`}>
                                    {selectedScopes.includes(scope.label) && <Check size={12} className="text-white" />}
                                </div>
                            </div>
                            
                            {/* Time Range Selector for Attendance */}
                            {scope.label === '考勤汇总' && selectedScopes.includes('考勤汇总') && (
                                <div className="mt-2 ml-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                    <div className="flex flex-wrap gap-2">
                                        {timeOptions.map(option => (
                                            <button
                                                key={option}
                                                onClick={() => setAttendanceTimeRange(option)}
                                                className={`text-xs px-2 py-1 rounded border transition-colors ${
                                                    attendanceTimeRange === option
                                                    ? 'bg-[#13A695] text-white border-[#13A695]'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#13A695]/50'
                                                }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Talent Review Modes */}
                            {scope.label === '人才盘点' && selectedScopes.includes('人才盘点') && (
                                <div className="mt-2 ml-4 animate-in slide-in-from-top-2 fade-in duration-200 space-y-3">
                                    <div className="space-y-2">
                                        <div 
                                            onClick={() => toggleTalentMode('timeline')}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                talentModes.includes('timeline')
                                                ? 'bg-[#13A695] border-[#13A695]'
                                                : 'border-gray-300 bg-white'
                                            }`}>
                                                {talentModes.includes('timeline') && <Check size={10} className="text-white" />}
                                            </div>
                                            <span className="text-xs text-gray-600">时间轴模式</span>
                                        </div>
                                        {talentModes.includes('timeline') && (
                                            <div className="ml-6 flex flex-wrap gap-1.5">
                                                {timelineTimeOptions.map(option => (
                                                    <button
                                                        key={option}
                                                        onClick={() => setTimelineTimeRange(option)}
                                                        className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                                                            timelineTimeRange === option
                                                            ? 'bg-[#13A695] text-white border-[#13A695]'
                                                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#13A695]/50'
                                                        }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <div 
                                            onClick={() => toggleTalentMode('grid')}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                talentModes.includes('grid')
                                                ? 'bg-[#13A695] border-[#13A695]'
                                                : 'border-gray-300 bg-white'
                                            }`}>
                                                {talentModes.includes('grid') && <Check size={10} className="text-white" />}
                                            </div>
                                            <span className="text-xs text-gray-600">宫格模式</span>
                                        </div>
                                        {talentModes.includes('grid') && (
                                            <div className="ml-6 relative">
                                                <button
                                                    onClick={() => setIsGridSchemeOpen(!isGridSchemeOpen)}
                                                    className="w-full flex items-center justify-between text-xs border border-gray-200 rounded px-2 py-1.5 bg-white hover:bg-gray-50 transition-colors text-gray-700"
                                                >
                                                    <span className="truncate">{gridScheme}</span>
                                                    <ChevronDown size={12} className="text-gray-400 flex-shrink-0 ml-1" />
                                                </button>
                                                
                                                {isGridSchemeOpen && (
                                                    <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-50 max-h-48 overflow-y-auto">
                                                        {gridSchemeOptions.map(opt => (
                                                            <div
                                                                key={opt}
                                                                onClick={() => {
                                                                    setGridScheme(opt);
                                                                    setIsGridSchemeOpen(false);
                                                                }}
                                                                className={`px-3 py-2 text-xs cursor-pointer transition-colors ${
                                                                    gridScheme === opt
                                                                    ? 'bg-[#E6F8F6] text-[#13A695]'
                                                                    : 'text-gray-700 hover:bg-gray-50'
                                                                }`}
                                                            >
                                                                {opt}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Salary Filters */}
                            {scope.label === '薪酬数据' && selectedScopes.includes('薪酬数据') && (
                                <div className="mt-2 ml-4 p-3 bg-gray-50 rounded-lg border border-gray-100 animate-in slide-in-from-top-2 fade-in duration-200 space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">职级ID</label>
                                        <div className="relative">
                                            <select 
                                                className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 appearance-none bg-white focus:outline-none focus:border-[#13A695] text-gray-700"
                                                value={salaryFilters.rankId}
                                                onChange={(e) => setSalaryFilters({...salaryFilters, rankId: e.target.value})}
                                            >
                                                <option value="">请选择</option>
                                                {rankOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">工作地点ID</label>
                                        <div className="relative">
                                            <select 
                                                className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 appearance-none bg-white focus:outline-none focus:border-[#13A695] text-gray-700"
                                                value={salaryFilters.locationId}
                                                onChange={(e) => setSalaryFilters({...salaryFilters, locationId: e.target.value})}
                                            >
                                                <option value="">请选择</option>
                                                {locationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-500">历史工龄</label>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="text" 
                                                className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#13A695]"
                                                value={salaryFilters.tenureStart}
                                                onChange={(e) => setSalaryFilters({...salaryFilters, tenureStart: e.target.value})}
                                            />
                                            <span className="text-gray-400">-</span>
                                            <input 
                                                type="text" 
                                                className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#13A695]"
                                                value={salaryFilters.tenureEnd}
                                                onChange={(e) => setSalaryFilters({...salaryFilters, tenureEnd: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button
                    onClick={() => onAnalyze(
                        selectedScopes, 
                        selectedScopes.includes('考勤汇总') ? attendanceTimeRange : undefined,
                        selectedScopes.includes('薪酬数据') ? salaryFilters : undefined,
                        selectedScopes.includes('人才盘点') ? talentModes : undefined,
                        selectedScopes.includes('人才盘点') ? { timelineTimeRange, gridScheme } : undefined
                    )}
                    disabled={selectedScopes.length === 0}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                        selectedScopes.length > 0
                        ? 'bg-[#13A695] text-white shadow-md hover:bg-[#0E8F7F] hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    <Sparkles size={16} />
                    开始智能分析 ({selectedScopes.length})
                </button>
            </div>
        </div>
    );
};

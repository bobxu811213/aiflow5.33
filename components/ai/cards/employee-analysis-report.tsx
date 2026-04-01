import React from 'react';
import { History, Target, TrendingUp, Activity, User, Briefcase, BrainCircuit, Calendar, Clock, AlertCircle, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import { WorkExperienceTimeline } from './work-experience-timeline';
import { TalentReviewTimeline } from './talent-review-timeline';
import { TalentReviewGrid } from './talent-review-grid';
import { SalaryAnalysisCard } from './salary-analysis-card';

export const EmployeeAnalysisReport = ({ data, onMilestoneClick }: { data: any, onMilestoneClick?: (item: any) => void }) => {
    const scopes = data.scopes || ['基础信息', '考勤汇总', '工作经历', '人才盘点', '薪酬数据'];
    const hasBasic = scopes.includes('基础信息');
    const hasAttendance = scopes.includes('考勤汇总');
    const hasWorkExp = scopes.includes('工作经历');
    const hasTalent = scopes.includes('人才盘点');
    const hasSalary = scopes.includes('薪酬数据');
    
    // Default to timeline if not specified but talent scope is selected
    const talentModes = data.talentModes || ['timeline'];
    const hasTalentTimeline = hasTalent && talentModes.includes('timeline');
    const hasTalentGrid = hasTalent && talentModes.includes('grid');

    // Time Range State
    const [timeRange, setTimeRange] = React.useState(data.timeRange || '本季度');
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = React.useState(false);
    const timeOptions = ['本年度', '上年度', '本月', '上月', '本季度', '上季度'];

    // Section numbering logic
    let sectionCounter = 0;
    const getSectionNumber = () => {
        sectionCounter++;
        const numbers = ['一', '二', '三', '四', '五'];
        return numbers[sectionCounter - 1] || sectionCounter;
    };

    // Mock Data Generator based on Time Range
    const getAttendanceData = (range: string) => {
        switch (range) {
            case '本年度':
                return {
                    metrics: { earlyLeave: 5, late: 2, absent: 120, leaveDays: 3 },
                    chartData: [
                        { date: '2023-01', workHours: 8.0, overtime: 0.5 },
                        { date: '2023-02', workHours: 8.2, overtime: 0.8 },
                        { date: '2023-03', workHours: 8.5, overtime: 1.2 },
                        { date: '2023-04', workHours: 8.1, overtime: 0.6 },
                        { date: '2023-05', workHours: 8.3, overtime: 0.9 },
                        { date: '2023-06', workHours: 8.0, overtime: 0.4 },
                        { date: '2023-07', workHours: 7.8, overtime: 0.2 },
                        { date: '2023-08', workHours: 8.4, overtime: 1.0 },
                        { date: '2023-09', workHours: 8.6, overtime: 1.5 },
                        { date: '2023-10', workHours: 8.2, overtime: 0.7 },
                        { date: '2023-11', workHours: 8.1, overtime: 0.5 },
                        { date: '2023-12', workHours: 8.0, overtime: 0.3 },
                    ]
                };
            case '上年度':
                return {
                    metrics: { earlyLeave: 8, late: 5, absent: 15, leaveDays: 5 },
                    chartData: [
                        { date: '2022-01', workHours: 7.9, overtime: 0.4 },
                        { date: '2022-02', workHours: 8.0, overtime: 0.6 },
                        { date: '2022-03', workHours: 8.3, overtime: 1.0 },
                        { date: '2022-04', workHours: 8.2, overtime: 0.8 },
                        { date: '2022-05', workHours: 8.1, overtime: 0.5 },
                        { date: '2022-06', workHours: 8.0, overtime: 0.3 },
                        { date: '2022-07', workHours: 7.8, overtime: 0.2 },
                        { date: '2022-08', workHours: 8.4, overtime: 1.1 },
                        { date: '2022-09', workHours: 8.7, overtime: 1.6 },
                        { date: '2022-10', workHours: 8.1, overtime: 0.6 },
                        { date: '2022-11', workHours: 8.0, overtime: 0.4 },
                        { date: '2022-12', workHours: 7.9, overtime: 0.2 },
                    ]
                };
            case '本月':
                return {
                    metrics: { earlyLeave: 0, late: 0, absent: 0, leaveDays: 0 },
                    chartData: [
                        { date: '01', workHours: 8.0, overtime: 0.2 },
                        { date: '02', workHours: 8.1, overtime: 0.3 },
                        { date: '03', workHours: 8.0, overtime: 0 },
                        { date: '04', workHours: 8.2, overtime: 0.5 },
                        { date: '05', workHours: 8.0, overtime: 0.1 },
                        { date: '06', workHours: 8.3, overtime: 0.6 },
                        { date: '07', workHours: 8.0, overtime: 0.2 },
                        { date: '08', workHours: 8.1, overtime: 0.3 },
                        { date: '09', workHours: 8.0, overtime: 0 },
                        { date: '10', workHours: 8.2, overtime: 0.4 },
                    ]
                };
            case '上月':
                return {
                    metrics: { earlyLeave: 1, late: 0, absent: 1, leaveDays: 1 },
                    chartData: [
                        { date: '01', workHours: 7.9, overtime: 0.1 },
                        { date: '05', workHours: 8.0, overtime: 0.2 },
                        { date: '10', workHours: 8.2, overtime: 0.5 },
                        { date: '15', workHours: 8.1, overtime: 0.3 },
                        { date: '20', workHours: 8.3, overtime: 0.6 },
                        { date: '25', workHours: 8.0, overtime: 0.2 },
                        { date: '30', workHours: 8.1, overtime: 0.4 },
                    ]
                };
            case '本季度':
                return {
                    metrics: { earlyLeave: 1, late: 0, absent: 109, leaveDays: 0 },
                    chartData: [
                        { date: '2023-07', workHours: 0, overtime: 0 },
                        { date: '2023-08', workHours: 2, overtime: 0 },
                        { date: '2023-09', workHours: 8.5, overtime: 0 },
                        { date: '2023-10', workHours: 0, overtime: 0 },
                        { date: '2023-11', workHours: 0, overtime: 0 },
                    ]
                };
            case '上季度':
                return {
                    metrics: { earlyLeave: 2, late: 1, absent: 5, leaveDays: 2 },
                    chartData: [
                        { date: '2023-04', workHours: 8.1, overtime: 0.5 },
                        { date: '2023-05', workHours: 8.3, overtime: 0.8 },
                        { date: '2023-06', workHours: 8.0, overtime: 0.3 },
                    ]
                };
            default:
                return {
                    metrics: { earlyLeave: 0, late: 0, absent: 0, leaveDays: 0 },
                    chartData: []
                };
        }
    };

    const currentData = getAttendanceData(timeRange);

    // Extended Data for Trajectory (10 Years)
    const trajectoryData = [
        { id: 1, time: '2014 Q3', label: '校招入职', desc: '初级工程师', perf: 40, salary: 20, tag: { text: '潜力新人', color: 'blue' } },
        { id: 2, time: '2015 Q4', label: '首次调薪', desc: '年度绩效A', perf: 55, salary: 30, tag: null },
        { id: 3, time: '2016 Q3', label: '职级晋升', desc: '晋升中级', perf: 60, salary: 40, tag: { text: '职级晋升', color: 'purple' } },
        { id: 4, time: '2017 Q2', label: '骨干培训', desc: '入选青藤计划', perf: 65, salary: 45, tag: null },
        { id: 5, time: '2018 Q4', label: '技术突破', desc: '获得核心专利', perf: 75, salary: 55, tag: { text: '技术攻坚', color: 'orange' } },
        { id: 6, time: '2019 Q3', label: '职级晋升', desc: '晋升高级', perf: 78, salary: 65, tag: { text: '职级晋升', color: 'purple' } },
        { id: 7, time: '2020 Q2', label: '转岗PM', desc: '负责B端业务', perf: 70, salary: 70, tag: { text: '轮岗历练', color: 'blue' } },
        { id: 8, time: '2021 Q3', label: '业务爆发', desc: '千万级营收', perf: 85, salary: 80, tag: { text: '业绩突破', color: 'green' } },
        { id: 9, time: '2022 Q1', label: '获得 PMP', desc: '专业认证', perf: 88, salary: 82, tag: null },
        { id: 10, time: '2022 Q3', label: '连续S级', desc: '薪资普调', perf: 92, salary: 88, tag: { text: '持续高优', color: 'green' } },
        { id: 11, time: '2023 Q2', label: '职级晋升', desc: '晋升专家', perf: 94, salary: 95, tag: { text: '职级晋升', color: 'purple' } },
        { id: 12, time: '2024 Q1', label: '主导S级项目', desc: '行业标杆', perf: 96, salary: 98, tag: { text: '领军人物', color: 'orange' } },
        { id: 13, time: '现在', label: '合伙人提名', desc: '股权激励', perf: 98, salary: 100, tag: { text: '核心保留', color: 'red' } },
    ];

    const stepX = 180;
    const startX = 80;
    const chartHeight = 320;
    const chartWidth = Math.max(600, startX + (trajectoryData.length - 1) * stepX + 100);
    const baseY = 250;

    const getY = (val: number) => baseY - (val / 100) * 140;

    let perfPath = `M${startX},${getY(trajectoryData[0].perf)}`;
    trajectoryData.slice(1).forEach((pt, i) => {
        const prev = trajectoryData[i];
        const currX = startX + (i + 1) * stepX;
        const prevX = startX + i * stepX;
        const cp1x = prevX + (currX - prevX) / 2;
        const cp2x = prevX + (currX - prevX) / 2;
        perfPath += ` C${cp1x},${getY(prev.perf)} ${cp2x},${getY(pt.perf)} ${currX},${getY(pt.perf)}`;
    });

    const perfArea = `${perfPath} L${startX + (trajectoryData.length - 1) * stepX},${baseY} L${startX},${baseY} Z`;

    let salaryPath = `M${startX},${getY(trajectoryData[0].salary)}`;
    for(let i=0; i<trajectoryData.length - 1; i++) {
        const curr = trajectoryData[i];
        const next = trajectoryData[i+1];
        const x2 = startX + (i+1) * stepX;
        salaryPath += ` L${x2},${getY(curr.salary)} L${x2},${getY(next.salary)}`;
    }

    return (
        <div className="flex flex-col flex-1 bg-gray-50 overflow-hidden min-h-0">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#927FFF] to-[#6265F0] flex items-center justify-center text-white">
                        <BrainCircuit size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">员工详细分析报告</h2>
                        <p className="text-xs text-gray-500">基于AI深度分析生成的全方位人才画像</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors border border-gray-200">
                        导出PDF
                    </button>
                    <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-[#E16AF3] to-[#6265F0] hover:opacity-90 rounded-md transition-opacity shadow-sm">
                        分享报告
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
                {/* Basic Information Section */}
                {hasBasic && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-[#E6F7FF] to-[#F0F9FF] p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            <div className="relative flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden shrink-0">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=栗子&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold text-gray-900">{data.employeeName || '栗子'}</h2>
                                        <span className="text-gray-500 text-sm">GH006</span>
                                        <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded border border-green-200">在职</span>
                                    </div>
                                    <div className="text-gray-600 text-sm mb-3">上海新理想集团/SH中心/华东研发部</div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-[#FFF7E6] text-[#FA8C16] text-xs px-2 py-1 rounded">M5</span>
                                        <span className="bg-[#E6F7FF] text-[#1890FF] text-xs px-2 py-1 rounded">后端开发工程师</span>
                                        <span className="bg-[#E6FFFB] text-[#13C2C2] text-xs px-2 py-1 rounded">2.58年</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Basic Info Grid */}
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6 border-l-4 border-[#13A695] pl-3">
                                <h3 className="font-bold text-gray-900 text-base">基本信息</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <div>
                                    <div className="text-gray-500 text-xs mb-1.5">合同公司</div>
                                    <div className="text-gray-900 font-medium">上海新理想集团</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs mb-1.5">合同类型</div>
                                    <div className="text-gray-900 font-medium">-</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs mb-1.5">工作地点</div>
                                    <div className="text-gray-900 font-medium">上海</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs mb-1.5">员工类型</div>
                                    <div className="text-gray-900 font-medium">O类-操作</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs mb-1.5">最高学历</div>
                                    <div className="text-gray-900 font-medium">硕士</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs mb-1.5">入职日期</div>
                                    <div className="text-gray-900 font-medium">2020-07-01</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs mb-1.5">转正日期</div>
                                    <div className="text-gray-900 font-medium">-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Attendance Section */}
                {hasAttendance && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6 border-l-4 border-[#13A695] pl-3">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-800">考勤汇总</h3>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Header with Dropdown */}
                            <div className="flex items-center justify-between">
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        {timeRange}
                                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {isTimeDropdownOpen && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-10"
                                                onClick={() => setIsTimeDropdownOpen(false)}
                                            ></div>
                                            <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                                {timeOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => {
                                                            setTimeRange(option);
                                                            setIsTimeDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                                            timeRange === option ? 'text-[#13A695] font-medium bg-[#E6F8F6]' : 'text-gray-700'
                                                        }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-4 gap-4 bg-gray-50/50 p-6 rounded-lg">
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 mb-2">早退次数</div>
                                    <div className={`text-2xl font-medium ${currentData.metrics.earlyLeave > 0 ? 'text-[#13A695]' : 'text-gray-400'}`}>
                                        {currentData.metrics.earlyLeave}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 mb-2">迟到次数</div>
                                    <div className={`text-2xl font-medium ${currentData.metrics.late > 0 ? 'text-[#13A695]' : 'text-gray-400'}`}>
                                        {currentData.metrics.late}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 mb-2">缺勤天数</div>
                                    <div className={`text-2xl font-medium ${currentData.metrics.absent > 0 ? 'text-[#13A695]' : 'text-gray-400'}`}>
                                        {currentData.metrics.absent}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 mb-2">请假总天数</div>
                                    <div className={`text-2xl font-medium ${currentData.metrics.leaveDays > 0 ? 'text-[#13A695]' : 'text-gray-400'}`}>
                                        {currentData.metrics.leaveDays}
                                    </div>
                                </div>
                            </div>

                            {/* Charts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Work Hours Chart */}
                                <div>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <div className="w-2 h-2 rounded-full border-2 border-[#3B82F6]"></div>
                                        <span className="text-xs text-gray-600">平均工作时长（小时）</span>
                                    </div>
                                    <div className="h-[200px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={currentData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorWork" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                <XAxis 
                                                    dataKey="date" 
                                                    axisLine={false} 
                                                    tickLine={false} 
                                                    tick={{ fontSize: 10, fill: '#6B7280' }} 
                                                    dy={10}
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={50}
                                                />
                                                <YAxis 
                                                    axisLine={false} 
                                                    tickLine={false} 
                                                    tick={{ fontSize: 10, fill: '#6B7280' }} 
                                                    domain={[0, 10]}
                                                    ticks={[0, 2, 4, 6, 8, 10]}
                                                />
                                                <Tooltip 
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                    itemStyle={{ fontSize: '12px' }}
                                                />
                                                <Area 
                                                    type="monotone" 
                                                    dataKey="workHours" 
                                                    stroke="#3B82F6" 
                                                    fillOpacity={1} 
                                                    fill="url(#colorWork)" 
                                                    strokeWidth={2}
                                                    dot={{ r: 3, fill: "white", stroke: "#3B82F6", strokeWidth: 2 }}
                                                />
                                                <Brush 
                                                    dataKey="date" 
                                                    height={20} 
                                                    stroke="#E5E7EB" 
                                                    fill="#F9FAFB"
                                                    tickFormatter={() => ''}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Overtime Chart */}
                                <div>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <div className="w-2 h-2 rounded-full border-2 border-[#13A695]"></div>
                                        <span className="text-xs text-gray-600">平均加班时长（小时）</span>
                                    </div>
                                    <div className="h-[200px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={currentData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorOvertime" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#13A695" stopOpacity={0.2}/>
                                                        <stop offset="95%" stopColor="#13A695" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                <XAxis 
                                                    dataKey="date" 
                                                    axisLine={false} 
                                                    tickLine={false} 
                                                    tick={{ fontSize: 10, fill: '#6B7280' }} 
                                                    dy={10}
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={50}
                                                />
                                                <YAxis 
                                                    axisLine={false} 
                                                    tickLine={false} 
                                                    tick={{ fontSize: 10, fill: '#6B7280' }} 
                                                    domain={[0, 1]}
                                                    ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]}
                                                />
                                                <Tooltip 
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                    itemStyle={{ fontSize: '12px' }}
                                                />
                                                <Area 
                                                    type="monotone" 
                                                    dataKey="overtime" 
                                                    stroke="#13A695" 
                                                    fillOpacity={1} 
                                                    fill="url(#colorOvertime)" 
                                                    strokeWidth={2}
                                                    dot={{ r: 3, fill: "white", stroke: "#13A695", strokeWidth: 2 }}
                                                />
                                                <Brush 
                                                    dataKey="date" 
                                                    height={20} 
                                                    stroke="#E5E7EB" 
                                                    fill="#F9FAFB"
                                                    tickFormatter={() => ''}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}



                {/* Work Experience Timeline Section */}
                {hasWorkExp && (
                    <WorkExperienceTimeline sectionNumber={getSectionNumber()} />
                )}

                {/* Talent Review Timeline Section */}
                {hasTalentTimeline && (
                    <TalentReviewTimeline 
                        sectionNumber={getSectionNumber()} 
                        initialTimeRange={data.talentOptions?.timelineTimeRange}
                    />
                )}

                {/* Talent Review Grid Section */}
                {hasTalentGrid && (
                    <TalentReviewGrid 
                        sectionNumber={getSectionNumber()} 
                        initialScheme={data.talentOptions?.gridScheme}
                    />
                )}

                {/* Salary Analysis Section */}
                {hasSalary && (
                    <SalaryAnalysisCard 
                        sectionNumber={getSectionNumber()} 
                        initialFilters={data.salaryFilters}
                    />
                )}
            </div>

            {/* Footer Section */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
                <div className="text-sm text-gray-500">
                    报告生成时间: {new Date().toLocaleDateString()}
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors border border-gray-200">
                        重新生成
                    </button>
                    <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-[#E16AF3] to-[#6265F0] hover:opacity-90 rounded-md transition-opacity shadow-sm">
                        确认并归档
                    </button>
                </div>
            </div>
        </div>
    );
};

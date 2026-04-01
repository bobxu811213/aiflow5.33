
import React, { useState, useEffect } from 'react';
import { PieChart, ClipboardList, Clock, MapPin, Coffee, Calendar, ArrowRight, BarChart3, HelpCircle, Filter, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const PeriodSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('202512 (20251201-20251231)');
    const options = [
        '202512 (20251201-20251231)',
        '202511 (20251101-20251130)',
        '202510 (20251001-20251031)'
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.period-select-dropdown')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative period-select-dropdown">
            <button 
                className="flex items-center justify-between gap-2 text-sm text-gray-600 bg-white px-3 py-1.5 rounded border border-gray-200 hover:border-[#13A695] transition-colors min-w-[220px] outline-none focus:ring-2 focus:ring-[#13A695]/20 focus:border-[#13A695]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selected}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-100 rounded shadow-lg z-50 py-1">
                    {options.map(opt => (
                        <div 
                            key={opt}
                            className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${selected === opt ? 'text-[#13A695] bg-[#13A695]/5' : 'text-gray-600'}`}
                            onClick={() => {
                                setSelected(opt);
                                setIsOpen(false);
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Pagination = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const options = [10, 20, 50, 100];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.pagination-dropdown')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-200 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-[#13A695] text-[#13A695] rounded text-sm font-medium bg-white">
                1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-200 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <ChevronRight size={14} />
            </button>
            <div className="relative pagination-dropdown">
                <button 
                    className="flex items-center justify-between gap-2 text-sm text-gray-600 border border-gray-200 rounded px-3 h-8 bg-white hover:border-[#13A695] transition-colors min-w-[90px]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>{pageSize} 条/页</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                    <div className="absolute bottom-full right-0 mb-1 w-full bg-white border border-gray-100 rounded shadow-lg z-50 py-1">
                        {options.map(opt => (
                            <div 
                                key={opt}
                                className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50 ${pageSize === opt ? 'text-[#13A695] bg-[#13A695]/5' : 'text-gray-600'}`}
                                onClick={() => {
                                    setPageSize(opt);
                                    setIsOpen(false);
                                }}
                            >
                                {opt} 条/页
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const AttendanceInfoTab = () => {
    const [attendanceSubTab, setAttendanceSubTab] = useState('打卡记录');
    const [expandedDays, setExpandedDays] = useState<string[]>([]);
    const [activeLineShift, setActiveLineShift] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.shift-popup-content') && !target.closest('.shift-toggle-btn')) {
                setActiveLineShift(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleExpand = (date: string) => {
        setExpandedDays(prev => 
            prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
        );
    };

    const toggleLineShift = (id: string, e: React.MouseEvent) => {
        setActiveLineShift(prev => prev === id ? null : id);
    };

    const attendanceMock = {
        clockIn: [
            {
                clockInTime: '2025-12-05 08:55:12',
                location: '公司前台',
                source: '考勤机',
                sourceDesc: '人脸识别',
                isValid: '是',
                photo: '-',
                deviceId: 'DEV-001',
                deviceName: '前台考勤机',
                wifiName: 'Company-Guest'
            },
            {
                clockInTime: '2025-12-05 18:05:45',
                location: '公司前台',
                source: '考勤机',
                sourceDesc: '人脸识别',
                isValid: '是',
                photo: '-',
                deviceId: 'DEV-001',
                deviceName: '前台考勤机',
                wifiName: 'Company-Guest'
            },
             {
                clockInTime: '2025-12-04 08:58:30',
                location: '远程办公',
                source: '企业微信',
                sourceDesc: 'GPS定位',
                isValid: '是',
                photo: '-',
                deviceId: 'iPhone 15',
                deviceName: '张三的手机',
                wifiName: '-'
            },
            {
                clockInTime: '2025-12-04 18:01:20',
                location: '远程办公',
                source: '企业微信',
                sourceDesc: 'GPS定位',
                isValid: '是',
                photo: '-',
                deviceId: 'iPhone 15',
                deviceName: '张三的手机',
                wifiName: '-'
            },
        ],
        retro: [
            {
                retroTime: '2025-12-01 08:55:00',
                missReason: '忘记打卡',
                retroReason: '因公外出忘记打卡',
                source: '企业微信',
                status: '已通过',
                createTime: '2025-12-01 10:00:00'
            },
        ],
        overtime: [
            {
                type: '工作日加班',
                startTime: '2025-12-02 18:00:00',
                endTime: '2025-12-02 20:00:00',
                duration: '2.0',
                reason: '项目紧急上线',
                earliestTime: '2025-12-02 17:55:00',
                latestTime: '2025-12-02 20:05:00',
                validDuration: '2.0',
                correctionDuration: '0',
                compensation: '调休',
                transferToCompTime: '2.0',
                overtimeToSalaryTime: '0',
                expiredCompToSalaryTime: '0',
                validStatus: '有效',
                source: '企业微信',
                sourceDesc: '审批单号: 202512020001',
                updateTime: '2025-12-03 10:00:00',
                createTime: '2025-12-02 20:10:00',
                overtimeDate: '2025-12-02',
                isManual: '否',
                overtimePosition: '高级产品经理'
            },
        ],
        leave: [
            {
                type: '年假',
                startTime: '2025-12-05 09:00:00',
                endTime: '2025-12-05 18:00:00',
                appliedDuration: '8.0',
                effectiveDuration: '8.0',
                unit: '小时',
                source: '企业微信',
                status: '已通过',
                updateTime: '2025-12-04 15:30:00',
                remark: '个人事务'
            },
            {
                type: '请假',
                startTime: '2025-12-10 14:00:00',
                endTime: '2025-12-10 16:00:00',
                appliedDuration: '2.0',
                effectiveDuration: '2.0',
                unit: '小时',
                source: '钉钉',
                status: '审批中',
                updateTime: '2025-12-10 10:00:00',
                remark: '临时有事',
                createTime: '2025-12-10 09:00:00',
                sourceDesc: '审批单号: 202512100001'
            }
        ],
        outing: [
            {
                type: '公出',
                startTime: '2025-12-12 09:00:00',
                endTime: '2025-12-12 12:00:00',
                effectiveDuration: '3.0',
                appliedDuration: '3.0',
                unit: '小时',
                location: '上海市浦东新区张江高科',
                reason: '客户拜访',
                source: '企业微信',
                status: '已通过',
                createTime: '2025-12-11 18:00:00',
                updateTime: '2025-12-12 12:00:00',
                sourceDesc: '审批单号: 202512110005'
            }
        ],
        businessTrip: [
            {
                type: '出差',
                startTime: '2025-12-15 09:00:00',
                endTime: '2025-12-17 18:00:00',
                effectiveDuration: '3.0',
                appliedDuration: '3.0',
                unit: '天',
                location: '北京市朝阳区',
                source: '企业微信',
                status: '已通过',
                createTime: '2025-12-14 10:00:00',
                updateTime: '2025-12-17 18:00:00'
            }
        ],
        secondment: [
            {
                department: '研发部',
                position: '高级前端工程师',
                startTime: '2025-12-01',
                endTime: '2025-12-31',
                totalDuration: '31',
                effectiveDuration: '22',
                source: '企业微信',
                status: '审批中'
            }
        ],
        report: [
            { date: '2025-12-01', shift: '固', status: '', statusDesc: '', reqHours: 8, actHours: 8, lateCount: 0, lateMins: 0, earlyCount: 0, earlyMins: 0, missingSignIn: 0, missingSignOut: 0, absenceHours: 0, absenceCount: 0, retroCount: 0, otWorkday: 0, otRestDay: 0, otHoliday: 0, outHours: 0, tripDays: 0, personalLeaveHours: 0, marriageLeaveDays: 0, maternityLeaveDays: 0, secondmentDays: 0 },
            { date: '2025-12-02', shift: '主播', status: '', statusDesc: '', reqHours: 10, actHours: 10, lateCount: 0, lateMins: 0, earlyCount: 0, earlyMins: 0, missingSignIn: 0, missingSignOut: 0, absenceHours: 0, absenceCount: 0, retroCount: 0, otWorkday: 2, otRestDay: 0, otHoliday: 0, outHours: 0, tripDays: 0, personalLeaveHours: 0, marriageLeaveDays: 0, maternityLeaveDays: 0, secondmentDays: 0 },
            { date: '2025-12-03', shift: '固', status: '迟到', statusDesc: '', reqHours: 8, actHours: 7.9, lateCount: 1, lateMins: 5, earlyCount: 0, earlyMins: 0, missingSignIn: 0, missingSignOut: 0, absenceHours: 0, absenceCount: 0, retroCount: 0, otWorkday: 0, otRestDay: 0, otHoliday: 0, outHours: 0, tripDays: 0, personalLeaveHours: 0, marriageLeaveDays: 0, maternityLeaveDays: 0, secondmentDays: 0 },
            { date: '2025-12-04', shift: '固', status: '', statusDesc: '', reqHours: 8, actHours: 8, lateCount: 0, lateMins: 0, earlyCount: 0, earlyMins: 0, missingSignIn: 0, missingSignOut: 0, absenceHours: 0, absenceCount: 0, retroCount: 0, otWorkday: 0, otRestDay: 0, otHoliday: 0, outHours: 0, tripDays: 0, personalLeaveHours: 0, marriageLeaveDays: 0, maternityLeaveDays: 0, secondmentDays: 0 },
            { date: '2025-12-05', shift: '固', status: '', statusDesc: '', reqHours: 8, actHours: 8, lateCount: 0, lateMins: 0, earlyCount: 0, earlyMins: 0, missingSignIn: 0, missingSignOut: 0, absenceHours: 0, absenceCount: 0, retroCount: 0, otWorkday: 0, otRestDay: 0, otHoliday: 0, outHours: 0, tripDays: 0, personalLeaveHours: 0, marriageLeaveDays: 0, maternityLeaveDays: 0, secondmentDays: 0 },
        ]
    };

    const generateShiftCalendar = () => {
        const days = [];
        for (let i = 1; i <= 31; i++) {
            const date = `2025-12-${String(i).padStart(2, '0')}`;
            const dayOfWeek = new Date(2025, 11, i).getDay(); 
            let shifts = [];
            
            let baseShift = { name: '常白班', time: '09:00 - 18:00', duration: '9小时', type: 'regular', color: 'bg-blue-50 text-blue-600 border-blue-100' };
            if (dayOfWeek === 0) {
                baseShift = { name: '休息', time: '', duration: '', type: 'rest', color: 'bg-gray-50 text-gray-400 border-gray-100' };
                shifts.push(baseShift);
            } else if (dayOfWeek === 6) {
                 baseShift = { name: '晚班', time: '14:00 - 23:00', duration: '9小时', type: 'night', color: 'bg-purple-50 text-purple-600 border-purple-100' };
                 shifts.push(baseShift);
            } else {
                shifts.push(baseShift);
            }

            if (i === 2) {
                shifts = [{
                    name: '划线',
                    time: '',
                    duration: '6小时',
                    type: 'line',
                    color: 'bg-teal-50 text-teal-600 border-teal-100',
                    isLineShift: true,
                    segments: [
                        '10:00-13:00',
                        '16:45-18:45',
                        '20:30-21:30'
                    ]
                }];
            }

            // Mock multiple shifts
            if (i >= 8 && i <= 12) {
                shifts.unshift({ name: '请假', time: '', duration: '8小时', totalDuration: '40小时', type: 'leave', color: 'bg-[#FF4D4F]/10 text-[#FF4D4F] border-[#FF4D4F]/20', isSpecialShift: true, timeRange: '2025-12-08 09:00 ~ 2025-12-12 18:00' });
            }
            if (i === 16) {
                shifts.unshift({ name: '出差', time: '', duration: '9小时', totalDuration: '9小时', type: 'business_trip', color: 'bg-[#FF8124]/10 text-[#FF8124] border-[#FF8124]/20', isSpecialShift: true, timeRange: '2025-12-16 09:00 ~ 2025-12-16 18:00' });
            }
            if (i === 22 || i === 23) {
                shifts.unshift({ name: '出差', time: '', duration: '9小时', totalDuration: '18小时', type: 'business_trip', color: 'bg-[#FF8124]/10 text-[#FF8124] border-[#FF8124]/20', isSpecialShift: true, timeRange: '2025-12-22 09:00 ~ 2025-12-23 18:00' });
            }
            if (i >= 17 && i <= 19) {
                shifts.unshift({ name: '请假', time: '', duration: '4小时', totalDuration: '12小时', type: 'leave', color: 'bg-[#FF4D4F]/10 text-[#FF4D4F] border-[#FF4D4F]/20', isSpecialShift: true, timeRange: `2025-12-${i} 14:00 ~ 2025-12-${i} 18:00` });
                shifts.unshift({ name: '外出', time: '', duration: '3小时', totalDuration: '9小时', type: 'outing', color: 'bg-[#41B5EB]/10 text-[#41B5EB] border-[#41B5EB]/20', isSpecialShift: true, timeRange: `2025-12-${i} 09:00 ~ 2025-12-${i} 12:00` });
            }

            if (i === 10) {
                 shifts = [
                    { name: '请假', time: '', duration: '8小时', totalDuration: '40小时', type: 'leave', color: 'bg-[#FF4D4F]/10 text-[#FF4D4F] border-[#FF4D4F]/20', isSpecialShift: true, timeRange: '2025-12-08 09:00 ~ 2025-12-12 18:00' },
                    { name: '划线', time: '', duration: '6小时', type: 'line', color: 'bg-teal-50 text-teal-600 border-teal-100', isLineShift: true, segments: ['10:00-13:00', '16:45-18:45', '20:30-21:30'] },
                    { name: '中班', time: '14:00 - 22:00', duration: '8小时', type: 'regular', color: 'bg-orange-50 text-orange-600 border-orange-100' },
                    { name: '晚班', time: '22:00 - 06:00', duration: '8小时', type: 'night', color: 'bg-purple-50 text-purple-600 border-purple-100' }
                 ];
            }
            if (i === 15) {
                 shifts = [
                    { name: '早班', time: '06:00 - 12:00', duration: '6小时', type: 'regular', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                    { name: '中班', time: '12:00 - 18:00', duration: '6小时', type: 'regular', color: 'bg-orange-50 text-orange-600 border-orange-100' },
                    { name: '晚班', time: '18:00 - 24:00', duration: '6小时', type: 'night', color: 'bg-purple-50 text-purple-600 border-purple-100' },
                    { name: '加班', time: '00:00 - 02:00', duration: '2小时', type: 'overtime', color: 'bg-red-50 text-red-600 border-red-100' }
                 ];
            }

            if (i === 6 && shifts.length > 0) {
                shifts[0].isSecondment = true;
            }

            days.push({ date, day: i, shifts });
        }
        return days;
    };

    const calendarData = generateShiftCalendar();
    const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

    return (
        <div className="space-y-6 pb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <PieChart size={20} className="text-[#13A695]" />
                        <h3 className="font-bold text-gray-800 text-base">考勤统计</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">选择考勤周期</span>
                        <PeriodSelect />
                    </div>
                </div>
                
                <div className="grid grid-cols-5 gap-4">
                    {/* Card 1: Total Hours */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">应出勤</span>
                            <span className="text-lg font-bold text-gray-900">176<span className="text-xs font-normal text-gray-500 ml-1">小时</span></span>
                        </div>
                        <div className="w-full h-px bg-gray-200"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">实出勤</span>
                            <span className="text-lg font-bold text-[#13A695]">174.5<span className="text-xs font-normal text-gray-500 ml-1">小时</span></span>
                        </div>
                    </div>

                    {/* Card 2: Shift Hours */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
                        <div className="text-sm text-gray-500 mb-2">时长Top3班次</div>
                        <div className="flex flex-col gap-1.5">
                             {[
                                { name: '常白班', val: '160' },
                                { name: '早班', val: '32' },
                                { name: '中班', val: '16' }
                             ].map((item, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-medium text-gray-400 w-3">{i + 1}.</span>
                                        <span className="text-xs text-gray-600 truncate">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap">{item.val}<span className="text-[10px] font-normal text-gray-500 ml-0.5">小时</span></span>
                                </div>
                             ))}
                        </div>
                    </div>

                    {/* Card 3: Late */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
                        <div className="text-sm text-gray-500 mb-2">迟到 (2次)</div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-xl font-bold text-orange-500">35</span>
                            <span className="text-xs text-gray-500">分钟</span>
                        </div>
                    </div>

                    {/* Card 4: Early Leave */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
                        <div className="text-sm text-gray-500 mb-2">早退 (1次)</div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-xl font-bold text-orange-500">10</span>
                            <span className="text-xs text-gray-500">分钟</span>
                        </div>
                    </div>

                    {/* Card 5: Absence */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
                        <div className="text-sm text-gray-500 mb-2">缺勤 (0次)</div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-xl font-bold text-red-500">0</span>
                            <span className="text-xs text-gray-500">小时</span>
                        </div>
                    </div>

                    {/* Card 6: Missing Card */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
                         <div className="text-sm text-gray-500 mb-2">缺卡 (签到+签退)</div>
                         <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-gray-900">3</span>
                            <span className="text-xs text-gray-500">次</span>
                        </div>
                    </div>

                    {/* Card 7: Retroactive */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
                        <div className="text-sm text-gray-500 mb-2">补卡次数</div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-gray-900">1</span>
                            <span className="text-xs text-gray-500">次</span>
                        </div>
                    </div>

                    {/* Card 8: Overtime */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
                        <div className="text-sm text-gray-500 mb-2">加班时长</div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-blue-600">12.5</span>
                            <span className="text-xs text-gray-500">小时</span>
                        </div>
                    </div>

                    {/* Card 9: Leave */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center relative group">
                        <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                            休假 (2次)
                            <HelpCircle size={14} className="text-gray-400 cursor-help" />
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10">
                                <div className="mb-1">休假次数：跨周期的休假，每个涉及周期均各计 1 次。</div>
                                <div>休假时长：跨周期的休假，按实际发生日期拆分，分别计入对应周期进行统计。</div>
                            </div>
                        </div>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-xl font-bold text-green-600">1</span>
                            <span className="text-xs text-gray-500">天</span>
                            <span className="text-gray-300 mx-1">|</span>
                            <span className="text-xl font-bold text-green-600">2</span>
                            <span className="text-xs text-gray-500">小时</span>
                        </div>
                    </div>

                    {/* Card 10: Out */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center relative group">
                        <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                            外出 (1次)
                            <HelpCircle size={14} className="text-gray-400 cursor-help" />
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10">
                                <div className="mb-1">外出次数：跨周期的外出，每个涉及周期均各计 1 次。</div>
                                <div>外出时长：跨周期的外出，按实际发生日期拆分，分别计入对应周期进行统计。</div>
                            </div>
                        </div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-purple-600">3.5</span>
                            <span className="text-xs text-gray-500">小时</span>
                        </div>
                    </div>

                    {/* Card 10.5: Business Trip */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center relative group">
                        <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                            出差 (3次)
                            <HelpCircle size={14} className="text-gray-400 cursor-help" />
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10">
                                <div className="mb-1">出差次数：跨周期的出差，每个涉及周期均各计 1 次。</div>
                                <div>出差时长：跨周期的出差，按实际发生日期拆分，分别计入对应周期进行统计。</div>
                            </div>
                        </div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-[#FF8124]">10</span>
                            <span className="text-xs text-gray-500">小时</span>
                        </div>
                    </div>

                    {/* Card 11: Secondment */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center relative group">
                        <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                            借调 (3次)
                            <HelpCircle size={14} className="text-gray-400 cursor-help" />
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10">
                                <div className="mb-1">借调次数：跨周期的借调，每个涉及周期均各计 1 次。</div>
                                <div>借调时长：跨周期的借调，按实际发生日期拆分，分别计入对应周期进行统计。</div>
                            </div>
                        </div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-indigo-600">10</span>
                            <span className="text-xs text-gray-500">天</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Shift Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar size={20} className="text-[#13A695]" />
                        <h3 className="font-bold text-gray-800 text-base">排班情况</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">选择考勤周期</span>
                        <PeriodSelect />
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                        {weekDays.map(d => (
                            <div key={d} className="py-2 text-center text-xs font-bold text-gray-500">周{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 bg-white rounded-b-lg">
                        {calendarData.map((item, idx) => {
                            const isExpanded = expandedDays.includes(item.date);
                            const visibleShifts = isExpanded ? item.shifts : item.shifts.slice(0, 2);
                            const hasMore = item.shifts.length > 2;
                            const hasActiveShift = item.shifts.some((_, sIdx) => activeLineShift === `${item.date}-${sIdx}`);
                            
                            return (
                                <div key={idx} className={`border-b border-r border-gray-100 min-h-[100px] p-2 hover:bg-gray-50 transition-colors flex flex-col gap-1 ${idx % 7 === 6 ? 'border-r-0' : ''} ${item.date === '2025-12-05' ? 'bg-blue-50/30' : ''} ${hasActiveShift ? 'relative z-40' : ''}`}>
                                    <div className={`text-xs mb-1 font-mono flex justify-between items-center h-6 ${item.date === '2025-12-05' ? 'text-primary font-bold' : 'text-gray-400'}`}>
                                        {item.date === '2025-12-05' ? (
                                            <div className="flex items-center gap-1.5">
                                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white">{item.day}</span>
                                                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm">今天</span>
                                            </div>
                                        ) : (
                                            <span>{item.day}</span>
                                        )}
                                    </div>
                                    
                                    <div className={`flex flex-wrap gap-1.5 ${isExpanded ? '' : 'items-stretch'}`}>
                                        {visibleShifts.sort((a, b) => {
                                            const order = { 'leave': 0, 'outing': 1, 'business_trip': 1, 'line': 2, 'regular': 3, 'night': 3, 'overtime': 4, 'rest': 5 };
                                            return (order[a.type] ?? 99) - (order[b.type] ?? 99);
                                        }).map((shift, sIdx) => {
                                            // Determine width class based on state
                                            let widthClass = 'w-[calc(50%-3px)]'; // Default to 2 columns (approx 50%)
                                            
                                            if (!isExpanded) {
                                                if (item.shifts.length === 1) {
                                                    widthClass = 'w-full';
                                                } else if (hasMore) {
                                                    // If has more, shifts take available space minus the more button
                                                    widthClass = 'flex-1 min-w-0'; 
                                                }
                                            }

                                            return (
                                                <div key={sIdx} className={`text-[10px] p-1.5 rounded border ${shift.color} flex flex-col justify-start gap-0.5 shadow-sm h-[56px] ${widthClass} relative ${activeLineShift === `${item.date}-${sIdx}` ? 'z-50' : ''}`}>
                                                    {shift.isSecondment && (
                                                        <div className="absolute top-0 right-0 bg-[#41B5EB] text-white text-[8px] px-1 py-0.5 rounded-bl-sm rounded-tr-[3px] z-10">
                                                            借
                                                        </div>
                                                    )}
                                                    <div className="font-bold truncate flex justify-between items-center leading-tight">
                                                        <span>{shift.name}</span>
                                                        {(shift.isLineShift || shift.isSpecialShift) && (
                                                            <div 
                                                                className="shift-toggle-btn text-[8px] bg-white/60 px-1 rounded text-blue-600 cursor-pointer hover:bg-white transition-colors"
                                                                onClick={(e) => toggleLineShift(`${item.date}-${sIdx}`, e)}
                                                            >
                                                                详情
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-between items-center opacity-80 scale-95 origin-left w-[110%]">
                                                        {shift.duration && <span>{shift.duration}</span>}
                                                    </div>
                                                    {shift.time && <div className="scale-90 origin-left opacity-70 whitespace-nowrap overflow-hidden text-[9px]">{shift.time}</div>}
                                                    
                                                    {(shift.isLineShift || shift.isSpecialShift) && activeLineShift === `${item.date}-${sIdx}` && (
                                                        <div 
                                                            className={`shift-popup-content absolute top-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 text-gray-800 ${idx % 7 >= 4 ? 'right-full mr-2' : 'left-full ml-2'}`}
                                                        >
                                                            <div className={`p-2 rounded-t-lg font-bold text-sm ${shift.color} border-b`}>
                                                                {shift.name}
                                                            </div>
                                                            <div className="p-3 space-y-2 text-xs">
                                                                {shift.isLineShift && (
                                                                    <>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-gray-500">类型:</span>
                                                                            <span>划线班次</span>
                                                                            <span className="bg-[#13A695] text-white text-[10px] px-1 rounded-sm">划</span>
                                                                        </div>
                                                                        {shift.segments.map((seg, i) => (
                                                                            <div key={i} className="flex gap-2">
                                                                                <span className="text-gray-500">班段{i+1}:</span>
                                                                                <span>{seg}</span>
                                                                            </div>
                                                                        ))}
                                                                    </>
                                                                )}
                                                                {shift.isSpecialShift && (
                                                                    <div className="flex flex-col gap-1">
                                                                        <span className="text-gray-500">时间段:</span>
                                                                        <span>{shift.timeRange}</span>
                                                                    </div>
                                                                )}
                                                                <div className="flex gap-2 pt-1 border-t border-gray-100">
                                                                    <span className="text-gray-500">{shift.isSpecialShift ? '当天时长:' : '班次时长:'}</span>
                                                                    <span>{shift.duration}</span>
                                                                </div>
                                                                {shift.isSpecialShift && shift.totalDuration && (
                                                                    <div className="flex gap-2 pt-1">
                                                                        <span className="text-gray-500">总时长:</span>
                                                                        <span>{shift.totalDuration}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        
                                        {hasMore && !isExpanded && (
                                            <button 
                                                onClick={() => toggleExpand(item.date)}
                                                className="text-[10px] w-6 rounded border border-gray-200 border-dashed bg-gray-50 text-gray-500 hover:text-primary hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center min-h-[46px] transition-colors gap-0.5 shrink-0"
                                                title={`还有 ${item.shifts.length - 2} 个班次`}
                                            >
                                                <span className="font-bold text-xs">...</span>
                                                <span className="text-[8px] scale-90">+{item.shifts.length - 2}</span>
                                            </button>
                                        )}
                                        
                                        {hasMore && isExpanded && (
                                             <button 
                                                onClick={() => toggleExpand(item.date)}
                                                className="text-[10px] w-[calc(50%-3px)] rounded border border-gray-200 border-dashed bg-gray-50 text-gray-500 hover:text-primary hover:border-primary hover:bg-primary/5 flex items-center justify-center min-h-[46px] transition-colors"
                                            >
                                                收起
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        {[1, 2, 3, 4].map(i => (
                                <div key={`empty-${i}`} className="border-b border-r border-gray-100 min-h-[70px] bg-gray-50/20"></div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 常白班</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span> 晚班</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-500"></span> 划线</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-400"></span> 休息</div>
                    </div>
                    <div className="w-px h-3 bg-gray-300"></div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF4D4F]"></span> 请假</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#41B5EB]"></span> 外出</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF8124]"></span> 出差</div>
                    </div>
                </div>
            </div>
            {/* Attendance Records */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Clock size={20} className="text-[#13A695]" />
                        <h3 className="font-bold text-gray-800 text-base">出勤记录</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">选择考勤周期</span>
                        <PeriodSelect />
                    </div>
                </div>
                <div className="flex gap-2 mb-4 border-b border-gray-100">
                    {['打卡记录', '补卡记录', '加班记录', '休假记录', '外出记录', '出差记录', '借调记录'].map(subTab => (
                        <button
                            key={subTab}
                            onClick={() => setAttendanceSubTab(subTab)}
                            className={`px-4 py-2 text-sm font-medium transition-colors relative ${attendanceSubTab === subTab ? 'text-[#13A695]' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {subTab}
                            {attendanceSubTab === subTab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#13A695]"></div>}
                        </button>
                    ))}
                </div>
                <div className="min-h-[150px]">
                    {attendanceSubTab === '打卡记录' && (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-4 py-2">打卡时间</th>
                                        <th className="px-4 py-2">打卡地点</th>
                                        <th className="px-4 py-2">来源</th>
                                        <th className="px-4 py-2">来源描述</th>
                                        <th className="px-4 py-2">是否有效</th>
                                        <th className="px-4 py-2">照片</th>
                                        <th className="px-4 py-2">
                                            <div className="flex items-center gap-1 relative group w-max">
                                                设备ID <HelpCircle size={12} className="text-gray-400 cursor-help" />
                                                <div className="absolute top-full left-0 mt-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50 whitespace-normal text-left font-normal">
                                                    仅适用于i人事APP和第三方对接平台打卡的员工
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-4 py-2">
                                            <div className="flex items-center gap-1 relative group w-max">
                                                设备名称 <HelpCircle size={12} className="text-gray-400 cursor-help" />
                                                <div className="absolute top-full left-0 mt-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50 whitespace-normal text-left font-normal">
                                                    仅适用于i人事APP打卡的员工。
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-4 py-2">wifi名称</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendanceMock.clockIn.map((record, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.clockInTime}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.location}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.source}</td>
                                            <td className="px-4 py-2 text-gray-500">{record.sourceDesc}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.isValid}</td>
                                            <td className="px-4 py-2 text-gray-500">{record.photo}</td>
                                            <td className="px-4 py-2 text-gray-500">{record.deviceId}</td>
                                            <td className="px-4 py-2 text-gray-500">{record.deviceName}</td>
                                            <td className="px-4 py-2 text-gray-500">{record.wifiName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                        </>
                    )}
                    {attendanceSubTab === '补卡记录' && (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-4 py-2">补卡时间点</th>
                                        <th className="px-4 py-2">缺卡事由</th>
                                        <th className="px-4 py-2">补卡原因</th>
                                        <th className="px-4 py-2">来源</th>
                                        <th className="px-4 py-2">状态</th>
                                        <th className="px-4 py-2">创建时间</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendanceMock.retro.map((record, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.retroTime}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.missReason}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.retroReason}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.source}</td>
                                            <td className="px-4 py-2"><span className="text-[#52C41A] bg-green-50 px-2 py-0.5 rounded text-xs">{record.status}</span></td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.createTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                        </>
                    )}
                    {attendanceSubTab === '加班记录' && (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-4 py-2">加班类型</th>
                                        <th className="px-4 py-2 flex items-center gap-1">开始时间 <Filter size={14} className="text-[#13A695]" /></th>
                                        <th className="px-4 py-2">结束时间</th>
                                        <th className="px-4 py-2">申请时长</th>
                                        <th className="px-4 py-2">加班事由</th>
                                        <th className="px-4 py-2">最早打卡时间</th>
                                        <th className="px-4 py-2">最晚打卡时间</th>
                                        <th className="px-4 py-2">有效时长</th>
                                        <th className="px-4 py-2">修正时长</th>
                                        <th className="px-4 py-2">补偿方式</th>
                                        <th className="px-4 py-2">转调休时间</th>
                                        <th className="px-4 py-2">加班转薪资时间</th>
                                        <th className="px-4 py-2">调休过期转薪资时间</th>
                                        <th className="px-4 py-2">有效状态</th>
                                        <th className="px-4 py-2">来源</th>
                                        <th className="px-4 py-2">来源描述</th>
                                        <th className="px-4 py-2">更新时间</th>
                                        <th className="px-4 py-2">创建时间</th>
                                        <th className="px-4 py-2">加班归属日</th>
                                        <th className="px-4 py-2">是否手动修改</th>
                                        <th className="px-4 py-2">加班岗位</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendanceMock.overtime.map((record, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-600">{record.type}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.startTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.endTime}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.duration}h</td>
                                            <td className="px-4 py-2 text-gray-600">{record.reason}</td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.earliestTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.latestTime}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.validDuration}h</td>
                                            <td className="px-4 py-2 text-gray-600">{record.correctionDuration}h</td>
                                            <td className="px-4 py-2 text-gray-600">{record.compensation}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.transferToCompTime}h</td>
                                            <td className="px-4 py-2 text-gray-600">{record.overtimeToSalaryTime}h</td>
                                            <td className="px-4 py-2 text-gray-600">{record.expiredCompToSalaryTime}h</td>
                                            <td className="px-4 py-2"><span className="text-[#52C41A] bg-green-50 px-2 py-0.5 rounded text-xs">{record.validStatus}</span></td>
                                            <td className="px-4 py-2 text-gray-600">{record.source}</td>
                                            <td className="px-4 py-2 text-gray-500">{record.sourceDesc}</td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.updateTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.createTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.overtimeDate}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.isManual}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.overtimePosition}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                        </>
                    )}
                    {attendanceSubTab === '休假记录' && (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-4 py-2">休假类型</th>
                                        <th className="px-4 py-2 flex items-center gap-1">开始时间 <Filter size={14} className="text-[#13A695]" /></th>
                                        <th className="px-4 py-2">结束时间</th>
                                        <th className="px-4 py-2">申请时长</th>
                                        <th className="px-4 py-2">
                                            <div className="flex items-center gap-1 relative group w-max">
                                                生效时长 <HelpCircle size={12} className="text-gray-400 cursor-help" />
                                                <div className="absolute top-full left-0 mt-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50 whitespace-normal text-left font-normal">
                                                    该时长是根据系统规则实时计算。如果申请时长为手动修改过的则生效时长等于申请时长且不会参与重算。
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-4 py-2">休假单位</th>
                                        <th className="px-4 py-2">来源</th>
                                        <th className="px-4 py-2">来源描述</th>
                                        <th className="px-4 py-2">状态</th>
                                        <th className="px-4 py-2">更新时间</th>
                                        <th className="px-4 py-2">创建时间</th>
                                        <th className="px-4 py-2">备注</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendanceMock.leave.map((record, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-600">{record.type}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.startTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.endTime}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.appliedDuration}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.effectiveDuration}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.unit}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.source}</td>
                                            <td className="px-4 py-2 text-gray-500">{record.sourceDesc}</td>
                                            <td className="px-4 py-2"><span className={`px-2 py-0.5 rounded text-xs ${record.status === '已通过' ? 'text-[#52C41A] bg-green-50' : 'text-blue-600 bg-blue-50'}`}>{record.status}</span></td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.updateTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.createTime}</td>
                                            <td className="px-4 py-2 text-gray-500">{record.remark}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                        </>
                    )}
                    {attendanceSubTab === '外出记录' && (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-4 py-2">类型</th>
                                        <th className="px-4 py-2 flex items-center gap-1">开始时间 <Filter size={14} className="text-[#13A695]" /></th>
                                        <th className="px-4 py-2">结束时间</th>
                                        <th className="px-4 py-2">有效时长</th>
                                        <th className="px-4 py-2">申请时长</th>
                                        <th className="px-4 py-2">单位</th>
                                        <th className="px-4 py-2">地点</th>
                                        <th className="px-4 py-2">来源</th>
                                        <th className="px-4 py-2">状态</th>
                                        <th className="px-4 py-2">创建时间</th>
                                        <th className="px-4 py-2">更新时间</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendanceMock.outing.map((record, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-600">{record.type}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.startTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.endTime}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.effectiveDuration}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.appliedDuration}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.unit}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.location}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.source}</td>
                                            <td className="px-4 py-2"><span className="text-[#52C41A] bg-green-50 px-2 py-0.5 rounded text-xs">{record.status}</span></td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.createTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.updateTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                        </>
                    )}
                    {attendanceSubTab === '出差记录' && (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-4 py-2">类型</th>
                                        <th className="px-4 py-2 flex items-center gap-1">开始时间 <Filter size={14} className="text-[#13A695]" /></th>
                                        <th className="px-4 py-2">结束时间</th>
                                        <th className="px-4 py-2">有效时长</th>
                                        <th className="px-4 py-2">申请时长</th>
                                        <th className="px-4 py-2">单位</th>
                                        <th className="px-4 py-2">地点</th>
                                        <th className="px-4 py-2">来源</th>
                                        <th className="px-4 py-2">状态</th>
                                        <th className="px-4 py-2">创建时间</th>
                                        <th className="px-4 py-2">更新时间</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendanceMock.businessTrip.map((record, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-600">{record.type}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.startTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.endTime}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.effectiveDuration}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.appliedDuration}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.unit}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.location}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.source}</td>
                                            <td className="px-4 py-2"><span className="text-[#52C41A] bg-green-50 px-2 py-0.5 rounded text-xs">{record.status}</span></td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.createTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-600">{record.updateTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                        </>
                    )}
                    {attendanceSubTab === '借调记录' && (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-4 py-2">申请借入部门</th>
                                        <th className="px-4 py-2">申请借入职位</th>
                                        <th className="px-4 py-2">开始时间</th>
                                        <th className="px-4 py-2">结束时间</th>
                                        <th className="px-4 py-2">共计时长(天)</th>
                                        <th className="px-4 py-2">
                                            <div className="flex items-center gap-1 relative group w-max">
                                                有效共计(天) <HelpCircle size={12} className="text-gray-400 cursor-help" />
                                                <div className="absolute top-full left-0 mt-2 hidden group-hover:block w-max p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50 whitespace-normal text-left font-normal">
                                                    共计时长-休息时长
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-4 py-2">来源</th>
                                        <th className="px-4 py-2">状态</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendanceMock.secondment.map((record, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-600">{record.department}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.position}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.startTime}</td>
                                            <td className="px-4 py-2 font-mono text-gray-800">{record.endTime}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.totalDuration}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.effectiveDuration}</td>
                                            <td className="px-4 py-2 text-gray-600">{record.source}</td>
                                            <td className="px-4 py-2"><span className={`px-2 py-0.5 rounded text-xs ${record.status === '已通过' ? 'text-[#52C41A] bg-green-50' : 'text-blue-600 bg-blue-50'}`}>{record.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                        </>
                    )}
                </div>
            </div>
            {/* Daily Report */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <BarChart3 size={20} className="text-[#13A695]" />
                        <h3 className="font-bold text-gray-800 text-base">考勤日报</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">选择考勤周期</span>
                        <PeriodSelect />
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">日期</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">班次</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">状态</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">状态说明</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">应出勤小时数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">实际出勤小时数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">迟到次数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">迟到分钟数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">早退次数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">早退分钟数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">签到缺卡次数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">签退缺卡次数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">缺勤小时数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">缺勤次数</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">补卡次数</th>
                                <th colSpan={3} className="px-4 py-3 text-center border-b border-gray-200 border-l">加班时长</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200 border-l">外出 (小时)</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">出差 (天)</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">事假 (小时)</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">婚假 (天)</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">产假 (天)</th>
                                <th rowSpan={2} className="px-4 py-3 border-b border-gray-200">借调 (天)</th>
                            </tr>
                            <tr>
                                <th className="px-4 py-3 border-b border-gray-200 border-l bg-gray-50">工作日</th>
                                <th className="px-4 py-3 border-b border-gray-200 bg-gray-50">休息日</th>
                                <th className="px-4 py-3 border-b border-gray-200 bg-gray-50">节假日</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {attendanceMock.report.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-gray-600">{item.date}</td>
                                    <td className="px-4 py-2">
                                        <span className={`${item.shift === '固' ? 'text-[#13A695]' : 'text-cyan-500'}`}>{item.shift}</span>
                                    </td>
                                    <td className="px-4 py-2 text-gray-600">{item.status}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.statusDesc}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.reqHours}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.actHours}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.lateCount}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.lateMins}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.earlyCount}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.earlyMins}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.missingSignIn}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.missingSignOut}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.absenceHours}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.absenceCount}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.retroCount}</td>
                                    <td className="px-4 py-2 text-gray-600 border-l border-gray-100">{item.otWorkday}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.otRestDay}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.otHoliday}</td>
                                    <td className="px-4 py-2 text-gray-600 border-l border-gray-100">{item.outHours}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.tripDays}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.personalLeaveHours}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.marriageLeaveDays}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.maternityLeaveDays}</td>
                                    <td className="px-4 py-2 text-gray-600">{item.secondmentDays}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        </div>
    );
};

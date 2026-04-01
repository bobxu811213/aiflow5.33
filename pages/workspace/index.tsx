import React, { useState, useRef, useEffect } from 'react';
import { Search, CornerDownLeft, Sparkles, Mic, Plus, Settings, Loader2, PieChart as PieChartIcon, ChevronRight, X, MessageSquarePlus, History, ChevronLeft, Users, Bell, Building2, BarChart2, Layers, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';

const chartData = [
  { name: '男性', value: 580 },
  { name: '女性', value: 420 },
];
const COLORS = ['#3b82f6', '#ec4899'];

const ageData = [
  { name: '20-25岁', value: 150 },
  { name: '26-30岁', value: 350 },
  { name: '31-35岁', value: 280 },
  { name: '36-40岁', value: 120 },
  { name: '40岁以上', value: 100 },
];

const ageGenderData = [
  { name: '20-25岁', male: 80, female: 70 },
  { name: '26-30岁', male: 200, female: 150 },
  { name: '31-35岁', male: 160, female: 120 },
  { name: '36-40岁', male: 80, female: 40 },
  { name: '40岁以上', male: 60, female: 40 },
];

const tenureData = [
  { name: '1年以内', value: 200 },
  { name: '1-3年', value: 400 },
  { name: '3-5年', value: 250 },
  { name: '5-10年', value: 100 },
  { name: '10年以上', value: 50 },
];

const mockHistory = [
    {
        id: 1,
        title: '员工性别分析',
        date: '2026-03-17 10:00',
        preview: '请分析一下我们公司所有员工的性别',
        messages: [
            { role: 'user', content: '请分析一下我们公司所有员工的性别' },
            {
                role: 'ai',
                type: 'card',
                content: '员工性别分析对比',
                cardData: { title: '员工性别分析对比', desc: '基于全公司在职员工数据统计，点击查看详细图表分析。' }
            }
        ]
    },
    {
        id: 2,
        title: '入职办理咨询',
        date: '2026-03-16 15:30',
        preview: '如何为新员工办理入职手续？',
        messages: [
            { role: 'user', content: '如何为新员工办理入职手续？' },
            { role: 'ai', content: '您可以进入“员工” -> “入职管理”页面，点击“新建入职”按钮，按照指引填写新员工的基本信息并发送入职登记表。' }
        ]
    },
    {
        id: 3,
        title: '考勤规则设置',
        date: '2026-03-15 09:15',
        preview: '我想修改一下公司的迟到早退规则',
        messages: [
            { role: 'user', content: '我想修改一下公司的迟到早退规则' },
            { role: 'ai', content: '考勤规则的修改需要在“考勤” -> “考勤组管理”中进行。您可以选择对应的考勤组，在“打卡规则”中调整迟到和早退的判定时间。' }
        ]
    }
];

const WorkspacePage: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [chatStarted, setChatStarted] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [showSplitView, setShowSplitView] = useState(false);
    const [showHistoryPanel, setShowHistoryPanel] = useState(false);
    const [activeChart, setActiveChart] = useState<any>(null);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const placeholders = [
        '请输入您需要办理的业务...',
        '试试问我：分析一下公司员工的年龄和性别占比',
        '试试问我：帮我统计各部门的平均司龄',
        '试试问我：综合分析员工年龄、性别与司龄分布'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleExecute = () => {
        if (!inputValue.trim()) return;
        
        if (!chatStarted) {
            setChatStarted(true);
        }
        
        const userMsg = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = inputValue;
        setInputValue('');
        
        if (currentInput.includes('年龄') && currentInput.includes('性别') && currentInput.includes('司龄')) {
            setIsThinking(true);
            setTimeout(() => {
                setIsThinking(false);
                setMessages(prev => [...prev, {
                    role: 'ai',
                    type: 'card',
                    content: '多维度综合画像',
                    cardData: { type: 'COMPREHENSIVE', title: '多维度综合画像', desc: '综合分析公司员工的年龄、性别与司龄分布情况。' }
                }]);
            }, 2000);
        } else if (currentInput.includes('年龄') && currentInput.includes('性别')) {
            setIsThinking(true);
            setTimeout(() => {
                setIsThinking(false);
                setMessages(prev => [...prev, {
                    role: 'ai',
                    type: 'card',
                    content: '年龄与性别交叉分析',
                    cardData: { type: 'AGE_GENDER', title: '年龄与性别交叉分析', desc: '各年龄段男女员工比例分布情况。' }
                }]);
            }, 2000);
        } else if (currentInput.includes('年龄')) {
            setIsThinking(true);
            setTimeout(() => {
                setIsThinking(false);
                setMessages(prev => [...prev, {
                    role: 'ai',
                    type: 'card',
                    content: '员工年龄占比统计',
                    cardData: { type: 'AGE', title: '员工年龄占比统计', desc: '全公司在职员工年龄段分布情况。' }
                }]);
            }, 2000);
        } else if (currentInput.includes('司龄')) {
            setIsThinking(true);
            setTimeout(() => {
                setIsThinking(false);
                setMessages(prev => [...prev, {
                    role: 'ai',
                    type: 'card',
                    content: '员工司龄占比统计',
                    cardData: { type: 'TENURE', title: '员工司龄占比统计', desc: '全公司在职员工入职年限分布情况。' }
                }]);
            }, 2000);
        } else if (currentInput.includes('分析') && currentInput.includes('性别')) {
            setIsThinking(true);
            setTimeout(() => {
                setIsThinking(false);
                setMessages(prev => [...prev, {
                    role: 'ai',
                    type: 'card',
                    content: '员工性别分析对比',
                    cardData: { type: 'GENDER', title: '员工性别分析对比', desc: '基于全公司在职员工数据统计，点击查看详细图表分析。' }
                }]);
            }, 2000);
        } else {
            setIsThinking(true);
            setTimeout(() => {
                setIsThinking(false);
                setMessages(prev => [...prev, {
                    role: 'ai',
                    content: '抱歉，我还在学习中。您可以尝试问我：“请分析一下我们公司所有员工的性别”。'
                }]);
            }, 1000);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setChatStarted(false);
        setShowSplitView(false);
        setInputValue('');
    };

    const loadHistory = (item: any) => {
        setMessages(item.messages);
        setChatStarted(true);
        setShowSplitView(false);
        setShowHistoryPanel(false);
    };

    const renderChart = () => {
        if (!activeChart) return null;

        switch (activeChart.type) {
            case 'GENDER':
                return (
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={chartData} cx="50%" cy="50%" innerRadius={100} outerRadius={140} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value}人`, '人数']} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'AGE':
                return (
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" name="人数" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'AGE_GENDER':
                return (
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageGenderData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                <Bar dataKey="male" name="男性" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} barSize={40} />
                                <Bar dataKey="female" name="女性" stackId="a" fill="#ec4899" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'TENURE':
                return (
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={tenureData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="value" name="人数" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'COMPREHENSIVE':
                return (
                    <div className="w-full h-full flex flex-col gap-8 overflow-y-auto pr-2 pb-4">
                        <div className="h-[240px] w-full shrink-0">
                            <h4 className="text-sm font-medium text-gray-600 mb-4">年龄与性别分布</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ageGenderData} margin={{ top: 5, right: 5, left: -20, bottom: 25 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                    <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="male" name="男性" stackId="a" fill="#3b82f6" radius={[0, 0, 2, 2]} barSize={20} />
                                    <Bar dataKey="female" name="女性" stackId="a" fill="#ec4899" radius={[2, 2, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="h-[240px] w-full shrink-0">
                            <h4 className="text-sm font-medium text-gray-600 mb-4">司龄分布趋势</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={tenureData} margin={{ top: 5, right: 5, left: -20, bottom: 25 }}>
                                    <defs>
                                        <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="value" name="人数" stroke="#10b981" fillOpacity={1} fill="url(#colorValue2)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderInputBox = () => (
        <div className={`w-full relative group rounded-[4px] p-[1px] transition-all duration-300 ${
            isFocused ? 'shadow-md bg-transparent' : 'shadow-sm hover:shadow-md bg-neutral-200'
        }`}>
            {/* 旋转的渐变背景 */}
            <div className={`absolute inset-0 rounded-[4px] overflow-hidden transition-opacity duration-500 ${
                isFocused ? 'opacity-100' : 'opacity-0'
            }`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_80%,#4285f4_85%,#34a853_90%,#fbbc04_95%,#ea4335_100%)]"></div>
            </div>
            {/* 模糊发光层 */}
            <div className={`absolute inset-0 rounded-[4px] overflow-hidden blur-[4px] transition-opacity duration-500 ${
                isFocused ? 'opacity-50' : 'opacity-0'
            }`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_80%,#4285f4_85%,#34a853_90%,#fbbc04_95%,#ea4335_100%)]"></div>
            </div>
            
            <div className="relative flex flex-col w-full bg-white rounded-[3px] z-10">
                <div className="flex items-start w-full p-4 pb-2">
                    <Search className="text-neutral-400 mt-[4px] shrink-0" size={20} />
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholders[placeholderIndex]}
                        className="w-full pl-3 pr-4 py-0 bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 text-neutral-700 text-lg leading-7 resize-none min-h-[28px] overflow-hidden transition-all duration-500"
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleExecute();
                            }
                        }}
                        style={{
                            height: 'auto',
                        }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
                        }}
                    />
                </div>
                
                <div className="flex items-center justify-end p-3 pt-2">
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-[4px] transition-colors border border-neutral-200">
                            <Mic size={16} />
                        </button>
                        <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-[4px] transition-colors border border-neutral-200">
                            <Plus size={16} />
                        </button>
                        <button
                            onClick={handleExecute}
                            disabled={!inputValue.trim()}
                            className={`flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-[4px] transition-colors border ${
                                inputValue.trim() 
                                ? 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50' 
                                : 'bg-white text-neutral-400 border-neutral-200 cursor-not-allowed'
                            }`}
                        >
                            <span>开始</span>
                            <CornerDownLeft size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-full w-full overflow-hidden bg-[#F9FAFB] p-4">
            <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden relative gap-4">
                {/* 面包屑导航 */}
                <div className="text-[12px] text-neutral-500 flex items-center shrink-0">
                    <span>首页</span>
                    <span className="mx-2">&gt;</span>
                    <span>工作台</span>
                    <span className="mx-2">&gt;</span>
                    <span>一站式i人事服务大厅</span>
                </div>

                {/* 内容区域 */}
                <div className="flex flex-1 overflow-hidden gap-4 relative">
                    {/* 左侧/主内容区 */}
                    <div className={`bg-[#FFFFFF] p-4 relative rounded-[8px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex flex-col overflow-hidden transition-all duration-300 ${showSplitView ? 'w-1/2' : 'flex-1'}`}>
                        
                        {/* 悬浮操作按钮 */}
                        <div className="absolute top-8 right-8 flex items-center gap-2 z-20">
                            {chatStarted && (
                                <button onClick={handleNewChat} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-[4px] transition-colors bg-white/80 backdrop-blur-sm border border-neutral-200 shadow-sm">
                                    <MessageSquarePlus size={16} />
                                    <span>新建对话</span>
                                </button>
                            )}
                            <button onClick={() => setShowHistoryPanel(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 rounded-[4px] transition-colors bg-white/80 backdrop-blur-sm border border-neutral-200 shadow-sm">
                                <History size={16} />
                                <span>历史记录</span>
                            </button>
                        </div>

                        {!chatStarted ? (
                            // 初始居中状态
                            <div className="flex flex-col flex-1 overflow-y-auto items-center justify-center">
                                <div className="w-full max-w-4xl flex flex-col items-center -mt-32">
                                    <h2 className="text-3xl font-medium text-gray-800 mb-10">一站式i人事服务大厅</h2>
                                    {renderInputBox()}
                                    
                                    {/* 内置技能 */}
                                    <div className="flex flex-col items-center gap-8 mt-8 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        {/* 快捷操作 */}
                                        <div className="flex flex-col items-center gap-3 w-full">
                                            <div className="flex items-center gap-2 text-neutral-400 mb-1">
                                                <Sparkles size={14} />
                                                <span className="text-xs font-medium tracking-wider">快捷操作</span>
                                                <Sparkles size={14} />
                                            </div>
                                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                                <button 
                                                    onClick={() => setInputValue('一键批量导入员工')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 hover:border-[#15B8A6]/30 transition-all shadow-sm group"
                                                >
                                                    <Users size={16} className="text-[#15B8A6] group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm text-neutral-700 group-hover:text-[#15B8A6] transition-colors">一键批量导入员工</span>
                                                </button>
                                                <button 
                                                    onClick={() => setInputValue('余额不足提醒管理员')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 hover:border-[#15B8A6]/30 transition-all shadow-sm group"
                                                >
                                                    <Bell size={16} className="text-[#15B8A6] group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm text-neutral-700 group-hover:text-[#15B8A6] transition-colors">余额不足提醒管理员</span>
                                                </button>
                                                <button 
                                                    onClick={() => setInputValue('一键创建部门职位')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 hover:border-[#15B8A6]/30 transition-all shadow-sm group"
                                                >
                                                    <Building2 size={16} className="text-[#15B8A6] group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm text-neutral-700 group-hover:text-[#15B8A6] transition-colors">一键创建部门职位</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* 深度洞察 & 交叉分析 */}
                                        <div className="flex flex-col items-center gap-3 w-full">
                                            <div className="flex items-center gap-2 text-indigo-400 mb-1">
                                                <PieChartIcon size={14} />
                                                <span className="text-xs font-medium tracking-wider">深度洞察 & 交叉分析</span>
                                                <BarChart2 size={14} />
                                            </div>
                                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                                <button 
                                                    onClick={() => setInputValue('员工年龄占比统计')} 
                                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm group"
                                                >
                                                    <PieChartIcon size={16} className="text-blue-500 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm text-neutral-700 group-hover:text-blue-700 transition-colors">员工年龄占比</span>
                                                </button>
                                                <button 
                                                    onClick={() => setInputValue('员工年龄和性别占比统计')} 
                                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-purple-100 rounded-full hover:bg-purple-50 hover:border-purple-300 transition-all shadow-sm group"
                                                >
                                                    <BarChart2 size={16} className="text-purple-500 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm text-neutral-700 group-hover:text-purple-700 transition-colors">年龄与性别交叉分析</span>
                                                </button>
                                                <button 
                                                    onClick={() => setInputValue('员工司龄占比统计')} 
                                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-100 rounded-full hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm group"
                                                >
                                                    <Activity size={16} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm text-neutral-700 group-hover:text-emerald-700 transition-colors">员工司龄统计</span>
                                                </button>
                                                <button 
                                                    onClick={() => setInputValue('综合分析员工年龄、性别与司龄分布')} 
                                                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full hover:from-indigo-100 hover:to-purple-100 hover:shadow-md transition-all shadow-sm group"
                                                >
                                                    <Layers size={16} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm text-indigo-700 font-medium">多维度综合画像</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // 聊天状态
                            <div className="flex flex-col flex-1 h-full overflow-hidden">
                                {/* 聊天历史记录 */}
                                <div className="flex-1 overflow-y-auto py-2 space-y-6">
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-3'}`}>
                                            {msg.role === 'ai' && (
                                                <div className="w-8 h-8 rounded-[8px] bg-[#15B8A6]/10 flex items-center justify-center shrink-0">
                                                    <Sparkles size={16} className="text-[#15B8A6]" />
                                                </div>
                                            )}
                                            <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                                                {msg.type === 'card' ? (
                                                    <div 
                                                        onClick={() => {
                                                            setActiveChart(msg.cardData);
                                                            setShowSplitView(true);
                                                        }}
                                                        className={`bg-white border rounded-[8px] p-4 cursor-pointer transition-all group ${
                                                            showSplitView && activeChart?.type === msg.cardData.type ? 'border-[#15B8A6] shadow-sm ring-1 ring-[#15B8A6]/20' : 'border-neutral-200 hover:border-[#15B8A6] hover:shadow-md'
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 rounded-[8px] bg-blue-50 flex items-center justify-center">
                                                                    <PieChartIcon size={18} className="text-blue-500" />
                                                                </div>
                                                                <span className="font-medium text-gray-800">{msg.cardData.title}</span>
                                                            </div>
                                                            <ChevronRight size={16} className={`transition-colors ${showSplitView ? 'text-[#15B8A6]' : 'text-neutral-400 group-hover:text-[#15B8A6]'}`} />
                                                        </div>
                                                        <p className="text-sm text-neutral-500">{msg.cardData.desc}</p>
                                                    </div>
                                                ) : (
                                                    <div className={`px-4 py-2.5 text-[14px] leading-relaxed ${
                                                        msg.role === 'user' 
                                                        ? 'bg-[#15B8A6]/10 text-neutral-800 rounded-[8px] rounded-tr-[2px]' 
                                                        : 'text-neutral-800'
                                                    }`}>
                                                        {msg.content}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {isThinking && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-[8px] bg-[#15B8A6]/10 flex items-center justify-center shrink-0">
                                                <Sparkles size={16} className="text-[#15B8A6]" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-sm text-neutral-500 bg-neutral-50 px-4 py-2.5 rounded-[8px] rounded-tl-[2px] border border-neutral-100">
                                                    <Loader2 size={14} className="animate-spin text-[#15B8A6]" />
                                                    <span>正在查询员工数据，进行性别比例分析...</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                                {/* 底部输入框 */}
                                <div className="pt-4 mt-2 border-t border-neutral-100 shrink-0 bg-white -mx-4 px-4">
                                    <div className="max-w-4xl mx-auto">
                                        {renderInputBox()}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 右侧分屏区 (图表) */}
                    {showSplitView && activeChart && (
                        <div className="bg-[#FFFFFF] p-4 rounded-[8px] shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex flex-col w-1/2 overflow-hidden animate-in slide-in-from-right-8 duration-300">
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 shrink-0">
                                <div className="flex items-center gap-2">
                                    <PieChartIcon size={18} className="text-[#15B8A6]" />
                                    <h3 className="text-[16px] font-medium text-gray-800">{activeChart.title}</h3>
                                </div>
                                <button onClick={() => setShowSplitView(false)} className="p-1.5 hover:bg-neutral-100 rounded-[4px] text-neutral-500 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="flex-1 flex flex-col pt-6 relative overflow-hidden">
                                <div className="text-sm text-neutral-500 mb-4 shrink-0">
                                    <p>总人数：<span className="font-semibold text-gray-800 text-lg">1,000</span> 人</p>
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-center min-h-0 w-full">
                                    {renderChart()}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* 历史记录侧边栏 */}
                    <div 
                        className={`absolute top-0 right-0 bottom-0 w-[320px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] z-40 flex flex-col transition-transform duration-300 transform rounded-l-2xl ${
                            showHistoryPanel ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-neutral-100 shrink-0">
                            <h3 className="font-medium text-gray-800 text-base">历史对话</h3>
                            <button onClick={() => setShowHistoryPanel(false)} className="p-1.5 hover:bg-neutral-100 rounded-md text-neutral-500 transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 bg-neutral-50/30">
                            <div className="flex flex-col gap-3">
                                {mockHistory.map(item => (
                                    <div 
                                        key={item.id}
                                        onClick={() => loadHistory(item)}
                                        className="p-4 border border-neutral-200 rounded-xl hover:border-[#15B8A6] hover:shadow-md cursor-pointer transition-all bg-white group flex flex-col gap-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-gray-800 group-hover:text-[#15B8A6] transition-colors truncate pr-2">{item.title}</h4>
                                        </div>
                                        <p className="text-sm text-neutral-500 line-clamp-2">{item.preview}</p>
                                        <span className="text-xs text-neutral-400 shrink-0 mt-1">{item.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* 侧边栏遮罩层 */}
                    {showHistoryPanel && (
                        <div 
                            className="absolute inset-0 bg-black/5 z-30 transition-opacity rounded-lg"
                            onClick={() => setShowHistoryPanel(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkspacePage;

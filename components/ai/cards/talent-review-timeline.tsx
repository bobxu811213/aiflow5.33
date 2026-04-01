
import React, { useRef, useState } from 'react';
import { Star, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface TalentReviewTimelineProps {
    sectionNumber?: string | number;
    initialTimeRange?: string;
}

interface TimelineEvent {
    id: string;
    date: string;
    title: string;
    subTitle: string;
    type: 'risk' | 'star' | 'backbone' | 'growth' | 'potential';
    position: 'top' | 'bottom';
}

export const TalentReviewTimeline: React.FC<TalentReviewTimelineProps> = ({ sectionNumber, initialTimeRange }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [timeRange, setTimeRange] = useState(initialTimeRange || '全部');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const timeRanges = ['本年度', '上年度', '近2年', '近3年', '全部'];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const events: TimelineEvent[] = [
        {
            id: '1',
            date: '2023-06',
            title: '潜在危机',
            subTitle: '绩效-价值观盘点',
            type: 'risk',
            position: 'top'
        },
        {
            id: '2',
            date: '2024-06',
            title: '中坚力量',
            subTitle: '潜力-绩效盘点',
            type: 'backbone',
            position: 'bottom'
        },
        {
            id: '3',
            date: '2024-07',
            title: '潜力明星',
            subTitle: '潜力-绩效盘点',
            type: 'potential',
            position: 'top'
        },
        {
            id: '4',
            date: '2024-10',
            title: '骨干人才',
            subTitle: '潜力-能力盘点',
            type: 'backbone',
            position: 'bottom'
        },
        {
            id: '5',
            date: '2025-10',
            title: '明星人才',
            subTitle: '能力-绩效盘点',
            type: 'star',
            position: 'top'
        },
        {
            id: '6',
            date: '2026-01', // Updated to be recent
            title: '成长型领导',
            subTitle: '绩效-职级盘点',
            type: 'growth',
            position: 'top'
        }
    ];

    const filteredEvents = events.filter(event => {
        if (timeRange === '全部') return true;
        const year = parseInt(event.date.split('-')[0]);
        const currentYear = 2026; // Fixed for demo consistency
        if (timeRange === '本年度') return year === currentYear;
        if (timeRange === '上年度') return year === currentYear - 1;
        if (timeRange === '近2年') return year >= currentYear - 1;
        if (timeRange === '近3年') return year >= currentYear - 2;
        return true;
    });

    const getEventStyle = (type: string) => {
        switch (type) {
            case 'risk':
                return { bg: 'bg-gray-50', iconColor: 'text-orange-400', textColor: 'text-gray-800' };
            case 'star':
                return { bg: 'bg-gray-50', iconColor: 'text-green-500', textColor: 'text-gray-800' };
            case 'backbone':
                return { bg: 'bg-gray-50', iconColor: 'text-green-500', textColor: 'text-gray-800' }; // Using green for backbone based on image
            case 'potential':
                return { bg: 'bg-gray-50', iconColor: 'text-cyan-400', textColor: 'text-gray-800' };
            case 'growth':
                return { bg: 'bg-gray-50', iconColor: 'text-orange-400', textColor: 'text-gray-800' };
            default:
                return { bg: 'bg-gray-50', iconColor: 'text-gray-400', textColor: 'text-gray-800' };
        }
    };

    // Custom icon rendering based on type if needed, but they all seem to use Star in the image
    const renderIcon = (type: string) => {
        const style = getEventStyle(type);
        return (
            <div className={`w-4 h-4 flex items-center justify-center rounded-sm ${type === 'backbone' || type === 'star' ? 'bg-green-100' : type === 'potential' ? 'bg-cyan-100' : 'bg-orange-100'}`}>
                <Star size={10} className={style.iconColor} fill="currentColor" />
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6 border-l-4 border-[#13A695] pl-3">
                <h3 className="font-bold text-gray-800 text-base">人才盘点-时间轴模式</h3>
                <div className="relative inline-block">
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between w-32 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <span>{timeRange}</span>
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
                            {timeRanges.map((range) => (
                                <div 
                                    key={range}
                                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                        setTimeRange(range);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {range}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="relative group">
                {/* Scroll Buttons */}
                <button 
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                    <ChevronLeft size={16} className="text-gray-600" />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                    <ChevronRight size={16} className="text-gray-600" />
                </button>

                <div 
                    ref={scrollContainerRef}
                    className="relative overflow-x-auto pb-8 pt-4 scrollbar-hide min-h-[300px]"
                >
                {/* Main Axis Line */}
                <div className="absolute top-1/2 left-0 w-[1250px] h-0.5 bg-[#13A695]/30 -translate-y-1/2"></div>

                <div className="relative w-[1250px] h-[300px]">
                    
                    {filteredEvents.map((event, index) => {
                        const leftPos = 50 + index * 220; // Dynamic spacing
                        const isTop = event.position === 'top';
                        const style = getEventStyle(event.type);
                        
                        return (
                            <React.Fragment key={event.id}>
                                {/* Date Label */}
                                <div 
                                    className={`absolute text-sm text-gray-600 ${isTop ? 'mt-4' : 'mb-4 -translate-y-full'}`}
                                    style={{ left: `${leftPos + 40}px`, top: isTop ? '52%' : '45%' }}
                                >
                                    {event.date}
                                </div>

                                {/* Dot */}
                                <div 
                                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#13A695] border-2 border-white shadow-sm z-10"
                                    style={{ left: `${leftPos + 70}px` }}
                                ></div>

                                {/* Card */}
                                <div 
                                    className="absolute"
                                    style={{ left: `${leftPos}px`, ...(isTop ? { top: '80px' } : { bottom: '40px' }) }}
                                >
                                    <div className="bg-gray-50 p-3 rounded-lg w-[140px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className={`w-4 h-4 flex items-center justify-center rounded-sm ${
                                                event.type === 'backbone' || event.type === 'star' ? 'bg-green-100' : 
                                                event.type === 'potential' ? 'bg-cyan-100' : 
                                                event.type === 'growth' ? 'bg-orange-100' : 'bg-orange-100'
                                            }`}>
                                                <Star size={10} className={style.iconColor} fill="currentColor" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-800">{event.title}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">{event.subTitle}</div>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}

                </div>
            </div>
            </div>
        </div>
    );
};

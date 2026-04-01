
import React, { useRef } from 'react';
import { Building2, ChevronRight, ChevronLeft, Briefcase } from 'lucide-react';

interface WorkExperienceTimelineProps {
    sectionNumber?: string | number;
}

export const WorkExperienceTimeline: React.FC<WorkExperienceTimelineProps> = ({ sectionNumber }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6 border-l-4 border-[#13A695] pl-3">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">工作经历</h3>
                </div>
            </div>

            {/* Summary Banner */}
            <div className="bg-gray-50 rounded-lg p-3 mb-8 text-sm text-gray-600 flex items-center">
                <span className="font-medium text-gray-900 mr-1">2020-07入职</span>，
                <span className="mr-1">司龄3.5年</span>，
                <span className="mr-1">曾任职2家公司</span>，
                <span>累计工龄7年</span>
            </div>

            {/* Timeline Container */}
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
                    className="overflow-x-auto pb-8 pt-4 scrollbar-hide relative min-h-[300px]"
                >
                    {/* Main Axis Line */}
                    <div className="absolute top-1/2 left-0 w-[1200px] h-0.5 bg-[#13A695]/30 -translate-y-1/2"></div>

                    <div className="relative w-[1200px] h-[300px]">
                        {/* Event 1: Xiaomi (Bottom) */}
                        <div className="absolute left-0 bottom-[20px] w-[200px]">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-start gap-3 opacity-60">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                    <Building2 size={16} className="text-gray-500" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-700 text-sm">小米科技</div>
                                    <div className="text-xs text-gray-500 mt-1">Android开发工程师</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-[100px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#13A695] border-2 border-white shadow-sm z-10"></div>
                        <div className="absolute left-[50px] top-[52%] mt-4 text-sm text-gray-600">~2019-06-30</div>

                         {/* Event 2: Previous Job (Top - Cutoff) */}
                         <div className="absolute left-0 top-[20px] w-[180px] -ml-[100px] opacity-40">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <div className="font-bold text-gray-700 text-sm">...术有限公司</div>
                                <div className="text-xs text-gray-500 mt-1">...发</div>
                            </div>
                        </div>
                        <div className="absolute left-[10px] top-[42%] mb-4 text-sm text-gray-600">2019-09-01~2020-06-30</div>


                        {/* Event 3: Entry (Top) */}
                        <div className="absolute left-[250px] top-[20px] w-[240px]">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-[#1890FF] flex items-center justify-center shrink-0">
                                            <Building2 size={10} className="text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">上海新理想集团/上...</span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">入职</span>
                                </div>
                                <div className="pl-7">
                                    <div className="text-xs text-gray-600">海研发中心/社创组</div>
                                    <div className="text-xs text-gray-500 mt-1">算法工程师 <span className="mx-1 text-gray-300">|</span> P4</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-[370px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#13A695] border-2 border-white shadow-sm z-10"></div>
                        <div className="absolute left-[330px] top-[52%] mt-4 text-sm text-gray-600">2020-07-01</div>


                        {/* Event 4: Regular (Bottom) */}
                        <div className="absolute left-[400px] bottom-[20px] w-[240px]">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-[#1890FF] flex items-center justify-center shrink-0">
                                            <Building2 size={10} className="text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">上海新理想集团/上...</span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">转正</span>
                                </div>
                                <div className="pl-7">
                                    <div className="text-xs text-gray-600">海研发中心/社创组</div>
                                    <div className="text-xs text-gray-500 mt-1">算法工程师 <span className="mx-1 text-gray-300">|</span> P4</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-[520px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#13A695] border-2 border-white shadow-sm z-10"></div>
                        <div className="absolute left-[480px] top-[42%] mb-4 text-sm text-gray-600">2020-10-01</div>


                        {/* Event 5: Transfer (Top) */}
                        <div className="absolute left-[550px] top-[20px] w-[220px]">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-[#1890FF] flex items-center justify-center shrink-0">
                                            <Building2 size={10} className="text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">上海新理想集团/上...</span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-100">调动</span>
                                </div>
                                <div className="pl-7">
                                    <div className="text-xs text-gray-600">海研发中心/平台组</div>
                                    <div className="text-xs text-gray-500 mt-1">技术架构师 <span className="mx-1 text-gray-300">|</span> P6</div>
                                </div>
                            </div>
                        </div>
                        {/* No specific dot for transfer in image, but let's add one for visual consistency or skip if image doesn't have it. Image has a dot at 2022-10-01 which is empty */}
                        
                        
                        {/* Marker 2022-10-01 */}
                        <div className="absolute left-[670px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#13A695] border-2 border-white shadow-sm z-10"></div>
                        <div className="absolute left-[630px] top-[52%] mt-4 text-sm text-gray-600">2022-10-01</div>


                        {/* Event 7: Resign (Bottom) */}
                        <div className="absolute left-[700px] bottom-[20px] w-[240px]">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-[#1890FF] flex items-center justify-center shrink-0">
                                            <Building2 size={10} className="text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">上海新理想集团/上...</span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">离职</span>
                                </div>
                                <div className="pl-7">
                                    <div className="text-xs text-gray-600">海研发中心/平台组</div>
                                    <div className="text-xs text-gray-500 mt-1">技术架构师 <span className="mx-1 text-gray-300">|</span> P6</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-[820px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#13A695] border-2 border-white shadow-sm z-10"></div>
                        <div className="absolute left-[780px] top-[42%] mb-4 text-sm text-gray-600">2023-05-10</div>


                        {/* Event 8: Re-entry (Top) */}
                        <div className="absolute left-[850px] top-[20px] w-[240px]">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-[#1890FF] flex items-center justify-center shrink-0">
                                            <Building2 size={10} className="text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">上海新理想集团/上...</span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">复职</span>
                                </div>
                                <div className="pl-7">
                                    <div className="text-xs text-gray-600">海研发中心/平台组</div>
                                    <div className="text-xs text-gray-500 mt-1">技术架构师 <span className="mx-1 text-gray-300">|</span> P6</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-[970px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#13A695] border-2 border-white shadow-sm z-10"></div>
                        <div className="absolute left-[930px] top-[52%] mt-4 text-sm text-gray-600">2025-03-18</div>

                    </div>
                </div>
            </div>
        </div>
    );
};


import React, { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';

interface TalentReviewGridProps {
    sectionNumber?: string | number;
    initialScheme?: string;
}

export const TalentReviewGrid: React.FC<TalentReviewGridProps> = ({ sectionNumber, initialScheme }) => {
    const [scheme, setScheme] = useState(initialScheme || '绩效-能力盘点方案');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const schemes = ['绩效-能力盘点方案', '潜力-绩效盘点方案', '价值观-业绩盘点方案', '绩效-职级盘点方案'];

    // Grid configuration based on scheme
    const getGridData = (currentScheme: string) => {
        if (currentScheme === '价值观-业绩盘点方案') {
            return [
                [
                    { label: '野狗', color: 'bg-red-50' },
                    { label: '中坚力量', color: 'bg-blue-50' },
                    { label: '明星', color: 'bg-yellow-50' }
                ],
                [
                    { label: '问题员工', color: 'bg-gray-50' },
                    { label: '合格员工', color: 'bg-blue-50' },
                    { label: '老黄牛', color: 'bg-yellow-50' }
                ],
                [
                    { label: '小白兔', color: 'bg-gray-50' },
                    { label: '待提升', color: 'bg-red-50' },
                    { label: '工兵', color: 'bg-blue-50' }
                ]
            ];
        }
        // Default: 绩效-能力
        return [
            [
                { label: '关注人才', color: 'bg-yellow-50' },
                { label: '核心人才', color: 'bg-blue-50' },
                { label: '明星人才', color: 'bg-yellow-50' }
            ],
            [
                { label: '待提升人才', color: 'bg-red-50' },
                { label: '骨干人才', color: 'bg-yellow-50' },
                { label: '核心人才', color: 'bg-blue-50' }
            ],
            [
                { label: '待优化人才', color: 'bg-purple-50' },
                { label: '待提升人才', color: 'bg-red-50' },
                { label: '待提升人才', color: 'bg-yellow-50' }
            ]
        ];
    };

    const gridData = getGridData(scheme);

    // Current employee position (example: High Performance, High Potential -> Star)
    // ... (rest of the logic)

    // Current employee position (example: High Performance, High Potential -> Star)
    // 0,0 is Top Left (High Potential, Low Performance) - Wait, usually:
    // Y axis (Potential): High (Top), Medium, Low (Bottom)
    // X axis (Performance): Low (Left), Medium, High (Right)
    
    // So:
    // Row 0 (High Pot): Low Perf, Med Perf, High Perf
    // Row 1 (Med Pot): Low Perf, Med Perf, High Perf
    // Row 2 (Low Pot): Low Perf, Med Perf, High Perf

    // Let's place the user in "明星人才" (High Pot, High Perf) -> Row 0, Col 2
    // Or "骨干人才" (Med Pot, Med Perf) -> Row 1, Col 1
    
    // Let's simulate history points
    const historyPoints = [
        { year: '2021', row: 0, col: 0, label: '关注人才' },
        { year: '2022', row: 1, col: 0, label: '待提升人才' },
        { year: '2023', row: 2, col: 1, label: '待提升人才' }, // This path seems weird, let's make it progressive
    ];
    
    // Let's try a better path:
    // 2021: Low Pot, Med Perf (Row 2, Col 1) -> 待提升人才
    // 2022: Med Pot, Med Perf (Row 1, Col 1) -> 骨干人才
    // 2023: High Pot, High Perf (Row 0, Col 2) -> 明星人才
    
    const currentPosition = { row: 0, col: 2 }; // Star

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6 border-l-4 border-[#13A695] pl-3">
                <h3 className="font-bold text-gray-800 text-base">人才盘点-宫格模式</h3>
                <div className="relative inline-block">
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between w-48 px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <span>{scheme}</span>
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                            {schemes.map((s) => (
                                <div 
                                    key={s}
                                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                        setScheme(s);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="relative pl-8 pb-8">
                {/* Y Axis Label */}
                <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between items-center w-6 text-xs text-gray-500">
                    <span>高</span>
                    <span className="writing-vertical-rl transform rotate-180 font-medium text-gray-700 tracking-widest">能力</span>
                    <span>低</span>
                </div>
                
                {/* Y Axis Line */}
                <div className="absolute left-7 top-0 bottom-8 w-px bg-gray-200"></div>

                {/* Grid Content */}
                <div className="grid grid-cols-3 gap-1 border border-gray-200 bg-gray-200">
                    {gridData.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <div 
                                    key={`${rowIndex}-${colIndex}`} 
                                    className={`aspect-[2/1] ${cell.color} p-4 flex flex-col items-center justify-center relative group hover:brightness-95 transition-all`}
                                >
                                    <span className="text-gray-700 font-medium text-sm">{cell.label}</span>
                                    
                                    {/* Render history points if any match this cell */}
                                    {historyPoints.map((point, idx) => {
                                        if (point.row === rowIndex && point.col === colIndex) {
                                            return (
                                                <div key={idx} className="mt-2 text-xs text-gray-500">
                                                    {point.year}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                {/* X Axis Line */}
                <div className="absolute left-8 right-0 bottom-7 h-px bg-gray-200"></div>

                {/* X Axis Label */}
                <div className="absolute left-8 right-0 bottom-0 flex justify-between items-center h-6 text-xs text-gray-500 px-4">
                    <span>低</span>
                    <span className="font-medium text-gray-700 tracking-widest">绩效</span>
                    <span>高</span>
                </div>
            </div>
        </div>
    );
};

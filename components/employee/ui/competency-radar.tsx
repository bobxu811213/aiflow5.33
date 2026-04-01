
import React from 'react';

// Helper for Radar Chart
const getRadarPoint = (score: number, index: number, total: number, cx: number, cy: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    // Scale score 0-100 to radius
    const x = cx + (radius * (score / 100)) * Math.cos(angle);
    const y = cy + (radius * (score / 100)) * Math.sin(angle);
    return { x, y };
};

export const CompetencyRadar = ({ scores }: { scores: { label: string, score: number }[] }) => {
    const size = 200;
    const cx = size / 2;
    const cy = size / 2;
    const radius = (size / 2) - 30;
    const levels = 4;

    const points = scores.map((d, i) => getRadarPoint(d.score, i, scores.length, cx, cy, radius));
    const polyPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <div className="relative flex justify-center items-center h-[200px] w-[220px]">
            <svg width={size} height={size} className="overflow-visible">
                {/* Grid */}
                {Array.from({ length: levels }).map((_, l) => {
                    const levelRadius = radius * ((l + 1) / levels);
                    const levelPoints = scores.map((_, i) => {
                        const p = getRadarPoint(100, i, scores.length, cx, cy, levelRadius);
                        return `${p.x},${p.y}`;
                    }).join(' ');
                    return (
                        <polygon 
                            key={l} 
                            points={levelPoints} 
                            fill={l === levels - 1 ? "rgba(244, 242, 255, 0.2)" : "none"} 
                            stroke="#E9E9E9" 
                            strokeWidth="1" 
                        />
                    );
                })}
                
                {/* Axes */}
                {scores.map((_, i) => {
                    const p = getRadarPoint(100, i, scores.length, cx, cy, radius);
                    return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E9E9E9" strokeWidth="1" />;
                })}

                {/* Data Polygon */}
                <polygon points={polyPoints} fill="rgba(146, 127, 255, 0.2)" stroke="#927FFF" strokeWidth="2" />
                
                {/* Points */}
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#927FFF" stroke="white" strokeWidth="1.5" />
                ))}

                {/* Labels */}
                {scores.map((d, i) => {
                    const p = getRadarPoint(135, i, scores.length, cx, cy, radius);
                    return (
                        <text 
                            key={i} 
                            x={p.x} 
                            y={p.y} 
                            textAnchor="middle" 
                            dominantBaseline="middle" 
                            className="text-[10px] fill-gray-500 font-medium"
                        >
                            {d.label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

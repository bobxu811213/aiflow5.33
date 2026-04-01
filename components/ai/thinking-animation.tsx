import React, { useState, useEffect } from 'react';

const CONTEXT_TIPS: Record<string, string[]> = {
    'PERFORMANCE': [
        "绩效指标需要遵循smart原则，确保目标具体、可衡量。",
        "定期进行绩效面谈，有助于及时发现问题并调整工作方向。",
        "绩效考核不仅是评估过去，更是为了规划未来和员工成长。"
    ],
    'ONBOARDING': [
        "入职审批流程可以自动化分配任务，提高效率。",
        "提前准备好入职材料，能让新员工更快融入团队。",
        "良好的入职体验能显著提升新员工的留存率。"
    ],
    'ATTENDANCE': [
        "合理的考勤规则能有效提升团队工作效率。",
        "弹性工作制可以提高员工的工作满意度。",
        "及时处理异常考勤，有助于维护公平的工作环境。"
    ],
    'EMPLOYEE': [
        "定期进行人才盘点，有助于发现和培养高潜员工。",
        "关注员工的职业发展诉求，能有效降低流失率。",
        "建立完善的员工档案，是人力资源管理的基础。"
    ],
    'DEFAULT': [
        "AI 助手可以帮您快速处理各种人力资源任务。",
        "通过自然语言对话，您可以轻松完成复杂的操作。",
        "AI 正在为您生成最佳的解决方案，请稍候..."
    ]
};

interface ThinkingAnimationProps {
    isComplete?: boolean;
    context?: string;
}

export const ThinkingAnimation: React.FC<ThinkingAnimationProps> = ({ isComplete = false, context = 'DEFAULT' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const tips = CONTEXT_TIPS[context] || CONTEXT_TIPS['DEFAULT'];

    useEffect(() => {
        if (isComplete) return;
        
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % tips.length);
                setIsVisible(true);
            }, 300); // Wait for fade out
        }, 5000);
        
        return () => clearInterval(interval);
    }, [isComplete, tips.length]);

    if (isComplete) return null;

    return (
        <div className="flex items-center w-full max-w-[400px]">
            <div className="flex-1 min-w-0 overflow-hidden flex items-center">
                <div 
                    className={`w-full flex items-center text-xs font-medium text-gray-600 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
                >
                    <span className="truncate block animate-pulse flex-1 min-w-0">
                        {tips[currentIndex]}
                    </span>
                </div>
            </div>
        </div>
    );
};

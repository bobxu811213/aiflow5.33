
import React from 'react';
import { Briefcase, AlertCircle, Calendar } from 'lucide-react';
import { AiInteractiveText } from '../ui/ai-interactive-text';
import { useAppStore } from '../../../store/use-app-store';

export const WorkExperienceTab = () => {
    const { highlightedWorkExperienceIds } = useAppStore();

    const workExperience = [
        { id: 1, company: '腾讯科技(深圳)有限公司', department: '微信事业群', position: '高级产品经理', start: '2021-07', end: '至今', desc: '负责微信支付相关业务的产品规划与迭代，主导了支付分产品的设计与推广，用户量突破1亿。' },
        { id: 2, company: '阿里巴巴(中国)网络技术有限公司', department: '淘宝技术部', position: '产品经理', start: '2019-07', end: '2021-06', desc: '参与淘宝首页推荐算法优化项目，通过数据驱动提升点击转化率(CTR)约15%。负责双11大促期间的活动页面搭建工具优化。' },
        { id: 5, company: '百度在线网络技术(北京)有限公司', department: '搜索架构部', position: '高级产品顾问', start: '2020-01', end: '2020-12', desc: '负责搜索引擎核心架构的优化咨询，提升检索速度与准确性。（注：此经历时间段与其他全职工作存在重叠，为兼职顾问性质）' },
        { id: 3, company: '北京字节跳动科技有限公司', department: '抖音研发', position: '产品实习生', start: '2018-07', end: '2019-06', desc: '协助进行用户增长策略分析，产出多份竞品分析报告。参与抖音早期创作者激励计划的运营支持工作。' },
        { id: 4, company: '微软(中国)有限公司', department: '亚洲研究院', position: '研发实习生', start: '2017-06', end: '2017-09', desc: '参与自然语言处理(NLP)相关课题研究，协助研究员进行数据清洗与模型训练。' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 min-h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Briefcase size={20} className="text-[#13A695]" />
                    <h3 className="font-bold text-gray-800 text-base">工作经历</h3>
                </div>
                <button className="text-primary text-sm hover:underline">+ 新增</button>
            </div>
            <div className="space-y-6 relative">
                <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-gray-100"></div>
                {workExperience.map((job, idx) => {
                    const isHighlighted = highlightedWorkExperienceIds.includes(job.id);
                    return (
                    <div key={job.id} className="relative pl-8 transition-all duration-300" id={`work-exp-${job.id}`}>
                        <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 transition-colors ${isHighlighted ? 'bg-orange-500 ring-2 ring-orange-200' : 'bg-[#FA8C16]'}`}></div>
                        <div className={`rounded-lg p-4 border transition-all duration-300 ${isHighlighted ? 'border-orange-400 bg-orange-50/50 shadow-md ring-1 ring-orange-200' : 'bg-gray-50 border-gray-100 hover:border-[#FA8C16]/30'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <AiInteractiveText text={job.company} type="company" />
                                    <span className="text-xs text-gray-400 px-1.5 py-0.5 bg-white rounded border border-gray-200">{job.department}</span>
                                    {isHighlighted && <span className="text-[10px] text-orange-500 bg-white border border-orange-200 px-1.5 py-0.5 rounded-full font-bold flex items-center"><AlertCircle size={10} className="mr-1"/>存疑</span>}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center bg-white px-2 py-1 rounded border border-gray-200">
                                    <Calendar size={12} className="mr-1.5" />
                                    {job.start} ~ {job.end}
                                </div>
                            </div>
                            <div className="mb-2 flex items-center">
                                <span className="text-sm font-medium text-gray-700 bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-xs border border-orange-100 mr-2">{job.position}</span>
                            </div>
                            <div className="text-sm text-gray-600 leading-relaxed bg-white p-2 rounded border border-gray-100/50">
                                <span className="text-gray-400 text-xs block mb-1">工作描述:</span>
                                {job.desc}
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
};

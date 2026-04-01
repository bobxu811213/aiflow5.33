
import React, { useState } from 'react';
import { Briefcase, Sparkles, User, Clock, Copy, ChevronUp, ChevronDown, Target, Smile, MinusCircle, CheckCircle2, FileText, Download, Printer, Maximize, PanelLeft, ZoomOut, ZoomIn, RotateCw, Search, Minimize2, HelpCircle } from 'lucide-react';
import { ResumeSection, ResumeField, OfferSectionHeader, OfferField } from '../ui/resume-helpers';
import { CompetencyRadar } from '../ui/competency-radar';

interface RecruitmentInfoTabProps {
    onViewInterview: (data: any) => void;
    onViewFeedback: (data: any) => void;
}

export const RecruitmentInfoTab: React.FC<RecruitmentInfoTabProps> = ({ onViewInterview, onViewFeedback }) => {
    const [recruitmentSubTab, setRecruitmentSubTab] = useState('标准简历');
    const [isResumeFullScreen, setIsResumeFullScreen] = useState(false);
    const [expandedAiInterviews, setExpandedAiInterviews] = useState<Record<string, boolean>>({ '2': true });

    const toggleAiInterviewExpand = (id: string) => {
        setExpandedAiInterviews(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const reviewRecords = [
        {
            id: 1,
            name: 'BD演示账号-请勿动',
            dept: 'I人事演示专用',
            job: '党委书记',
            initStage: '用人部门评估',
            belongStage: '用人部门评估',
            sendTime: '2025-09-30 10:51',
            status: '已失效'
        },
        {
            id: 2,
            name: '刘人力',
            dept: '人力资源部',
            job: '招聘经理',
            initStage: 'HR资格审查',
            belongStage: 'HR资格审查',
            sendTime: '2025-09-28 09:15',
            status: '已通过'
        },
        {
            id: 3,
            name: '王技术',
            dept: '研发部',
            job: '技术总监',
            initStage: '技术专业评审',
            belongStage: '技术专业评审',
            sendTime: '2025-09-29 14:30',
            status: '已通过'
        },
        {
            id: 4,
            name: '赵行政',
            dept: '行政部',
            job: '行政主管',
            initStage: '背景调查',
            belongStage: '背景调查',
            sendTime: '2025-10-01 10:00',
            status: '进行中'
        }
    ];

    const aiInterviewRecords = [
        {
            id: '2',
            title: '实习生性格测试面试',
            stage: '初筛',
            creator: '王技术',
            position: '产品实习生',
            createTime: '2025-11-05 14:20',
            score: 73,
            reportUrl: 'https://ai.hina.com/r/report?connectCode=21099073966&...',
            result: '候选人在本次面试中得分等级为：推荐。候选人在沟通协调和团队合作方面表现突出，能够主动沟通、化解分歧，并通过有效的时间管理和灵活的跟进方式推动任务进展。在问题解决能力上展现出良好的系统性思维和工具应用能力，能通过复现问题、抓包分析等方式高效定位技术瓶颈。学习能力具备一定积极性，能借助外部资源快速掌握新工具并投入实践。在细致严谨方面有基本的观察力，关注关键操作节点，但测试思路上略显零散，全面...',
            status: '已交卷',
            recommendation: '推荐',
            competencies: [
                { label: '学习能力', score: 65 },
                { label: '沟通协调能力', score: 75 },
                { label: '团队合作能力', score: 75 },
                { label: '细致严谨', score: 65 },
                { label: '问题解决能力', score: 85 }
            ]
        }
    ];

    const interviewHistory = [
        {
            id: 1,
            round: '初试',
            time: '2025-11-15 10:00 - 11:00',
            interviewer: '张三 (产品总监)',
            feedback: '候选人逻辑思维清晰，具备良好的沟通能力和团队协作精神。技术基础扎实，符合岗位要求。',
            result: '通过'
        },
        {
            id: 2,
            round: '复试',
            time: '2025-11-18 14:00 - 14:45',
            interviewer: 'BD演示账号-请勿动',
            feedback: '综合素质良好，稳定性高，职业规划清晰，薪资期望在合理范围内。',
            result: '通过'
        }
    ];

    const salaryStructure = [
        ['基本工资', '岗位职级工资'],
        ['餐费补贴', '通讯津贴标准'],
        ['费控项目发薪', '超信外部项目...'],
        ['浮动工资2', '年工'],
        ['绩效基数', '外派补贴'],
        ['职务工资', '住宿补贴'],
        ['保密费', '基本工资2'],
        ['瑞茂通集团薪...', '职称津贴'],
        ['通讯费补贴1', '证书补贴'],
        ['岗位津贴', '住房补助'],
        ['医疗保险个人', '医疗保险单位'],
        ['工伤保险', '岗位工资11'],
        ['驻地补贴', '绩效打分'],
        ['固定工资', '五险一金服务费'],
        ['各类奖金合计', '交通补贴'],
        ['职务津贴1', '年薪'],
        ['搬迁补贴1', '等级工资'],
    ];

    const renderSalaryRows = (baseSalary: string) => {
        return salaryStructure.map((row, idx) => (
            <React.Fragment key={idx}>
                <OfferField label={row[0]} value={row[0] === '基本工资' ? baseSalary : '-'} />
                <OfferField label={row[1]} value="-" />
            </React.Fragment>
        ));
    };

    const renderResumePage = (isFullScreen = false) => (
        <div className={`${isFullScreen ? 'w-[794px] min-h-[1123px] p-12' : 'w-[680px] min-h-[900px] p-10'} bg-white shadow-2xl text-[#333] font-sans text-sm relative transition-all mx-auto`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-4">
                <div>
                    <h1 className={`${isFullScreen ? 'text-3xl' : 'text-2xl'} font-bold text-[#2B579A] mb-2`}>君学集团 · 产品经理</h1>
                    <p className="text-gray-500 text-xs">上海 | 全职 | 3年经验</p>
                </div>
                <div className="text-right text-xs text-gray-400">
                    <p>更新时间：2025-11-10</p>
                </div>
            </div>

            {/* Content Block */}
            <div className="mb-8">
                <h3 className="text-[#2B579A] font-bold text-base mb-3 flex items-center gap-2 border-l-4 border-[#2B579A] pl-3">
                    工作内容及成果:
                </h3>
                <div className="space-y-4 pl-1">
                    <div>
                        <div className="font-bold text-gray-800 mb-1">用户调研分析:</div>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            对市场和用户进行调研分析, 确定产品方向, 洞察用户心理诉求, 挖掘用户需求。
                        </p>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 mb-1">产品规划:</div>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            构思产品可行性方案, 规划功能模块, 落地产品构想, 出具原型以及相关需求文档; 协调内部资源, 挖掘种子用户, 验证MVP产品; 设计数据埋点方案, 统计查看用户使用行为数据。
                        </p>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 mb-1">内部支持:</div>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            跟UI、技术、测试汇通产品需求, 制定迭代计划, 落地产品研发; 组织开展培训宣讲, 编写产品手册, 便于内部传播和对外宣传。
                        </p>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800 mb-1">方案研发:</div>
                        <p className="text-gray-600 leading-relaxed text-justify">
                            参与公司主题课产品方案研发, 根据教育行业周期特点, 遵循底层逻辑, 基于大环境和用户心理, 结合当前热点, 构思设计引流、裂变活动方案。
                        </p>
                    </div>
                </div>
            </div>

            {/* Next Section Teaser */}
            <div className="mt-12 pt-4 border-t border-gray-100 text-[#2B579A] font-bold text-lg text-center opacity-80">
                2016.4 - 2019.7
            </div>
            <div className="text-center text-gray-600 text-sm mt-1">
                上海图豆文化传播有限公司 · 技术研发
            </div>
            
            {/* Floating Page Number */}
            {isFullScreen && (
               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-300 text-xs">
                   1 / 1
               </div>
            )}
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 min-h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <Briefcase size={20} className="text-[#13A695]" />
                <h3 className="font-bold text-gray-800 text-base">招聘信息</h3>
            </div>

            {/* Sub Tabs */}
            <div className="flex gap-8 border-b border-gray-100 mb-6">
                {['原始简历', '标准简历', '评审记录', 'AI面试', '面试记录', 'Offer信息'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setRecruitmentSubTab(tab)}
                        className={`pb-2 text-sm font-medium transition-colors relative px-1 ${recruitmentSubTab === tab ? 'text-[#13A695]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {tab === 'AI面试' ? (
                            <span className="flex items-center gap-1">
                                <Sparkles size={12} className={recruitmentSubTab === tab ? 'text-[#927FFF]' : 'text-gray-400'} />
                                {tab}
                            </span>
                        ) : tab}
                        {recruitmentSubTab === tab && <div className={`absolute bottom-[-1px] left-0 right-0 h-0.5 ${tab === 'AI面试' ? 'bg-[#927FFF]' : 'bg-[#13A695]'}`}></div>}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1">
                {recruitmentSubTab === '标准简历' && (
                    <div className="bg-white rounded-lg pb-6">
                        {/* Personal Info */}
                        <ResumeSection title="个人信息">
                            <div className="grid grid-cols-2 gap-x-12">
                                <ResumeField label="姓名" value="金盟们" />
                                <ResumeField label="手机号码" value="18525639692" />
                                <ResumeField label="个人邮箱" value="230258641@qq.com" />
                                <ResumeField label="性别" value="男" />
                                <ResumeField label="出生日期" value="-" />
                                <ResumeField label="年龄" value="27" />
                                <ResumeField label="婚姻状况" value="-" />
                                <ResumeField label="民族" value="-" />
                                <ResumeField label="籍贯" value="-" />
                                <ResumeField label="现居住地" value="宁波" />
                                <ResumeField label="工作年限" value="4.2 年" />
                                <ResumeField label="参加工作时间" value="-" />
                            </div>
                        </ResumeSection>

                        {/* Highest Education */}
                        <ResumeSection title="最高学历">
                                <div className="grid grid-cols-2 gap-x-12">
                                <ResumeField label="最高学历" value="大专/高职" />
                                <ResumeField label="毕业时间" value="2021-07" />
                                <ResumeField label="毕业院校" value="商丘学院" />
                                <ResumeField label="是否统招" value="是" />
                                </div>
                        </ResumeSection>

                        {/* Last Job */}
                        <ResumeSection title="最近工作">
                                <div className="grid grid-cols-2 gap-x-12">
                                <ResumeField label="最近任职公司" value="宁波天益医疗器械股份有限公司" />
                                <ResumeField label="当前工作地点" value="-" />
                                </div>
                        </ResumeSection>

                        {/* Job Intent */}
                        <ResumeSection title="求职意向">
                                <div className="grid grid-cols-2 gap-x-12">
                                <ResumeField label="目前求职状态" value="在职看机会" />
                                <ResumeField label="期望工作职位" value="IT技术支持" />
                                <ResumeField label="期望工作地点" value="宁波" />
                                <ResumeField label="期望薪资" value="11K-20K" />
                                <ResumeField label="最快到岗时间" value="-" />
                                </div>
                        </ResumeSection>

                        {/* Work Experience */}
                        <ResumeSection title="工作经历">
                            <div className="mb-6 relative pl-4 border-l-2 border-[#13A695]">
                                <h5 className="font-bold text-gray-800 mb-4">工作经历一</h5>
                                <div className="grid grid-cols-2 gap-x-12 mb-4">
                                    <ResumeField label="开始时间" value="2023-03" />
                                    <ResumeField label="结束时间" value="至今" />
                                    <ResumeField label="公司名称" value="宁波天益医疗器械股份有限公司" />
                                    <ResumeField label="任职职位" value="系统工程师" />
                                    <ResumeField label="工作时长" value="2 年 6 个月" />
                                </div>
                                <div className="flex text-sm mb-4 w-full">
                                    <div className="text-gray-500 w-32 text-right mr-4 shrink-0 leading-6">工作内容：</div>
                                    <div className="text-gray-800 flex-1 leading-6 whitespace-pre-line text-justify">
                                        1、负责集团信息系统(MES、WMS、ERP、OA、BPA、AGV、SCADA、能耗监测系统等)的项目建设,从需求沟通、整理、分析到确认、编写,确保项目顺利推进并满足业务需求。<br/>
                                        2、依据项目计划,主导需求沟通确认、业务流程设计、系统测试、用户培训及验收工作,确保各阶段按时高质量完成,推动项目成功落地。<br/>
                                        3、精通MySQL、SQLServer、oracle sql数据库管理,负责集团核心业务数据库的日常维护与性能优化。熟练使用FineReport进行数据分析系统的开发,涵盖数据模型设计、报表生成及可视化展示,为决策提供有力支持。<br/>
                                        4、负责设计和开发ETL流程,从不同数据库源头抽取、转换和加载数据到数据仓库;优化数据转换和清洗过程,提高数据质量和性能。<br/>
                                        5、参与制定并执行数据备份策略,定期备份关键数据,确保数据恢复时的安全性和完整性。同时,为用户提供高效的技术支持和培训,解决技术难题,提升用户技术水平。<br/>
                                        6、负责实施全面的系统安全措施,包括访问控制、加密技术和漏洞修复,有效保护系统免受各类安全威胁,保障信息安全。<br/>
                                        7、编写详细的系统配置文档、操作手册和技术文档,记录系统配置与维护信息,确保信息完整且易于查阅,方便后续操作与维护。<br/>
                                        8、负责子公司信息化建设的整体规划与日常管理工作,推动信息化战略的有效实施,确保子公司信息化水平稳步提升。能耗采集
                                    </div>
                                </div>
                            </div>
                        </ResumeSection>

                        {/* Project Experience */}
                        <ResumeSection title="项目经验">
                            <div className="mb-8 relative pl-4 border-l-2 border-[#13A695]">
                                <h5 className="font-bold text-gray-800 mb-4">项目经验一</h5>
                                <div className="grid grid-cols-2 gap-x-12 mb-4">
                                    <ResumeField label="开始时间" value="2025-02" />
                                    <ResumeField label="结束时间" value="至今" />
                                    <ResumeField label="项目名称" value="7个月)" />
                                </div>
                                <div className="flex text-sm mb-4 w-full">
                                    <div className="text-gray-500 w-32 text-right mr-4 shrink-0 leading-6">项目描述：</div>
                                    <div className="text-gray-800 flex-1 leading-6 whitespace-pre-line text-justify">
                                        基于FineDataLink构建分布式数据仓库体系,整合ERP、WMS、MES、OA等业务系统数据源,设计ODS层、DWD层、DWS层三层架构,实现数据血缘关系追溯与冷热数据分级存储,通过实时同步引擎将业务数据延迟从24小时缩短至15分钟,支撑集团经营分析时效性提升70%。<br/>
                                        ETL流程开发与运维<br/>
                                        搭建自动化数据管道,使用FineDataLink开发ETL/ELT任务流50+个,涵盖生产、研发、采购、销售、供应链、财务等业务域。通过参数化配置实现动态sql生成,减少重复开发工作量60%。建立任务异常监控体系,配置企业微信告警策略,关键任务成功率提升至99.8%可视化报表体系搭建<br/>
                                        依托FineReport设计开发集团级BI平台,完成50+张复杂报表开发。创新应用决策、填报报表模式,实现销售漏斗、设备OEE等动态分析模型,被公司采纳为标准化分析模板跨系统协同开发将FineReport与ERP系统深度集成,深度检测系统中重要报表模块,如生产异常订单执行率、备料计划异常完成、产品及工序一次合格率……实现部门负责人对对应业务的实时监控及完成率跟踪。<br/>
                                        天益医疗大数据平台搭建
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-12">
                                    <ResumeField label="个人职责" value="-" />
                                </div>
                            </div>

                            <div className="mb-6 relative pl-4 border-l-2 border-[#13A695]">
                                <h5 className="font-bold text-gray-800 mb-4">项目经验二</h5>
                                <div className="grid grid-cols-2 gap-x-12 mb-4">
                                    <ResumeField label="开始时间" value="2023-05" />
                                    <ResumeField label="结束时间" value="2025-12" />
                                    <ResumeField label="项目名称" value="-" />
                                </div>
                                <div className="flex text-sm mb-4 w-full">
                                    <div className="text-gray-500 w-32 text-right mr-4 shrink-0 leading-6">项目描述：</div>
                                    <div className="text-gray-800 flex-1 leading-6 whitespace-pre-line text-justify">
                                        SCADA系统是一种基于计算机的工业自动化控制系统,主要用于数据采集、监视和控制。其主要功能包括数据采集、数据处理、数据传输、远程控制、报警与故障诊断以及信息展示。<br/>
                                        该项目主要实施范围包括监控注塑机运行状态、注塑机实时参数、电表、电子秤。<br/>
                                        SCADA
                                    </div>
                                </div>
                                <div className="flex text-sm mb-4 w-full">
                                    <div className="text-gray-500 w-32 text-right mr-4 shrink-0 leading-6">个人职责：</div>
                                    <div className="text-gray-800 flex-1 leading-6 whitespace-pre-line text-justify">
                                        1、根据项目需求,深入进行系统设计与分析,保障系统功能满足实际应用要求。<br/>
                                        2、编写系统程序、设备控制策略文件等文档,参与设计生产流程图、工艺参数表,规范操作流程。<br/>
                                        3、进行系统参数信息导入,完成电表数据与能耗数据对接测试,实现数据准确传输。<br/>
                                        4、分析设备运行状态,制定并跟踪改进措施,提高设备运行效率,降低故障率。
                                    </div>
                                </div>
                            </div>
                        </ResumeSection>
                    </div>
                )}

                {recruitmentSubTab === '原始简历' && (
                    <div className="flex flex-col items-center w-full">
                        <div className="w-[800px] flex justify-end gap-3 mb-3">
                            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#13A695] transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded hover:border-[#13A695] hover:shadow-sm">
                                <Download size={14} />
                                <span>下载</span>
                            </button>
                            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#13A695] transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded hover:border-[#13A695] hover:shadow-sm">
                                <Printer size={14} />
                                <span>打印</span>
                            </button>
                            <button 
                                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#13A695] transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded hover:border-[#13A695] hover:shadow-sm"
                                onClick={() => setIsResumeFullScreen(true)}
                            >
                                <Maximize size={14} />
                                <span>全屏预览</span>
                            </button>
                        </div>

                        <div className="w-[800px] h-[800px] flex flex-col shadow-xl rounded-sm overflow-hidden">
                            {/* Toolbar */}
                            <div className="bg-[#323639] text-gray-200 h-12 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
                                <div className="flex items-center gap-4">
                                    <PanelLeft size={20} className="cursor-pointer hover:text-white" />
                                    <span className="text-sm font-medium truncate max-w-[200px]" title="徐波波_产品经理_5年.pdf">徐波波_产品经理_5年.pdf</span>
                                </div>
                                <div className="flex items-center gap-3 bg-black/20 rounded px-2 py-1">
                                    <button className="hover:text-white transition-colors"><ZoomOut size={18} /></button>
                                    <span className="text-xs w-12 text-center bg-[#18191a] rounded px-1">100%</span>
                                    <button className="hover:text-white transition-colors"><ZoomIn size={18} /></button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="hover:text-white transition-colors" title="旋转"><RotateCw size={18} /></button>
                                    <button className="hover:text-white transition-colors" title="更多"><Search size={18} /></button>
                                </div>
                            </div>

                            {/* Viewer Area */}
                            <div className="flex-1 bg-[#525659] overflow-y-auto flex justify-center p-8 relative scrollbar-hide">
                                {renderResumePage(false)}
                                
                                {/* Floating Page Number */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#323639]/90 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                                    1 / 1
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {recruitmentSubTab === '评审记录' && (
                    <div className="space-y-4">
                        {reviewRecords.map((record) => (
                            <div key={record.id} className="bg-white border-b border-gray-100 py-6">
                                <div className="mb-3 text-sm text-gray-900">
                                    <span className="font-bold">{record.name}</span>
                                    <span className="text-gray-300 mx-2">|</span>
                                    <span className="text-gray-600">{record.dept}</span>
                                    <span className="text-gray-300 mx-2">|</span>
                                    <span className="text-gray-600">{record.job}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                                    <div className="flex">
                                        <span className="text-gray-500 mr-2">发起阶段：</span>
                                        {record.initStage}
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 mr-2">归属阶段：</span>
                                        {record.belongStage}
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 mr-2">发送时间：</span>
                                        {record.sendTime}
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 mr-2">评审状态：</span>
                                        <span className="text-gray-400">{record.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {recruitmentSubTab === 'AI面试' && (
                    <div className="space-y-6">
                        {aiInterviewRecords.map((record) => {
                            const isExpanded = expandedAiInterviews[record.id];
                            return (
                                <div key={record.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                                    {/* Header Row */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-[#F4F2FF] text-[#927FFF] px-2 py-1 rounded text-xs font-bold flex items-center">
                                                <Sparkles size={12} className="mr-1" /> AI面试
                                            </div>
                                            <h3 className="font-bold text-gray-800 text-base">{record.title}</h3>
                                            <span className="text-gray-400 text-sm">归属阶段: {record.stage}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-[#F6FFEC] text-[#52C41A] border border-[#B7EB8F] px-2 py-0.5 rounded text-xs">
                                                {record.status}
                                            </span>
                                            <HelpCircle size={14} className="text-gray-300" />
                                        </div>
                                    </div>

                                    {/* Meta Info Row */}
                                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <User size={14} /> 创建人: {record.creator}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Briefcase size={14} /> 创建职位: {record.position}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} /> 创建时间: {record.createTime}
                                        </div>
                                    </div>

                                    {/* Content Row */}
                                    <div className="flex gap-6">
                                        <div className="flex-1">
                                            {/* Report Link */}
                                            <div className="flex items-center gap-2 text-xs mb-3 text-gray-500">
                                                <span className="font-medium">AI报告:</span>
                                                <span className="text-[#927FFF] hover:underline cursor-pointer truncate max-w-[300px]">{record.reportUrl}</span>
                                                <Copy size={12} className="cursor-pointer hover:text-gray-700" />
                                            </div>

                                            {/* Evaluation Result */}
                                            <div>
                                                <div className="text-sm font-bold text-gray-800 mb-1">AI评估结果：</div>
                                                <div className={`text-sm text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                                                    {record.result}
                                                </div>
                                                <button 
                                                    onClick={() => toggleAiInterviewExpand(record.id)}
                                                    className="text-[#927FFF] text-xs mt-1 hover:underline flex items-center gap-0.5"
                                                >
                                                    {isExpanded ? '收起' : '展开'}
                                                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                                </button>
                                            </div>
                                            
                                            {/* Expanded Details */}
                                            {isExpanded && record.competencies.length > 0 && (
                                                <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="w-8 h-8 rounded bg-[#F4F2FF] flex items-center justify-center text-[#927FFF]">
                                                            <Target size={16} />
                                                        </div>
                                                        <div className="font-bold text-gray-800">岗位素质</div>
                                                        <div className="text-gray-400 text-sm ml-auto">得分: <span className="text-[#927FFF] font-bold">{record.score}</span> / 100</div>
                                                    </div>
                                                    
                                                    <div className="flex items-center">
                                                        {/* Radar Chart */}
                                                        <div className="w-[240px] shrink-0 border-r border-gray-200 mr-6 pr-6 flex justify-center">
                                                            <CompetencyRadar scores={record.competencies} />
                                                        </div>
                                                        
                                                        {/* Breakdown Bars */}
                                                        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
                                                            {record.competencies.map((comp, idx) => (
                                                                <div key={idx} className="flex flex-col gap-1">
                                                                    <div className="flex justify-between text-xs text-gray-600">
                                                                        <span>{comp.label}</span>
                                                                        <span className="font-bold text-gray-800">{comp.score}/100</span>
                                                                    </div>
                                                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                                        <div 
                                                                            className="h-full bg-[#6265F0] rounded-full" 
                                                                            style={{ width: `${comp.score}%` }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Score Section */}
                                        <div className="w-[120px] flex flex-col items-center justify-center shrink-0 border-l border-gray-100 pl-6">
                                            <div className="text-5xl font-light text-[#927FFF] mb-1">
                                                {record.score}
                                                <span className="text-lg ml-1">分</span>
                                            </div>
                                            {record.recommendation && (
                                                <div className="flex items-center gap-1 bg-[#FFF7E6] text-[#FA8C16] px-3 py-1 rounded-full text-xs font-bold border border-[#FFD591]">
                                                    <Smile size={14} />
                                                    {record.recommendation}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                
                {recruitmentSubTab === '面试记录' && (
                    <div className="space-y-6">
                        {interviewHistory.map((interview, index) => (
                            <div key={index} className="group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <MinusCircle size={20} className="text-[#13A695]" />
                                        <span className="text-gray-900 font-medium text-sm">
                                            {interview.time.split(' ')[0]} 
                                            <span className="ml-2">单面 · 现场面试</span>
                                        </span>
                                    </div>
                                    <button 
                                        className="border border-[#13A695] text-[#13A695] px-4 py-1 rounded-sm text-sm hover:bg-[#E6F8F6] transition-colors bg-white"
                                        onClick={() => onViewInterview(interview)}
                                    >
                                        查看
                                    </button>
                                </div>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-[#F9FAFB] px-4 py-3 flex items-center gap-4 text-sm text-gray-700">
                                        <span className="font-bold text-gray-900">{interview.round}</span>
                                        <div className="h-3 w-px bg-gray-300"></div>
                                        <span>面试时间：{interview.time.split(' ')[1]} {interview.time.split(' ')[2]} {interview.time.split(' ')[3]}</span>
                                        <div className="h-3 w-px bg-gray-300"></div>
                                        <span>时长：30分钟</span>
                                    </div>
                                    <div className="bg-white px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <User size={16} className="text-gray-400" />
                                                <span>{interview.interviewer || 'BD演示账号-请勿动'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <FileText size={16} className="text-gray-400" />
                                                <span>面试反馈：</span>
                                                {interview.result === '通过' ? (
                                                    <span className="flex items-center text-[#52C41A] font-medium">
                                                        <CheckCircle2 size={14} className="mr-1" />
                                                        通过
                                                    </span>
                                                ) : (
                                                    <span>{interview.result}</span>
                                                )}
                                            </div>
                                        </div>
                                        <button 
                                            className="text-[#13A695] font-medium text-sm hover:underline cursor-pointer"
                                            onClick={() => onViewFeedback(interview)}
                                        >
                                            查看
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {recruitmentSubTab === 'Offer信息' && (
                    <div className="bg-white rounded-lg pb-6">
                        <OfferSectionHeader title="基本信息" type="block" />
                        <div className="grid grid-cols-2 gap-y-6 gap-x-12 px-8 mb-10">
                            <OfferField label="入职部门" value="售前Demo专用-Fay统筹" />
                            <OfferField label="入职职位" value="产品经理" />
                            <OfferField label="预计入职日期" value="2025-10-02" />
                            <OfferField label="员工类型" value="全职" />
                            <OfferField label="职务" value="-" />
                            <OfferField label="职级" value="-" />
                            <OfferField label="工作地点" value="北京市" />
                            <OfferField label="合同公司" value="-" />
                            <OfferField label="试用期" value="3个月" />
                            <OfferField label="关联招聘需求" value="-" />
                            <OfferField label="试用期薪资" value="5000" />
                            <OfferField label="正式薪资" value="6000" />
                            <div className="flex text-sm">
                                <div className="w-[140px] text-right text-gray-500 mr-4 shrink-0 leading-6">录用审批状态：</div>
                                <div className="text-gray-800 flex-1 leading-6">
                                    <span className="text-[#52C41A] mr-3">已通过</span>
                                    <span className="text-[#13A695] cursor-pointer hover:underline">查看</span>
                                </div>
                            </div>
                            <div className="flex items-center text-sm">
                                    <div className="w-[140px] text-right text-gray-500 mr-4 shrink-0 leading-6">offer状态：</div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-300 line-through">已作废</span>
                                        <span className="text-[#13A695] cursor-pointer hover:underline">预览</span>
                                        <span className="text-[#13A695] cursor-pointer hover:underline">导出</span>
                                    </div>
                            </div>
                        </div>

                        <OfferSectionHeader title="试用期薪资" />
                        <div className="grid grid-cols-2 gap-y-6 gap-x-12 px-8 mb-10">
                            {renderSalaryRows('5,000')}
                        </div>

                        <OfferSectionHeader title="正式薪资" />
                        <div className="grid grid-cols-2 gap-y-6 gap-x-12 px-8">
                            {renderSalaryRows('6,000')}
                        </div>
                    </div>
                )}
            </div>

            {/* Full Screen Resume Preview Modal */}
            {isResumeFullScreen && (
                <div 
                    className="fixed inset-0 z-[100] bg-[#323639] flex flex-col animate-in fade-in duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Full Screen Toolbar */}
                    <div className="bg-[#202124] text-gray-200 h-14 flex items-center justify-between px-6 shrink-0 shadow-md z-10">
                            <div className="flex items-center gap-4 text-white">
                            <PanelLeft size={20} className="cursor-pointer hover:text-white opacity-80 hover:opacity-100" />
                            <span className="text-base font-medium truncate">徐波波_产品经理_5年.pdf</span>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-black/40 rounded-full px-4 py-1.5 border border-white/10">
                            <button className="hover:text-white transition-colors hover:scale-110"><ZoomOut size={18} /></button>
                            <span className="text-sm w-12 text-center">100%</span>
                            <button className="hover:text-white transition-colors hover:scale-110"><ZoomIn size={18} /></button>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full" title="旋转"><RotateCw size={18} /></button>
                            <button className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full" title="打印"><Printer size={18} /></button>
                            <button className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full" title="下载"><Download size={18} /></button>
                            <div className="w-px h-6 bg-gray-600 mx-1"></div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsResumeFullScreen(false);
                                }}
                                className="hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full text-gray-300" 
                                title="退出全屏"
                            >
                                <Minimize2 size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto flex justify-center p-8 relative scrollbar-hide bg-[#525659]">
                            {renderResumePage(true)}
                    </div>
                </div>
            )}
        </div>
    );
};

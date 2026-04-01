


import { IOrgNode, IJobPosition, IEmployee, IJobDuty, IJobDutyCategory, IPerformanceIndicator, IEsignTemplate, IVisitRecord, IRetroRule } from '../types';

export const mockOrgData: IOrgNode[] = [
  {
    id: '1',
    name: '许波波测试公司',
    type: '公司',
    level: 0,
    headcountCurrent: 23,
    headcountTotal: 230,
    establishmentCurrent: 0,
    establishmentTotal: 3,
    manager: 'AYUMI新增...',
    concurrentCount: 0,
    shortName: '简',
    expanded: true,
    code: 'COMP001',
    storeNumber: 'MD001',
    attribute: '中心',
    children: [
      {
        id: '2',
        name: '产品部',
        type: '部门',
        level: 1,
        headcountCurrent: 10,
        headcountTotal: 10,
        establishmentCurrent: 0,
        establishmentTotal: 0,
        manager: 'Ayumi有用...',
        concurrentCount: 3,
        isVirtual: true,
        expanded: false,
        attribute: '部门',
        description: '产品部作为连接市场与研发的核心枢纽，专注于用户需求挖掘与产品全生命周期管理。我们致力于通过敏捷迭代与数据驱动的决策机制，打造极致用户体验的行业标杆产品，引领业务创新，为公司构建可持续的竞争壁垒与商业价值，推动企业数字化转型的深入发展。',
        remark: '1. 部门周会固定于每周一上午10点召开，请提前准备周报。\n2. 所有产品设计文档需严格遵循公司信息安全规范进行归档。\n3. 跨部门需求变更需走OA审批流程，严禁口头变更。\n4. 季度团建费用请按预算执行，发票需在当月提交报销。\n5. 新员工入职需在首月完成产品知识库的认证考试。'
      },
      {
        id: '3',
        name: '研发部',
        type: '部门',
        level: 1,
        headcountCurrent: 48,
        headcountTotal: 99,
        establishmentCurrent: 0,
        establishmentTotal: 0,
        code: 'BBBB00018',
        concurrentCount: 3,
        expanded: true,
        attribute: '板块',
        children: [
           {
            id: '3-1',
            name: '财务部',
            type: '部门',
            level: 2,
            headcountCurrent: 15,
            headcountTotal: 15,
            establishmentCurrent: 0,
            establishmentTotal: 0,
            manager: '许学历',
            code: 'AYUMI00002',
            concurrentCount: 2,
            expanded: true,
            attribute: '部门',
            children: [
               {
                  id: '3-1-1',
                  name: '删除组织试...',
                  type: '部门',
                  level: 3,
                  headcountCurrent: 0,
                  headcountTotal: 0,
                  establishmentCurrent: 0,
                  establishmentTotal: 0,
                  manager: '蒋入职',
                  code: 'AYUNJJ 456...',
                  concurrentCount: 0,
                  attribute: '小组',
               }
            ]
          },
          {
            id: '3-2',
            name: '后勤',
            type: '部门',
            level: 2,
            headcountCurrent: 0,
            headcountTotal: 0,
            establishmentCurrent: 0,
            establishmentTotal: 0,
            code: 'BBBB00007',
            concurrentCount: 0,
            attribute: '部门',
          },
           {
            id: '3-3',
            name: '场控子',
            type: '部门',
            level: 2,
            headcountCurrent: 0,
            headcountTotal: 0,
            establishmentCurrent: 0,
            establishmentTotal: 0,
            code: 'BBBB00045',
            concurrentCount: 0,
            attribute: '部门',
          },
           {
            id: '3-4',
            name: '场控2子',
            type: '部门',
            level: 2,
            headcountCurrent: 0,
            headcountTotal: 0,
            establishmentCurrent: 0,
            establishmentTotal: 0,
            code: 'BBBB00046',
            concurrentCount: 0,
            attribute: '部门',
          }
        ]
      },
      {
        id: '4',
        name: '人事部',
        type: '部门',
        level: 1,
        headcountCurrent: 18,
        headcountTotal: 19,
        establishmentCurrent: 0,
        establishmentTotal: 0,
        manager: '许华为',
        concurrentCount: 2,
        expanded: false,
        attribute: '部门',
      },
       {
        id: '5',
        name: '回收站',
        type: '公司',
        level: 1,
        headcountCurrent: 1,
        headcountTotal: 51,
        establishmentCurrent: 0,
        establishmentTotal: 0,
        manager: '调动转正02',
        code: 'AYUMI00004',
        shortName: '简',
        concurrentCount: 0,
        expanded: true,
        attribute: '中心',
        children: [
            {
                id: '6',
                name: '停用的组织',
                type: '部门',
                level: 2,
                headcountCurrent: 11,
                headcountTotal: 13,
                establishmentCurrent: 0,
                establishmentTotal: 0,
                code: 'BBBB00017',
                concurrentCount: 0,
                attribute: '部门',
            }
        ]
      }
    ]
  }
];

export const mockJobData: IJobPosition[] = [
  { id: '1', name: '产品职位', code: 'ZW00009', department: '许波波测试公司/财务部', headcount: 0, status: '启用' },
  { id: '2', name: '产品职位', code: 'ZW00008', department: '许波波测试公司/研发部', headcount: 0, status: '启用' },
  { id: '3', name: '产品职位', code: 'ZW00007', department: '许波波测试公司/产品部', headcount: 0, status: '启用' },
  { id: '4', name: '产品总助', code: 'ZW00006', department: '许波波测试公司', headcount: 0, status: '启用' },
  { id: '5', name: '产品小助理', code: 'ZW00005', department: '许波波测试公司', headcount: 0, status: '启用' },
  { id: '6', name: '产品总监0628', code: 'ZW00004', department: '许波波测试公司', headcount: 0, status: '启用' },
  { id: '7', name: '产品录入员', code: 'ZW00003', department: '许波波测试公司', headcount: 0, status: '启用' },
  { id: '8', name: '产品普工', code: 'ZW00002', department: '许波波测试公司/研发部', headcount: 0, status: '启用' },
  { id: '9', name: 'bob测试职位', code: 'ZW00001', department: '许波波测试公司/人事部', headcount: 0, status: '启用' },
  { id: '10', name: '待测试_店长', code: '', department: '许波波测试公司', headcount: 0, status: '启用' },
];

export const mockJobDutyData: IJobDuty[] = [
  { id: '1', name: '联动职务', category: '测试职务分类' },
  { id: '2', name: '111', category: '管理类11', jobGrade: '12312' },
  { id: '3', name: '后勤主管', code: '1100', category: '专业类' },
  { id: '4', name: '主播项目经理', code: '1200', category: '管理类11' },
];

export const mockJobDutyCategoryData: IJobDutyCategory[] = [
  { id: '0', name: '职务分类', code: '' },
  { id: '1', name: '管理类', code: '' },
  { id: '2', name: '专业类', code: '' },
  { id: '3', name: '111', code: '' },
  { id: '4', name: '测试职务分类', code: '' },
];

export const mockPerformanceData: IPerformanceIndicator[] = [
  { 
    id: '1', 
    code: 'KPI-0001', 
    name: '销售额增长率', 
    description: '衡量企业年度销售收入增长幅度的核心财务指标，公式为：（当年销售额-上年销售额）/上年销售额×100%。', 
    weight: 30, 
    targetValue: '年度同比增长率≥20%',
    remarks: '该指标受宏观经济环境影响较大，需结合季度市场分析报告进行综合评估。注意剔除汇率波动带来的非经营性影响。销售团队需重点关注核心区域的增长情况，对于新兴市场的拓展可给予一定的宽容度。建议财务部门按月提供精确数据支持，确保考核的及时性与公正性。'
  },
  { 
    id: '2', 
    code: 'KPI-0002', 
    name: '客户满意度', 
    description: '通过NPS（净推荐值）问卷调查获取，旨在量化客户对产品及服务的满意程度与忠诚度。每季度进行一次全量或抽样调查，涵盖产品质量、服务响应速度、售后支持等多个维度。评分结果将作为客户体验优化项目的关键输入，对于提升客户留存率、降低流失率以及促进口碑传播具有重要指导意义。建议增加对过程指标的考核，并引入季度复盘机制。同时结合历史数据，该目标设定具备挑战性但可达成。', 
    weight: 20, 
    targetValue: '客户满意度评分不低于90分且无投诉',
    remarks: 'NPS数据收集需保证样本量的充足性，避免因样本偏差导致结果失真。客服部门应建立快速响应机制，针对低分反馈进行100%回访。建议将NPS指标与客户流失率挂钩分析，以验证其关联性。此外，对于竞争对手的NPS表现也应保持关注，作为行业对标参考。'
  },
  { 
    id: '3', 
    code: 'KPI-0003', 
    name: '新产品上市数', 
    description: '统计全年成功发布并投入市场的全新产品数量，旨在考核研发部门的创新能力及产品迭代效率。‘上市’定义为产品完成所有研发测试环节，正式对外发布并产生首笔销售订单。该指标需同时关注新产品的市场表现，不仅仅是数量的堆砌，更强调产品对公司营收结构的优化作用及对新市场机会的捕捉能力。建议增加对过程指标的考核，并引入季度复盘机制。同时结合历史数据，该目标设定具备挑战性但可达成。', 
    weight: 15, 
    targetValue: '完成10个新产品研发并成功上市销售',
    remarks: '新产品上市后的首月销量尤为关键，需配合市场推广活动同步考核。研发部门需确保产品技术文档的完整性，以便于售后支持团队快速上手。对于未能按期上市的项目，需提交详细的复盘报告，分析延迟原因。建议设立新产品创新奖，以激励团队的研发热情。'
  },
  { 
    id: '4', 
    code: 'KPI-0004', 
    // In screenshot, no ID is shown for this row but it exists. 
    // Assuming this is the "Core Talent Turnover" one.
    name: '员工离职率', 
    description: '重点考察主动离职率，即（期间主动离职人数 / 期间平均在职人数）× 100%。该指标直接反映组织氛围、薪酬竞争力及员工职业发展通道的健康度。需特别关注核心关键岗位及高绩效员工的流失情况。目标控制在10%以内，旨在保持团队稳定性的同时，通过适度的优胜劣汰维持组织活力，降低因人员频繁变动带来的招聘与培训成本。', 
    weight: 15, 
    targetValue: '核心人才主动流失率控制在15%以内',
    remarks: '核心人才流失率需按部门维度进行细化分析，重点关注研发及销售等关键部门。HR需定期进行员工满意度调查，提前识别潜在的流失风险。对于主动离职的核心员工，必须进行深度的离职访谈，挖掘真实原因。建议完善人才储备机制，降低关键岗位空缺带来的业务风险。'
  },
  { 
    id: '5', 
    code: 'KPI-0005', 
    name: '成本降低率', 
    description: '衡量运营成本（不含原材料价格波动影响）的同比下降幅度。通过优化供应链管理、提升生产良率、推行数字化办公等手段实现降本增效。该指标要求各部门在保证产品质量和服务水平不下降的前提下，深入挖掘成本节约潜力。年度目标为5%，旨在提升企业的净利润率及抗风险能力，确保在激烈的市场价格战中保持竞争优势。', 
    weight: 20, 
    targetValue: '运营成本同比降低5%且质量不下降',
    remarks: '成本降低不能以牺牲产品质量为代价，需建立质量红线机制。供应链部门需积极寻找替代材料或优化物流方案，以实现降本目标。各部门需提交月度成本分析报告，找出成本控制的薄弱环节。建议引入精益生产理念，通过流程优化减少浪费，实现可持续的成本降低。'
  },
];

export const mockEmployeeData: IEmployee[] = [
  { id: '1', name: '徐波波', dept: '许波波测试公司', company: '这是公司', status: '正式', tags: ['复职'] },
  { id: '2', name: '1425888', dept: '许波波测试公司', company: '', status: '正式', tags: ['0605'], idNumber: '1224' },
  { id: '3', name: '627测试调动联动...', dept: '许波波测试公司', company: '', status: '正式', tags: [] },
  { id: '4', name: '测试自动生成出生...', dept: '许波波测试公司', company: '', status: '正式', tags: [] },
  { id: '5', name: '0802-ayumi导入...', dept: '许波波测试公司', company: '', status: '正式', tags: [] },
  { id: '6', name: '0802-ayumi导入...', dept: '许波波测试公司', company: '', status: '正式', tags: ['复职'] },
  { id: '7', name: 'ayumi测试高级字...', dept: '许波波测试公司', company: '', status: '正式', tags: ['复职'] },
  { id: '8', name: '调动转正02', dept: '许波波测试公司', company: '改之前1111111111112...', status: '试用', tags: [], probationDate: '2024-08-02' },
  { id: '9', name: '调动转正03', dept: '许波波测试公司', company: '', status: '试用', tags: [], probationDate: '2024-08-06' },
  { id: '10', name: '调动转正04', dept: '许波波测试公司', company: '', status: '试用', tags: [], probationDate: '2024-08-10' },
  { id: '11', name: '调动转正05', dept: '许波波测试公司', company: '', status: '试用', tags: [], probationDate: '2024-08-10' },
  { id: '12', name: '调动转正06', dept: '许波波测试公司', company: '', status: '试用', tags: [] },
  { id: '13', name: '调动转正07', dept: '许波波测试公司', company: '', status: '试用', tags: [] },
  { id: '14', name: '11', dept: '许波波测试公司', company: '这是公司', status: '正式', tags: [] },
  { id: '15', name: '124', dept: '许波波测试公司', company: '', status: '正式', tags: [] },
  { id: '16', name: '831', dept: '许波波测试公司', company: '', status: '正式', tags: [] },
  { id: '17', name: '830', dept: '许波波测试公司', company: '123ayumi', status: '正式', tags: [] },
  { id: '18', name: '滑色浮沉', dept: '许波波测试公司', company: '', status: '正式', tags: [] },
  { id: '19', name: '滑色浮沉1', dept: '许波波测试公司', company: '', status: '正式', tags: [] },
  { id: '20', name: '滑色浮沉2', dept: '许波波测试公司', company: '', status: '正式', tags: [] },
];

export const mockEsignTemplates: IEsignTemplate[] = [
  { id: '6', name: '劳动合同', description: '2026版标准劳动合同', type: '劳动合同', individualSigners: 1, corporateSigners: 1, validityDays: 30, status: '启用', creator: '张三' },
  { id: '1', name: '离职协议测试', description: '', type: '离职证明', individualSigners: 1, corporateSigners: 1, validityDays: 7, status: '启用', creator: '许鸣波' },
  { id: '2', name: 'bob模版-副本2', description: '1', type: '劳动合同', individualSigners: 1, corporateSigners: 2, validityDays: 7, status: '启用', creator: '许鸣波' },
  { id: '3', name: 'bob模版', description: '1', type: '劳动合同', individualSigners: 1, corporateSigners: 1, validityDays: 7, status: '启用', creator: '许鸣波' },
  { id: '4', name: '劳动合同七天有效', description: '', type: '劳动合同', individualSigners: 1, corporateSigners: 1, validityDays: 7, status: '启用', creator: '谢雨蓉B' },
  { id: '5', name: '1111', description: '', type: '劳动合同', individualSigners: 1, corporateSigners: 1, validityDays: 7, status: '启用', creator: '许鸣波' },
];

export const mockVisitRecords: IVisitRecord[] = [
  { 
    id: '1', 
    customerName: '上海科技有限公司', 
    visitDate: '2024-05-20', 
    minutes: '初步沟通了Aiflow系统在HR场景的应用，客户对自动排班功能感兴趣。', 
    todos: '1. 发送排班功能演示视频\n2. 预约下周二的技术对接会议', 
    plan: '计划在6月份完成POC测试' 
  },
  { 
    id: '2', 
    customerName: '北京创新网络', 
    visitDate: '2024-05-18', 
    minutes: '与CTO李总进行了深入交流，了解了他们目前的痛点是招聘流程繁琐。', 
    todos: '整理招聘模块的解决方案PPT', 
    plan: '两周后回访，提交定制化方案' 
  },
  { 
    id: '3', 
    customerName: '深圳云端服务', 
    visitDate: '2024-05-15', 
    minutes: '续约谈判，客户希望在价格上能有9折优惠。', 
    todos: '向销售总监申请折扣权限', 
    plan: '本月底前完成合同签署' 
  }
];

export const mockRetroRules: IRetroRule[] = [
    {
        id: '1',
        ruleName: '通用补卡规则',
        scope: 'all',
        createTime: '2024-05-20 14:30',
        creator: 'Admin',
        allowRetro: true,
        retroType: 'unlimited',
        retroReason: 'disabled',
        promptType: 'month',
        promptMonthType: 'current',
        timeLimitPast: true,
        onlyWorkHours: true
    }
];
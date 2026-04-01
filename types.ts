








export interface IOrgNode {
  id: string;
  name: string;
  type: '公司' | '部门' | '门店';
  headcountCurrent: number;
  headcountTotal: number;
  establishmentCurrent: number;
  establishmentTotal: number;
  manager?: string;
  concurrentCount: number;
  code?: string;
  level: number;
  expanded?: boolean;
  children?: IOrgNode[];
  isVirtual?: boolean; // 虚拟
  shortName?: string; // 简称
  storeNumber?: string; // 门店编号
  attribute?: string; // 组织属性
  description?: string; // 组织描述
  remark?: string; // 备注
}

export interface IJobPosition {
  id: string;
  name: string;
  code: string;
  department: string;
  serviceLine?: string; // 对应业务条线/所属部门
  headcount: number;
  status: '启用' | '停用';
  isLeaf?: boolean;
  dutyName?: string;
  effectiveDate?: string;
}

export interface IJobDuty {
  id: string;
  name: string;
  shortName?: string;
  code?: string;
  category: string;
  description?: string;
  effectiveDate?: string;
  jobGrade?: string;
}

export interface IJobDutyCategory {
  id: string;
  name: string;
  code?: string;
  description?: string;
}

export interface IEmployee {
  id: string;
  name: string;
  dept: string;
  company: string;
  status: '正式' | '试用' | '离职';
  tags: string[]; // e.g., '复职', '0605'
  joinDate?: string;
  probationDate?: string;
  idNumber?: string; // 工号/ID
}

export interface IPerformanceIndicator {
  id: string;
  code: string;
  name: string;
  description: string;
  weight: number;
  targetValue: string;
  remarks?: string;
}

export interface IEsignTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  individualSigners: number;
  corporateSigners: number;
  validityDays: number;
  status: '启用' | '停用';
  creator: string;
  content?: string;
}

export interface ISigner {
  id: string;
  name: string;
  type: 'individual' | 'corporate';
  tag: string;
  assignType?: string;
  signerCompany?: string;
  signerSeal?: string;
  signerPerson?: string;
  signMethod?: string;
}

export interface IVisitRecord {
  id: string;
  customerName: string;
  visitDate: string;
  minutes: string;
  todos: string;
  plan: string;
}

export interface IRetroRule {
    id: string;
    ruleName: string;
    scope: 'all' | 'partial';
    createTime: string;
    creator: string;
    allowRetro?: boolean;
    retroType?: string;
    allowedRetroTypes?: string[];
    retroReason?: string;
    promptType?: string;
    promptDays?: string;
    promptMonthType?: string;
    monthlyLimit?: string;
    monthlyStart?: string;
    dailyLimit?: string;
    timeLimitPast?: boolean;
    timeLimitPastDays?: string;
    timeLimitPastType?: string;
    timeLimitCurrentMonth?: boolean;
    onlyWorkHours?: boolean;
}

export interface INavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  children?: INavItem[];
}

export type AiMessageType = 'text' | 'options' | 'card' | 'multi_confirm' | 'multi_candidates' | 'thinking';

export interface IAiCandidate {
    type: 'ORG' | 'POSITION' | 'DUTY' | 'CATEGORY' | 'RETRO_RULE';
    name: string;
    originalName?: string;
}

export interface IAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string; // base64
}

export interface IAiMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  type?: AiMessageType;
  options?: string[];
  candidates?: IAiCandidate[];
  cardData?: any;
  images?: string[]; // Array of base64 image strings
  attachments?: IAttachment[];
  isComplete?: boolean;
}

export interface IAiHistoryItem {
    id: string;
    timestamp: number;
    prompt: string;
    data: any;
    businessType: 'ORG' | 'POSITION' | 'DUTY' | 'CATEGORY' | 'BATCH' | 'CHAT' | 'RETRO_RULE' | 'BATCH_VISIT_RECORD';
    messages?: IAiMessage[];
}
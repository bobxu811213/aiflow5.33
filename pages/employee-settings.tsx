import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, Smartphone, Contact, UserPlus, UserCheck, 
  ArrowLeftRight, UserMinus, RefreshCcw, FileText, Clock, 
  FileCheck, FileEdit, FileBadge, Bell, Gift, 
  CreditCard, UserX, Settings, Link, Users
} from 'lucide-react';

interface SettingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
}

const SettingCard: React.FC<SettingCardProps> = ({ icon, title, description, iconBgColor, iconColor, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg p-4 flex items-start space-x-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBgColor} ${iconColor}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
        <h2 className="text-base font-medium text-gray-900">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
};

const EmployeeSettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 h-full overflow-y-auto bg-[#F9FAFB]">
      <div className="bg-white rounded-lg p-4 shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] min-h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-medium text-gray-900">员工设置</h1>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded text-sm text-primary hover:bg-gray-50 transition-colors">
            变更记录
          </button>
        </div>

        <Section title="信息集">
        <SettingCard 
          icon={<ClipboardList size={24} />}
          title="自定义信息集"
          description="可以自定义管理信息集，根据自己的需要添加自定义字段"
          iconBgColor="bg-emerald-100"
          iconColor="text-emerald-500"
          onClick={() => navigate('/employee-settings/custom-info-set')}
        />
        <SettingCard 
          icon={<Smartphone size={24} />}
          title="手机花名册设置"
          description="设置手机上员工可查看、编辑花名册的权限与范围"
          iconBgColor="bg-rose-100"
          iconColor="text-rose-500"
          onClick={() => navigate('/employee-settings/mobile-roster-settings')}
        />
        <SettingCard 
          icon={<Contact size={24} />}
          title="通讯录设置"
          description="手机通讯录相关设置"
          iconBgColor="bg-amber-100"
          iconColor="text-amber-500"
          onClick={() => navigate('/employee-settings/directory-settings')}
        />
      </Section>

      <Section title="业务规则">
        <SettingCard 
          icon={<UserPlus size={24} />}
          title="入职设置"
          description="设置入职相关规则"
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
          onClick={() => navigate('/employee-settings/onboarding-settings')}
        />
        <SettingCard 
          icon={<UserCheck size={24} />}
          title="转正设置"
          description="设置转正相关规则"
          iconBgColor="bg-fuchsia-100"
          iconColor="text-fuchsia-500"
          onClick={() => navigate('/employee-settings/probation-settings')}
        />
        <SettingCard 
          icon={<ArrowLeftRight size={24} />}
          title="调动设置"
          description="设置调动相关规则"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
          onClick={() => navigate('/employee-settings/transfer-settings')}
        />
        <SettingCard 
          icon={<UserMinus size={24} />}
          title="离职设置"
          description="设置离职相关规则"
          iconBgColor="bg-emerald-100"
          iconColor="text-emerald-500"
          onClick={() => navigate('/employee-settings/resignation-settings')}
        />
        <SettingCard 
          icon={<RefreshCcw size={24} />}
          title="复职设置"
          description="设置复职相关规则"
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-500"
          onClick={() => navigate('/employee-settings/rehire-settings')}
        />
        <SettingCard 
          icon={<FileText size={24} />}
          title="合同设置"
          description="设置合同相关规则"
          iconBgColor="bg-rose-100"
          iconColor="text-rose-500"
          onClick={() => navigate('/employee-settings/contract-settings')}
        />
      </Section>

      <Section title="业务表单">
        <SettingCard 
          icon={<Clock size={24} />}
          title="创建待入职设置"
          description="可设置创建待入职和待入职导入模板"
          iconBgColor="bg-purple-100"
          iconColor="text-purple-500"
          onClick={() => navigate('/employee-settings/pending-onboarding-settings')}
        />
        <SettingCard 
          icon={<FileCheck size={24} />}
          title="入职审批表单设置"
          description="可设置入职审批表单模板"
          iconBgColor="bg-pink-100"
          iconColor="text-pink-500"
          onClick={() => navigate('/employee-settings/onboarding-approval-settings')}
        />
        <SettingCard 
          icon={<FileEdit size={24} />}
          title="入职登记表设置"
          description="可设置入职登记表模板"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
          onClick={() => navigate('/employee-settings/onboarding-form-settings')}
        />
      </Section>

      <Section title="模板">
        <SettingCard 
          icon={<FileBadge size={24} />}
          title="员工证明"
          description="可设置证明类模板"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
        />
        <SettingCard 
          icon={<Bell size={24} />}
          title="通知模板"
          description="可设置各类通知模板"
          iconBgColor="bg-orange-100"
          iconColor="text-orange-500"
        />
        <SettingCard 
          icon={<Gift size={24} />}
          title="员工关怀模板"
          description="可设置员工关怀打印模板"
          iconBgColor="bg-purple-100"
          iconColor="text-purple-500"
        />
      </Section>

      <Section title="其他">
        <SettingCard 
          icon={<CreditCard size={24} />}
          title="工号设置"
          description="设置工号生成规则"
          iconBgColor="bg-rose-100"
          iconColor="text-rose-500"
        />
        <SettingCard 
          icon={<UserX size={24} />}
          title="黑名单"
          description="黑名单管理，可维护黑名单信息"
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-500"
        />
        <SettingCard 
          icon={<Clock size={24} />}
          title="工时制度设置"
          description="设置企业已申报的特殊工时制度范围"
          iconBgColor="bg-amber-100"
          iconColor="text-amber-500"
        />
        <SettingCard 
          icon={<Settings size={24} />}
          title="其他设置"
          description="员工其他规则设置"
          iconBgColor="bg-fuchsia-100"
          iconColor="text-fuchsia-500"
        />
        <SettingCard 
          icon={<Link size={24} />}
          title="自定义信息集引用设置"
          description="员工自定义信息集字段同步至其他模块设置"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-500"
        />
        <SettingCard 
          icon={<Users size={24} />}
          title="人员信息自动同步设置"
          description="可自定义设置从读卡器或第三方解析平台中读取的字段映射到系统中的对应字段"
          iconBgColor="bg-emerald-100"
          iconColor="text-emerald-500"
        />
      </Section>
      </div>
    </div>
  );
};

export default EmployeeSettingsPage;

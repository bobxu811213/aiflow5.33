
import React from 'react';
import { Search, Map, Grid, User, Bell, HelpCircle, ChevronLeft, Menu } from 'lucide-react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';

export const Header: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toggleSidebar, headerBreadcrumbs } = useAppStore();

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    
    if (path === '/transfer-management/registration-forms') {
      return [
        { label: '员工', path: '/employee-roster' }, // Assuming employee root
        { label: '异动管理', path: '/transfer-management' },
        { label: '入职', path: '/transfer-management' },
        { label: '入职登记表', path: null }
      ];
    }

    switch (path) {
      case '/workspace': return [{ label: '工作台', path: null }, { label: '一站式i人事服务大厅', path: null }];
      case '/org-structure': return [{ label: '组织', path: null }, { label: '组织架构', path: null }, { label: '组织架构', path: null }];
      case '/legal-entity': return [{ label: '组织', path: null }, { label: '组织架构', path: null }, { label: '法律实体', path: null }];
      case '/work-location': return [{ label: '组织', path: null }, { label: '组织架构', path: null }, { label: '工作地点', path: null }];
      case '/cost-center': return [{ label: '组织', path: null }, { label: '组织架构', path: null }, { label: '成本中心', path: null }];
      case '/multi-dim-org': return [{ label: '组织', path: null }, { label: '多维组织', path: null }, { label: '部门维度', path: null }];
      case '/job-positions': return [{ label: '组织', path: null }, { label: '职位体系', path: null }, { label: '职位', path: null }];
      case '/headcount-management': {
        const tab = searchParams.get('tab') || '概览';
        const tabName = tab === '制定' ? '编制制定' : tab === '审批' ? '编制审批' : '编制概览';
        return [{ label: '组织', path: null }, { label: '编制管理', path: null }, { label: tabName, path: null }];
      }
      case '/headcount-plan': return [{ label: '组织', path: '/headcount-management' }, { label: '编制管理', path: '/headcount-management' }, { label: '编制制定', path: '/headcount-management?tab=制定' }, { label: '编制方案', path: null }];
      case '/org-settings': {
        const tab = searchParams.get('tab') || 'org-rules';
        const tabName = tab === 'org-rules' ? '组织规则设定' : 
                        tab === 'dept-code' ? '部门编码设置' :
                        tab === 'dept-fields' ? '部门字段设置' :
                        tab === 'headcount-rules' ? '编制规则设置' : '多维组织设置';
        return [{ label: '组织', path: null }, { label: '组织设置', path: null }, { label: tabName, path: null }];
      }
      case '/employee-roster': return [{ label: '员工', path: null }, { label: '花名册', path: null }];
      case '/employee-settings': return [{ label: '员工', path: null }, { label: '员工设置', path: null }];
      case '/employee-settings/custom-info-set': return [{ label: '员工', path: null }, { label: '员工设置', path: '/employee-settings' }, { label: '自定义信息集', path: null }];
      case '/employee-settings/mobile-roster-settings': return [{ label: '员工', path: null }, { label: '员工设置', path: '/employee-settings' }, { label: '手机花名册设置', path: null }];
      case '/attendance/retro-rules': return [{ label: '考勤', path: null }, { label: '补卡规则', path: null }];
      case '/performance-indicators': return [{ label: '绩效', path: null }, { label: '绩效指标', path: null }];
      case '/esign/templates': return [{ label: '电子签', path: null }, { label: '模版管理', path: null }];
      case '/esign/company-entity': return [{ label: '电子签', path: null }, { label: '公司主体', path: null }];
      case '/esign/records/employees': return [{ label: '电子签', path: null }, { label: '签署记录', path: null }];
      case '/esign/records/performance': return [{ label: '电子签', path: null }, { label: '签署记录', path: null }, { label: '绩效签署', path: null }];
      case '/free-table': return [{ label: '自由表格', path: null }, { label: '客户拜访管理', path: null }];
      case '/transfer-management': return [{ label: '首页', path: '/' }]; // Default for transfer management as per screenshot showing "首页"
      default: return [{ label: '首页', path: '/' }];
    }
  };

  const breadcrumbs = headerBreadcrumbs || getBreadcrumbItems();

  return (
    <header className="h-[48px] px-4 flex items-center justify-between text-white shrink-0 z-20" style={{ background: 'linear-gradient(180deg, #50CABC -32%, #15B8A6 121%)', boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.1)' }}>
      <div className="flex items-center min-w-0">
        <div 
            className="flex items-center mr-8 font-bold text-lg cursor-pointer hover:bg-white/10 p-1 pr-3 rounded transition-colors -ml-1 select-none"
            onClick={toggleSidebar}
        >
          <Menu className="mr-2 opacity-90" size={20} />
          <span className="mr-2 opacity-90 hover:opacity-100">菜单</span>
          <div className="bg-white/20 p-1 px-2 rounded-sm backdrop-blur-sm">
             <span className="text-xs font-bold tracking-wider">昇鹏</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm opacity-90 hidden md:flex">
            <button className="mr-3 hover:bg-white/10 p-1 rounded transition-colors">
                <ChevronLeft size={18} />
            </button>
            <div className="flex items-center truncate">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="mx-2">/</span>}
                  {item.path ? (
                    <Link to={item.path} className="hover:underline hover:text-white">
                      {item.label}
                    </Link>
                  ) : item.onClick ? (
                    <span 
                      className="hover:underline hover:text-white cursor-pointer"
                      onClick={item.onClick}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
        </div>
      </div>

      <div className="flex items-center space-x-5 ml-4">
        <div className="flex bg-white rounded-[4px] overflow-hidden w-64 lg:w-80 h-7 items-center transition-all">
            <div className="px-3 text-gray-500 bg-[#F5F7FA] h-full flex items-center border-r border-gray-200 text-xs whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors">
                员工 <span className="ml-1 text-[8px] transform scale-75">▼</span>
            </div>
            <input 
                type="text" 
                placeholder="搜索员工、部门、职位" 
                className="flex-1 px-2 text-xs text-gray-700 outline-none h-full placeholder:text-gray-400 min-w-0"
            />
            <div className="px-2 text-gray-400 cursor-pointer hover:text-primary">
                <Search size={14} />
            </div>
        </div>

        <div className="flex items-center space-x-4 text-white/90">
            <Map size={20} strokeWidth={1.5} className="cursor-pointer hover:text-white transition-opacity hover:opacity-80" />
            <Grid size={20} strokeWidth={1.5} className="cursor-pointer hover:text-white transition-opacity hover:opacity-80" />
            <User size={20} strokeWidth={1.5} className="cursor-pointer hover:text-white transition-opacity hover:opacity-80" />
            <div className="relative group">
                <Bell size={20} strokeWidth={1.5} className="cursor-pointer hover:text-white transition-opacity hover:opacity-80" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF4D4F] text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center border border-white px-0.5">88</span>
            </div>
            <HelpCircle size={20} strokeWidth={1.5} className="cursor-pointer hover:text-white transition-opacity hover:opacity-80" />
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-white/30 transition-colors">
                A
            </div>
        </div>
      </div>
    </header>
  );
};


import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LayoutGrid, Briefcase, UserSquare2, ChevronDown, ChevronRight, ChevronsLeft, ChevronsRight, Target, FileSignature, Table2, Clock, Settings, Home } from 'lucide-react';
import { useAppStore } from '../../store/use-app-store';

interface SidebarItem {
  id: string;
  label: string;
  path?: string;
  hidden?: boolean;
  children?: SidebarItem[];
}

interface SidebarGroup {
  id: string;
  label: string;
  icon: any;
  path?: string;
  children?: SidebarItem[];
}

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar, openMenus, setOpenMenus } = useAppStore();
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    if (!sidebarOpen) {
        // If sidebar is closed, clicking a group icon should open the sidebar
        toggleSidebar();
        if (!openMenus.includes(id)) {
             setOpenMenus(prev => [...prev, id]);
        }
        return;
    }
    setOpenMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const navGroups: SidebarGroup[] = [
    {
      id: 'workspace',
      label: '工作台',
      icon: Home,
      path: '/workspace'
    },
    { 
      id: 'org', 
      label: '组织', 
      icon: LayoutGrid,
      children: [
        { id: 'org-struct', label: '组织架构', path: '/org-structure' },
        { id: 'legal-entity', label: '法律实体', path: '/legal-entity', hidden: true },
        { id: 'work-location', label: '工作地点', path: '/work-location', hidden: true },
        { id: 'cost-center', label: '成本中心', path: '/cost-center', hidden: true },
        { id: 'multi-dim-org', label: '多维组织', path: '/multi-dim-org' },
        { id: 'pos-sys', label: '职位体系', path: '/job-positions' },
        { id: 'job-level-sys', label: '职级体系', path: '/job-level-system' },
        { id: 'headcount-management', label: '编制管理', path: '/headcount-management' },
        { id: 'org-settings', label: '组织设置', path: '/org-settings' }
      ]
    },
    { 
      id: 'staff', 
      label: '员工', 
      icon: UserSquare2,
      children: [
        { id: 'employee-roster', label: '花名册', path: '/employee-roster' },
        { id: 'employee-archives', label: '员工档案', path: '/employee-archives' },
        { id: 'contract-management', label: '合同管理', path: '/contract-management' },
        { id: 'transfer-management', label: '异动管理', path: '/transfer-management' },
        { id: 'employee-settings', label: '员工设置', path: '/employee-settings' }
      ]
    },
    {
      id: 'attendance',
      label: '考勤',
      icon: Clock,
      children: [
        { id: 'retro-rules', label: '补卡规则', path: '/attendance/retro-rules' }
      ]
    },
    {
      id: 'performance',
      label: '绩效',
      icon: Target,
      children: [
        { id: 'kpi-indicators', label: '绩效指标', path: '/performance-indicators' }
      ]
    },
    {
      id: 'esign',
      label: '电子签',
      icon: FileSignature,
      children: [
        { id: 'template-mgr', label: '模版管理', path: '/esign/templates' },
        { id: 'company-entity', label: '公司主体', path: '/esign/company-entity' },
        {
          id: 'sign-records',
          label: '签署记录',
          path: '/esign/records/employees'
        }
      ]
    },
    { 
      id: 'free-table', 
      label: '自由表格', 
      icon: Table2,
      children: [
        { id: 'visit-records', label: '客户拜访管理', path: '/free-table' }
      ]
    },
    {
      id: 'settings',
      label: '设置',
      icon: Settings,
      children: [
        { id: 'agent-management', label: '智能体管理', path: '/settings/agent-management' },
        { id: 'skill-management', label: '技能管理', path: '/settings/skill-management' }
      ]
    }
  ];

  return (
    <div className={`flex flex-col h-full bg-[#FFFFFF] border-r border-border-base transition-all duration-300 relative z-40 ${sidebarOpen ? 'w-[220px]' : 'w-[80px]'}`}>
      <div className={`flex-1 py-4 px-4 scrollbar-hide ${sidebarOpen ? 'overflow-y-auto' : 'overflow-visible'}`}>
        {navGroups.map((group) => {
           const Icon = group.icon;
           const isGroupOpen = openMenus.includes(group.id);
           const isActive = group.path === location.pathname;
           
           // Check if any child is active to highlight parent in collapsed mode
           const isChildActive = group.children?.some(child => 
             child.path === location.pathname || 
             child.children?.some(grandChild => grandChild.path === location.pathname)
           );
           const effectiveActive = isActive || isChildActive;
           
           if (group.children) {
             return (
               <div 
                 key={group.id} 
                 className="mb-2 relative"
                 onMouseEnter={() => !sidebarOpen && setHoveredGroup(group.id)}
                 onMouseLeave={() => !sidebarOpen && setHoveredGroup(null)}
               >
                 <div 
                   className={`flex items-center h-[40px] px-4 rounded-[8px] cursor-pointer transition-colors relative ${effectiveActive && !sidebarOpen ? 'bg-[#E6F8F6] text-[#15B8A6]' : effectiveActive && sidebarOpen ? 'text-[#15B8A6]' : 'text-gray-600 hover:bg-[#F3F4F6] hover:text-gray-900'}`}
                   onClick={() => toggleMenu(group.id)}
                 >
                    <Icon size={18} className={effectiveActive ? 'text-[#15B8A6]' : 'text-gray-500'} />
                    {sidebarOpen && (
                      <>
                        <span className="ml-3 text-sm font-medium flex-1 truncate">{group.label}</span>
                        {isGroupOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </>
                    )}
                 </div>

                 {!sidebarOpen && hoveredGroup === group.id && (
                   <div className="absolute left-full top-0 ml-1 w-48 bg-white shadow-lg border border-gray-100 rounded-[8px] py-2 z-50">
                     <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                       {group.label}
                     </div>
                     {group.children.map(child => {
                       if (child.hidden) return null;
                       const isChildActive = location.pathname === child.path || (child.id === 'org-struct' && (location.pathname === '/legal-entity' || location.pathname === '/work-location' || location.pathname === '/cost-center'));
                       return (
                         <Link
                           key={child.id}
                           to={child.path || '#'}
                           className={`flex items-center px-4 py-2 text-sm transition-colors ${
                             isChildActive ? 'text-[#15B8A6] bg-[#E6F8F6]' : 'text-gray-600 hover:bg-[#F3F4F6] hover:text-gray-900'
                           }`}
                         >
                           {child.label}
                         </Link>
                       );
                     })}
                   </div>
                 )}
                 
                 {isGroupOpen && sidebarOpen && (
                   <div className="mt-1">
                     {group.children.map(child => {
                       if (child.hidden) return null;
                       if (child.children) {
                         const isSubMenuOpen = openMenus.includes(child.id);
                         const isGrandChildActive = child.children.some(grandChild => grandChild.path === location.pathname);
                         
                         return (
                           <div key={child.id}>
                             <div 
                                className={`flex items-center h-[40px] pl-10 pr-4 mb-1 rounded-[8px] cursor-pointer transition-colors relative ${isGrandChildActive ? 'text-[#15B8A6]' : 'text-gray-600 hover:bg-[#F3F4F6] hover:text-gray-900'}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleMenu(child.id);
                                }}
                             >
                                <span className="text-sm font-medium flex-1 truncate">{child.label}</span>
                                {isSubMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                             </div>
                             {isSubMenuOpen && (
                                <div className="mt-1">
                                  {child.children.map(grandChild => (
                                     <Link
                                        key={grandChild.id}
                                        to={grandChild.path!}
                                        className={`flex items-center h-[40px] pl-14 pr-4 mb-1 rounded-[8px] transition-colors relative ${
                                          location.pathname === grandChild.path ? 'bg-[#E6F8F6] text-[#15B8A6]' : 'text-gray-600 hover:bg-[#F3F4F6] hover:text-gray-900'
                                        }`}
                                     >
                                        <span className="text-sm font-medium truncate">{grandChild.label}</span>
                                     </Link>
                                  ))}
                                </div>
                             )}
                           </div>
                         );
                       }

                       const isChildActive = location.pathname === child.path || (child.id === 'org-struct' && (location.pathname === '/legal-entity' || location.pathname === '/work-location' || location.pathname === '/cost-center'));
                       return (
                         <Link
                           key={child.id}
                           to={child.path!}
                           className={`flex items-center h-[40px] pl-10 pr-4 mb-1 rounded-[8px] transition-colors relative ${
                             isChildActive ? 'bg-[#E6F8F6] text-[#15B8A6]' : 'text-gray-600 hover:bg-[#F3F4F6] hover:text-gray-900'
                           }`}
                         >
                           <span className="text-sm font-medium truncate">{child.label}</span>
                         </Link>
                       );
                     })}
                   </div>
                 )}
               </div>
             );
           }
           
           return (
             <div
               key={group.id}
               className="mb-2 relative"
               onMouseEnter={() => !sidebarOpen && setHoveredGroup(group.id)}
               onMouseLeave={() => !sidebarOpen && setHoveredGroup(null)}
             >
               <Link
                 to={group.path || '#'}
                 className={`flex items-center h-[40px] px-4 rounded-[8px] transition-colors relative ${
                    isActive ? 'bg-[#E6F8F6] text-[#15B8A6]' : 'text-gray-600 hover:bg-[#F3F4F6] hover:text-gray-900'
                 }`}
               >
                 <Icon size={18} className={isActive ? 'text-[#15B8A6]' : 'text-gray-500'} />
                 {sidebarOpen && <span className="ml-3 text-sm font-medium truncate">{group.label}</span>}
               </Link>
               {!sidebarOpen && hoveredGroup === group.id && (
                 <div className="absolute left-full top-0 ml-1 w-auto bg-white shadow-lg border border-gray-100 rounded-[8px] py-2 px-4 z-50 whitespace-nowrap">
                   <span className="text-sm font-medium text-gray-900">{group.label}</span>
                 </div>
               )}
             </div>
           );
        })}
      </div>

      <div 
        className="h-[40px] border-t border-border-base flex items-center justify-center text-gray-400 hover:text-[#15B8A6] hover:bg-[#F3F4F6] cursor-pointer transition-colors shrink-0"
        onClick={toggleSidebar}
        title={sidebarOpen ? "收起菜单" : "展开菜单"}
      >
          {sidebarOpen ? <ChevronsLeft size={16} /> : <ChevronsRight size={16} />}
      </div>
    </div>
  );
};

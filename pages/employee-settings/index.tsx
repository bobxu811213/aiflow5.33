import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/use-app-store';
import { 
  ClipboardList, 
  Smartphone, 
  Contact, 
  UserPlus, 
  UserCheck, 
  UserMinus, 
  UserX, 
  RefreshCcw, 
  FileText, 
  UserCog, 
  FileSignature, 
  FileSpreadsheet, 
  BadgeInfo, 
  BellRing, 
  Gift, 
  Hash, 
  Ban, 
  Clock, 
  Settings, 
  Database
} from 'lucide-react';

export default function EmployeeSettings() {
  const { setHeaderBreadcrumbs } = useAppStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    setHeaderBreadcrumbs([
      { label: '员工', path: null },
      { label: '异动管理', path: null },
      { label: '员工设置', path: null }
    ]);
    return () => setHeaderBreadcrumbs(null);
  }, [setHeaderBreadcrumbs]);

  const settingGroups = [
    {
      title: '信息集',
      items: [
        {
          icon: <ClipboardList className="text-emerald-500" size={24} />,
          title: '自定义信息集',
          description: '可以自定义管理信息集，根据自己的需要添加自定义字段',
          bgColor: 'bg-emerald-50'
        },
        {
          icon: <Smartphone className="text-rose-400" size={24} />,
          title: '手机花名册设置',
          description: '设置手机上员工可查看、编辑花名册的权限与范围',
          bgColor: 'bg-rose-50'
        },
        {
          icon: <Contact className="text-amber-400" size={24} />,
          title: '通讯录设置',
          description: '手机通讯录相关设置',
          bgColor: 'bg-amber-50',
          path: '/employee-settings/directory-settings'
        }
      ]
    },
    {
      title: '业务规则',
      items: [
        {
          icon: <UserPlus className="text-orange-400" size={24} />,
          title: '入职设置',
          description: '设置入职相关规则',
          bgColor: 'bg-orange-50'
        },
        {
          icon: <UserCheck className="text-fuchsia-400" size={24} />,
          title: '转正设置',
          description: '设置转正相关规则',
          bgColor: 'bg-fuchsia-50'
        },
        {
          icon: <RefreshCcw className="text-blue-400" size={24} />,
          title: '调动设置',
          description: '设置调动相关规则',
          bgColor: 'bg-blue-50'
        },
        {
          icon: <UserX className="text-emerald-400" size={24} />,
          title: '离职设置',
          description: '设置离职相关规则',
          bgColor: 'bg-emerald-50'
        },
        {
          icon: <UserMinus className="text-indigo-400" size={24} />,
          title: '复职设置',
          description: '设置复职相关规则',
          bgColor: 'bg-indigo-50'
        },
        {
          icon: <FileText className="text-rose-400" size={24} />,
          title: '合同设置',
          description: '设置合同相关规则',
          bgColor: 'bg-rose-50'
        }
      ]
    },
    {
      title: '业务表单',
      items: [
        {
          icon: <UserCog className="text-indigo-400" size={24} />,
          title: '创建待入职设置',
          description: '可设置创建待入职和待入职导入模板',
          bgColor: 'bg-indigo-50'
        },
        {
          icon: <FileSignature className="text-pink-400" size={24} />,
          title: '入职审批表单设置',
          description: '可设置入职审批表单模板',
          bgColor: 'bg-pink-50'
        },
        {
          icon: <FileSpreadsheet className="text-blue-400" size={24} />,
          title: '入职登记表设置',
          description: '可设置入职登记表模板',
          bgColor: 'bg-blue-50'
        }
      ]
    },
    {
      title: '模板',
      items: [
        {
          icon: <BadgeInfo className="text-blue-400" size={24} />,
          title: '员工证明',
          description: '可设置证明类模板',
          bgColor: 'bg-blue-50'
        },
        {
          icon: <BellRing className="text-orange-400" size={24} />,
          title: '通知模板',
          description: '可设置各类通知模板',
          bgColor: 'bg-orange-50'
        },
        {
          icon: <Gift className="text-purple-400" size={24} />,
          title: '员工关怀模板',
          description: '可设置员工关怀打印模板',
          bgColor: 'bg-purple-50'
        }
      ]
    },
    {
      title: '其他',
      items: [
        {
          icon: <Hash className="text-rose-400" size={24} />,
          title: '工号设置',
          description: '设置工号生成规则',
          bgColor: 'bg-rose-50'
        },
        {
          icon: <Ban className="text-indigo-400" size={24} />,
          title: '黑名单',
          description: '黑名单管理，可维护黑名单信息',
          bgColor: 'bg-indigo-50'
        },
        {
          icon: <Clock className="text-amber-400" size={24} />,
          title: '工时制度设置',
          description: '设置企业已申报的特殊工时制度范围',
          bgColor: 'bg-amber-50'
        },
        {
          icon: <Settings className="text-fuchsia-400" size={24} />,
          title: '其他设置',
          description: '员工其他规则设置',
          bgColor: 'bg-fuchsia-50'
        },
        {
          icon: <Database className="text-blue-400" size={24} />,
          title: '自定义信息集引用设置',
          description: '员工自定义信息集字段同步至其他模块设置',
          bgColor: 'bg-blue-50'
        }
      ]
    }
  ];

  return (
    <div className="p-4 bg-[#F9FAFB] min-h-full">
      <div className="bg-white rounded-lg p-6 shadow-sm min-h-[calc(100vh-80px)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-medium text-gray-900">员工设置</h1>
          <button className="px-4 py-1.5 border border-primary text-primary rounded text-sm hover:bg-primary/5 transition-colors">
            变更记录
          </button>
        </div>

        <div className="space-y-8">
          {settingGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="flex items-center mb-4">
                <div className="w-1 h-4 bg-primary rounded-sm mr-2"></div>
                <h2 className="text-base font-medium text-gray-900">{group.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {group.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="border border-gray-200 rounded-lg p-4 flex items-start hover:shadow-md transition-shadow cursor-pointer bg-white"
                    onClick={() => {
                      if ((item as any).path) {
                        navigate((item as any).path);
                      }
                    }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-3 ${item.bgColor}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

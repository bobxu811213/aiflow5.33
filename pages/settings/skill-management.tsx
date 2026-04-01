import React, { useState } from 'react';
import { LayoutGrid, List, Plus, Search, Edit, Trash2, Check, X } from 'lucide-react';
import { Modal } from '../../components/ui/modal';

interface Skill {
  id: string;
  name: string;
  description: string;
  process: string;
  status: 'enabled' | 'disabled';
  createTime: string;
}

const mockSkills: Skill[] = [
  { id: '1', name: '简历解析', description: '自动提取简历中的关键信息，如姓名、联系方式、教育经历等。', process: '1. 接收简历文件\n2. 调用OCR或文本解析引擎\n3. 提取实体信息\n4. 格式化输出为JSON', status: 'enabled', createTime: '2023-10-01 10:00' },
  { id: '2', name: '面试安排', description: '根据候选人和面试官的日历，自动推荐合适的面试时间。', process: '1. 获取候选人可用时间\n2. 获取面试官日历\n3. 匹配空闲时间段\n4. 发送面试邀请邮件', status: 'enabled', createTime: '2023-10-02 11:20' },
  { id: '3', name: '薪酬计算', description: '根据员工考勤、绩效和薪酬规则，自动计算当月薪资。', process: '1. 汇总考勤数据\n2. 获取绩效评分\n3. 应用薪酬计算公式\n4. 生成工资条', status: 'disabled', createTime: '2023-10-03 09:15' },
  { id: '4', name: '入职审批助手', description: '待入职员工自动发起入职审批。', process: `Overview
使用 scripts/organize_folder.sh 对指定目录进行非递归整理：

只处理目标目录顶层文件
按文件类型分类
按最近使用时间分桶
原有子文件夹保持不变
Workflow
确认目标目录存在并可写。
先执行 --dry-run 预览移动或复制结果。
执行正式整理，将文件归档到输出目录。
抽样检查整理结果，确认目录结构符合预期。
Script
脚本路径：scripts/organize_folder.sh

参数
--target <path>: 必填，目标目录。
--output-name <name>: 可选，输出目录名，默认 按类型与最近使用整理。
--mode <move|copy>: 可选，默认 move。
--dry-run: 可选，只打印计划，不执行文件变更。
分类规则
文档：ppt/pptx/doc/docx/xls/xlsx/pdf/txt/md/rtf/pages/numbers/key
图片：png/jpg/jpeg/gif/webp/heic/bmp/tif/tiff/svg
视频：mp4/mov/avi/mkv/wmv/flv/webm/m4v
音频：mp3/wav/m4a/aac/flac/ogg
压缩包：zip/rar/7z/tar/gz/bz2/xz
其他：未命中以上扩展名
时间分桶规则
近7天使用: 最近使用距今 <= 7 天
近30天使用: 最近使用距今 8-30 天
30天前使用: 最近使用距今 > 30 天
脚本优先使用 atime，如果系统不可用则回退到 mtime。

输出结构
默认输出到：

<target>/按类型与最近使用整理/<类型>/<时间分桶>/

Examples
先预览：

bash scripts/organize_folder.sh \\
  --target /Users/bob/Desktop/0307会议 \\
  --dry-run
正式整理（移动）：

bash scripts/organize_folder.sh \\
  --target /Users/bob/Desktop/0307会议
保留原文件（复制模式）：

bash scripts/organize_folder.sh \\
  --target /Users/bob/Desktop/0307会议 \\
  --mode copy \\
  --output-name 按类型和时间归档
Notes
仅处理目标目录第一层文件，不递归进入子目录。
遇到同名文件时，自动追加 (1)、 (2) 避免覆盖。
若目标目录中没有顶层文件，脚本会正常退出并提示处理数量为 0。`, status: 'enabled', createTime: '2023-10-04 14:00' },
];

const SkillManagementPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);

  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (skill: Skill) => {
    setEditingSkill({ ...skill });
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setEditingSkill({
      name: '',
      description: '',
      process: '',
      status: 'enabled'
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const handleSave = () => {
    if (!editingSkill?.name) return;
    
    if (editingSkill.id) {
      setSkills(skills.map(s => s.id === editingSkill.id ? editingSkill as Skill : s));
    } else {
      const newSkill: Skill = {
        ...(editingSkill as Skill),
        id: Math.random().toString(36).substr(2, 9),
        createTime: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].substring(0, 5)
      };
      setSkills([newSkill, ...skills]);
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F9FAFB] p-4 overflow-y-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-gray-500 mb-4">
        <span>首页</span>
        <span className="mx-2">&gt;</span>
        <span>设置</span>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-900">技能管理</span>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-lg p-4 shadow-[1px_1px_4px_4px_rgba(83,84,85,0.02)] flex-1 flex flex-col min-h-0">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h2 className="text-base font-medium text-gray-800">技能管理</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="搜索技能名称或描述" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64"
              />
            </div>
            
            <div className="flex items-center bg-gray-100 rounded p-0.5">
              <button 
                className={`p-1.5 rounded ${viewMode === 'card' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setViewMode('card')}
                title="卡片视图"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setViewMode('list')}
                title="列表视图"
              >
                <List size={16} />
              </button>
            </div>

            <button 
              onClick={handleCreate}
              className="flex items-center px-3 py-1.5 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm"
            >
              <Plus size={16} className="mr-1" />
              新增技能
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSkills.map(skill => (
                <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900 truncate pr-2">{skill.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${
                      skill.status === 'enabled' ? 'border-primary text-primary bg-primary/10' : 'border-gray-200 text-gray-500 bg-gray-50'
                    }`}>
                      {skill.status === 'enabled' ? '已启用' : '已禁用'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{skill.description}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{skill.createTime}</span>
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(skill)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredSkills.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  没有找到匹配的技能
                </div>
              )}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium w-1/4">技能名称</th>
                    <th className="px-4 py-3 font-medium w-2/5">技能描述</th>
                    <th className="px-4 py-3 font-medium w-32">状态</th>
                    <th className="px-4 py-3 font-medium w-40">创建时间</th>
                    <th className="px-4 py-3 font-medium w-24 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSkills.map(skill => (
                    <tr key={skill.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{skill.name}</td>
                      <td className="px-4 py-3 text-gray-500 truncate max-w-xs">{skill.description}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${
                          skill.status === 'enabled' ? 'border-primary text-primary bg-primary/10' : 'border-gray-200 text-gray-500 bg-gray-50'
                        }`}>
                          {skill.status === 'enabled' ? '已启用' : '已禁用'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{skill.createTime}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => handleEdit(skill)} className="p-1 text-gray-400 hover:text-primary transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(skill.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSkills.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                        没有找到匹配的技能
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={editingSkill?.id ? "编辑技能" : "新增技能"}
        width="w-[600px]"
        footer={
          <>
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded hover:bg-gray-50 transition-colors text-sm"
            >
              取消
            </button>
            <button 
              onClick={handleSave}
              disabled={!editingSkill?.name}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              保存
            </button>
          </>
        }
      >
        {editingSkill && (
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                技能名称 <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={editingSkill.name || ''}
                onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                placeholder="请输入技能名称"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                技能描述
              </label>
              <textarea 
                value={editingSkill.description || ''}
                onChange={(e) => setEditingSkill({...editingSkill, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm resize-none"
                placeholder="请输入技能描述"
                rows={3}
              />
            </div>

            {/* Process (500 chars max) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                技能流程
              </label>
              <div className="relative">
                <textarea 
                  value={editingSkill.process || ''}
                  onChange={(e) => setEditingSkill({...editingSkill, process: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm resize-none pb-8"
                  placeholder="请输入技能流程，详细描述该技能的执行步骤..."
                  rows={10}
                  maxLength={2000}
                />
                <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                  {(editingSkill.process || '').length}/2000
                </div>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  启用状态
                </label>
                <p className="text-xs text-gray-500 mt-0.5">控制该技能是否可在智能体中被调用</p>
              </div>
              <button 
                type="button"
                onClick={() => setEditingSkill({...editingSkill, status: editingSkill.status === 'enabled' ? 'disabled' : 'enabled'})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  editingSkill.status === 'enabled' ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span 
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    editingSkill.status === 'enabled' ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SkillManagementPage;

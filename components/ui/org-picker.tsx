
import React, { useState, useEffect } from 'react';
import { Modal } from './modal';
import { ApiService } from '../../api/api-service';
import { IOrgNode } from '../../types';
import { ChevronDown, ChevronRight, Search, Check, Building2, Users } from 'lucide-react';

interface OrgPickerProps {
  value?: string | string[];
  onChange: (value: any) => void;
  multiple?: boolean;
  placeholder?: string;
  className?: string;
}

export const OrgPicker: React.FC<OrgPickerProps> = ({ 
  value, 
  onChange, 
  multiple = false, 
  placeholder = '请选择',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orgData, setOrgData] = useState<IOrgNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  
  // Internal state for the modal selection before confirming
  const [tempSelected, setTempSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      ApiService.getOrgStructure().then(data => {
        setOrgData(data);
        // Default expand first level
        if (data.length > 0) {
            setExpandedNodes(new Set([data[0].id]));
        }
        setLoading(false);
      });
      
      // Initialize temp selection from props
      if (multiple && Array.isArray(value)) {
        setTempSelected(new Set(value));
      } else if (!multiple && typeof value === 'string' && value) {
        setTempSelected(new Set([value]));
      } else {
        setTempSelected(new Set());
      }
    }
  }, [isOpen, value, multiple]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const handleSelect = (node: IOrgNode) => {
    if (multiple) {
      const newSelected = new Set(tempSelected);
      if (newSelected.has(node.name)) {
        newSelected.delete(node.name);
      } else {
        newSelected.add(node.name);
      }
      setTempSelected(newSelected);
    } else {
      // Single select: confirm immediately
      onChange(node.name);
      setIsOpen(false);
    }
  };

  const handleConfirm = () => {
    if (multiple) {
      onChange(Array.from(tempSelected));
    }
    setIsOpen(false);
  };

  // Helper to find node name by ID or check existence if value is name
  // For simplicity in this mock, we assume value stores the 'name' of the org
  const getDisplayValue = () => {
    if (!value) return '';
    if (Array.isArray(value)) {
      if (value.length === 0) return '';
      if (value.length === 1) return value[0];
      return `${value[0]} 等 ${value.length} 个`;
    }
    return value;
  };

  const renderTree = (nodes: IOrgNode[], level = 0) => {
    return nodes.map(node => {
      const isExpanded = expandedNodes.has(node.id);
      const isSelected = tempSelected.has(node.name);
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.id}>
          <div 
            className={`flex items-center py-2 px-2 cursor-pointer hover:bg-gray-50 transition-colors ${isSelected && !multiple ? 'bg-primary-light text-primary' : ''}`}
            style={{ paddingLeft: `${level * 20 + 8}px` }}
            onClick={() => handleSelect(node)}
          >
            <div 
              className={`mr-2 p-1 rounded hover:bg-gray-200 transition-colors ${hasChildren ? 'visible' : 'invisible'}`}
              onClick={(e) => toggleExpand(node.id, e)}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            
            {multiple && (
               <div className={`w-4 h-4 mr-2 border rounded flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                  {isSelected && <Check size={10} className="text-white" />}
               </div>
            )}

            <div className={`mr-2 ${node.type === '公司' ? 'text-blue-500' : 'text-gray-500'}`}>
               {node.type === '公司' ? <Building2 size={16} /> : <Users size={16} />}
            </div>
            
            <span className={`text-sm ${isSelected && !multiple ? 'font-medium' : 'text-gray-700'}`}>{node.name}</span>
          </div>
          
          {hasChildren && isExpanded && (
            <div className="border-l border-gray-100 ml-[18px]">
                {renderTree(node.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div 
        className={`relative cursor-pointer group ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <input 
            type="text" 
            readOnly 
            placeholder={placeholder}
            value={getDisplayValue()}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary bg-white cursor-pointer truncate pr-8 hover:border-primary/50 transition-colors"
        />
        <ChevronDown size={16} className="absolute right-2 top-2 text-gray-400 group-hover:text-primary transition-colors" />
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={multiple ? "选择应用范围" : "选择所属部门"}
        width="w-[500px]"
        footer={
          multiple ? (
            <div className="flex justify-between items-center w-full">
                <span className="text-xs text-gray-500">已选择 {tempSelected.size} 项</span>
                <div className="flex gap-2">
                    <button onClick={() => setIsOpen(false)} className="px-4 py-1.5 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50">取消</button>
                    <button onClick={handleConfirm} className="px-4 py-1.5 rounded text-sm bg-primary text-white hover:bg-primary-hover">确定</button>
                </div>
            </div>
          ) : null
        }
        noContentPadding
      >
        <div className="flex flex-col h-[400px]">
           <div className="p-3 border-b border-gray-100">
              <div className="relative">
                 <input type="text" placeholder="搜索组织..." className="w-full bg-gray-50 border-none rounded px-3 py-1.5 pl-8 text-sm outline-none focus:ring-1 focus:ring-primary/30" />
                 <Search size={14} className="absolute left-2.5 top-2 text-gray-400" />
              </div>
           </div>
           <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
              {loading ? (
                  <div className="flex justify-center items-center h-full text-gray-400 text-sm">加载中...</div>
              ) : (
                  renderTree(orgData)
              )}
           </div>
        </div>
      </Modal>
    </>
  );
};

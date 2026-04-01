
import React, { useState, useEffect } from 'react';
import { Modal } from './modal';
import { ApiService } from '../../api/api-service';
import { IEmployee } from '../../types';
import { Search, User } from 'lucide-react';

interface PersonSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (person: IEmployee) => void;
}

export const PersonSelector: React.FC<PersonSelectorProps> = ({ isOpen, onClose, onSelect }) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      ApiService.getEmployees().then(data => {
        setEmployees(data);
        setLoading(false);
      });
    }
  }, [isOpen]);

  const filtered = employees.filter(e => e.name.includes(searchTerm) || e.dept.includes(searchTerm));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="选择人员"
      width="w-[600px]"
      footer={
        <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm">
            取消
        </button>
      }
    >
      <div className="mb-4 relative">
        <input
            type="text"
            placeholder="搜索姓名或部门..."
            className="w-full border border-gray-300 rounded pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
      </div>

      <div className="max-h-[400px] overflow-y-auto border border-gray-200 rounded">
        {loading ? (
            <div className="p-4 text-center text-gray-500">加载中...</div>
        ) : (
            filtered.map(emp => (
                <div 
                    key={emp.id} 
                    onClick={() => onSelect(emp)}
                    className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0"
                >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <User size={16} />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-800">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.dept} {emp.idNumber ? `(${emp.idNumber})` : ''}</div>
                    </div>
                </div>
            ))
        )}
        {!loading && filtered.length === 0 && (
             <div className="p-4 text-center text-gray-500">未找到人员</div>
        )}
      </div>
    </Modal>
  );
};

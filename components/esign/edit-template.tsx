
import React, { useState, useRef } from 'react';
import { IEsignTemplate } from '../../types';
import { BasicSettings } from './basic-settings';
import { SignerSettings } from './signer-settings';
import { DocumentSettings, DocumentSettingsRef } from './document-settings';
import { ApiService } from '../../api/api-service';

interface EditTemplateProps {
  template: IEsignTemplate;
  onBack: () => void;
  onSave?: () => void;
}

export const EditTemplate: React.FC<EditTemplateProps> = ({ template, onBack, onSave }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'signers' | 'document'>('document');
  const documentRef = useRef<DocumentSettingsRef>(null);

  const handleSave = async () => {
      if (activeTab === 'document' && documentRef.current) {
          const content = documentRef.current.getContent();
          const updatedTemplate = { ...template, content };
          await ApiService.updateEsignTemplate(updatedTemplate);
          if (onSave) onSave();
      } else {
          // Save other settings logic
          if (onSave) onSave();
      }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="px-6 py-4 pb-0 shrink-0">
         <h2 className="text-lg font-bold text-gray-900 mb-4">编辑模板</h2>
         <div className="flex space-x-8 border-b border-gray-100">
            <button 
                onClick={() => setActiveTab('basic')}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'basic' ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-primary'}`}
            >
                基础设置
            </button>
            <button 
                onClick={() => setActiveTab('signers')}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'signers' ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-primary'}`}
            >
                签署对象设置
            </button>
            <button 
                onClick={() => setActiveTab('document')}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'document' ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-primary'}`}
            >
                模板内容及签署区
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
          {activeTab === 'basic' && <BasicSettings template={template} />}
          {activeTab === 'signers' && <SignerSettings />}
          {activeTab === 'document' && <DocumentSettings ref={documentRef} initialContent={template.content} />}
      </div>

      <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0 z-10">
          <button 
              onClick={onBack}
              className="px-6 py-2 rounded text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
              返回
          </button>
          <button 
              onClick={handleSave}
              className="px-6 py-2 rounded text-sm bg-primary text-white hover:bg-primary-hover shadow-sm transition-colors"
          >
              保存
          </button>
      </div>
    </div>
  );
};

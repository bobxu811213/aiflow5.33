
import React from 'react';
import { Modal } from '../ui/modal';

interface InterviewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any; // Interview data
}

export const InterviewFeedbackModal: React.FC<InterviewFeedbackModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const InfoItem = ({ label, value }: { label: string, value: string }) => (
      <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-2">{label}:</span>
          <span className="text-gray-800 font-medium">{value}</span>
      </div>
  );

  const FeedbackField = ({ label, value, fullWidth = false }: { label: string, value: string, fullWidth?: boolean }) => (
      <div className={`flex items-start mb-6 ${fullWidth ? 'col-span-2' : ''}`}>
          <div className="w-[180px] text-right mr-4 text-sm text-gray-600 shrink-0 leading-relaxed">{label}：</div>
          <div className="text-sm text-gray-800 leading-relaxed flex-1">{value || '-'}</div>
      </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="查看面试反馈"
      width="w-[900px]"
      zIndex="z-[70]" // Ensure it's above the drawer (z-60)
      footer={
        <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-1.5 bg-[#13A695] text-white rounded text-sm hover:bg-[#119082] transition-colors shadow-sm font-medium">关闭</button>
        </div>
      }
    >
        <div className="space-y-6 pt-2">
            {/* Top Info Bar */}
            <div className="flex gap-12 pb-4 border-b border-gray-100 border-dashed">
                <InfoItem label="面试官姓名" value={data?.interviewer || "张三 (产品总监)"} />
                <InfoItem label="工号" value="GH00006" />
                <InfoItem label="部门/职位" value="I人事演示专用/党委书记" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-x-12 px-4">
                <FeedbackField label="面试结果" value="通过" />
                <div className="col-span-2">
                     <FeedbackField label="综合评价" value="-" fullWidth />
                </div>
                
                <FeedbackField label="11" value="-" />
                <FeedbackField label="99" value="-" />
                
                <FeedbackField label="加班" value="-" />
                <FeedbackField label="稳定性和忠诚度" value="-" />
                
                <FeedbackField label="时间观念与纪律观念" value="-" />
                <FeedbackField label="相关工作经验" value="-" />
                
                <FeedbackField label="专业知识水平" value="-" />
                <FeedbackField label="思维逻辑性和条理性" value="-" />
                
                <FeedbackField label="团队合作意识" value="-" />
                
                <div className="col-span-2">
                    <FeedbackField label="多行文字" value="-" fullWidth />
                </div>
            </div>
        </div>
    </Modal>
  );
};

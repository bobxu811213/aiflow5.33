
import React from 'react';
import { Users } from 'lucide-react';
import { useAppStore } from '../../../store/use-app-store';

export const FamilyInfoTab = () => {
    const { highlightedWorkExperienceIds } = useAppStore();

    const familyMembers = [
        { id: 101, relation: '父亲', name: '徐建国', dob: '1985-03-12', company: '上海钢铁集团', phone: '13900000001' },
        { id: 102, relation: '母亲', name: '李淑芬', dob: '1987-07-22', company: '退休', phone: '13900000002' },
        { id: 103, relation: '弟弟', name: '徐小小', dob: '2015-06-01', company: '上海小学', phone: '-' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 min-h-full">
            <div className="flex items-center gap-2 mb-6">
                <Users size={20} className="text-[#13A695]" />
                <h3 className="font-bold text-gray-800 text-base">家庭成员</h3>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr><th className="px-4 py-3">称谓</th><th className="px-4 py-3">姓名</th><th className="px-4 py-3">出生日期</th><th className="px-4 py-3">工作单位/学校</th><th className="px-4 py-3">联系电话</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {familyMembers.map((member, idx) => {
                            const isHighlighted = highlightedWorkExperienceIds.includes(member.id);
                            return (
                            <tr key={idx} className={`transition-colors ${isHighlighted ? 'bg-orange-50 hover:bg-orange-100' : 'hover:bg-gray-50/50'}`}>
                                <td className="px-4 py-3">{member.relation}{isHighlighted && <span className="ml-2 text-[10px] text-orange-500 border border-orange-200 px-1 rounded-full font-bold">!</span>}</td>
                                <td className={`px-4 py-3 font-medium ${isHighlighted ? 'text-orange-700' : 'text-gray-800'}`}>{member.name}</td>
                                <td className="px-4 py-3 text-gray-600">{member.dob}</td>
                                <td className="px-4 py-3 text-gray-600">{member.company}</td>
                                <td className="px-4 py-3 text-gray-600">{member.phone}</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

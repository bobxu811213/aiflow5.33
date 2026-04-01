
import React, { useState } from 'react';
import { Award, UserPlus } from 'lucide-react';
import { Field } from '../ui/detail-field';
import { AddCertificateModal } from '../modals/add-certificate-modal';

export const CertificateInfoTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [certificates, setCertificates] = useState([
        {
            id: 1,
            type: '从业资格证',
            number: '215624525626',
            organization: '-',
            filingDate: '-',
            name: '健身教练资格证',
            issueDate: '2023-05-01',
            major: '-',
            level: '-',
            desc: '-',
            expiryDate: '-',
            remindDate: '-'
        }
    ]);

    const handleAddCertificate = (data: any) => {
        const newCert = {
            id: Date.now(),
            type: data.certType || '-',
            number: data.certNumber || '-',
            organization: data.issuingAgency || '-',
            filingDate: data.filingDate || '-',
            name: data.certName || '-',
            issueDate: data.issueDate || '-',
            major: data.major || '-',
            level: data.level || '-',
            desc: data.description || '-',
            expiryDate: data.expiryDate || '-',
            remindDate: data.reminderDate || '-'
        };
        setCertificates([...certificates, newCert]);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 min-h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Award size={20} className="text-[#13A695]" />
                    <h3 className="font-bold text-gray-800 text-base">员工证书</h3>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-[#13A695] text-sm hover:underline flex items-center"
                >
                    <UserPlus size={14} className="mr-1" /> 新增
                </button>
            </div>
            <div className="space-y-8">
                {certificates.map((cert) => (
                    <div key={cert.id} className="grid grid-cols-2 gap-y-6 gap-x-12">
                        <Field label="证照类型" value={cert.type} />
                        <Field label="证照编号" value={cert.number} />
                        <Field label="发证机构" value={cert.organization} />
                        <Field label="备案日期" value={cert.filingDate} />
                        <Field label="证照名称" value={cert.name} />
                        <Field label="发证日期" value={cert.issueDate} />
                        <Field label="专业" value={cert.major} />
                        <Field label="级别" value={cert.level} />
                        <Field label="描述" value={cert.desc} />
                        <Field label="到期日期" value={cert.expiryDate} />
                        <Field label="提醒日期" value={cert.remindDate} />
                    </div>
                ))}
            </div>

            <AddCertificateModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleAddCertificate} 
            />
        </div>
    );
};

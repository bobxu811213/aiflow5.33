
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Field } from '../ui/detail-field';
import { SectionHeader } from '../ui/resume-helpers';

export const BasicInfoTab = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 min-h-full">
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-10">
                <Field label="手机号码" value={<div className="flex items-center">132121213 <span className="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-500 text-[10px] rounded flex items-center gap-1"><AlertCircle size={10}/> 未绑定</span></div>} />
                <Field label="姓名" value="徐波波" />
                
                <Field label="工号" value="21213213231213" />
                <Field label="出生日期" value="2018-08-02" />
                
                <Field label="民族" value="-" />
                <Field label="证件照正面" value="" />
                
                <Field label="证件照反面" value="" />
                <Field label="年龄" value="7" />
                
                <Field label="户口所在地" value="-" />
                <Field label="职务" value="-" />
                
                <Field label="职务分类" value="-" />
                <Field label="职级" value="-" />
                
                <Field label="最高学历" value="-" tooltip />
                <Field label="英文姓名" value="-" />
                
                <Field label="证件类型" value="中国护照" />
                <Field label="证件号" value="123123213213" />
                
                <Field label="历史工龄(年)" value="0" />
                <Field label="工作地点" value="-" />
                
                <Field label="联系地址" value="-" />
                <Field label="司龄" value="0.16" tooltip />
                
                <Field label="首次参加工作日期" value="-" />
            </div>

            <SectionHeader title="合同信息" />
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-10 pl-4">
                <div className="col-span-2 grid grid-cols-2 gap-y-6 gap-x-12">
                    <div className="col-start-2">
                        <Field label="入职日期" value="2025-12-02" />
                    </div>
                    
                    <Field label="部门" value="许波波测试公司" />
                    <Field label="试用期到期日" value="-" />
                    
                    <Field label="当前合同开始日" value="2024-08-22" />
                    <Field label="合同公司" value="这是公司" tooltip />
                    
                    <Field label="员工类型" value="兼职" />
                    <Field label="当前合同结束日" value="2025-08-31" />
                </div>
            </div>

            <SectionHeader title="员工信息" />
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-10 pl-4">
                <Field label="试用期(月)" value="6" />
                <Field label="性别" value="-" />
                
                <Field label="合同类型" value="劳动合同" />
                <Field label="职位" value="产品小助理" />
                
                <Field label="工作邮箱" value="-" />
                <Field label="个人邮箱" value="-" />
            </div>

            <SectionHeader title="银行卡信息1" />
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-10 pl-4">
                <Field label="工资卡开户银行" value="-" />
                <Field label="工资卡分支行" value="-" />
                
                <Field label="工资卡银行账号" value="-" />
                <Field label="工资卡开户名" value="-" />
                
                <Field label="工资卡照片" value={
                    <div className="flex items-center text-[#13A695]">
                        <div className="w-4 h-4 rounded-full border border-[#13A695] flex items-center justify-center p-0.5 mr-2">
                            <div className="w-full h-full rounded-full bg-[#13A695]"></div>
                        </div>
                        设为默认
                    </div>
                } />
            </div>

            <SectionHeader title="银行卡信息2" />
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 pl-4">
                <Field label="工资卡开户银行" value="-" />
                <Field label="工资卡分支行" value="-" />
                
                <Field label="工资卡银行账号" value="-" />
                <Field label="工资卡开户名" value="-" />
                
                <Field label="工资卡照片" value={
                    <div className="flex items-center text-gray-500">
                        <div className="w-4 h-4 rounded-full border border-gray-300 mr-2"></div>
                        设为默认
                    </div>
                } />
            </div>
        </div>
    );
};

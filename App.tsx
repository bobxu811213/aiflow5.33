
import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/main-layout';

// Lazy load pages for better performance
const WorkspacePage = React.lazy(() => import('./pages/workspace'));
const OrgStructurePage = React.lazy(() => import('./pages/org-structure'));
const LegalEntityPage = React.lazy(() => import('./pages/legal-entity'));
const WorkLocationPage = React.lazy(() => import('./pages/work-location'));
const CostCenterPage = React.lazy(() => import('./pages/cost-center'));
const JobPositionsPage = React.lazy(() => import('./pages/job-positions'));
const EmployeeRosterPage = React.lazy(() => import('./pages/employee-roster'));
const EmployeeArchivesPage = React.lazy(() => import('./pages/employee-archives'));
const ContractManagementPage = React.lazy(() => import('./pages/contract-management'));
const TransferManagementPage = React.lazy(() => import('./pages/transfer-management'));
const RegistrationFormsPage = React.lazy(() => import('./pages/transfer-management/registration-forms'));
const AttendanceRetroRulesPage = React.lazy(() => import('./pages/attendance-retro-rules'));
const PerformanceIndicatorsPage = React.lazy(() => import('./pages/performance-indicators'));
const EsignTemplatesPage = React.lazy(() => import('./pages/esign-templates'));
const CompanyEntityManagementPage = React.lazy(() => import('./pages/company-entity-management'));
const EmployeeSigningRecordsPage = React.lazy(() => import('./pages/esign/records/employees'));
const PerformanceSigningRecordsPage = React.lazy(() => import('./pages/esign/records/performance'));
const FreeTablePage = React.lazy(() => import('./pages/free-table'));
const MultiDimOrgPage = React.lazy(() => import('./pages/multi-dim-org'));
const JobLevelPage = React.lazy(() => import('./pages/job-level'));
const HeadcountManagementPage = React.lazy(() => import('./pages/headcount-management'));
const HeadcountPlanPage = React.lazy(() => import('./pages/headcount-plan'));
const OrgSettingsPage = React.lazy(() => import('./pages/org-settings'));
const EmployeeSettingsPage = React.lazy(() => import('./pages/employee-settings'));
const CustomInfoSetPage = React.lazy(() => import('./pages/employee-settings/custom-info-set'));
const MobileRosterSettingsPage = React.lazy(() => import('./pages/employee-settings/mobile-roster-settings'));
const DirectorySettingsPage = React.lazy(() => import('./pages/employee-settings/directory-settings'));
const OnboardingSettingsPage = React.lazy(() => import('./pages/employee-settings/onboarding-settings'));
const ProbationSettingsPage = React.lazy(() => import('./pages/employee-settings/probation-settings'));
const TransferSettingsPage = React.lazy(() => import('./pages/employee-settings/transfer-settings'));
const ResignationSettingsPage = React.lazy(() => import('./pages/employee-settings/resignation-settings'));
const RehireSettingsPage = React.lazy(() => import('./pages/employee-settings/rehire-settings'));
const ContractSettingsPage = React.lazy(() => import('./pages/employee-settings/contract-settings'));
const PendingOnboardingSettingsPage = React.lazy(() => import('./pages/employee-settings/pending-onboarding-settings'));
const OnboardingApprovalSettingsPage = React.lazy(() => import('./pages/employee-settings/onboarding-approval-settings'));
const OnboardingFormSettingsPage = React.lazy(() => import('./pages/employee-settings/onboarding-form-settings'));
const OnboardingFormWizardPage = React.lazy(() => import('./pages/employee-settings/onboarding-form-wizard'));
const AgentManagementPage = React.lazy(() => import('./pages/settings/agent-management'));
const SkillManagementPage = React.lazy(() => import('./pages/settings/skill-management'));

const Loading = () => <div className="flex h-screen w-full items-center justify-center text-primary">Loading...</div>;

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/workspace" replace />} />
            <Route path="workspace" element={<WorkspacePage />} />
            <Route path="org-structure" element={<OrgStructurePage />} />
            <Route path="legal-entity" element={<LegalEntityPage />} />
            <Route path="work-location" element={<WorkLocationPage />} />
            <Route path="cost-center" element={<CostCenterPage />} />
            <Route path="multi-dim-org" element={<MultiDimOrgPage />} />
            <Route path="job-positions" element={<JobPositionsPage />} />
            <Route path="job-level-system" element={<JobLevelPage />} />
            <Route path="headcount-management" element={<HeadcountManagementPage />} />
            <Route path="headcount-plan" element={<HeadcountPlanPage />} />
            <Route path="org-settings" element={<OrgSettingsPage />} />
            <Route path="employee-roster" element={<EmployeeRosterPage />} />
            <Route path="employee-archives" element={<EmployeeArchivesPage />} />
            <Route path="contract-management" element={<ContractManagementPage />} />
            <Route path="transfer-management" element={<TransferManagementPage />} />
            <Route path="transfer-management/registration-forms" element={<RegistrationFormsPage />} />
            <Route path="employee-settings" element={<EmployeeSettingsPage />} />
            <Route path="employee-settings/custom-info-set" element={<CustomInfoSetPage />} />
            <Route path="employee-settings/mobile-roster-settings" element={<MobileRosterSettingsPage />} />
            <Route path="employee-settings/directory-settings" element={<DirectorySettingsPage />} />
            <Route path="employee-settings/onboarding-settings" element={<OnboardingSettingsPage />} />
            <Route path="employee-settings/probation-settings" element={<ProbationSettingsPage />} />
            <Route path="employee-settings/transfer-settings" element={<TransferSettingsPage />} />
            <Route path="employee-settings/resignation-settings" element={<ResignationSettingsPage />} />
            <Route path="employee-settings/rehire-settings" element={<RehireSettingsPage />} />
            <Route path="employee-settings/contract-settings" element={<ContractSettingsPage />} />
            <Route path="employee-settings/pending-onboarding-settings" element={<PendingOnboardingSettingsPage />} />
            <Route path="employee-settings/onboarding-approval-settings" element={<OnboardingApprovalSettingsPage />} />
            <Route path="employee-settings/onboarding-form-settings" element={<OnboardingFormSettingsPage />} />
            <Route path="employee-settings/onboarding-form-settings/create" element={<OnboardingFormWizardPage />} />
            <Route path="attendance/retro-rules" element={<AttendanceRetroRulesPage />} />
            <Route path="performance-indicators" element={<PerformanceIndicatorsPage />} />
            <Route path="esign/templates" element={<EsignTemplatesPage />} />
            <Route path="esign/company-entity" element={<CompanyEntityManagementPage />} />
            <Route path="esign/records/employees" element={<EmployeeSigningRecordsPage />} />
            <Route path="esign/records/performance" element={<PerformanceSigningRecordsPage />} />
            <Route path="free-table" element={<FreeTablePage />} />
            <Route path="settings/agent-management" element={<AgentManagementPage />} />
            <Route path="settings/skill-management" element={<SkillManagementPage />} />
            {/* Fallback for other sidebar items to Org Structure for demo purposes */}
            <Route path="*" element={<OrgStructurePage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

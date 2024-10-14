import TitleBar from '@/components/atoms/TitleBar';
import ApplicationForm from './sections/ApplicationForm';
import TitleImg from './sections/TitleImg';
import PermissionLayout from '@/components/templates/PermissionLayout';
import AuthLayout from '@/components/templates/AuthLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import MainPannel from '@/components/atoms/MainPannel';
import { Typography } from '@mui/material';
import LabTabs from './sections/LabTabs';

const TrialFormPage = () => {

    return (
        <AuthLayout>
            <PermissionLayout permission={['owner', 'super']} role={['student']}>
                <MainLayout>
                    <TitleBar>
                        受講申込みフォーム
                    </TitleBar>
                    <MainPannel>
                        <LabTabs/>
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default TrialFormPage;

import TitleBar from '@/components/atoms/TitleBar';
import ApplicationForm from './sections/ApplicationForm';
import TitleImg from './sections/TitleImg';
import PermissionLayout from '@/components/templates/PermissionLayout';
import AuthLayout from '@/components/templates/AuthLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import MainPannel from '@/components/atoms/MainPannel';
import { Typography } from '@mui/material';

const TrialFormPage = () => {

    return (
        <AuthLayout>
            <PermissionLayout permission={['owner', 'super']} role={['student']}>
                <MainLayout>
                    <TitleBar>
                        受講申込みフォーム
                    </TitleBar>

                        <div className='w-full bg-white rounded-lg'>
                            <TitleImg/>
                            <div className='w-full sd:p-10 py-[5rem] sm:px-[24px] px-2 bg-[#FAFAFA] -translate-y-4'>
                                <ApplicationForm/>
                            </div>
                        </div>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default TrialFormPage;

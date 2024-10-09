import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import PasswordForm from './sections/PasswordForm';
import ProfileForm from './sections/ProfileForm';

const ProfilePage = () => {
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'super', 'owner', 'teacher', 'student']} role={['admin', 'teacher', 'student']}>
                <MainLayout>
                    <div className='w-full flex flex-col gap-[24px]'>
                        <ProfileForm />
                        <PasswordForm />
                    </div>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default ProfilePage;

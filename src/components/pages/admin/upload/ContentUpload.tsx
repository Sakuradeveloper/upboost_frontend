import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsers } from '@/store/features/user';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import VideoUploadForm from '@/components/molecules/VideoUploadForm';

const UserListPage = () => {

    return (
        <AuthLayout>
            <PermissionLayout permission={['owner', 'super']} role={['admin', 'teacher']}>
                <MainLayout>
                    <TitleBar>アップロード</TitleBar>

                    <MainPannel>
                        <div>
                            <h1>Upload Video</h1>
                            <VideoUploadForm />
                        </div>
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default UserListPage;

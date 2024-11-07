import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return(
        <PermissionLayout permission={['owner', 'super']} role={['admin', 'student']}>
            <MainLayout>
                {children}
            </MainLayout>
        </PermissionLayout>
    )
}
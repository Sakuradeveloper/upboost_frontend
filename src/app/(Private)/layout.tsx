import AuthLayout from '@/components/templates/AuthLayout';
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return(
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}
import Link from 'next/link';

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
}

const TitleBar = ({ children, className, onClick, href }: Props) => {
    if (href) {
        return (
            <Link
                href={href}
                className='w-full flex items-center gap-[8px] bg-white rounded-lg px-[16px] sm:px-[24px] py-[16px] mb-[24px] cursor-pointer hover:no-underline text-[#364152] hover:text-[#364152]'
            >
                <h2 className='w-full flex whitespace-nowrap font-bold text-[20px] '>{children}</h2>
            </Link>
        );
    }

    return (
        <div
            className='w-full flex items-center gap-[8px] bg-white rounded-lg px-[16px] sm:px-[24px] py-[16px] mb-[24px] cursor-pointer'
            onClick={onClick}
        >
            <h2 className='w-full flex whitespace-nowrap font-bold text-[20px] '>{children}</h2>
        </div>
    );
};

export default TitleBar;

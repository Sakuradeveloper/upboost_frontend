interface Props {
    children: React.ReactNode;
    className?: string;
}

const MainPannel = ({ children, className }: Props) => {
    return <div className='w-full px-[16px] sm:px-[24px] py-[27px] bg-white rounded-lg'>{children}</div>;
};

export default MainPannel;

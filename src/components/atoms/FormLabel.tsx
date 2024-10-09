import clsx from 'clsx';

interface Props {
    className?: string;
    children: React.ReactNode;
    required?: boolean;
}

const FormLabel = ({ className, children, required }: Props) => {
    return (
        <label className={clsx('block font-normal text-[15px] leading-[19px]', className)}>
            {children}
            {required && <span className='w-[50px] text-center sm:inline-block text-[#F44336]'>(必須) </span>}
        </label>
    );
};

export default FormLabel;

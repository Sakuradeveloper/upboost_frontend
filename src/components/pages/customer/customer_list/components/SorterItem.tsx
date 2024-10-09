interface Props {
    label: string;
    current: string;
    value: string;
    onClick: (value: string) => void;
}

const SorterItem = ({ label, value, current, onClick }: Props) => {
    const handleClick = () => {
        if (current == value) {
            onClick(`-${value}`);
        } else if (current == `-${value}`) {
            onClick(value);
        } else {
            onClick(value);
        }
    };

    return (
        <div className='w-full flex items-center gap-[8px] cursor-pointer' onClick={handleClick}>
            <span className=' whitespace-nowrap'>{label}</span>

            {current === value && <span>▼</span>}

            {current === `-${value}` && <span>▲</span>}
        </div>
    );
};

export default SorterItem;

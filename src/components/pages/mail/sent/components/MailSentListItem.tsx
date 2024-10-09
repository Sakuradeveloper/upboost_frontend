import { useParams, useRouter } from 'next/navigation';
import { IMail } from '@/interfaces';

import { Avatar, AvatarGroup, Badge } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import moment from 'moment';

interface Props {
    item: IMail;
    className?: string;
}

const MailSentListItem = ({ item, className }: Props) => {
    const router = useRouter();
    const { domain } = useParams();

    const handleItemClick = () => {
        router.push(`/mail/sent/domain/${domain}/mail/${item.id}`);
    };

    return (
        <tr
            className='w-full flex items-center border-t border-b border-solid border-[#E5EAF2] mb-[-1px] cursor-pointer hover:bg-[#919eab19] transition-all duration-500 ease-out'
            onClick={handleItemClick}
        >
            <td className='px-[8px] py-[20px]'>
                <AvatarGroup max={1} variant='circular'>
                    {item.customers.map((customer, index) => (
                        <Avatar key={index} sx={{ bgcolor: deepPurple[500], color: 'white' }}>
                            {customer.name?.charAt(0)}
                        </Avatar>
                    ))}
                </AvatarGroup>
            </td>
            <td className='px-[16px] w-full'>
                <div className='w-full flex items-baseline gap-[8px] text-[#212b36] mb-[8px]'>
                    <span className='text-[14px] line-clamp-1'>
                        {item?.customers.map(customer => customer.name).join(', ')}
                    </span>
                </div>

                <div className='w-full flex flex-row gap-3'>
                    <h3 className='text-[#212b36] text-[14px] line-clamp-1'>{item?.subject}</h3>
                    <span>-</span>
                    <p
                        className=' line-clamp-1 text-[#9192ab] text-[12px] italic'
                        dangerouslySetInnerHTML={{ __html: item?.body || '' }}
                    ></p>
                </div>
            </td>
            <td className='px-[4px]' valign='bottom'>
                <span className='text-[12px] whitespace-nowrap'>{moment(item?.processed).format('YYYY-MM-DD')}</span>
            </td>
        </tr>
    );
};

export default MailSentListItem;

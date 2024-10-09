import { useParams, useRouter } from 'next/navigation';
import { IMailInbox } from '@/interfaces';

import { Avatar, Badge } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import moment from 'moment';

interface Props {
    item: IMailInbox;
    className?: string;
}

const MailInboxListItem = ({ item, className }: Props) => {
    const router = useRouter();
    const { domain } = useParams();

    const handleItemClick = () => {
        router.push(`/mail/inbox/domain/${domain.toString().replace(/%40/g, '@')}/customer/${item.id}`);
    };

    return (
        <tr
            className='w-full flex items-center border-t border-b border-solid border-[#E5EAF2] mb-[-1px] cursor-pointer hover:bg-[#919eab19] transition-all duration-500 ease-out'
            onClick={handleItemClick}
        >
            <td className='px-[8px] py-[20px]'>
                <Badge badgeContent={item.new_message_cnt} color='secondary'>
                    <Avatar sx={{ bgcolor: deepOrange[500], color: 'white' }}>{item?.name?.charAt(0)}</Avatar>
                </Badge>
            </td>
            <td className='px-[16px] min-w-[200px] line-clamp-1'>
                <div className='w-full flex items-baseline gap-[8px] text-[#212b36] '>
                    <span className='text-[14px] line-clamp-1'>
                        {item.last_message?.customers.map(customer => customer.name).join(', ')}
                    </span>

                    <span className='text-[12px] whitespace-nowrap'>( {item.message_cnt} 件 )</span>
                </div>
            </td>
            <td className='px-[16px] min-w-[200px] w-full'>
                <div className='w-full flex flex-col'>
                    <h3 className='text-[#212b36] text-[14px]'>{item.last_message?.subject}</h3>
                    <p
                        className=' line-clamp-1 text-[#9192ab] text-[12px] italic'
                        dangerouslySetInnerHTML={{ __html: item.last_message?.body || '' }}
                    ></p>
                </div>
            </td>
            <td className='px-[4px]' valign='bottom'>
                <span className='text-[12px] whitespace-nowrap'>
                    {moment(item.last_message?.processed).format('YYYY-MM-DD')}
                </span>
            </td>
        </tr>
    );
};

export default MailInboxListItem;

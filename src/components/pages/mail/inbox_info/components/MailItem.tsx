import { useRouter } from 'next/navigation';
import { IMail } from '@/interfaces';

import { Avatar } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import moment from 'moment';
import Image from 'next/image';

interface Props {
    item: IMail;
    className?: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

const MailItem = ({ item, className }: Props) => {
    const router = useRouter();

    return (
        <div className='w-full cursor-pointer py-[27px]'>
            <div className='w-full flex items-center gap-[20px] mb-[27px]'>
                <Avatar
                    sizes='small'
                    sx={{ bgcolor: item.outgoing ? deepPurple[500] : deepOrange[500], color: 'white' }}
                >
                    {item.outgoing
                        ? item.managers.length > 0 && item.managers[0].name.charAt(0)
                        : item.customers.length > 0 && item.customers[0]?.name?.charAt(0)}
                </Avatar>

                <div className='w-full'>
                    <h3 className='text-[#212b36] text-[14px]'>
                        {item.outgoing
                            ? item.managers.length > 0 && item.managers[0].name
                            : item.customers.length > 0 && item.customers[0]?.name}
                    </h3>
                    <p className='w-full flex items-baseline justify-between'>
                        <span className='text-[12px] text-[#919Eab]'>
                            {item.outgoing
                                ? item.managers.length > 0 && ` <${item.managers[0].email}>`
                                : item.customers.length > 0 && ` <${item.customers[0]?.email}>`}
                        </span>
                        <span className='text-[12px] text-[#919Eab]'>
                            {moment(item.created_at).format('YYYY-MM-DD HH:mm')}
                        </span>
                    </p>
                </div>
            </div>

            <div className='text-[#212b36]'>
                <h2 className='font-bold mb-[12px]'>{item.subject}</h2>

                <p className=' whitespace-pre-wrap break-all' dangerouslySetInnerHTML={{ __html: item.body }}></p>
            </div>

            <div className='mt-[16px] w-full flex flex-col gap-[16px]'>
                <div className='w-full flex flex-wrap gap-[16px]'>
                    {item.attachments
                        ?.filter(attachment => attachment.info?.content_type.includes('image/'))
                        .map(attachment => (
                            <div key={attachment.id} className='w-full flex items-center gap-[8px]'>
                                <a
                                    href={`${BACKEND_URL}${attachment.document}`}
                                    target='__blank'
                                    download={`${attachment.info?.name}`}
                                >
                                    <Image
                                        src={`${BACKEND_URL}${attachment.document}`}
                                        alt='W3Schools'
                                        width='150'
                                        height='142'
                                        className='rounded-lg object-cover'
                                    />
                                </a>
                            </div>
                        ))}
                </div>
                <div className='w-full flex flex-col gap-[8px]'>
                    {item.attachments
                        ?.filter(attachment => !attachment.info?.content_type.includes('image/'))
                        .map(attachment => (
                            <div key={attachment.id} className='w-full flex items-center gap-[8px]'>
                                <a
                                    href={`${BACKEND_URL}${attachment.document}`}
                                    target='__blank'
                                    download={`${attachment.info?.name}`}
                                >
                                    <span className='text-[#637381]'>{attachment.info?.name}</span>
                                </a>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MailItem;

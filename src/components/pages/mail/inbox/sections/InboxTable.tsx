import { useAppDispatch, useAppSelector } from '@/store/hooks';

import MailInboxListItem from '../components/MailInboxListItem';

const InboxTable = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail_inbox.items.filter);
    const result = useAppSelector(state => state.mail_inbox.items.result);

    if (result.total == 0)
        return (
            <div className='w-full min-h-[300px] flex items-center justify-center'>
                <div className='text-2xl text-gray-400'>
                    <p>受信トレイにメールがありません。</p>
                </div>
            </div>
        );

    return (
        <div className='w-full mb-[24px]'>
            <table className='w-full'>
                <tbody>
                    {result.data.map(item => (
                        <MailInboxListItem key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InboxTable;

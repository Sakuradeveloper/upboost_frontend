import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, fetchMemoByCustomerId, setCurrentItem } from '@/store/features/memo';
import moment from 'moment';

import { Button, Typography, useMediaQuery } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MemoDialog from '../components/MemoDialog';

const MemoForm = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { user } = useAuth();

    const is_sp = useMediaQuery('(max-width: 768px)');
    const [currentDialog, setCurrentDialog] = useState(false);
    const result = useAppSelector(state => state.memo.items.result);

    useEffect(() => {
        console.log(id);
        dispatch(fetchMemoByCustomerId(parseInt(`${id}`)));
    }, [dispatch, id]);

    const handleCreate = () => {
        dispatch(clearCurrentItem());
        setCurrentDialog(true);
    };

    const handleEdit = (item: any) => {
        if (item?.manager?.id !== user?.id) return;

        dispatch(setCurrentItem(item));
        setCurrentDialog(true);
    };

    return (
        <div>
            <div className='w-full flex items-center justify-between pb-[8px] border-b border-dashed border-[#888]'>
                <h3 className='font-bold text-[16px]'>メモ</h3>

                <Button size='small' variant='contained' color='secondary' onClick={handleCreate}>
                    作成する
                </Button>
            </div>

            <div>
                <Timeline
                    position='left'
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0
                        },
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2
                        }
                    }}
                >
                    {result.data.map(item => (
                        <TimelineItem key={item.id} position='right'>
                            {!is_sp && (
                                <TimelineOppositeContent
                                    sx={{ m: 'auto 0', width: '100px !important' }}
                                    align='right'
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    <div className='flex flex-col gap-[4px]'>
                                        <span className=' whitespace-nowrap'>
                                            {moment(item.created_at).format('YYYY-MM-DD')}
                                        </span>
                                        <span className=' whitespace-nowrap'>
                                            {moment(item.created_at).format('HH:mm')}
                                        </span>
                                    </div>
                                </TimelineOppositeContent>
                            )}
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot>
                                    <LaptopMacIcon />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2, width: '100%' }}>
                                <Typography variant='h6' component='div'>
                                    <div className='px-2'>
                                        <span>{item.manager.name}</span>

                                        {is_sp && (
                                            <div className='flex justify-end text-gray-600 gap-[4px]'>
                                                <span className=' whitespace-nowrap'>
                                                    {moment(item.created_at).format('YYYY-MM-DD')}
                                                </span>
                                                <span className=' whitespace-nowrap'>
                                                    {moment(item.created_at).format('HH:mm')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Typography>
                                <Typography
                                    className='w-full p-2 hover:bg-gray-100 transition-all duration-500 ease-out cursor-pointer rounded-lg'
                                    component='div'
                                    onClick={() => handleEdit(item)}
                                >
                                    {item.content}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </div>

            <MemoDialog open={currentDialog} handleClose={() => setCurrentDialog(false)} />
        </div>
    );
};

export default MemoForm;

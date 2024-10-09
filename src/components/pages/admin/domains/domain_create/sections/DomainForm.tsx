import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/domain';

import { TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';

const DomainForm = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.domain.item.form);
    const errors = useAppSelector(state => state.domain.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    return (
        <>
            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>SMTP ホスト</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        placeholder='smtp.gmail.com'
                        value={currentItem.host}
                        onChange={e => dispatch(setCurrentItemValue({ host: e.target.value }))}
                        error={errors.host ? true : false}
                        helperText={errors.host ? errors.host : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>SMTP ポート</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        placeholder='587'
                        value={currentItem.port}
                        onChange={e => dispatch(setCurrentItemValue({ port: e.target.value }))}
                        error={errors.port ? true : false}
                        helperText={errors.port ? errors.port : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>メールアドレス</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        placeholder='info@tokyo-stock-news.com'
                        value={currentItem.username}
                        onChange={e => dispatch(setCurrentItemValue({ username: e.target.value }))}
                        error={errors.username ? true : false}
                        helperText={errors.username ? errors.username : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>パスワード</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.password}
                        onChange={e => dispatch(setCurrentItemValue({ password: e.target.value }))}
                        error={errors.password ? true : false}
                        helperText={errors.password ? errors.password : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>IMAP ホスト</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.imap_host}
                        onChange={e => dispatch(setCurrentItemValue({ imap_host: e.target.value }))}
                        error={errors.imap_host ? true : false}
                        helperText={errors.imap_host ? errors.imap_host : ''}
                    />
                </div>
            </div>
        </>
    );
};

export default DomainForm;

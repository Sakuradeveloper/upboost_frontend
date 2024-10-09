import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/mail_template';

import { TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';

const MailTemplateForm = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.mail_template.item.form);
    const errors = useAppSelector(state => state.mail_template.item.errors);

    return (
        <>
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>件名</FormLabel>
                <div className='w-full lg:max-w-[820px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.subject}
                        onChange={e => dispatch(setCurrentItemValue({ subject: e.target.value }))}
                        error={errors.subject ? true : false}
                        helperText={errors.subject ? errors.subject : ''}
                    />
                </div>
            </div>

            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>本文</FormLabel>
                <div className='w-full lg:max-w-[820px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        multiline={true}
                        inputProps={{
                            style: {
                                height: '250px',
                                padding: '0 14px'
                            }
                        }}
                        value={currentItem.body}
                        onChange={e => dispatch(setCurrentItemValue({ body: e.target.value }))}
                        error={errors.body ? true : false}
                        helperText={errors.body ? errors.body : ''}
                    />
                </div>
            </div>
        </>
    );
};

export default MailTemplateForm;

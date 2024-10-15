import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/user';
import { fetchRoleData } from '@/store/features/shared_data';

import { MenuItem, Select, Switch, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';

const UserForm = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.user.item.form);
    const errors = useAppSelector(state => state.user.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    useEffect(() => {
        dispatch(fetchRoleData());
    }, [dispatch]);

    return (
        <>
            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>氏名</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.last_name}
                        onChange={e => dispatch(setCurrentItemValue({ last_name: e.target.value }))}
                        error={errors.last_name ? true : false}
                        helperText={errors.last_name ? errors.last_name : ''}
                    />
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.first_name}
                        onChange={e => dispatch(setCurrentItemValue({ first_name: e.target.value }))}
                        error={errors.first_name ? true : false}
                        helperText={errors.first_name ? errors.first_name : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>氏名</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.last_name_furi}
                        onChange={e => dispatch(setCurrentItemValue({ last_name_furi: e.target.value }))}
                        error={errors.last_name_furi ? true : false}
                        helperText={errors.last_name_furi ? errors.last_name_furi : ''}
                    />
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.first_name_furi}
                        onChange={e => dispatch(setCurrentItemValue({ first_name_furi: e.target.value }))}
                        error={errors.first_name_furi ? true : false}
                        helperText={errors.first_name_furi ? errors.first_name_furi : ''}
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
                        value={currentItem.email}
                        onChange={e => dispatch(setCurrentItemValue({ email: e.target.value }))}
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>電話番号</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.phone}
                        onChange={e => dispatch(setCurrentItemValue({ phone: e.target.value }))}
                        error={errors.phone ? true : false}
                        helperText={errors.phone ? errors.phone : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>権限</FormLabel>
                <div className='w-full lg:max-w-[420px]'>
                    <Select
                        fullWidth
                        size='small'
                        value={currentItem.role}
                        onChange={e => dispatch(setCurrentItemValue({ role: e.target.value }))}
                        error={errors.role ? true : false}
                    >
                        <MenuItem value={0}>選択する</MenuItem>
                        {shared_data.role_data.map(role => (
                            <MenuItem value={role.id} key={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>

                    {errors.role && <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.role}</p>}
                </div>
            </div>

            {/* ************************************************************************ */}
            {/* <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>ステイテス</FormLabel>
                <div className='w-full lg:max-w-[420px] flex items-center gap-[8px]'>
                    <Switch
                        checked={currentItem.is_allowed}
                        onClick={e => dispatch(setCurrentItemValue({ is_allowed: !currentItem.is_allowed }))}
                    ></Switch>

                    {currentItem.is_allowed && <span>通常使用</span>}
                    {!currentItem.is_allowed && <span>使用停止</span>}
                </div>
            </div> */}
        </>
    );
};

export default UserForm;

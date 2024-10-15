import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearFilter, setFilterValue } from '@/store/features/customer';

import { InputAdornment, TextField, FormLabel, Select, MenuItem, Button } from '@mui/material';
import { IoSearch } from 'react-icons/io5';

const Filter = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.customer.items.filter);
    const shared_data = useAppSelector(state => state.shared_data);

    useEffect(() => {
        return () => {
            dispatch(clearFilter());
        };
    }, [dispatch]);

    return (
        <div className='flex flex-col md:flex-row md:items-center gap-4  mb-[16px]'>
            <div className='w-full flex'>
                <TextField
                    fullWidth
                    size='small'
                    value={filter.keyword}
                    onChange={e => dispatch(setFilterValue({ keyword: e.target.value }))}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <IoSearch />
                            </InputAdornment>
                        )
                    }}
                    placeholder='検索ワードを入力'
                />
            </div>
            <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[54px] mt-[10px]'>状態</FormLabel>
                <div className='w-full md:max-w-[420px]'>
                    <Select
                        fullWidth
                        size='small'
                        value={filter.status}
                        onChange={e => dispatch(setFilterValue({ status: e.target.value }))}
                    >
                        <MenuItem value={0}>選択する</MenuItem>
                        {shared_data.status_data.map(status => (
                            <MenuItem value={status.id} key={status.id}>
                                {status.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            {/* ************************************************************************ */}
            <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[54px] mt-[10px]'>属性</FormLabel>
                <div className='w-full md:max-w-[420px]'>
                    <Select
                        fullWidth
                        size='small'
                        value={filter.property}
                        onChange={e => dispatch(setFilterValue({ property: e.target.value }))}
                    >
                        <MenuItem value={0}>選択する</MenuItem>
                        {shared_data.property_data.map(property => (
                            <MenuItem value={property.id} key={property.id}>
                                {property.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default Filter;

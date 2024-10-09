import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/mail_template';

import { Pagination, Select, MenuItem } from '@mui/material';

const TablePagination = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail_template.items.filter);
    const result = useAppSelector(state => state.mail_template.items.result);

    if (result.total === 0) return <></>;

    return (
        <div className='w-full flex items-center justify-center gap-[50px] mt-[16px]'>
            <Pagination
                count={Math.ceil(result.total / filter.pageSize)}
                page={filter.page}
                onChange={(e, page) => dispatch(setFilterValue({ page: page }))}
                variant='outlined'
                color='secondary'
            />

            <Select
                value={filter.pageSize}
                onChange={e => dispatch(setFilterValue({ pageSize: e.target.value as number }))}
                variant='outlined'
                color='secondary'
                size='small'
            >
                <MenuItem value={10}>10 件</MenuItem>
                <MenuItem value={20}>20 件</MenuItem>
                <MenuItem value={50}>50 件</MenuItem>
                <MenuItem value={100}>100 件</MenuItem>
            </Select>
        </div>
    );
};

export default TablePagination;

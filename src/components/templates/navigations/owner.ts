import { Breadcrumbs } from '@mui/material';
import { AiOutlineHome } from 'react-icons/ai';
import { LuDatabaseBackup, LuUsers } from 'react-icons/lu';
import { MdOutlineBackup } from 'react-icons/md';
// constant
const icons = {
    AiOutlineHome,
    LuDatabaseBackup,
    MdOutlineBackup,
    LuUsers,
    
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'owner',
    type: 'group',
    title: 'オーナー',
    children: [
        {
            id: 'default',
            title: 'トップページ',
            type: 'item',
            url: '/dashboard',
            icon: icons.AiOutlineHome,
            breadcrumbs: false
        },
        // {
        //     id: 'backup',
        //     title: 'バックアップ管理',
        //     type: 'item',
        //     url: '/admin/backup',
        //     icon: icons.MdOutlineBackup,
        //     breadcrumbs: false
        // },
        {
            id: 'users',
            title: '担当管理',
            type: 'collapse',
            icon: icons.LuUsers,

            children: [
                {
                    id: 'users-list',
                    title: '担当一覧',
                    type: 'item',
                    url: '/admin/users/',
                    target: true
                },
                {
                    id: 'users-create',
                    title: '担当新規登録',
                    type: 'item',
                    url: '/admin/users/create',
                    target: true
                }
            ]
        },
    ]
};

export default pages;

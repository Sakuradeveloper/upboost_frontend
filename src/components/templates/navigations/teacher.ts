import { AiFillSchedule, AiOutlineHome, AiOutlineUser, AiFillWechat } from 'react-icons/ai';
import { RiCustomerService2Line, RiMessage2Fill, RiSecurePaymentFill } from 'react-icons/ri';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { VscNotebookTemplate } from 'react-icons/vsc';

// constant
const icons = {
    AiOutlineHome,
    RiCustomerService2Line,
    IoMailUnreadOutline,
    VscNotebookTemplate,
    AiFillSchedule,
    AiOutlineUser,
    RiSecurePaymentFill,
    RiMessage2Fill,
    AiFillWechat
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'teacher',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'トップページ',
            type: 'item',
            url: '/dashboard',
            icon: icons.AiOutlineHome,
            breadcrumbs: false
        },
        {
            id: 'schedule',
            title: 'スケジュール管理',
            type: 'item',
            url: '/teachers/schedule',
            icon: icons.AiFillSchedule,
            breadcrumbs: false
        },
        {
            id: 'uwer Management',
            title: '学生管理',
            type: 'item',
            url: '/teachers/users',
            icon: icons.AiOutlineUser,
            breadcrumbs: false
        },
        {
            id: 'pay',
            title: '決済管理',
            type: 'item',
            url: '/customer/schedule',
            icon: icons.RiSecurePaymentFill,
            breadcrumbs: false
        },
        // {
        //     id: 'student',
        //     title: '支払い管理',
        //     type: 'item',
        //     url: '/customer/schedule',
        //     icon: icons.RiSecurePaymentFill,
        //     breadcrumbs: false
        // },
        {
            id: 'notification',
            title: 'お知らせ',
            type: 'item',
            url: '/teachers/notifications',
            icon: icons.RiMessage2Fill,
            breadcrumbs: false
        },
        {
            id: 'chatting',
            title: 'チャット',
            type: 'item',
            url: '/teachers/chat',
            icon: icons.AiFillWechat,
            breadcrumbs: false
        }
    ]
};

export default pages;

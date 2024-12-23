import { AiFillSchedule, AiOutlineHome, AiOutlineUser, AiFillWechat, AiFillRedEnvelope } from 'react-icons/ai';
import { RiCustomerService2Line, RiMessage2Fill, RiSecurePaymentFill } from 'react-icons/ri';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { VscNotebookTemplate } from 'react-icons/vsc';
import { LuUsers, LuMail, LuBook, LuBookX } from 'react-icons/lu';

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
    AiFillWechat, 
    AiFillRedEnvelope,
    LuMail
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'teacher',
    title: '教師',
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
        // {
        //     id: 'pay',
        //     title: '決済管理',
        //     type: 'item',
        //     url: '/customer/schedule',
        //     icon: icons.RiSecurePaymentFill,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'student',
        //     title: '支払い管理',
        //     type: 'item',
        //     url: '/customer/schedule',
        //     icon: icons.RiSecurePaymentFill,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'application',
        //     title: '無料試聴一覧',
        //     type: 'item',
        //     icon: icons.LuMail,
        //     url: '/teachers/applications/trial',
        //     breadcrumbs: false
        // },
        {
            id: 'notification',
            title: '無料試聴一覧',
            type: 'item',
            url: '/teachers/applications/trial',
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

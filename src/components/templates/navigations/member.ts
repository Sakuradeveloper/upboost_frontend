import { AiOutlineHome } from 'react-icons/ai';
import { RiCustomerService2Line } from 'react-icons/ri';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { VscNotebookTemplate } from 'react-icons/vsc';

// constant
const icons = {
    AiOutlineHome,
    RiCustomerService2Line,
    IoMailUnreadOutline,
    VscNotebookTemplate
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'member',
    title: '一般',
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
            id: 'customers',
            title: '顧客管理',
            type: 'collapse',
            icon: icons.RiCustomerService2Line,

            children: [
                {
                    id: 'customers-list',
                    title: '顧客一覧',
                    type: 'item',
                    url: '/customers',
                    target: true
                },
                {
                    id: 'customers-create',
                    title: '顧客新規登録',
                    type: 'item',
                    url: '/customers/create',
                    target: true
                }
            ]
        },
        {
            id: 'mail-template',
            title: 'テンプレート',
            type: 'collapse',
            icon: icons.VscNotebookTemplate,

            children: [
                {
                    id: 'mail-template-list',
                    title: 'テンプレート一覧',
                    type: 'item',
                    url: '/mail/templates',
                    target: true
                },
                {
                    id: 'mail-template-create',
                    title: '新規登録',
                    type: 'item',
                    url: '/mail/templates/create',
                    target: true
                }
            ]
        },
        {
            id: 'mail',
            title: 'メール管理',
            type: 'collapse',
            icon: icons.IoMailUnreadOutline,

            children: [
                {
                    id: 'mail-inbox',
                    title: '受信トレイ',
                    type: 'item',
                    url: '/mail/inbox',
                    target: true
                },
                {
                    id: 'mail-sent',
                    title: '送信済み',
                    type: 'item',
                    url: '/mail/sent',
                    target: true
                },
                {
                    id: 'mail-create',
                    title: '個別送信',
                    type: 'item',
                    url: '/mail/new_send',
                    target: true
                },
                {
                    id: 'mail-group-create',
                    title: 'グループ送信',
                    type: 'item',
                    url: '/mail/group_send',
                    target: true
                }
            ]
        }
    ]
};

export default pages;

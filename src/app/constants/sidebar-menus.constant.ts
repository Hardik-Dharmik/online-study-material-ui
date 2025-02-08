import { SidebarMenu } from "../layouts/sidebar/routes.constant";

export const fillerNav: SidebarMenu[] = [
    { link: '', text: 'Dashboard', icon: 'dashboard' },
    { link: 'all-pdfs', text: 'All PDFs', icon: 'apps' },
    { link: 'subjects', text: 'Subjects', icon: 'subject' },
    { link: 'classes', text: 'Classes', icon: 'class' },
    { link: 'add-pdf', text: 'Add PDF', role: 'super-admin', icon: 'add' },
];
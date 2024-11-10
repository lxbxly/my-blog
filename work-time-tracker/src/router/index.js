import { createRouter, createWebHistory } from 'vue-router';

// 引入页面组件
import BlogPage from '../views/BlogPage.vue';
import WorkTimeTracker from '../views/WorkTimeTracker.vue'
import ArticleList from '../views/ArticleList.vue'
import NotFound from '../views/NotFound.vue'
import ToolsPage from '@/views/ToolsPage.vue';

// 定义路由配置
const routes = [
    {
        path: '/',
        redirect: '/blogPage'
    },
    {
        path: '/blogPage',
        name: 'BlogPage',
        component: BlogPage,
    },
    {
        path: '/workTimeTracker',
        name: 'WorkTimeTracker',
        component: WorkTimeTracker,
    },
    {
        path: '/tools',
        name: 'ToolsPage',
        component: ToolsPage,
    },
    {
        path: '/articleList',
        name: 'ArticleList',
        component: ArticleList,
    },
    {
        path: '/:catchAll(.*)', // 捕获所有未定义的路由
        name: 'NotFound',
        component: NotFound,
    },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

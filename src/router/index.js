import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: 'readme' },
            children: [
                {
                    path: 'dashboard',
                    component: () => import('../components/home/Dashboard.vue'),
                    meta: { title: 'readme' }
                },
                {
                    path: '/worker',
                    component: () => import( '../components/aiorq/worker.vue'),
                    meta: { title: 'worker' },
                },
                {
                    path: '/job',
                    component: () => import('../components/aiorq/job.vue'),
                    meta: { title: 'job' }
                },
                {
                    path: '/result',
                    component: () => import('../components/aiorq/result.vue'),
                    meta: { title: 'result' }
                },
     
                {
                    path: '/logs',
                    component: () => import('../components/aiorq/logs.vue'),
                    meta: { title: 'logs' }
                },
       
                {
                    path: '/setting',
                    component: () => import('../components/aiorq/setting.vue'),
                    meta: { title: 'setting' }
                },
            
                // {
                //     path: '/icon',
                //     component: () => import(/* webpackChunkName: "icon" */ '../components/until/Icon.vue'),
                //     meta: { title: '自定义图标' }
                // },
            
                // {
                //     path: '/box',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/until/Box.vue'),
                //     meta: { title: '消息盒子' }
                // },
                
                // {
                //     path: '/tabs',
                //     component: () => import(/* webpackChunkName: "tabs" */ '../components/until/Tabs.vue'),
                //     meta: { title: 'tab选项卡' }
                // },
                // {
                //     path: '/form',
                //     component: () => import(/* webpackChunkName: "form" */ '../components/forms/BaseForm.vue'),
                //     meta: { title: '基本表单' }
                // },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: () => import(/* webpackChunkName: "editor" */ '../components/until/VueEditor.vue'),
                //     meta: { title: '富文本编辑器' }
                // },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: () => import(/* webpackChunkName: "markdown" */ '../components/until/Markdown.vue'),
                //     meta: { title: 'markdown编辑器' }
                // },
                // {
                //     path: '/upload',
                //     component: () => import('../components/until/Upload.vue'),
                //     meta: { title: '文件上传' }
                // },
                // {
                //     path: '/charts',
                //     component: () => import( '../components/eCharts/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
                // {
                //     path: '/workLog',
                //     component: () => import('../components/workLog/LogIndex.vue'),
                //     meta: {title: '任务日志'}
                // },

                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: () => import( '../components/until/DragList.vue'),
                //     meta: { title: '拖拽列表' }
                // },
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: () => import('../components/until/DragDialog.vue'),
                //     meta: { title: '拖拽弹框' }
                // },
                // {
                //     // 国际化组件
                //     path: '/i18n',
                //     component: () => import( '../components/until/I18n.vue'),
                //     meta: { title: '国际化' }
                // },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import( '../components/until/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import( '../components/error/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import('../components/error/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import( '../components/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

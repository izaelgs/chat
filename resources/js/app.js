import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import moment from 'moment/moment';

moment.locale("pt-BR");

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({el, App, props, plugin}) {

        const app =  createApp({render: () => h(App, props)})
                .use(plugin)
                .use(ZiggyVue, Ziggy);

        app.config.globalProperties.$filters = {
            formatDate(value) {
                if(value) {
                    return moment(value).format('DD/MM/YYYY HH:mm');
                }
            },
        }

        app.mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });

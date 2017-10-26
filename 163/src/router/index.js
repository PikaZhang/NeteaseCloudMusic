import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import My from '@/components/My'
import Friend from '@/components/Friend'
import Product from '@/components/Product'
import Recruit from '@/components/Recruit'
import Personalized from '@/components/Personalized'
import Login from '@/components/Login'
import AllRecommend from '@/components/AllRecommend'
import Search from '@/components/Search'

Vue.use(Router)

import Promise from 'promise-polyfill';

// To add to window  
if (!window.Promise) {
    window.Promise = Promise;
}

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/my',
            name: 'My',
            component: My
        },
        {
            path: '/friend',
            name: 'Friend',
            component: Friend
        },
        {
            path: '/product',
            name: 'Product',
            component: Product
        },
        {
            path: '/recruit',
            name: 'Recruit',
            component: Recruit
        },

        {
            path: '/personalized/:id',
            name: 'Rersonalized',
            component: Personalized
        }, {
            path: '/login',
            name: 'Login',
            component: Login
        }, {
            path: '/allRecommend',
            name: 'allRecommend',
            component: AllRecommend
        }, {
            path: '/search',
            name: 'Search',
            component: Search
        }
    ]
})
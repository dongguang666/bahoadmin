import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Login from '@/components/Login'
import Kaifa from '@/components/Kaifa'
import Gongying from '@/components/Gongying'
import Caigou from '@/components/Caigou'
import Admin from '@/components/Admin'
import Orderstate from '@/components/Orderstate'
import OrderstateDet from '@/components/OrderstateDet'
import KF from '@/components/KF'
import Zzpage from '@/components/Zzpage'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: '/xietongpc/',
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/Test',
            name: 'Test',
            component: Test
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Kaifa',
            name: 'Kaifa',
            component: Kaifa
        },
        {
            path: '/Gongying',
            name: 'Gongying',
            component: Gongying
        },
        {
            path: '/Caigou',
            name: 'Caigou',
            component: Caigou
        },
        {
            path: '/Admin',
            name: 'Admin',
            component: Admin
        },
        // {
        //     path: '/Orderstate',
        //     name: 'Orderstate',
        //     component: Orderstate
        // },
        {
            path: '/Orderstate',
            name: 'Orderstate',
            component: Orderstate
        },
        {
            path: '/OrderstateDet',
            name: 'OrderstateDet',
            component: OrderstateDet
        },
        {
            path: '/KF',
            name: 'KF',
            component: KF
        },
        {
            path: '/Zzpage',
            name: 'Zzpage',
            component: Zzpage
        }
    ]
})

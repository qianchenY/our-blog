import Vue from 'vue';
import Router from 'vue-router';

import Homepage from '@/views/homepage';
import Loginpage from '@/views/loginpage';
import Dynamic from '@/views/dynamic';
import Helloworld from '@/components/HelloWorld';

import EditorPage from '@/views/editorpage'
import DynamicDetails from '@/views/dynamicdetails';
import Search from '@/views/Search';

import User from '@/views/user'
import UserEditor from '@/views/userEditor'
import UserAsks from '@/components/user/userAsks'
import UserPosts from '@/components/user/userPosts'
import UserComment from '@/components/user/userComment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/Homepage/dynamic'
    },
    {
      path: '/Loginpage',
      name: 'Loginpage',
      component: Loginpage
    },
    {
      path: '/User/editor',
      name: 'UserEditor',
      component: UserEditor
    },
    {
      path: '/User/:userid',
      name: 'User',
      component: User,
      redirect:'/User/:userid/asks',
      children:[
        {
          path: '/User/:userid/asks',
          component: UserAsks
        },
        {
          path: '/User/:userid/posts',
          component: UserPosts
        },
        {
          path: '/User/:userid/comment',
          component: UserComment
        }
      ]
    },
    {
      path: '/Homepage',
      name: 'Homepage',
      component: Homepage,
      children:[
        {
          path:'/Homepage/dynamic',
          component:Dynamic,
        },
        {
          path:'/Homepage/dynamic/:dyclass',
          component:Dynamic
        },        
        {
          path:'/Homepage/helloworld',
          component:Helloworld
        },
        {
          path:'/Homepage/editorpage',
          component:EditorPage
        },
        {
          path:'/Homepage/DynamicDetails/:id',
          component:DynamicDetails
        },{
          path:'/Homepage/search',
          component:Search
        }
      ]
    },
  ],
  linkActiveClass:'active'
})

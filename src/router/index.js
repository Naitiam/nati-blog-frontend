import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
// import AdminCenter from "../components/admin/AdminCenter.vue";
// import ArticleAdd from "../components/admin/ArticleAdd.vue";

Vue.use(VueRouter)

const routes = [
  {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
          title: '首页',
          needLogin: true
      },
      children:[
          {
              path:'',
              name:'AdminCenter',
              component: () => import('../components/admin/AdminCenter.vue'),
              meta: {
                  title: '主页',
                  needLogin: true
              },
          },
          {
              path:'artmag',
              name:'ArticleMag',
              component: () => import('../components/admin/ArticleMag.vue'),
              meta: {
                  title: '管理文章',
                  needLogin: true
              },
          },
          {
              path:'artadd',
              name:'ArticleAdd',
              component: () => import('../components/admin/ArticleAdd.vue'),
              meta: {
                  title: '添加文章',
                  needLogin: true
              },
          },
          {
              path:'commag',
              name:'ComMag',
              component: () => import('../components/admin/ComMag.vue'),
              meta: {
                  title: '评论管理界面',
                  needLogin: true
              },
          },
          {
              path:'modifyinfo',
              name:'ModifyInfo',
              component: () => import('../components/admin/ModifyInfo.vue'),
              meta: {
                  title: '修改个人信息',
                  needLogin: true
              },
          }
      ]
  },
  {
      path: '/login',
      name: 'Login',
      component:Login,
      meta: { title: '登录界面' },
  },
  {
      path: '/',
      name: 'Home',
      component:Home,
      meta: { title: '博客界面' },
      children:[
          {
              path:'',
              name:'ArticleList',
              component: () => import('../components/home/ArticleList.vue'),
          },
          {
              path:'articleLists',
              name:'ArticleListS',
              component: () => import('../components/home/ArticleListS.vue'),
          },
          {
              path: 'worklist',
              name: 'WorkList',
              component: () => import('../components/home/WorkList.vue')
          },
          {
              path: 'aboutme',
              name: 'AboutMe',
              component: () => import('../components/home/AboutMe.vue')
          },
          {
              path: 'friendlink',
              name: 'FriendLink',
              component: () => import('../components/home/FriendLink.vue')
          },
          {
              path: 'articleopen',
              name: 'ArticleOpen',
              component: () => import('../components/home/ArticleOpen.vue')
          },
      ]
  },


]
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,form,next)=>{
    let needLogin = to.matched.some(res=>res.meta.needLogin);
    if(needLogin ){
        if(to.path==='/login') {
            next()
        }else{
            let islogin = localStorage.getItem('adm');
            if(islogin){
                next()
            }else{
                next('/login')
            }
        }
    }
    next()
})

export default router

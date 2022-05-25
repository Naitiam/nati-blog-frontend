<template>
    <div id="admin" style="height: 100%;">
        <el-container style="height: 100%;">
            <!--左侧菜单栏-->
            <el-aside width="220px" >
                <el-menu router
                         :default-openeds="['1']"
                         background-color="#FFF"
                         text-color="black"
                         active-text-color="#ffd04b"
                         @select="handleSelect" >
                    <div class="syslogo"><h2>博客管理系统</h2></div>
                    <el-menu-item index="/admin">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">主页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-s-management"></i>文章管理</template>
                            <el-menu-item index="/admin/artadd">&nbsp;&nbsp;添加文章</el-menu-item>
                            <el-menu-item index="/admin/artmag">&nbsp;&nbsp;编辑文章</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-s-flag"></i>作品管理</template>
                            <el-menu-item index="1-1">&nbsp;&nbsp;添加作品</el-menu-item>
                            <el-menu-item index="1-2">&nbsp;&nbsp;编辑作品</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/admin/commag">
                        <i class="el-icon-chat-line-square"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-s-comment"></i>
                        <span slot="title">留言管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-share"></i>
                        <span slot="title">友链管理</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-star-on"></i>
                        <span slot="title">标签管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/modifyinfo">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">个人信息修改</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="background-color:#EEE;height: 60px; line-height: 60px;text-align: right; font-size: 12px;color: black;">
                    <el-row type="flex" class="row-bg" justify="space-between">
                        <el-col :span="8" style="padding-top: 25px"><div class="grid-content bg-purple"><el-breadcrumb separator="/">
                            <el-breadcrumb-item v-for="item in list"
                                                :key="item.path"
                                                :to="item.path"
                            >{{ item.meta.title }}</el-breadcrumb-item>
                        </el-breadcrumb>
                        </div></el-col>

                        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple">
                            <el-popover
                                    placement="top-start"
                                    trigger="hover"
                                    content="博客界面GO！​✿ヽ(°▽°)ノ✿">
                                <el-button type="info"  slot="reference" @click="goblog">{{adm.admname}}</el-button>
                            </el-popover>
                        </div></el-col>
                        <el-avatar style="margin: 10px" shape="square" :src="admphoto"></el-avatar>
                    </el-row>
                </el-header>
                <el-container style="overflow-y: hidden;overflow-x: hidden; ">
                    <router-view />
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import admphoto from '@/static/image/moren.jpg'
    // import admincenter from "@/components/admin/AdminCenter.vue";
    // import articleadd from "@/components/admin/ArticleAdd.vue";
    // import articlemag from "../components/admin/ArticleMag.vue";
    export default {
        // components: {
        //     admincenter,
        //     articleadd,
        //     articlemag
        // },
        data(){
            return{
                adm: {},
                // adminname: 'Naitiam',
                admphoto: '',
                paths: [],
            }
        },
        created(){
            if(localStorage.getItem("adm")!=null){
                this.adm = JSON.parse(localStorage.getItem("adm"));
                // this.admphoto = require("@/static/image/"+this.adm.admphoto)
                this.admphoto = this.adm.admphoto;
                //好耶ヽ(✿ﾟ▽ﾟ)ノ
            }
        },
        methods:{
            handleSelect(index){
                // console.log(this.$route.matched);
            },
            goblog(){
                this.$router.push("/")
                localStorage.removeItem("adm")
            }
        },
        computed: {
            list() {
                return this.$route.matched;
            },
        },


    };
</script>

<style scoped>
    .el-header {
        background-color: #fff;
        color: #fff;
        line-height: 60px;
    }
    .el-aside {
        width: 300px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .syslogo{
        height: 80px;
        line-height: 80px;
        text-align: center;
        background-image: url("../static/image/test_image.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: top;
        background-color: #fff;
    }
    .el-aside{
        background-color: #FFF;
        height: 100% ;
    }

</style>
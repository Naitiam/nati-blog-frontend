<template>
    <div class="main gotop">
        <el-button type="info" size="small" autocomplete="off" @click="watchgood()">返回</el-button>
        <!--文章-->
        <div style="margin: 10px 0">
            <h2>{{articleopen.arttitle}}</h2>
            <div style="margin-top: 16px">
                <span v-for="tag in articleopen.tagsList"style="float: right;" ><el-tag type="info" effect="plain" size="small" style="margin-right: 5px">{{tag}}</el-tag></span>
                <i type="text" class="el-icon-date"  style="margin-right: 6px; "></i><span style="font-size: 14px;" type="text">{{articleopen.artreltime}}</span>
            </div>
        </div>
        <div>
            <mavon-editor
                    class="md"
                    :value="articleopen.artcontent"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :toolbarsFlag="false"
                    :editable="false"
                    :scrollStyle="true"
                    :ishljs="true"
                    style="width:820px"
            />
        </div>
        <div style="margin:18px 0px;height: 22px;line-height: 22px">
            已获点赞数&nbsp;{{articleopen.artgood}}&nbsp;&nbsp;喜欢就点个赞吧=>
            <span v-show="showIcon"><i @click="good()" class="el-icon-star-off" style="font-size: 20px"/></span>
            <span v-show="!showIcon"><i @click="nogood()" class="el-icon-star-off" style="color: #F56C6C;font-size: 20px"/></span>
            <span style="box-sizing: inherit;float: right;">浏览数<i class="el-icon-view" style="margin: 0px 6px;"/>{{articleopen.artwatch}}</span>
        </div>

        <!--添加评论-->
        <div style="margin: 20px 0;border-top: #ccc 5px solid">
            <h3 style="margin: 5px 0;">添加评论</h3>
            <div style="background-color: rgba(255,255,255,0.5);padding: 10px;">
                <el-form :model="com"  label-width="80px">
                    <el-form-item label="评论头像">
                        <span style="font-size: 12px">(默认头像,点击更换)</span>
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:9090/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                        <img v-if="com.comphoto" :src="com.comphoto" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="评论姓名">
                        <el-input v-model="com.comname" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="评论内容">
                        <el-input type="textarea" v-model="com.comcontent" style="width:200px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="info" @click="addcom">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!--评论们-->
        <div>
            <h3>评论</h3>
            <div style="background-color: rgba(255,255,255,0.5); padding: 10px;">
                <div style="text-align: center" v-if="ncom">就等你评论 :）</div>
                <div v-for="c in coms" style="border-bottom: #efefef 3px solid;">
                    <div style="display: flex">
                        <div>
                            <el-avatar style="margin: 10px" shape="square" :src="c.comphoto"></el-avatar>
                        </div>
                        <div style="flex: 1; font-size: 14px; padding: 5px 0; line-height: 25px;">
                            <b>{{c.comname}}：</b>
                            <span>{{c.comcontent}}</span>
                            <div style="line-height: 20px; margin-top: 5px">
                                <div style="width: 200px;">
                                    <i class="el-icon-time"></i><span style="margin-left: 5px">{{c.comtime}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-left:50px;display: flex;border-top: #efefef 3px solid;" v-if="c.comreply">
                        <div>
                            <el-avatar style="margin: 10px" shape="square" :src="mine.admphoto"></el-avatar>
                        </div>
                        <div style="flex: 1; font-size: 14px; padding: 5px 0; line-height: 25px;">
                            <b>{{mine.admname}}：</b>
                            <span>{{c.comreply}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <el-backtop style="color: #8c939d" target=".gotop">
        </el-backtop>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                artnum:this.$route.query.artnum,
                articleopen:{},
                com:{
                    comname:'',
                    comphoto:"http://localhost:9090/img/9da75b2f-3af5-427c-a6fc-635590c161d5.jpg",
                    comcontent:''
                },
                coms:{},
                mine:JSON.parse(localStorage.getItem("mine")),
                ncom:true,
                showIcon:true,
            }
        },
        // watch:{
        //     $route: {
        //         immediate: true, // 一旦监听到路由的变化立即执行
        //         handler(to, from) {
        //             console.log("监听路由：" + to.name);
        //         },
        //     },
        // },
        created(){
            this.load()
            this.comload()
        },
        methods: {
            load() {
                this.request.get("/article/"+this.artnum).then(res => {
                    // console.log(res.data)
                    this.articleopen = res.data
                    this.total = res.total
                })
            },
            comload(){
                this.request.get("/comment/"+this.artnum).then(res=>{
                    // console.log("aaaaaaa"+res.data)
                    this.coms = res.data
                    if(Object.keys(res.data).length !==0){
                        this.ncom=false
                    }
                })
            },
            addcom(){
                console.log("让我看看"+this.com)
                this.com.artnum = this.artnum
                this.request.post("/comment/addcom",this.com).then(res=>{
                    if (res.state===2000){
                        this.$message.success(res.message)
                        this.comload()
                        this.com={}
                        this.com.comphoto="http://localhost:9090/img/9da75b2f-3af5-427c-a6fc-635590c161d5.jpg"
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                // console.log(res+"这里是返回值")
                this.com.comphoto = res;
                console.log(this.com.comphoto)
            },
            good(){
                this.articleopen.artgood +=1;
                this.$message.success("LIKE +1");
                this.showIcon=!this.showIcon;
            },
            nogood(){
                this.articleopen.artgood -=1;
                this.showIcon=!this.showIcon;
            },
            watchgood(){
                console.log("aaaaaaaaaaaa");
                this.request.post("/article/watchgood",this.articleopen)
                this.$router.go(-1)
            }

        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: auto;
        height: 80px;
        display: block;
    }
</style>
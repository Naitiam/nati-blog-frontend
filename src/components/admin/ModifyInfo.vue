<template xmlns:http="http://www.w3.org/1999/xhtml">
    <el-main>
            <el-form :model="mine"  label-width="80px">
                <el-form-item label="博客姓名">
                    <el-input v-model="mine.admname" style="width: 400px;"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input v-model="mine.admpwd" style="width: 400px;"></el-input>
                </el-form-item>
                <el-form-item label="个人头像">
                    <el-upload
                            class="avatar-uploader"
                            action="http://localhost:9090/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                        <img v-if="mine.admphoto" :src="mine.admphoto" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="个人介绍">
                    <el-input type="textarea" v-model="mine.admintroduction" style="width: 400px;"></el-input>
                </el-form-item>
                <el-form-item label="个人邮箱">
                    <el-input v-model="mine.admemail" style="width: 400px;"></el-input>
                </el-form-item>
                <!--<el-form-item label="B站链接">-->
                    <!--<el-input v-model="mine.link" style="width: 400px;"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="B站链接">-->
                    <!--<el-input v-model="mine.link" style="width: 400px;"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="B站链接">-->
                    <!--<el-input v-model="mine.link" style="width: 400px;"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="submitSave">保存修改</el-button>
                </el-form-item>
            </el-form>
    </el-main>
</template>

<script>
    export default {
        data(){
            return{
                adm:{},
                mine: JSON.parse(localStorage.getItem("adm")),
            }
        },
        created() {
        },
        methods: {
            submitSave(){
                this.request.post("/modifyinfo",this.mine).then(res=>{
                    localStorage.removeItem("adm")
                    localStorage.setItem("adm",JSON.stringify(this.mine))
                    if(res.state==2000){
                        this.$message.success(res.message)
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                // console.log(res+"这里是返回值")
                this.mine.admphoto = res;
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: auto;
        height: 178px;
        display: block;
    }
</style>
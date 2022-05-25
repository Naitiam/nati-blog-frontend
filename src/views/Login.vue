<template>
    <div class="wrapper">
        <div style="margin: 200px auto; background-color: rgba(255,255,255,0.8); width: 350px; height: 300px; padding: 20px; border-radius: 10px ">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
            <el-form :model="admlogin" :rules="rules" ref="admForm">
                <el-form-item prop="admname">
                    <el-input style="margin: 10px 0" prefix-icon="el-icon-user" v-model="admlogin.admname"></el-input>
                </el-form-item>
                <el-form-item prop="admpwd">
                    <el-input  style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="admlogin.admpwd"></el-input>
                </el-form-item>
                <el-form-item style="margin: 10px 0; text-align: center">
                    <el-button type="info" autocomplete="off" @click="login">登录</el-button>
                    <el-button type="info" autocomplete="off" @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                admlogin: {},
                rules: {
                    admname: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    admpwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            login() {

                this.$refs['admForm'].validate((valid) => {
                    if (valid) {
                        this.request.post("/login",this.admlogin).then(res =>{
                                if(res.state==2000){
                                    // console.log("aaaaa"+res.data.admemail)
                                    localStorage.setItem("adm",JSON.stringify(res.data))//把信息存到浏览器里
                                    // console.log(localStorage.getItem("adm"))
                                    this.$message.success(res.message)
                                    this.$router.push("/admin")
                                }else{
                                    this.$message.error(res.message)
                                    this.admlogin.admname=''
                                    this.admlogin.admpwd = ''
                                }
                            })
                    }
                });
            },
            back(){
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 100vh;
        background-image: url("../static/image/moren.jpg");
        overflow: hidden;
    }
</style>
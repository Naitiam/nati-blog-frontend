<template>
    <el-main  class="gotop">
        <el-form :model="article"  label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="article.arttitle" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="文章作者">
                <el-input v-model="article.artauthor" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="文章标签">
                <el-checkbox-group v-model="article.tagsList">
                    <el-checkbox
                            v-for="tag in tags"
                            :label="tag.tagname"
                            :key="tag.tagnum"
                    >{{ tag.tagname  }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!--<el-form-item label="文章图片">-->
            <!--</el-form-item>-->
            <el-form-item label="文章内容">
                <!--<el-input v-model="article.artcontent" style="width: 400px;"></el-input>-->
                <mavon-editor v-model="article.artcontent" ref="md" :ishljs="true"  @imgAdd="imgAdd"/>
                <!--@imgAdd="imgAdd"-->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitArticle">提交文章</el-button>
            </el-form-item>
        </el-form>
        <el-backtop target=".gotop">
        </el-backtop>
    </el-main>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {

                tags: [],
                article: {
                    tagsList:[],
                    arttitle: '',
                    artauthor:'Naitiam',
                    artcontent:''
                }
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("/article/alltags").then(res => {
                    this.tags = res
                    // console.log(res)
                })
            },
            // 绑定@imgAdd event
            imgAdd(pos, $file) {
                let $vm = this.$refs.md
                // 第一步.将图片上传到服务器.
                const formData = new FormData();
                formData.append('file', $file);
                axios({
                    url: 'http://localhost:9090/upload',
                    method: 'post',
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then((res) => {
                    // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    // console.log("这里是应该要替换掉的url"+res);
                    $vm.$img2Url(pos, res.data);
                })
            },
            submitArticle(){
                console.log("这里是测试标签的状况"+this.tagsList);
                // console.log("这里是测试是否添加成功"+this.article);
                this.request.post("/article/artadd",this.article).then(res=>{
                    if(res){
                        this.$message.success("添加成功");
                        this.article={};
                        this.article.tagsList=[]
                    }else{
                        this.$message.error("添加失败");
                    }
                })
            }
        }
    }
</script>

<style>

</style>

<style>
    .avatar-uploader > .el-upload-list > .el-upload-list__item {
        width: 146px;
        height: 146px;
    }
    .avatar-uploader > .el-upload-list > .el-upload-list__item > img {
        width: 146px;
        height: 146px;
        /*width: auto;*/
        /*height:  auto;*/
        /*border-radius: 0px;*/
    }
</style>
<template>
        <el-main class="artmagcss">
            <div style="margin: 10px 0 ">
                <el-input style="width: 200px;margin-right: 10px" prefix-icon="el-icon-search" v-model="articlename" placeholder="请输入文章名"/>
                <el-select style="width: 120px;margin-right: 10px" v-model="articletag" placeholder="文章标签">
                    <el-option label="编程" value="编程"></el-option>
                    <el-option label="摸鱼" value="摸鱼"></el-option>
                </el-select>
                <el-button class="ml-5" type="primary" @click="onsearch">搜索</el-button>
                <el-button type="warning" @click="reset">重置</el-button>
            </div>
            <div style="background-color: antiquewhite;">
                <el-table :data="tableData" style="width: 100%" >
                    <el-table-column prop="artnum" label="编号" width="80"></el-table-column>
                    <el-table-column label="标题" width="250"  >
                        <template slot-scope="title">
                            <el-popover trigger="hover" placement="top" width="300">
                                <p  class="showOvertitle">{{ title.row.arttitle }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <!--显示的内容-->
                                    <span   class="showparttitle">{{ title.row.arttitle }}</span>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column  label="文章概要" width="500">
                        <template slot-scope="content">
                            <span size="medium"  class="showpartcontent">{{ content.row.artcontent }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="artauthor" label="作者" width="80"></el-table-column>
                    <el-table-column  label="标签" width="250">
                        <!--实现标签的遍历-->
                        <template slot-scope="tags">
                            <span v-for="tag in tags.row.tagsList "><el-tag :type="tag == '摸鱼' ? 'warning' :tag == '编程' ? 'success' :  'info'" style="margin-right: 5px">{{tag}}</el-tag></span>
                            <!--<span><el-tag :type="tags.row.arttags == '标签1' ? 'primary' : 'success'" style="margin-right: 3px">{{tags.row.arttags}}</el-tag></span>-->
                        </template>
                    </el-table-column>
                    <el-table-column prop="artreltime" label="发布时间" width="160"></el-table-column>
                    <el-table-column prop="artmodtime" label="修改时间" width="160"></el-table-column>
                    <el-table-column label="文章封面" width="160">
                        <template slot-scope="img" >
                            <!--<el-image :src="require('@/static/image/'+img.row.artphoto)" ></el-image>-->
                            <el-image :src="img.row.artphoto == null?'':require('@/static/image/'+img.row.artphoto)"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="artgood" label="点赞数" width="80"></el-table-column>
                    <el-table-column prop="artwatch" label="浏览数" width="80"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope" >
                            <el-button style="margin-right: 5px" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-popconfirm
                                    confirm-button-type='确定'
                                    cancel-button-type='取消'
                                    hide-icon
                                    title="确定删除这篇文章吗？"
                                    @confirm="handleDelete(scope.row.artnum)"
                            >
                                <el-button type="danger" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align: right;margin: 25px 0">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        layout="prev, pager, next"
                        :page-size="pageSize"
                        :total="total">
                </el-pagination>
            </div>

            <el-dialog title="文章编辑" :visible.sync="dialogVisible" width="80%" top="0px" class="gotop">
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
                        <mavon-editor v-model="article.artcontent" ref="md" :ishljs="true" @imgAdd="imgAdd"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitArticle">提交文章</el-button>
                    </el-form-item>
                </el-form>
                <el-backtop target=".gotop">
                </el-backtop>
            </el-dialog>
        </el-main>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            // const item = {
            //     artnum: 0,
            //     arttitle: '这是文章的标题这是文章的标题这是文章的标题',
            //     artauthor: 'Naitiam',
            //     artreltime: '2022-4-22 13:45:12',
            //     artmodtime: '2022-4-22 13:45:12',
            //     artcontent: '文章的内容和真的很多的啊啊啊啊啊啊啊啊啊啊啊啊啊啊文章的内容和真的很多的啊啊啊啊啊啊啊啊啊啊啊啊啊啊文章的内容和真的很多的啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            //     arttags:['标签1','标签2','标签3'],
            //     artphoto: 'test_image.jpg',
            //     // 或require('@/static/image/test_image.jpg')
            //     artgood: 45 ,
            //     artwatch: 60
            // };
            return {
                // tableData: Array(6).fill(item),
                tableData:[],
                total: 0,
                pageNum: 1,
                pageSize: 6,
                articlename:'',
                articletag:'',
                article:{},
                tags: [],
                dialogVisible: false,
                visible: false,

            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("/article/mag",{
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        articlename:this.articlename,
                        articletag:this.articletag
                    }
                }).then(res => {
                    // console.log(res)
                    this.tableData = res.records
                    this.total = res.total
                }),
                this.request.get("/article/alltags").then(res => {
                    this.tags = res
                })
            },
            handleEdit(row){
                // console.log("这行row有什么"+row)
                this.article = row
                this.dialogVisible = true
            },
            submitArticle(){
                this.request.post("/article/artadd",this.article).then(res=>{
                    if(res){
                        this.$message.success("更新成功");
                        this.dialogVisible = false
                        this.load()
                    }else{
                        this.$message.error("更新失败");
                    }
                })
            },
            handleDelete(artnum){
                this.request.delete("/article/"+artnum).then(res=>{
                    if(res){
                        this.$message.success("删除成功");
                        this.load()
                    }else{
                        this.$message.error("删除失败");
                    }
                })

            },
            onsearch() {
                this.load();
                console.log('search!');
            },
            reset() {
                this.articlename = "";
                this.articletag = "";
                this.load()
            },
            handleSizeChange(pageSize) {
                // console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum) {
                // console.log(pageNum)
                this.pageNum = pageNum
                this.load()
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
        }
    };
</script>

<style scoped>

    .showpartcontent{
        display:-webkit-box;
        text-overflow:ellipsis;
        overflow:hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient:vertical;
    }
    .showOvertitle{
        display:-webkit-box;
        text-overflow:ellipsis;
        overflow:hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient:vertical;
    }
    .showparttitle{
        display:-webkit-box;
        text-overflow:ellipsis;
        overflow:hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient:vertical;
    }
</style>
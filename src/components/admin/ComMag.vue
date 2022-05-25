<template>
    <el-main>
        <div style="background-color: antiquewhite;">
            <el-table :data="tableData" style="width: 100%" >
                <el-table-column prop="comnum" label="评论编号" width="80"></el-table-column>
                <el-table-column prop="comname" label="评论者" width="150"></el-table-column>
                <el-table-column prop="arttitle" label="评论文章标题" width="250"></el-table-column>
                <el-table-column  label="评论内容" width="300">
                    <template slot-scope="content">
                        <span size="medium"  class="showpartcontent">{{ content.row.comcontent }}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="评论回复" width="300">
                    <template slot-scope="reply">
                        <span size="medium"  class="showpartcontent">{{ reply.row.comreply }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="comtime" label="评论时间" width="160"></el-table-column>
                <el-table-column label="评论者头像" width="100">
                    <template slot-scope="img" >
                        <!--<el-image :src="require('@/static/image/'+img.row.comphoto)" ></el-image>-->
                        <el-image :src="img.row.comphoto"></el-image>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope" >
                        <el-button style="margin-right: 5px" @click="handleReply(scope.row)">回复</el-button>
                        <el-popconfirm
                                confirm-button-type='确定'
                                cancel-button-type='取消'
                                hide-icon
                                title="确定删除这篇文章吗？"
                                @confirm="handleDelete(scope.row.comnum)"
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
        <el-dialog title="评论回复" :visible.sync="dialogVisible" width="40%" top="15%">
            <el-form :model="comment"  label-width="80px">
                <el-form-item label="回复内容">
                    <el-input type="textarea" v-model="comment.comreply" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitReply">提交回复</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-main>

</template>

<script>
    export default {
        data(){
            return{
                tableData:[],
                total: 0,
                pageNum: 1,
                pageSize: 8,
                dialogVisible: false,
                comment:{},
                reply:{
                    comreply:"a"
                }
            }
        },
        created(){
            this.load()
        },
        methods:{
            load(){
                this.request.get("/comment/mag",{
                    params:{
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                }).then(res => {
                    this.tableData = res.records
                    this.total = res.total
                    console.log(res.records)
                })
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
            handleReply(row){
                this.comment = row
                this.dialogVisible = true;
            },
            submitReply(){
                this.request.post("/comment/reply",this.comment).then(res=>{
                    if(res){
                        this.$message.success("回复成功");
                        this.dialogVisible = false
                        this.load()
                    }else{
                        this.$message.error("回复失败");
                    }
                })
            },
            handleDelete(comnum) {
                this.request.delete("/comment/" + comnum).then(res => {
                    if (res) {
                        this.$message.success("删除成功");
                        this.load()
                    } else {
                        this.$message.error("删除失败");
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
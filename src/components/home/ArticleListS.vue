<template>
    <div class="main gotop" >
        <div style="margin: 10px 0"> <span>当前查询的是：文章名为【{{articlename}}】，标签为【{{articletag}}】的文章</span></div>
        <el-card class="box-card" style="margin-bottom: 30px" shadow="hover" v-for="article in articlelist" :key="article.artnum">
            <div slot="header" class="clearfix">
                <span><b>{{article.arttitle}}</b></span>
            </div>
            <div style="font-size: 14px" @click="$router.push('/articleopen?artnum=' + article.artnum)">
                <span class="showpartcontent">{{ article.artcontent}}</span>
            </div>
            <div style="margin-top: 16px">
                <span v-for="tag in article.tagsList" style="float: right; padding: 3px 0"><el-tag type="info" effect="plain" size="small" style="margin-right: 5px">{{tag}}</el-tag></span>
                <i type="text" class="el-icon-date"  style="margin-right: 6px; "></i><span style="font-size: 14px;" type="text">{{article.artreltime}}</span>
            </div>
        </el-card>
        <el-pagination
                style="float: right;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total">
        </el-pagination>
        <el-backtop style="color: #8c939d" target=".gotop">
        </el-backtop>
    </div>

</template>

<script>
    export default {
        name: "",
        props:[
            'articlename','articletag'
        ],
        data(){
            return{
                articlelist:{},
                total: 0,
                pageNum: 1,
                pageSize: 4,
                articletag:this.articletag,
                articlename:this.articlename
            }
        },
        created(){
            this.load()
        },
        watch:{
            articlename:function(){
                this.load()
            },
            articletag:function(){
                this.load()
            }
        },
        methods:{
            load(){
                console.log("子界面"+this.sarticlename)
                console.log("子界面"+this.articletag)
                this.request.get("/article/mag",{
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        articletag:this.articletag,
                        articlename:this.articlename,
                    }
                }).then(res => {
                    // console.log(res.records)
                    this.articlelist = res.records
                    this.total = res.total
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

        }
    }
</script>

<style>
    .showpartcontent{
        cursor: pointer;
        display:-webkit-box;
        text-overflow:ellipsis;
        overflow:hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient:vertical;
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #888;/*进行修改选中项背景和字体*/
        color:#fff;
    }

    .el-pagination.is-background .el-pager li:hover{
        color: #888 !important;/*hover时候的文字颜色*/
    }
    .el-pager li.active{
        color:#fff !important;/*仅设置active时的文字颜色*/
    }
</style>
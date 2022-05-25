<template>
    <div style="margin: 10px;width: 100%">
        <el-row :gutter="20" style="margin-bottom: 60px">
            <el-col :span="6">
                <el-card style="color: #67C23A;padding: 10px 0; text-align: center; font-weight: bold">
                   <div @click="toartadd"><i class="el-icon-plus" style="margin-right: 5px"></i><span>去发布文章</span></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card style="color: #F56C6C;padding: 10px 0; text-align: center; font-weight: bold">
                    <span>文章总数 {{articleall}}</span>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card style="color: #E6A23C;padding: 10px 0; text-align: center; font-weight: bold">
                    <span>点赞总数 {{artgoodall}}</span>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card style="color: #409EFF;padding: 10px 0; text-align: center; font-weight: bold">
                    <span>浏览总数 {{artwatchall}}</span>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div id="pie" style="width: 500px; height: 450px"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
    export default {
        data(){
          return{
              artwatchall:'',
              artgoodall:'',
              articleall:''
          }
        },
        mounted() {
            var chartDom = document.getElementById('pie');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                color:['#FFCCCC','#FFFFCC', '#CCFFFF', '#99CC99', '#99CCCC','#FF6666',  '#FF9966', '#FFCC99','#99CCCC', '#FFCC99', '#CCCCCC'],
                title: {
                    text: '文章种类',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '文章分类',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.request.get("/echarts").then(res=>{
                console.log(res.data)
                option.series[0].data = res.data
                option && myChart.setOption(option);
            })


        },
        created(){
          this.load()
        },
        methods:{
            load(){
                this.request.get("/article/count").then(res =>{
                    this.articleall = res.data.articleall
                    this.artgoodall = res.data.artgoodall
                    this.artwatchall = res.data.artwatchall
                })
            },
            toartadd(){
                this.$router.push("/admin/artadd")
            },
        }
    }
</script>

<style scoped>

</style>
<template>
  <div class="bgimg">
    <div class="container">
      <canvas id="myCanvas"></canvas>
      <!--左半边-->
      <div class="left-panel">
        <div class="head-img">
          <el-avatar style="margin: 10px" shape="square" :src="admphoto"></el-avatar>
        </div>
        <el-menu background-color="#FFF"
                 text-color="black"
                 active-text-color="#E6BC63"
                 router>
        <div class="mune">
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-menu-item index="/worklist">
            <i class="el-icon-star-on"></i>
            <span slot="title">作品</span>
          </el-menu-item>
          <el-menu-item index="/aboutme">
            <i class="el-icon-star-on"></i>
            <span slot="title">关于</span>
          </el-menu-item>
          <el-menu-item index="/friendlink">
            <i class="el-icon-share"></i>
            <span slot="title">友链</span>
          </el-menu-item>
        </div>
        </el-menu>
        <div></div>
        <div>
          <el-popover
                placement="top-start"
                trigger="hover"
                content="博客管理GO！​✿ヽ(°▽°)ノ✿">
          <el-button type="info"  slot="reference"  @click="gologin" >(°▽°)✿</el-button>
        </el-popover></div>
      </div>

      <!--中间部分-->
      <div class="center-panel">
        <router-view :articlename="sarticlename" :articletag="sarticletag"/>
      </div>

      <!--右半边-->
      <div class="right-panel">
        <!--<div style="height: 0px;"></div>-->
        <div style="width: 100%;box-sizing: border-box;padding: 10px 0;text-align: center">
          <!--搜索-->
          <el-input style="width: 250px;margin-bottom: 10px" prefix-icon="el-icon-search" v-model="sarticlename" placeholder="请输入文章名"/>
          <el-button type="info" size="small" @click="searchtitle">搜索</el-button>
          <div style="border-top: #efefef solid 3px;margin-top: 20px;padding:20px 0;">
            <span v-for="tag in tags" :key="tag.tagname"><el-button style="margin: 3px" size="small" type="info" @click="searchtag(tag.tagname)">{{tag.tagname}}</el-button></span>
          </div>
        </div>
        <div style="height: 100px;float: bottom;"></div>
        <div style="font-size: 14px">
          <p>© 2022 Naitiam</p>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
    import { init,animate,canva } from '../static/js/canvas_yuki.js';
    import  '../static/js/click_emotion_show.js'
    export default {

        data() {
            return {
                ctx: {},
                sarticlename:'',
                sarticletag:'',
                tags:[],
                admphoto: '',
            };
        },
        created(){
            this.load()
        },
        mounted() {
            this.initCanvas();
            window.onresize = () => {
                this.initCanvas()
            };
        },
        methods: {
            //canvas动画
            initCanvas() {
                // console.log("初始化canvas");
                const canvas = document.getElementById('myCanvas');
                this.ctx = canvas.getContext("2d");
                canvas.width = document.documentElement.clientWidth;
                canvas.height = document.documentElement.clientHeight;
                // console.log(canvas.width);
                canva(this.ctx, canvas.width, canvas.height);
                init();
                animate();
            },
            load(){
                this.request.get("/article/alltags").then(res => {
                    this.tags = res
                })
                this.request.get("/home").then(res => {
                    this.admphoto = res.data.admphoto
                    localStorage.setItem("mine",JSON.stringify(res.data))
                })
            },
            gologin(){
                this.$router.push("/login")
            },
            searchtitle(){
                if(this.sarticlename!=""){
                    this.$router.push("/articleLists")
                    // console.log(this.sarticlename)
                }else{
                    this.$router.push("/")
                }
            },
            searchtag(tagename){
                this.$router.push("/articleLists")
                console.log("tagename"+tagename)
                this.sarticletag = tagename
            }

        },
        components:{}
    };
</script>

<style>
  .bgimg{
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("../static/image/moren.jpg");
    background-position: center;
  }
</style>

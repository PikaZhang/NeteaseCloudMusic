<template>
    <div class="index wrap">
         <el-carousel :interval="4000" type="card" height="250px">
            <el-carousel-item v-for="item in slider" :key="item.pic">
                 <img class="slider-img" :src="item.pic">
            </el-carousel-item>
        </el-carousel>
                    <div class="hotHeader clearfix">
                        <h2>热门推荐</h2>
                        <router-link  class="more" :to="{name:'allRecommend'}">更多</router-link>
                    </div>

                    <el-row :gutter="24" style='margin-left:0;margin-right:0;padding: 0 20px'>
                        <el-col :span="8" v-for="(song, index) in newsongs" :key="song.id" style='padding:20px'>
                            <el-card :body-style="{padding:'0px', height:'260px',width:'130px' }">
                                <img :src="song.picUrl" class="image">
                                <div style="padding: 14px;">
                                    <span>{{song.name}}</span>
                                    <div class="bottom clearfix">
                                        <time class="time">{{song.playCount | format}}</time>
                                            <router-link :to="{name:'Rersonalized', params:{id: song.id}}" class="button">查看歌单</router-link>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
  
    </div>
</template>

<script>

import format from '@/filters/format';

export default {
    name: 'index',
    data() {
        return {
            slider:[],
            newsongs: []
        }
    },
    created() {
        fetch('/api/personalized').then( response => {
            return response.json();
        } ).then( data => {
            //console.log(data);
            this.newsongs = data.result;
        } );
         fetch('/api/banner' )
             .then(response=>{
            return response.json();
        })
        .then(result =>{
            this.slider= result.banners;
        })
    },
    filters: {
        format
    }
}
</script>

<style>
.el-carousel{
    margin:0 auto;
    width:1150px;
    padding-top:30px;
}
    .slider-img {
        width: 554px;
        height:250px;
    }

    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }
    .wrap {
        width:1200px;
        min-width:1200px;
        margin:0 auto;
        border-left:1px solid #ccc;
         border-right:1px solid #ccc;
    }
    .body-style{
       
    }
    .hotHeader{
        padding:0 20px;
    }
    .hotHeader h2 {
        float: left;
        font: bold 30px/50px '宋体';

    }
    .hotHeader .more {
        float: right;
        margin-right:20px;
        font:18px/50px "宋体";
    }
</style>

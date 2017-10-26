<template>
    <div class="index commenWrap">
        <el-carousel :interval="4000" type="card" height="250px">
            <el-carousel-item v-for="item in slider" :key="item.pic">
                <img class="slider-img" :src="item.pic">
            </el-carousel-item>
        </el-carousel>
        <div class="line"></div>
        <div class="hotHeader clearfix">
            <span class="glyphicon glyphicon-record headerIco"></span>
            <h2>热门推荐</h2>
            <span class="subHotTle">华语 | 流行 | 摇滚 | 民谣 | 电子</span>
            <!-- <router-link class="more" :to="{name:'allRecommend'}">更多</router-link> -->
        </div>
        <el-row :gutter="20" style='margin:10px 0 0;padding: 0 20px 20px '>
            <el-col :span="6" v-for="(song, index) in newsongs" :key="song.id" style='padding:20px 40px;height:344px;'>
                <el-card :body-style="{ height:'100%',width:'100%' }">
                    <img :src="song.picUrl" class="image">
                    <div class="hotContent">
                        <span>{{song.name|strLength}}</span>
                        <div class="bottom clearfix">

                            <time class="time">
                                <span class="glyphicon glyphicon-headphones countIco"></span>{{song.playCount | format}}</time>
                            <router-link :to="{name:'Rersonalized', params:{id: song.id}}" class="button">查看歌单</router-link>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
       
    </div>
</template>

<script>

import format from '@/filters/format.js';
import strLength from '@/filters/strLength.js';
export default {
    name: 'index',
    data() {
        return {
            slider: [],
            newsongs: []
        }
    },
    mounted() {
        fetch('/api/personalized').then(response => {
            return response.json();
        }).then(data => {
            //console.log(data);
            this.newsongs = data.result;
        });
        fetch('/api/banner')
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.slider = result.banners;
            })
    },
    filters: {
        format,
        strLength
    }
}
</script>

<style>
.el-carousel {
    margin: 0 auto;
    width: 1150px;
    padding-top: 30px;
}

.slider-img {
    width: 554px;
    height: 250px;
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
    font: 13px/1 '微软雅黑';
    color: #999;
}

.image {
    width: 100%;
    display: block;
    border: 2px solid #ccc;
}

.commenWrap {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background: #fff;
}

.body-style {}

.hotHeader {
    margin: 0 60px;
    border-bottom: 2px solid #c10d0c;
}

.hotHeader h2 {
    font: bold 24px/50px '微软雅黑';
    padding-left: 20px;
    float: left;
}

.subHotTle {
    float: left;

    font: 14px/50px '微软雅黑';
    margin-left: 20px;
    color: #9a9a9a;
    letter-spacing: 2px;
}

.headerIco {
    float: left;
}

.countIco {
    margin-right: 5px;
}

.hotContent {
    padding: 14px;
}

.hotContent>span {
    display: block;
    min-height: 40px;
    font-size: 15px;
    line-height: 20px;
    font-family: '微软雅黑';
}

.glyphicon-record:before {
    font-size: 20px;
    float: left;
    line-height: 50px;
    color: #c10d0c;
}

.hotHeader .more {
    float: right;
    margin-right: 20px;
    font: 18px/50px "宋体";
}

.el-col-8 {
    /* text-align:center; */
}

.el-card__body {
    padding: 20px;
}

.line {
    height: 1px;
    width: 100%;
    background: #ccc;
    margin: 20px 0;
}
</style>

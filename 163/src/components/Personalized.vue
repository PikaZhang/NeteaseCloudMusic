<template>
    <div class="commenWrap">

        <el-row>
            <el-col :span="18" :offset="3">
                <div class="clearfix introduce">
                    <div class="cover">
                        <img :src="playList.coverImgUrl">
                    </div>
                    <div class="detail">
                        <h1>
                            <span></span>{{playList.name}}</h1>
                        <p class="author">
                            <img :src="playList.creator && playList.creator.avatarUrl" class="avatar" alt="">
                            <strong>{{playList.creator && playList.creator.nickname}}</strong>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            <time>

                                <span>{{playList.createTime | formatDate('y-m-d')}}</span>创建</time>
                        </p>
                        <p class="singListButton">
                            <button type="button" class="btn btn-primary">播放</button>
                            <a class="btn btn-default" href="#" role="button">添加</a>
                            <a class="btn btn-default" href="#" role="button">分享</a>
                            <a class="btn btn-default" href="#" role="button">下载</a>
                            <a class="btn btn-default" href="#" role="button">评论</a>
                        </p>
                        <p class="tab">标签:
                            <el-tag type="gray" v-for='tag in playList.tags'>{{tag}}</el-tag>
                        </p>
                        <p class="description" v-if="showCon">介绍:{{playList.description|singlistLength}}
                            <span @click="showContent">展开</span>
                        </p>
                        <p class="description" v-if="!showCon">介绍:{{playList.description}}
                            <span @click="showContent2">收起</span>
                        </p>
                    </div>
                </div>

                <el-tabs v-model="activeName" >
                    <el-tab-pane label="歌曲列表" name="list">

                        <sing-list :playList='playList' :singLength='singLength' :limitStart.sync="limitStart" :limitEnd.sync="limitEnd" :singCounts='singCounts'></sing-list>

                    </el-tab-pane>

                    <el-tab-pane label="评论" name="comment">
                        <div class="commentList">
                            <div class="comment" v-for="item in comment" :key="item.commentId">
                                <div class="commentLeft">
                                    <img :src="item.user.avatarUrl">

                                </div>
                                <div class="commentRightt">
                                    <p>
                                        <span>{{item.user.nickname}}:</span>{{item.content}}</p>
                                    <p>
                                        <time>{{item.time|formatSoon}}</time>
                                        <span>赞:{{item.likedCount }}
                                        </span>
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div class="block">
                            <el-pagination layout="prev, pager, next" :total="length" :page-size="counts" @current-change="pageClick">
                            </el-pagination>
                        </div>
                    </el-tab-pane>

                </el-tabs>

            </el-col>
        </el-row>

    </div>
</template>
<script>
import formatDate from '@/filters/formatDate'
import formatSoon from '@/filters/formatSoon'
import singlistLength from '@/filters/singlistLength'
import SingList from '@/components/singList'

export default {
    name: 'Personalized',

    data() {
        return {
            activeName: 'list',
            playList: {
                name: '正在获取中……',
                createTime: '获取中',
                description: '获取中',
                tags: '获取中'

            },
            comment: [],
            length: 0,
            counts: 10,
            offset: 0,
            singLength: 0,
            limitStart: 0,
            limitEnd: 20,
            singCounts: 20,
            showCon: true,
        }
    },

    created() {

        fetch('/api/playlist/detail?id=' + this.$route.params.id)
            .then(response => {
                return response.json();
            })
            .then(result => {

                this.playList = result.playlist;
                this.singLength = this.playList.tracks.length;
            });
        fetch('/api/comment/playlist?id=' + this.$route.params.id + '&limit=' + this.counts + '&offset=' + this.offset)
            .then(response => {
                return response.json();
            })
            .then(result => {
                this.comment = result.comments;
                this.length = result.total;

            })
    },
    methods: {
        handleClick() {
            console.log(this.activeName);
        },
        showContent() {
            this.showCon = false;
        },
        showContent2() {
            this.showCon = true;
        },
        pageClick(index) {
            this.offset = (index - 1) * this.counts;
            fetch('/api/comment/playlist?id=' + this.$route.params.id + '&limit=' + this.counts + '&offset=' + this.offset)
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    this.comment = result.comments;
                })
        }
    },
    filters: {
        formatDate,
        formatSoon,
        singlistLength,
    },
    components: {
        SingList
    }
}
</script>

<style>
.commenWrap {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background: #fff;
}

.introduce {
    margin-top: 60px;
}

.cover {
    float: left;
}

.cover img {
    width: 200px;
    border: 1px solid #ccc;
    padding: 7px;
}

.detail {
    float: left;
    margin-left: 40px;
    width: 600px;
}

.detail h1 {
    margin: 0;
    font: 24px/40px '微软雅黑';
    padding-left: 60px;
    position: relative;
}

.detail h1 span {
    position: absolute;
    width: 54px;
    height: 24px;
    top: 10px;
    left: 0;
    background: url('../assets/img/icon.png') 0 -243px;
}

.author {
    margin: 15px 0 10px;
    height: 40px;
}

.author .avatar {
    width: 40px;
}

.author strong {
    font: 12px/40px '微软雅黑';
    margin-left: 20px;
    color: #0c73c2;
}

.author>span {
    display: inline-block;
    line-height: 40px;
    color: orange;
    margin-right: 20px;
}

.author time {
    font: 12px/40px '微软雅黑';
    color: #999;
}

.author time span {
    margin-right: 15px;
}

.singListButton button,
.singListButton a {
    margin-right: 3px;
}

.tab {
    margin: 10px 0;
    font: 12px '微软雅黑';
}

.description {
    min-height: 120px;
    position: relative;

    white-space: pre-wrap;
    font: 12px/18px '微软雅黑';
    color: #666;
}

.description span {
    position: absolute;
    padding: 10px;
    bottom: 0;
    right: 0;
}

.commentList {
    min-height: 300px;
}

.comment {
    overflow: hidden;
    min-height: 79px;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
}

.commentLeft {
    float: left;
    width: 5%;
    margin-left: 40px;
}

.commentLeft img {
    width: 40px;
    border-radius: 50%;
}

.commentRightt {
    float: left;
    width: 700px;
    margin-left: 30px;
}

.commentRightt p {
    margin: 0;
    font: 12px/20px '微软雅黑';
    min-height: 20px;
    color:#666;
}

.commentRightt p:nth-of-type(1) span {
    color: #0c73c2;
    margin-right: 5px;
}

.commentRightt p:nth-of-type(2) {
    margin-top: 10px;
}

.commentRightt time {
    display: inline-block;
    margin-right: 20px;
    min-width: 100px;
}

.el-tag {
    margin: 0 5px;
    border-radius: 10px;
    background: #f1f1f1;
}
</style>

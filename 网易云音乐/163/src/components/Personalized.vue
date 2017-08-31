<template>
    <div class="mt20">

        <el-row :gutter="24">
            <el-col :span="16" :offset="4">

                <el-card class="box-card" style="height: auto;">
                    <div slot="header" class="clearfix">

                        <div class="cover">
                            <img :src="playList.coverImgUrl">
                        </div>
                        <div class="detail">
                            <h1>{{playList.name}}</h1>
                            <p>
                                <img :src="playList.creator && playList.creator.avatarUrl" class="avatar" alt="">
                                <strong>{{playList.creator && playList.creator.nickname}}</strong> 创建于
                                <time>
                                    <icon name="clock-o"></icon>{{playList.createTime | formatDate('y年m月d日')}}</time>
                            </p>
                            <p>
                                <button type="button" class="btn btn-primary">播放</button>
                                <a class="btn btn-default" href="#" role="button">添加</a>
                                <a class="btn btn-default" href="#" role="button">分享</a>
                                <a class="btn btn-default" href="#" role="button">下载</a>
                                <a class="btn btn-default" href="#" role="button">评论</a>
                            </p>
                            <p>标签:
                                <el-tag type="gray" v-for='tag in playList.tags'>{{tag}}</el-tag>
                            </p>
                            <p>介绍:{{playList.description}}</p>
                        </div>

                    </div>

                    <el-tabs v-model="activeName" >
                        <el-tab-pane label="歌曲列表" name="list">

                            <sing-list :playList='playList' :singLength='singLength' :limitStart.sync="limitStart" :limitEnd.sync="limitEnd" :singCounts='singCounts'></sing-list>

                        </el-tab-pane>

                        <el-tab-pane label="评论" name="comment">
                            <div class="comment" v-for="item in comment" :key="item.commentId">
                                <div class="commentLeft">
                                    <img :src="item.user.avatarUrl">

                                </div>
                                <div class="commentRightt">
                                    <p>{{item.user.nickname}}:{{item.content}}</p>
                                    <p>
                                        <time>{{item.time|formatSoon}}</time>
                                        <span>赞:{{item.likedCount }}
                                        </span>
                                    </p>
                                </div>

                            </div>
                            <el-row >
                                <el-col :span="6" :offset="8">
                                    <div class="block">
                                        <el-pagination layout="prev, pager, next" :total="length" :page-size="counts" @current-change="pageClick">
                                        </el-pagination>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                    </el-tabs>

                </el-card>

            </el-col>
        </el-row>

    </div>
</template>
import 
<script>
import formatDate from '@/filters/formatDate'
import formatSoon from '@/filters/formatSoon'
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
            counts: 20,
            offset: 0,
            singLength:0,
            limitStart:0,
            limitEnd:20,
            singCounts:20
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
            console.log(this.$route)
    },
    methods: {
        handleClick() {
            console.log(this.activeName);
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
        formatSoon
    },
    components: {
        SingList
    }
}
</script>

<style>
.cover {
    float: left;
}

.cover img {
    width: 200px;
}

.detail {
    float: left;
    margin-left: 20px;
    width: 700px;
}

.detail h1 {
    margin: 0;
    font-size: 30px;
}

.avatar {
    width: 30px;
}

.comment {
    overflow: hidden;
}

.commentLeft {
    float: left;
    width: 5%;
}

.commentLeft img {
    width: 30px;
}

.commentRightt {
    float: left;
    width: 95%;
}

.commentRightt p {
    margin: 0;
}

.commentRightt time {
    margin-right: 20px;
}

.el-tag {
    margin: 0 5px;
}
</style>

<template>
    <div>
        <div class="singCaption clearfix">
            <span>歌曲列表{{playList.trackCount}}首歌曲</span>
            <div class="singCaptionRight">
                <span>
                    <span class="glyphicon glyphicon-music"></span>生成外链播放器</span>
                <span>播放:{{playList.playCount}}次</span>
            </div>
            <div>
                <audio controls :src="musicUrl" autoPlay>
                    <!--<source >-->
                </audio>
            </div>
        </div>
        <el-row class="singPage">
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>
            <el-col :span="5">
                <div>歌曲标题</div>
            </el-col>
            <el-col :span="3">
                <div>时长</div>
            </el-col>
            <el-col :span="3">
                <div>歌手</div>
            </el-col>
            <el-col :span="8">
                <div>专辑</div>
            </el-col>
        </el-row>
        <el-row v-for='track,index in showList' class="singPage">
            <el-col :span="3">
                <div>{{index+limitStart+1}}
                    <span @click="playClick(track.id)" class="glyphicon glyphicon-play-circle singIcon"></span>
                </div>
            </el-col>
            <el-col :span="5">
                <div>{{track.name}}</div>
            </el-col>
            <el-col :span="3">
                <div>{{track.dt|formatDate('i:s')}}</div>
            </el-col>
            <el-col :span="3">
                <div>{{track.ar[0].name}}</div>
            </el-col>
            <el-col :span="8">
                <div>{{track.al.name}}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :offset="8">
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="singLength" :page-size="singCounts" @current-change="singClick">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import formatDate from '@/filters/formatDate'
export default {
    props: ['playList', 'singLength', 'limitStart', 'limitEnd', 'singCounts'],
    filters: {
        formatDate,
    },
    data() {
        return {
            musicUrl: ''
        }
    },
    computed: {
        showList() {
            let nowList = this.playList.tracks || [];
            return nowList.slice(this.limitStart, this.limitEnd);

        }

    },
    methods: {
        singClick(page) {
            this.$emit('update:limitStart', (page - 1) * this.singCounts);
            this.$emit('update:limitEnd', (page - 1) * this.singCounts + this.singCounts);
        },
        playClick(id) {
            fetch('/api/music/url?id=' + id).then(response => {
                return response.json();
            })
                .then(result => {
                    this.musicUrl = result.data[0].url;
                })
            console.log(this.musicUrl)
        }
    }
}
</script>
<style>
.singCaption>span:nth-of-type(1) {
    float: left;
}

.singCaptionRight {
    float: right;
}

.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}

.singPage div {
    text-align: center;
}

.singIcon {
    margin-left: 10px;
}
</style>



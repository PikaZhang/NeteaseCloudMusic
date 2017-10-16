<template>
    <div>
        <div class="singCaption clearfix">

            <div class="singCaptionRight">
                <span class="singListCount">{{playList.trackCount}}首歌曲</span>
                <span>播放:{{playList.playCount}}次</span>
            </div>

        </div>
        <div class="singList">
            <el-row class="singPage" style="padding:0;">
                <el-col :span="3">
                    <div>&nbsp;</div>
                </el-col>
                <el-col :span="6">
                    <div>歌曲标题</div>
                </el-col>
                <el-col :span="3">
                    <div>时长</div>

                </el-col>
                <el-col :span="5">
                    <div>歌手</div>
                </el-col>
                <el-col :span="7">
                    <div>专辑</div>
                </el-col>
            </el-row>
            <el-row v-for='track,index in showList' class="singPage" style="padding:0;" @mouseenter.native="enter(index)" ref="singPage" @mouseleave.native="leave(index)">
                <el-col :span="3">
                    <div>{{index+limitStart+1}}
                        <span @click="playClick(track)" class="glyphicon glyphicon-play-circle singIcon" :class="{nowPlay:musicUrl.id==track.id}"></span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div>{{track.name}}</div>
                </el-col>
                <el-col :span="3">
                    <div v-show="mouseShow!=index">{{track.dt|formatDate('i:s')}}</div>
                    <div class="singIco" v-show="index==mouseShow">
                        <a href="javascript:;" title="添加到播放列表" @click="addMusic(track)"></a>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div>{{track.ar[0].name}}</div>
                </el-col>
                <el-col :span="7">
                    <div>{{track.al.name}}</div>
                </el-col>
            </el-row>
        </div>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="singLength" :page-size="singCounts" @current-change="singClick">
            </el-pagination>
        </div>
        <vedio ref="cl" :playList='playList' :limitStart.sync="limitStart" :limitEnd.sync="limitEnd" :show.sync="show" :list.sync='list' :playClick="playClick"></vedio>
    </div>
</template>
<script>
import formatDate from '@/filters/formatDate'
import { mapState } from 'vuex'
import Vedio from '@/components/Vedio.vue'
export default {
    props: ['playList', 'singLength', 'limitStart', 'limitEnd', 'singCounts'],
    filters: {
        formatDate,
    },
    data() {
        return {
            show: false,
            mouseShow: -1,
            list: [],
             listShow: false,
        }

    },
    computed: {
        showList() {
            let nowList = this.playList.tracks || [];
            return nowList.slice(this.limitStart, this.limitEnd);

        },

        ...mapState([
            'musicName',
            'musicUrl'
        ])

    },
    components: {
        Vedio
    },
    methods: {
        enter(index) {
            // this.$refs.singPage[index].$el.isShow = false

            this.mouseShow = index
        },
        leave(index) {
            this.mouseShow = -1;
        },
        singClick(page) {
            this.$emit('update:limitStart', (page - 1) * this.singCounts);
            this.$emit('update:limitEnd', (page - 1) * this.singCounts + this.singCounts);
            // this.$refs.audio.pause();
        },
        playClick(track) {
            var audio = this.$refs.cl.$refs.audio;
            var nowTime = this.$refs.cl.$refs.nowTime
            var progressBar = this.$refs.cl.$refs.progressBar;
            var now = this.$refs.cl.$refs.now
            //获取URL URLID
            // console.log(this.$refs)
            this.$store.dispatch('songUrl', track.id)
            this.$store.dispatch('songDetail', track.id)
            this.$store.commit('musicListFn', track)
            for (var i = 0; i < this.$store.state.musicList.length; i++) {
                for (var j = i + 1; j < this.$store.state.musicList.length; j++) {
                    if (this.$store.state.musicList[i] == this.$store.state.musicList[j]) {
                        this.$store.state.musicList.splice(j, 1);
                    }
                }
            }
            this.show = true;
            //媒体时长发生改变

            audio.ontimeupdate = function() {
                nowTime.innerHTML = toDB(parseInt(audio.currentTime / 60)) + ":" + toDB(parseInt(audio.currentTime % 60));
                now.style.width = progressBar.clientWidth * audio.currentTime / audio.duration + "px";
            }
            // audio.play();
            function toDB(nub) {
                return nub < 10 ? "0" + nub : "" + nub;
            }
        },
        addMusic(track) {
            var tip = this.$refs.cl.$refs.tip;
            tip.style.display = "block";
            setTimeout(() => {
                tip.style.display = "none";
            }, 2000)
            this.$store.commit('musicListFn', track)
            //去重
            for (var i = 0; i < this.$store.state.musicList.length; i++) {
                for (var j = i + 1; j < this.$store.state.musicList.length; j++) {
                    if (this.$store.state.musicList[i] == this.$store.state.musicList[j]) {
                        this.$store.state.musicList.splice(j, 1);
                    }
                }
            }
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

.singCaptionRight span {
    float: left;
    margin-right: 10px;
    font: 14px/22px '微软雅黑';
    color: #666;
}

.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}

.singList {
    border: 1px solid #ccc;
    text-align: center;
    min-height: 300px;
}

.singList .el-col {
    padding: 6px 10px;
    font: 12px/18px "微软雅黑";
    display: inline-block;
    height: 30px;
}

.singPage .el-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.singPage .el-col>div {
    position: relative;
}

.singList .singPage:nth-of-type(1) {
    border-bottom: 1px solid #ccc;
}

.singList .singPage:nth-of-type(1) .el-col {
    border-right: 1px solid #ccc;
}

.singList .singPage:nth-of-type(1) .el-col:nth-last-child(1) {
    border-right: none;
}

.singList .singPage:nth-child(odd) {
    background: #f7f7f7;
}

.singIcon {
    font-size: 20px;
    color: #ccc;
    position: absolute;
    left: 15px;
    top: 0;
}

.nowPlay {
    color: red;
}

.block {
    text-align: center;
    margin: 30px 0;
}

.singIco {

    height: 18px;
    width: 100%;
    text-align: center;
}

.singIco a {
    width: 13px;
    height: 13px;
    margin-top: 2px;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    background: url('../assets/img/icon.png')
}

.singIco a:nth-of-type(1) {
    background-position: 0 -700px;
}

.singIco a:nth-of-type(1):hover {
    background-position: -22px -700px;
}
</style>



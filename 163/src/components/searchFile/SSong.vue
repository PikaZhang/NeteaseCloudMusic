<template>
    <div class="songList">
        <div  v-if="$store.state.songsList.songs">
            <el-row v-for='song,index in $store.state.songsList.songs'>
                <el-col :span="7">
                    <div>
                        <span class="glyphicon glyphicon-play-circle singIcon " @click='singListClick(song.id)'></span>{{song.name}}
                    </div>
                </el-col>
                <el-col :span="5">
                    <div>
                        {{song.artists[0].name}}
                    </div>
                </el-col>
                <el-col :span="8">
                    <div> 《{{song.album.name}}》</div>
                </el-col>
                <el-col :span="4">
                    <div>{{song.duration|formatDate('i:s')}}</div>
                </el-col>
            </el-row>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="$store.state.songsList.songCount" :page-size="counts" @current-change="pageClick">
                </el-pagination>
            </div>
        </div>
        <div v-else class="notFound">
            <p>
                <span></span>很抱歉，未能找到相关搜索结果！</p>
        </div>

    </div>
</template>
<script>
import formatDate from '@/filters/formatDate'
export default {
    data() {
        return {
            counts: 20
        }
    },
    filters: {
        formatDate,
    },
    methods: {
        singListClick(id) {
            fetch('/api/music/url?id=' + id).then(response => {
                return response.json();
            })
                .then(result => {
                    // this.musicUrl = result.data[0].url;
                    this.$store.commit('updateSingUrl', result);
                    // this.musicUrlId = result.data[0].id
                })
        },
        pageClick(index) {
            this.offset = (index - 1) * this.counts;
            var obj = {};
            obj.input = this.$store.state.input;
            obj.counts = this.counts;
            obj.offset = this.offset;
            this.$store.dispatch('getSearchSong', obj);
            console.log(this.offset)


        }
    },
    // mounted() {
    //     let obj = {};
    //     obj.input = this.$store.state.input;
    //     obj.counts = this.counts;
    //     obj.offset = 0;
    //     this.$store.dispatch('getSearchSong', obj)
    // },
}
</script>
<style>
.songList {
    /* min-height:800px; */
    /* height: 700px; */
    overflow: hidden;
}

.songList .el-row {
    height: 30px;
}

.songList .el-row:nth-child(even) {
    background: #f1f1f1;
}

.songList .el-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 6px 10px;
    height: 30px;
}

.songList .el-col>div {
    font: 12px/18px '微软雅黑';
    padding-left: 45px;
    position: relative;
}

.singIcon {
    font-size: 20px;
    color: #ccc;
    position: absolute;
    left: 15px;
    top: 0;
}

.notFound {
    min-height: 300px;
    padding: 105px 0;
}

.notFound span {
    display: inline-block;
    width: 64px;
    height: 50px;
    background: url('../../assets/img/icon.png') 0 -347px;
    vertical-align: middle;
}

.notFound p {
    text-align: center;
    font: bold 20px/50px '微软雅黑';
}
</style>

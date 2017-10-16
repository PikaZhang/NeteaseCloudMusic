<template>
    <div class='commenWrap'>
        <div class="searchPadding">
            <div class="search">
                <input type="text" v-model='$store.state.input' class="form-control" placeholder="请输入内容">
                <span class="glyphicon glyphicon-search searchIco" @click="search"></span>
            </div>
            <div>
                <audio controls :src="$store.state.musicUrl" autoPlay>
                    <!--<source >-->
                </audio>
            </div>
            <p class="searchTitle">搜索“{{this.$store.state.inputContent}}”，找到
                <span v-if="this.activeName=='songs'">{{$store.state.songsList.songCount}}<i>首单曲</i></span>
                <span v-if="this.activeName=='singer'">{{$store.state.songSinger.artistCount}}<i>名歌手</i></span>
            </p>

            <el-tabs type="border-card" class="searchNav" v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="单曲" name='songs'>
                    <s-song></s-song>
                </el-tab-pane>
                <el-tab-pane label="歌手" name="singer">
                    <s-singer></s-singer>
                </el-tab-pane>
                <!-- <el-tab-pane label="角色管理"></el-tab-pane>
                <el-tab-pane label="定时任务补偿"></el-tab-pane> -->
            </el-tabs>

        </div>
    </div>
</template>
<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import formatDate from '@/filters/formatDate'
import SSong from '@/components/searchFile/SSong'
import SSinger from '@/components/searchFile/SSinger'
export default {
    data() {
        return {
            activeName: 'songs',
            counts: 20,
        }

    },
    methods: {
        search() {
            this.$store.dispatch('getSearchSinger', this.$store.state.input)
            
            this.$store.commit('inputContentFn', this.$store.state.input)
            this.$store.dispatch('search', this.$store.state.input)
                .then(data => {
                    if (this.$store.state.input == '') {
                        return;
                    } else {
                        console.log(data)
                        this.$store.commit('searchSong', data);//提交数据到mutation中
                        sessionStorage.setItem('name', this.$store.state.input)
                    }

                });
        },
        handleClick() {
            console.log(this.activeName)
        }
    },
    filters: {
        formatDate
    },
    mounted() {
        if (this.$store.state.input == ''|| this.$store.state.inputContent=="") {
            this.$store.state.input = this.$store.state.inputContent = sessionStorage.getItem("name")
        }
        let obj = {};
        obj.input = this.$store.state.input;
        obj.counts = this.counts;
        obj.offset = 0;
        this.$store.dispatch('getSearchSong', obj)
    },
    components: {
        SSong,
        SSinger
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
    overflow: hidden;
    background: #fff;
}

.search {
    width: 600px;
    margin: 50px auto;
    position: relative;
}

.search input {
    width: 600px;
    padding-right: 34px;
}


.searchPadding {
    padding: 40px 100px;
}

.searchTitle {
    height: 20px;
    font: 14px/20px '微软雅黑';
    color: #999;
    margin: 20px 0 20px;
}

.searchTitle span{
    color: #c20c0c;
}
.searchTitle i{
    color: #999;
}
.el-tabs--border-card>.el-tabs__header {
    background-color: #f1f1f1;
}

.el-tabs--border-card>.el-tabs__content {
    padding: 0;
}

.block {
    text-align: center;
    margin: 30px 0;
}
</style>

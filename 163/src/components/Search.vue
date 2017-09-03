<template>
    <div class='wrap'>
        <div class="search">
            <input type="text" v-model='$store.state.input' class="form-control" placeholder="请输入内容">
            <span class="glyphicon glyphicon-search searchIco" @click="search"></span>
        </div>
        <div>
            <audio controls :src="$store.state.musicUrl" autoPlay>
                <!--<source >-->
            </audio>
        </div>
        <p>搜索“{{$store.state.input}}”，找到{{$store.state.songsList.count}}首单曲</p>
        <div class="songList">
            <el-row v-for='song,index in $store.state.songsList.songs'>
                <el-col :span="7">
                    <div>
                        <span class="glyphicon glyphicon-play-circle singIcon "@click='singListClick(song.id)'></span>{{song.name}}
                    </div>
                </el-col>
                <el-col :span="7">
                    <div>
                        {{song.artists[0].name}}
                    </div>
                </el-col>
                <el-col :span="5">
                    <div> 《{{song.album.name}}》</div>
                </el-col>
                <el-col :span="5">
                    <div>{{song.duration|formatDate('i:s')}}</div>
                </el-col>
            </el-row>
        </div>

        <el-row>
            <el-col :span="6" :offset="8">
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="200" :page-size="100">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import formatDate from '@/filters/formatDate'
export default {
    methods: {
        search() {

            this.$store.dispatch('search', this.$store.state.input)
                .then(data => {
                    if (this.$store.state.input == '') {
                        return;
                    } else {
                        this.$store.commit('searchSong', data);//提交数据到mutation中
                        sessionStorage.setItem('name', this.$store.state.input)
                    }

                });
        },
        singListClick(id){
            fetch('/api/music/url?id=' + id).then(response => {
                return response.json();
            })
                .then(result => {
                    // this.musicUrl = result.data[0].url;
                     this.$store.commit('updateSingUrl', result);
                    // this.musicUrlId = result.data[0].id
                })
        }
    },
    filters: {
        formatDate
    },
    created() {
        if (this.$store.state.input == '') {
            this.$store.state.input = sessionStorage.getItem("name")
        }

        fetch('/api//search?keywords=' + this.$store.state.input+'&limit=10')
            .then(response => {
                return response.json();
            }).then(data => {
                this.$store.commit('searchSong', data);
            })
    }
}
</script>
<style>
.wrap {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
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

.songList {
    /* min-height:800px; */
    height: 700px;
    overflow: hidden;
}
</style>

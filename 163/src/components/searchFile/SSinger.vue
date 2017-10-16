<template>
    <div class="SSinger">
        <ul class="clearFix" v-if=" $store.state.songSinger.artists">
            <li v-for="singer in $store.state.songSinger.artists">
                <img v-if="singer.picUrl != null" :src="singer.picUrl">
                <img v-else="singer.picUrl == null" src="../../assets/img/noUserImg.jpg">
                <p>{{singer.name}}</p>
            </li>
        </ul>
        <div v-else class="notFound">
            <p>
                <span></span>很抱歉，未能找到相关搜索结果！</p>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        if (this.$store.state.input == '') {
            this.$store.state.input = sessionStorage.getItem("name")

        }

        this.$store.dispatch('getSearchSinger', this.$store.state.input)
    }
}
</script>
<style>
.SSinger {
    min-height: 300px;
}

.SSinger ul {
    padding: 30px;
}

.SSinger li {
    width: 20%;
    float: left;
    padding: 15px;
    box-sizing: border-box;
}

.SSinger img {
    width: 160px;
    height: 160px;
}

.SSinger  li p {
    margin-top: 10px;
    font: 16px/20px '微软雅黑';
    color: #666;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
     color:#000
}
</style>



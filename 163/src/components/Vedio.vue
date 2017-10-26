<template>
    <div class="videoWrap">
        <div class="video clearFix">
            <div>
                <audio controls :src="musicUrl.url" autoplay ref="audio" class="audio" @ended="endPlay">
                    <!--<source >-->
                </audio>
            </div>
            <div class="playBtn">
                <span @click="prev" class="prev"></span>
                <span v-if="!show" @click="play" class="play"></span>
                <span v-if="show" @click="paused" class="pause"></span>
                <span @click="next" class="next"></span>
            </div>
            <div class="img">
                <img v-if="musicName.al" :src="musicName.al.picUrl">
                <img v-else>
            </div>
            <div class="progressBarWrap">
                <div class="content">
                    <span>{{audioName}}</span>
                    <span v-if="musicName.ar">{{audioAr}}</span>
                </div>
                <div class="clearFix progressArea">
                    <div class="progressBar" ref="progressBar" @mousedown="barClick">
                        <div class="now" ref="now">
                            <span class="nowPoint" ref="nowPoint" v-drag="musicUrl.id"></span>
                        </div>
                    </div>
                    <div class="musiceTime">
                        <span ref="nowTime">00:00</span>/
                        <span v-if="musicName.dt">{{musicName.dt|formatDate('i:s')}}</span>
                        <span v-else>00:00</span>
                    </div>
                </div>
            </div>
            <div class="playControl clearFix">
                <span class="playVolume" @click="showControl"></span>
                <div class="volumeControl" v-show="showVolume">
                    <div class="volumeBg"></div>
                    <div class="volumeBgInside" ref="volumeBgInside">
                        <div class="insideBg" ref="insideBg"></div>
                        <span class="volumePoint" v-dragVolume ref="volumePoint"></span>
                    </div>
                </div>
                <div class="playType clearFix" @click="playTypeNub">
                    <a href="javascript:;" class="order" v-if="playType==1"></a>
                    <a href="javascript:;" class="replay" v-if="playType==2"></a>
                    <a href="javascript:;" class="radom" v-if="playType==3"></a>
                    <div class="typeTip" ref="typeTip">
                        <span v-if="playType==1">循环</span>
                        <span v-if="playType==2">单曲循环</span>
                        <span v-if="playType==3">随机</span>
                    </div>
                </div>
            </div>
            <div class="musicIco" @click.stop>
                <span class="tip" ref="tip">已添加到播放列表</span>
                <span class="musicListControl" @click="listShow1">{{musicList.length}}</span>
            </div>
        </div>
        <div class="musicListWrap" v-show="listShow">
            <header>
                <span>播放列表({{musicList.length}})</span>
                <span @click="clear">
                    <i></i>清除</span>
            </header>
            <div v-show="musicList.length==0" class="noList">
                                            <i></i>你还没有添加任何歌曲
                                        </div>
            <vue-scrollbar classes="my-scrollbar" ref="Scrollbar">
                <ul class="musicList" v-show="musicList.length!=0">
                    <li v-for="track in musicList">
                        <div @click="playClick(track)">
                            <span :class="{nowListPlay:musicUrl.id==track.id}"></span>
                        </div>
                        <div>{{track.name}}</div>
                        <div>{{track.ar[0].name}}</div>
                        <div>{{track.dt|formatDate('i:s')}}</div>
                    </li>
                </ul>
            </vue-scrollbar>

        </div>
    </div>
</template>
<script>
import formatDate from '@/filters/formatDate'
import { mapState } from 'vuex'
import VueScrollbar from 'vue2-scrollbar';
import '../../node_modules/vue2-scrollbar/dist/style/vue2-scrollbar.css'
export default {
    props: ['playList', 'limitStart', 'limitEnd', "show", "list", 'playClick'],
    filters: {
        formatDate,
    },
    data() {
        return {
            showVolume: false,
            playType: 1
        }
    },
    components: {
        VueScrollbar
    },

    methods: {
        paused() {
            this.$refs.audio.pause()
            // this.show = false;
            this.$emit('update:show', false);
        },
        play() {
            if (this.musicUrl.id == undefined) {
                return;
            }
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.$emit('update:show', true);
            }
        },
        //播放列表
        listShow1() {
            if (this.$store.state.listShow == false) {         
                this.$store.commit('listShowFn',true)
            } else {
                this.$store.commit('listShowFn',false)
            }
        },
        //下一首
        next() {
            if (this.$store.state.musicList.length == 0) {
                return
            }
            if (this.$store.state.musicList.length == 1) {
                this.$refs.audio.load();
            }
            var arr = [];
            for (var i = 0; i < this.$store.state.musicList.length; i++) {
                arr.push(this.$store.state.musicList[i].id)
            }
            if (this.playType == 1 || this.playType == 2) {

                var nextId = arr.indexOf(this.musicUrl.id) + 1;
                if (nextId == this.$store.state.musicList.length) {
                    nextId = 0;
                }
                this.$store.dispatch('songUrl', arr[nextId])
                this.$store.dispatch('songDetail', arr[nextId])
                this.$emit('update:show', true);
            } else if (this.playType == 3) {
                arr.sort(function() {
                    return (0.5 - Math.random());
                })
                this.$store.dispatch('songUrl', arr[0])
                this.$store.dispatch('songDetail', arr[0])
                this.$emit('update:show', true);
                this.$refs.audio.play()
            }
        },

        endPlay() {
            var audio = this.$refs.audio;
            if (this.$store.state.musicList.length == 0) {
                this.$emit('update:show', false);
            } else {
                if (this.playType == 1) {

                    if (this.$store.state.musicList.length == 1) {
                        audio.loop = true;
                        audio.play();
                        setTimeout(() => {
                            audio.loop = false
                        }, 1000)
                    } else {
                        this.next();
                    }
                }
                else if (this.playType == 2) {
                    audio.loop = true;
                    audio.play();
                    setTimeout(() => {
                        audio.loop = false
                    }, 1000)
                }
                else if (this.playType == 3) {
                    if (this.$store.state.musicList.length == 1) {
                        audio.loop = true;
                        audio.play();
                        setTimeout(() => {
                            audio.loop = false
                        }, 1000)
                    } else {
                        var arr = [];
                        for (var i = 0; i < this.$store.state.musicList.length; i++) {
                            arr.push(this.$store.state.musicList[i].id)
                        }
                        arr.sort(function() {
                            return (0.5 - Math.random());
                        })
                        this.$store.dispatch('songUrl', arr[0])
                        this.$store.dispatch('songDetail', arr[0])
                        this.$emit('update:show', true);
                        audio.play()
                    }
                }
            }

        },
        //清除列表
        clear() {
            this.$store.commit('musicClearFn', []);
        },
        //上一首
        prev() {
            if (this.$store.state.musicList.length == 0) {
                return;
            }
            if (this.$store.state.musicList.length == 1) {
                this.$refs.audio.load();
            }
            var arr = [];
            for (var i = 0; i < this.$store.state.musicList.length; i++) {
                arr.push(this.$store.state.musicList[i].id)
            }
            var prevId = arr.indexOf(this.musicUrl.id) - 1;
            if (prevId < 0) {
                prevId = this.$store.state.musicList.length - 1;
            }
            this.$store.dispatch('songUrl', arr[prevId])
            this.$store.dispatch('songDetail', arr[prevId])
            this.$emit('update:show', true);
        },
        //点哪方哪
        barClick: function(e) {
            if (this.musicUrl.id == undefined) {
                return;
            }
            var audio = this.$refs.audio;
            var progressBar = this.$refs.progressBar;
            var x = e.clientX;
            var rectX = progressBar.getBoundingClientRect().left;
            var offsetX = x - rectX;
            audio.currentTime = offsetX / progressBar.clientWidth * audio.duration;
            audio.onended = function() {
                this.next
            }
        },
        //显示声音
        showControl() {

            if (this.showVolume == false) {
                this.showVolume = true;
                setTimeout(() => {
                    var volumeBgInside = this.$refs.volumeBgInside;
                    var insideBg = this.$refs.insideBg;
                    var volumePoint = this.$refs.volumePoint;
                    insideBg.style.height = (volumeBgInside.clientHeight - 5) * this.$refs.audio.volume + "px";
                })
            } else {
                this.showVolume = false
            }

        },
        //显示类型
        playTypeNub() {
            var timer = '';
            if (timer != "") {
                clearTimeout(timer);
            }
            var typeTip = this.$refs.typeTip;
            this.playType++;
            if (this.playType > 3) {
                this.playType = 1
            }

            typeTip.style.display = "block";
            timer = setTimeout(() => {
                typeTip.style.display = "none";
            }, 2000)
        }
    },
    computed: {
        audioName() {
            return this.musicName.name
        },
        audioAr() {
            return this.musicName.ar[0].name
        },
        ...mapState([
            'musicName',
            'musicUrl',
            'musicList',
            'listShow'
        ])
    },
    directives: {
        drag: {
            // 指令的定义---拖动
            inserted: function(el, binding) {

                var oDiv = el;
                var progressBar = document.querySelector('.progressBar');
                var audio = document.querySelector('.audio');
                var now = document.querySelector('.now');
                var nowPoint = document.querySelector('.nowPoint')

                oDiv.onmousedown = function(ev) {


                    var disX = ev.clientX - oDiv.offsetLeft - 9;
                    document.onmousemove = function(ev) {
                        if (audio.currentTime == 0) {
                            return;
                        }
                        var l = ev.clientX - disX;
                        //限制范围
                        if (l < 0) {
                            l = 0;
                        }
                        else if (l > progressBar.clientWidth) {
                            l = progressBar.clientWidth;
                        }
                        audio.currentTime = l / progressBar.clientWidth * audio.duration;
                        now.style.width = progressBar.clientWidth * audio.currentTime / audio.duration + "px";
                    };
                    document.onmouseup = function() {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                }
            }
        },
        dragVolume: {
            // 指令的定义---拖动
            inserted: function(el) {
                var oDiv = el;
                var volumeBgInside = document.querySelector('.volumeBgInside');
                var audio = document.querySelector('.audio');
                var insideBg = document.querySelector('.insideBg');
                var volumePoint = document.querySelector('.volumePoint')
                var volume = ''
                oDiv.onmousedown = function(ev) {
                    var disY = ev.clientY - oDiv.offsetTop;

                    document.onmousemove = function(ev) {
                        var t = ev.clientY - disY;

                        //限制范围
                        if (t < -5) {
                            t = -5;
                        }
                        else if (t > volumeBgInside.clientHeight - oDiv.clientHeight) {
                            t = volumeBgInside.clientHeight - oDiv.clientHeight
                        }
                        oDiv.style.top = t + "px";
                        volume = 1 - t / (volumeBgInside.clientHeight - oDiv.clientHeight) * 1;
                        if (volume > 1) {
                            volume = 1
                        }
                        audio.volume = volume;
                        insideBg.style.height = (volumeBgInside.clientHeight - 5) * audio.volume + "px";
                    };
                    document.onmouseup = function() {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                }
            }
        }
    },
}
</script>

<style>
.audio {
    display: none;
}

.videoWrap {
    height: 46px;
    background: #2e2e2e;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    color: #fff;
}

.video img {
    width: 35px;
    height: 35px;
    float: left;
}

.video {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
}

.playBtn {
    width: 137px;
    padding-top: 6px;
    height: 42px;
    float: left;
}

.video .next,
.video .prev {
    width: 28px;
    height: 28px;
    float: left;
    background: url('../assets/img/playbar.png');
    margin: 5px 8px 0 0;
}

.video .play,
.video .pause {
    width: 38px;
    height: 38px;
    float: left;
    background: url('../assets/img/playbar.png');
    margin-right: 8px;
}

.video .play {
    background-position: 0 -204px;
}

.video .play:hover {
    background-position: -40px -204px;
}

.video .pause {
    background-position: 0 -165px;
}

.video .pause:hover {
    background-position: -40px -165px;
}

.video .next {
    background-position: -80px -130px;
}

.video .next:hover {
    background-position: -111px -130px;
}

.video .prev {
    background-position: 0 -130px;
}

.video .prev:hover {
    background-position: -30px -130px;
}

.video .img {
    float: left;
    margin: 6px 15px 0 0;
}

.progressBarWrap {
    float: left;
    width: 608px;
}

.progressBarWrap .content {
    height: 28px;
}

.progressBarWrap .content span {
    font: 12px/28px '微软雅黑';
}

.progressBarWrap .content span:nth-of-type(1) {
    color: #fff;
    max-width: 300px;
}

.progressBarWrap .content span:nth-of-type(2) {
    color: #9b9b9b;
    max-width: width 220px;
    margin-left: 15px;
}

.progressBar {
    width: 493px;
    background: url('../assets/img/statbar.png') right -30px;
    height: 9px;
    position: relative;
}

.progressBar .now {
    width: 0px;
    height: 9px;
    background: url('../assets/img/statbar.png') 0 -66px;
    position: absolute;
    left: 0;
    top: 0;
}

.nowPoint {

    position: absolute;
    right: -13px;
    top: -7px;
    width: 22px;
    height: 24px;
    background: url('../assets/img/iconall.png') 0 -250px;
    margin-left: -11px;
}

.progressArea {
    position: relative;
}

.musiceTime {
    position: absolute;
    top: -4px;
    right: 20px;
}

.musiceTime span {
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
}

.musiceTime span:nth-of-type(1) {
    color: #a1a1a1;
    margin-right: 5px;
}

.musiceTime span:nth-of-type(2),
.musiceTime span:nth-of-type(3) {
    color: #797979;
    margin-left: 5px;
}

.playControl {
    float: left;
    position: relative;
}

.playControl span {
    background: url('../assets/img/playbar.png');
}

.playControl .playVolume {
    float: left;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
}

.playControl .playVolume {
    background-position: -2px -248px;
}

.playControl .playVolume:hover {
    background-position: -31px -248px;
}

.playControl .volumeControl {
    position: absolute;
    top: -113px;
    left: -3px;
    clear: both;
    width: 32px;
    height: 113px;
    z-index: 2;
}

.playControl .volumeBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 113px;
    background: url('../assets/img/playbar.png') 0 -503px;
}

.playControl .volumeBgInside,
.playControl .insideBg {
    position: absolute;
    top: 11px;
    left: 14px;
    width: 4px;
    height: 93px;
}

.playControl .insideBg {
    top: auto;
    bottom: 0px;
    left: 0;
    background: url('../assets/img/playbar.png');
    background-position: -40px bottom;
    overflow: hidden;
    /* height: 52px; */
}

.playControl .volumePoint {
    position: absolute;
    top: auto;
    left: -7px;
    width: 18px;
    height: 20px;
    background: url('../assets/img/iconall.png');
    background-position: -40px -250px;
    cursor: pointer;
}

.playControl .volumePoint:hover {
    background-position: -40px -280px;
}

.musicIco {
    float: left;
    position: relative;
}

.tip {
    position: absolute;
    top: -51px;
    left: -65px;
    clear: both;
    width: 152px;
    height: 49px;
    background: url('../assets/img/playbar.png');
    background-position: 0 -287px;
    text-align: center;
    color: #fff;
    line-height: 37px;
    display: none;
}

.musicListControl {
    float: left;
    width: 59px;
    padding-left: 21px;
    background: url('../assets/img/playbar.png') -42px -68px;
    line-height: 27px;
    text-align: center;
    color: #666;
    text-shadow: 0 1px 0 #080707;
    text-indent: 0;
    text-decoration: none;
    height: 25px;
    margin: 11px 2px 0 0;
}

.musicListWrap {
    position: fixed;
    bottom: 46px;
    left: 800px;
    width: 560px;
    height: 300px;
    background: url('../assets/img/playlist_bg.png') repeat-y -1014px 0;
}

.musicListWrap header {
    padding: 0 20px;
    height: 28px;
}

.musicListWrap header span {
    font-size: 16px;
    line-height: 28px;
    color: #ccc;
}

.musicListWrap header span:nth-of-type(1) {
    padding-left: 20px;
    float: left;
}

.musicListWrap header span:nth-of-type(2) {
    float: right;
    position: relative;
    padding-left: 20px;
    cursor: pointer;
}

.musicListWrap header span:nth-of-type(2) i {
    position: absolute;
    top: 7px;
    left: 0;
    width: 13px;
    height: 16px;
    background: url('../assets/img/playlist.png') -51px 0;
}

.musicListControl:hover {
    background-position: -42px -98px;
    text-decoration: none;
}

.musicList {
    width: 100%;
}

.musicList li {
    background-color: rgba(0, 0, 0,1);
    height: 28px;
    width: 100%;
    color: #9b9b9b;
}

.musicList li:hover {
    color: #fff;
}

.musicList li div {
    float: left;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    padding-left: 10px;
    font-size: 12px;
}

.musicList li div:nth-of-type(1) {
    width: 20px;

    cursor: pointer;
}

.musicList .nowListPlay {
    display: block;
    margin-top: 8px;
    width: 10px;
    height: 13px;
    background: url('../assets/img/playlist.png') -182px 0;
}

.musicList li div:nth-of-type(2) {
    width: 256px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
}

.musicList li div:nth-of-type(3) {
    width: 70px;
}

.musicList li div:nth-of-type(4) {
    width: 60px;
}

.noList {
    padding-top: 85px;
    text-align: center;
    line-height: 43px;
    color: #aaa;
}

.noList i {
    display: inline-block;
    position: relative;
    top: -4px;
    width: 36px;
    height: 29px;
    margin-right: 3px;
    vertical-align: middle;
    background: url('../assets/img/playlist.png') -138px 0;
}

.playType {
    float: left;
    margin: 0 10px;
}

.playType a {
    float: left;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    background: url('../assets/img/playbar.png')
}

.playType .order {
    background-position: -3px -344px;
}

.playType .replay {
    background-position: -66px -344px;
}

.playType .radom {
    background-position: -66px -248px;
}

.typeTip {
    display: none;
}

.typeTip span {
    position: absolute;
    top: -35px;
    left: 12px;
    width: 81px;
    height: 39px;
    line-height: 34px;
    text-align: center;
    background: url('../assets/img/playbar.png')
}

.typeTip span:nth-of-type(1) {
    background-position: 0 -457px;
}

.my-scrollbar {
    max-height: 272px;
}
</style>

    
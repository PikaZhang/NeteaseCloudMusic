<template>
    <footer class="footer">
        <div class="wrap clearFix">
            <div class="musicPeople footerSame clearFix">
                <a href="#" class="MusicImg"></a>
                <a href="#" class="footerText">
                    <strong>独立音乐人招募计划</strong>
                    <strong class="textBottom">加入我们 即将与超过亿万乐迷互动</strong>
                </a>
            </div>
            <div class="column footerSame clearFix">
                <a href="#" class="columnImg"></a>
                <a href="#" class="footerText">
                    <strong>音乐专栏招募计划</strong>
                    <strong class="textBottom">加入我们 与同道中人交流心得</strong>
                </a>
            </div>
            <div class="copyright footerSame">
                <p>
                    <a href="#">关于网易</a>-
                    <a href="#">客户服务</a>-
                    <a href="#">服务条款</a>-
                    <a href="#">网站导航</a> 网易公司版权所有©1997-2017</p>
                <p>杭州乐读科技有限公司运营：
                    <a href="#">浙网文[2015]0415-135号</a>
                    <a href="#" class="advice">意见反馈</a>
                </p>
            </div>
        </div>
    </footer>
</template>
<script>
export default {

}
</script>
<style>
.footer {
    height: 125px;
    background: #f9f9f9;
    font-size: 12px;
    min-width: 1200px;
     border-top:1px solid #ccc;
   
}

.footer .wrap {
    width: 1200px;
    margin: 0 auto;
    
}

.footerSame {
    float: left;
    width: 280px;
    margin-top: 29px;
    line-height: 22px;
    display: inline;
}

.MusicImg {
    float: left;
    width: 35px;
    height: 35px;
    background: url(../assets/img/css-script.gif) 0 -22px;
    margin-top: 5px;
}

.footerText {
    float: left;
    width: 190px;
}

.footer strong {
    display: block;
}

.columnImg {
    float: left;
    width: 34px;
    height: 38px;
    background: url(../assets/img/css-script.gif) -35px -22px;
    margin-top: 5px;
}

.musicPeople {
    margin-left: 65px;
}

.footerText {
    margin-left: 13px;
}

.footerText:hover {
    text-decoration: none;
}

.footerText strong {
    color: #666;
}

.footerText .textBottom {
    color: #999999;
}

.column {
    margin-left: 22px;
}

.copyright {
    width: 500px;
    margin-left: 13px;
}

.copyright p {
    color: #999;
}

.copyright a {
    color: #666;
}

.copyright .advice {
    padding-left: 41px;
    display: inline-block;
    background: url(../assets/img/css-script.gif) 0 -180px;
}
</style>


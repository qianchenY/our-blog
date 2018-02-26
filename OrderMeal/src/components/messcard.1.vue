<template>
    <div class="messcard">
        <div class="messcard-top">
            <div class="messcard-top-bg"></div>
            <div class="messcard-top-avatar">
                <img src="../../static/images/default2.jpg" alt="" class="avatar">
            </div>
            <div class="messcard-top-ms">
                <a href="#" class="messframe">{{username}}</a>
                <ul class="messcard-mode clearfloat">
                    <li>
                        <a href="#" class="messcard-mode-con">
                            <p>10</p>
                            <p>关注</p>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="messcard-mode-con">
                            <p>10</p>
                            <p>动态</p>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="messcard-mode-con">
                            <p>10</p>
                            <p>笔记</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="messcard-mid">
            <ul class="messcard-mid-list clearfloat">
                <li>
                    <a href="#" class="messcard-handle">
                        <img src="../../static/images/ly-sign.png" alt="">
                        <p>签到</p>
                    </a>
                </li>
                <li>
                    <router-link class="messcard-handle" to="/Homepage/editorpage">
                        <img src="../../static/images/ly-quiz.png" alt="">
                        <p>发起</p>
                    </router-link>
                </li>
                <li>
                    <a href="#" class="messcard-handle">
                        <img src="../../static/images/ly-essay.png" alt="">
                        <p>记笔记</p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="messcard-foot">
            <ul>
                <li>
                    <a href="#" class="messcard-point">
                        <img src="../../static/images/icon-mian.png" alt="">
                        <span>我的主页</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="messcard-point">
                        <img src="../../static/images/icon-caogao.png" alt="">
                        <span>我的草稿</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="messcard-point">
                        <img src="../../static/images/icon-collect.png" alt="">
                        <span>我的收藏</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="messcard-point">
                        <img src="../../static/images/icon-note.png" alt="">
                        <span>我的笔记</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="messcard-point">
                        <img src="../../static/images/icon-active.png" alt="">
                        <span>我的活动</span>
                    </a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'messcard',
        computed: {
            username() {
                return this.$store.state.username;
            }
        },
    }
</script>
<style lang="less" src="../assets/css/messcard.less"></style>
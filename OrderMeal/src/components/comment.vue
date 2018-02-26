<template>
    <div class="comment">
        <div class="comment-top">
            <h2>评论</h2>
        </div>
        <div class="comment-send tal">
            <div class="tal-l">
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea">
                </el-input>
            </div>
            <div class="tal-r align-center align-bottom">
                <el-button type="primary" size="small" :loading="false" @click="sendDiscuss(dynamicId)" :data-id="dynamicId">评论</el-button>
            </div>
        </div>
        <div class="comment-list">
            <ul v-if="firstComment.length>0">
                <li v-for="(item,index) in firstComment">
                    <div class="commentCon">
                        <div class="commentCon-top tal">
                            <div class="commentCon-top-l tal-l align-top">
                                <img src="../../static/touxiang/mengbi.jpg" alt="" class="avatar">
                            </div>
                            <div class="commentCon-top-r tal-l">
                                <div class="comment-main">
                                    <a class="comment-name">{{item.observer}} : </a>
                                    <span class="comment-info">{{item.content}}</span>
                                </div>
                                <div class="comment-column tal">
                                    <div class="comment-column-l tal-l">
                                        <ol class="comment-column-list">
                                            <li>
                                                <a @click="toggleLike({dynamicid:item.dynamicid,commentid:item.id},index)" class="tookcon">
                                                    <i class="lyiconfont iconfont icon-dianzan" :class="item.isCommentofSelf?'icon_act':''"></i>
                                                    <span>{{item.likeportNum || '0'}}</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a @click="toggleBackComment(index,item.id)" class="tookcon">
                                                    <i class="lyiconfont iconfont icon-pinglun"></i>
                                                    <span v-text="item.fcommentNum?item.fcommentNum+'条评论':'评论'"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a @click="toggleWarn({dynamicid:item.dynamicid,commentid:item.id})" class="tookcon">
                                                    <i class="lyiconfont iconfont icon-qizi"></i>
                                                    <span>举报</span>
                                                </a>
                                            </li>
                                            <li class="delet" v-if="item.observerId==utag">
                                                <a href="#" class="tookcon">删除</a>
                                            </li>
                                        </ol>
                                    </div>
                                    <div class="comment-column-r tal-r align-right">{{item.observerdate | getDateDiff}}</div>
                                </div>


                                <div class="comment-return-send comment-return-send-firlist" v-if="iscur2==index" v-show="iscurfu2==index">
                                    <div>
                                        <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入内容" v-model="textarea2">
                                        </el-input>
                                    </div>
                                    <div>
                                        <el-button @click="closeHuifuComment(2)" type="info" size="mini">关闭</el-button>
                                        <el-button @click="sendBackComment({commentid:item.id,to_uid:item.observerId,to_uname:item.observer})" type="primary" size="mini">回复</el-button>
                                    </div>
                                </div>


                                <div class="comment-return" v-if="iscur2==index">
                                    <ol class="comment-return-list">
                                        <li v-for="(item3,index3) in BackComment">
                                            <div class="comment-main">
                                                <a class="comment-name">{{item3.from_uname}}:
                                                    <span>回复</span>{{item3.to_uname}}:</a>
                                                <span class="comment-info">{{item3.content}}</span>
                                            </div>
                                            <div class="comment-column tal">
                                                <div class="comment-column-l tal-l">
                                                    <ol class="comment-column-list">
                                                        <li>
                                                            <a href="#" class="tookcon">
                                                                <i class="lyiconfont iconfont icon-dianzan"></i>
                                                                <span>10</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a @click="toggleReturnComment(index3)" class="tookcon"> 回复</a>
                                                        </li>
                                                        <li class="delet" v-if="item3.from_uid==utag">
                                                            <a href="#" class="tookcon">删除</a>
                                                        </li>
                                                    </ol>
                                                </div>
                                                <div class="comment-column-r tal-r align-right">{{item3.reply_date | getDateDiff}}</div>
                                            </div>
                                            <transition name="el-fade-in">
                                                <div class="comment-return-send" v-if="iscur3==index3">
                                                    <div>
                                                        <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入内容" v-model="textarea3">
                                                        </el-input>
                                                    </div>
                                                    <div>
                                                        <el-button @click="closeHuifuComment(3)" type="info" size="mini">关闭</el-button>
                                                        <el-button type="primary" @click="sendReplyComment({
                                                            commentid:item.id,
                                                            reply_id:item3.id,
                                                            to_uid:item3.from_uid,
                                                            to_uname:item3.from_uname
                                                        })" size="mini">回复</el-button>
                                                    </div>
                                                </div>
                                            </transition>
                                        </li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="firstComment.length==0" style="text-align: center;padding: 35px 0;font-size: 14px;color: #7e8c8d;">
                暂无评论，赶紧过来抢沙发
            </div>
        </div>
    </div>
</template>

<script>
    import { formatDate } from './../assets/js/util.js';
    export default {
        name: 'comment',
        data() {
            return {
                iscur2: null,
                iscurfu2: null,
                iscur3: null,
                textarea: '',
                textarea3: '',
                textarea2: '',
                firstComment: [],
                BackComment: [],
                ReplyComment: []
            }
        },
        props: {
            dynamicId: {
                type: String
            }
        },
        computed: {
            utag() {
                return this.$store.state.utag;
            }
        },
        created() {
            this.getFirstComment(this.dynamicId)
        },
        methods: {
            getFirstComment(id) {
                this.$http.get(`/api/getfComment?id=${id}`).then(res => {
                    var res = res.data;
                    if (res.status) {
                        res.result.map((v,i) => {
                            v.likeportfuben == this.utag ? v.isCommentofSelf = true : v.isCommentofSelf = false;
                        })
                        this.firstComment = res.result;
                    }
                    
                }).catch(err => {
                    this.$message({
                        message: '加载失败，网络波动',
                        type: 'warning'
                    });
                })
            },
            sendDiscuss(id) {
                var objs = {};
                if (this.textarea.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*$)/g, '').length == 0) {
                    this.$message.error('评论内容不可为空!');
                } else {
                    objs.content = this.textarea;
                    objs.observerdate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
                    objs.observer = this.$store.state.username;
                    objs.observerId = this.$store.state.utag;
                    objs.dynamicid = id;
                    this.$http.post('/api/doComment', objs).then(res => {
                        var res = res.data;
                        if (res.status) {
                            this.textarea = '';
                            this.getFirstComment(this.dynamicId);
                        }
                    }).catch(err => {
                        this.$message({
                            message: '网络波动',
                            type: 'warning'
                        });
                    })
                }
            },
            toggleBackComment(index, id) {
                this.iscur2 == index ? this.iscur2 = null : this.iscur2 = index;
                this.iscurfu2 == index ? this.iscurfu2 = null : this.iscurfu2 = index;
                this.getBackComment(id)
            },
            toggleReturnComment(index) {
                this.iscur3 == index ? this.iscur3 = null : this.iscur3 = index;
            },
            sendBackComment($obj) {
                if (this.textarea2.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*$)/g, '').length == 0) {
                    this.$message.error('评论内容不可为空!');
                } else {
                    var params = {
                        dynamicid: this.dynamicId,
                        commentid: $obj.commentid,
                        reply_type: 'comment',
                        content: this.textarea2,
                        from_uid: this.$store.state.utag,
                        from_uname: this.$store.state.username,
                        to_uid: $obj.to_uid,
                        to_uname: $obj.to_uname,
                        reply_date: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
                    }
                    this.$http.post('/api/dofComment', params).then(res => {
                        var res = res.data;
                        if (res.status) {
                            this.closeHuifuComment(2);
                            this.getBackComment($obj.id);
                        }
                    }).catch(err => {
                        this.$message({
                            message: '网络波动',
                            type: 'warning'
                        });
                    })
                }

            },
            getBackComment($id) {
                this.$http.get(`/api/getsComment?id=${$id}`).then(res => {
                    var res = res.data;
                    if (res.status) {
                        this.BackComment = res.result;
                    }
                }).catch(err => {
                    this.$message({
                        message: '加载失败！网络波动',
                        type: 'warning'
                    });
                })
            },
            sendReplyComment($obj) {
                if (this.textarea3.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*$)/g, '').length == 0) {
                    this.$message.error('回复内容不可为空! ');
                } else {
                    var params = {
                        dynamicid: this.dynamicId,
                        commentid: $obj.commentid,
                        reply_type: 'reply',
                        reply_id: $obj.reply_id,
                        content: this.textarea3,
                        from_uid: this.$store.state.utag,
                        from_uname: this.$store.state.username,
                        to_uid: $obj.to_uid,
                        to_uname: $obj.to_uname,
                        reply_date: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
                    }
                    this.$http.post('/api/dofComment', params).then(res => {
                        var res = res.data;
                        if (res.status) {
                            this.closeHuifuComment(3);
                            this.getBackComment($obj.commentid);
                        }
                    }).catch(err => {
                        this.$message({
                            message: '网络波动',
                            type: 'warning'
                        });
                    })
                }

            },
            closeHuifuComment(eq) {
                if (eq == 2) {
                    this.iscurfu2 = null;
                    this.textarea2 = '';
                } else if (eq == 3) {
                    this.iscur3 = null;
                    this.textarea3 = '';
                }
            },
            toggleLike($obj,$index) {
                var params = {
                    dynamicid: $obj.dynamicid,
                    sideCommentType: 'comment',
                    commentid: $obj.commentid,
                    likeport: this.utag
                }
                this.$http.post('/api/dosideComment', params).then(res => {
                    console.log(res)
                    var res = res.data;
                    if(res.status){
                        this.firstComment[$index].isCommentofSelf = !this.firstComment[$index].isCommentofSelf;
                        this.firstComment[$index].isCommentofSelf ? this.firstComment[$index].likeportNum++:
                        this.firstComment[$index].likeportNum!=0&&this.firstComment[$index].likeportNum--;
                    }
                }).catch(err => {
                    this.$message({
                         message: `网络波动 ${err}`,
                        type: 'warning'
                    });
                })
                
            },
            toggleWarn($obj) {
                var params = {
                    dynamicid: $obj.dynamicid,
                    sideCommentType: 'reply',
                    commentid: $obj.commentid,
                    warnport: this.utag
                };
                this.$http.post('/api/dosideComment',params).then(res => {
                    console.log(res)
                }).catch(err => {
                    this.$message({
                        message: `网络波动 ${err}`,
                        type: 'warning'
                    });
                })
            }
        }
    }
</script>

<style>
    .comment {
        position: relative;
        background: #fff;
        border: 1px solid #f0f2f7;
        margin-top: 15px;
    }

    .comment::before {
        content: '';
        position: absolute;
        top: -23px;
        left: 56px;
        display: inline-block;
        width: 0px;
        height: 0px;
        border: 11px solid transparent;
        border-bottom: 11px solid #f0f2f7;
    }

    .comment::after {
        content: '';
        position: absolute;
        top: -20px;
        left: 57px;
        display: inline-block;
        width: 0px;
        height: 0px;
        border: 10px solid transparent;
        border-bottom: 10px solid #fff;
    }

    .comment-top {
        line-height: 42px;
        font-size: 14px;
        padding: 0 12px;
        border-bottom: 1px solid #f0f2f7;
    }

    .comment-send {
        padding: 15px 12px;
        border-bottom: 1px solid #f0f2f7;
    }

    .comment-send>.tal-r {
        width: 95px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid lightblue;
    }

    .commentCon {
        padding: 15px 0;
    }

    .comment-list {
        padding: 0 12px;
    }

    .comment-list>ul>li {
        position: relative;
    }

    .comment-list>ul>li::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: #f0f2f7;
    }

    .comment-list>ul>li:last-child::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: transparent;
    }


    .commentCon-top-l {
        width: 50px;
    }

    .comment-name {
        color: #409EFF;
        font-size: 13px;
    }

    .comment-name>span {
        font-size: 12px;
        color: #8b8b8b;
        padding: 0 6px 0 6px;
    }

    .comment-info {
        font-size: 13px;
        color: #8b8b8b;
        line-height: 23px;
    }

    .comment-column-list {
        overflow: hidden;
    }

    .comment-column-list>li {
        float: left;
        position: relative;
        font-size: 13px;
    }

    .comment-column-list>li::before {
        content: '';
        position: absolute;
        top: 6px;
        bottom: 6px;
        left: 0;
        width: 1px;
        background: #ddd;
    }

    .comment-column-list>li.delet {
        opacity: 0;
    }

    .comment-column-list>li.delet>a {
        color: #409EFF;
    }

    .comment-column-list>li:first-child::before {
        content: '';
        position: absolute;
        top: 6px;
        bottom: 6px;
        left: 0;
        width: 1px;
        background: transparent;
    }

    .comment-column-list:hover>li.delet:last-child {
        opacity: 1;
    }

    .tookcon {
        position: relative;
        display: inline-block;
        padding: 0 10px;
        height: 25px;
        line-height: 25px;
        z-index: 10;
        cursor: pointer;
        text-align: center;
    }

    .comment-column-r {
        font-size: 13px;
        color: #8b8b8b;
    }

    .comment-column {
        margin-left: -11px;
    }

    .comment-return {
        background: #EAEAEC;
        padding: 0 10px;
    }

    .comment-return-list>li {
        position: relative;
        font-size: 13px;
        padding-top: 5px;
        padding-bottom: 8px;
        border-bottom: 1px solid #d9d9d9;
    }

    .comment-return-list>li:last-child {
        border-bottom: none;
    }

    .comment-return-send {
        position: relative;
        padding: 10px;
        border: 1px solid #ddd;
        margin-top: 10px;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
    }

    .comment-return-send::before {
        content: '';
        position: absolute;
        top: -23px;
        left: 49px;
        display: inline-block;
        width: 0px;
        height: 0px;
        border: 11px solid transparent;
        border-bottom: 11px solid #ddd;
    }

    .comment-return-send::after {
        content: '';
        position: absolute;
        top: -20px;
        left: 50px;
        display: inline-block;
        width: 0px;
        height: 0px;
        border: 10px solid transparent;
        border-bottom: 10px solid #EAEAEC;
    }

    .comment-return-send>div {
        margin-top: 10px;
        text-align: right;
    }

    .comment-return-send-firlist {
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
    }

    .comment-return-send.comment-return-send-firlist::after {
        content: '';
        position: absolute;
        top: -20px;
        left: 50px;
        display: inline-block;
        width: 0px;
        height: 0px;
        border: 10px solid transparent;
        border-bottom: 10px solid #fff;
    }
</style>
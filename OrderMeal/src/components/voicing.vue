<template>
    <div class="palte-mode-took">
        <div class="tal">
            <div class="tal-l">
                <ul class="mode-took-list clearfloat">
                    <li>
                        <a @click.stop.self="toggleUplike($event,index)" class="tookcon" :data-id='item.id' :data-author='item.author' :data-authorId='item.authorId'
                            :data-dianzanId="item.prepid">
                            <i class="lyiconfont iconfont icon-dianzan" :class="item.iscurup?'icon_act':''"></i>
                            <span>{{item.uplikeNum || '0'}}</span>
                        </a>
                    </li>
                    <li>
                        <a @click.stop.self="sendCommentShow" class="tookcon">
                            <i class="lyiconfont iconfont icon-pinglun"></i>
                            <span>{{item.observerNum || '0'}}</span>
                        </a>
                    </li>
                    <li>
                        <div class="tookcon" @click.stop.self="toggleShowcang($event,index)" :data-val="item.selfid?'1':'0'" :data-id='item.id' :data-author='item.author'
                            :data-authorId='item.authorId' :data-shoucangId="item.prepid">
                            <i class="lyiconfont el-icon-star-off" :class="item.iscur?'icon_act':''"></i>
                            <span>{{item.shoucangNum || '0'}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="tal-r align-right">
                <i class="palte-time-icon el-icon-time"></i>
                <span class="palte-mode-took-time">{{item.writedate | getDateDiff}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'voicing',
        props: {
            itemdata: {
                type: Array
            },
            item: {
                type: Object
            },
            index: {
                type: Number
            },
            tog: {
                type: String
            }
        },
        methods: {
            toggleUplike(e, $index) {
                var el = e.target;
                var param = {
                    uplikeid: el.getAttribute('data-id'),
                    contentid: el.getAttribute('data-id'),
                    contentauthor: el.getAttribute('data-author'),
                    contentauthorId: el.getAttribute('data-authorId'),
                    selfname: this.$store.state.username,
                    selfId: this.$store.state.utag
                };
                if (this.itemdata[$index].iscurup) {
                    this.$http.delete(`/api/deletUplike?id=${el.getAttribute('data-dianzanId')}`).then(res => {
                        var res = res.data;
                        if (res.status) {
                            this.itemdata[$index].iscurup = !this.itemdata[$index].iscurup;
                            this.itemdata[$index].uplikeNum != 0 && parseInt(this.itemdata[$index].uplikeNum--);
                        }
                    }).catch(err => {
                        this.$message({
                            message: '网络波动,请稍后重试',
                            type: 'warning'
                        });
                    })
                } else {
                    this.$http.post('/api/doUplike', param).then(res => {
                        var res = res.data;
                        if (res.status) {
                            this.itemdata[$index].iscurup = !this.itemdata[$index].iscurup;
                            parseInt(this.itemdata[$index].uplikeNum++);
                        }
                    }).catch(err => {
                        this.$message({
                            message: '网络波动,请稍后重试',
                            type: 'warning'
                        });
                    })
                }
            },
            toggleShowcang(e, $index) {
                var el = e.target;
                var param = {
                    collectedconid: el.getAttribute('data-id'),
                    contentid: el.getAttribute('data-id'),
                    contentauthor: el.getAttribute('data-author'),
                    contentauthorId: el.getAttribute('data-authorId'),
                    selfname: this.$store.state.username,
                    selfId: this.$store.state.utag
                }
                if (this.itemdata[$index].iscur) {
                    this.$http.delete(`/api/deletdocelloct?id=${el.getAttribute('data-shoucangId')}`).then(res => {
                        this.itemdata[$index].iscur = !this.itemdata[$index].iscur;
                        this.itemdata[$index].shoucangNum != 0 && parseInt(this.itemdata[$index].shoucangNum--);
                    }).catch(err => {
                        this.$message({
                            message: '网络波动',
                            type: 'warning'
                        });
                    })
                } else {
                    this.$http.post('/api/docelloct', param).then(res => {
                        var res = res.data;
                        if (res.status) {
                            this.itemdata[$index].iscur = !this.itemdata[$index].iscur;
                            parseInt(this.itemdata[$index].shoucangNum++);
                        }
                    }).catch(err => {
                        this.$message({
                            message: '评论失败，网络波动',
                            type: 'warning'
                        });
                    })
                }
            },
            sendCommentShow() {
                if (this.tog == this.index) {
                    this.$emit('toggle', null)
                } else {
                    this.$emit('toggle', this.index)
                }

            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .palte-mode-took {
        .palte-time-icon {
            font-size: 16px;
            color: #9FADC7;
            vertical-align: middle;
        }
        .palte-mode-took-time {
            font-size: 14px;
            color: #9FADC7;
            vertical-align: middle;
        }
        .mode-took-list {
            width: 215px;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            &>li {
                float: left; // width: 33.333%;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                text-align: left;
                border: 1px solid #edeeef;
                border-right: none;
                &:last-child {
                    border-right: 1px solid #edeeef;
                }
                &>.tookcon {
                    position: relative;
                    display: inline-block;
                    padding: 0 10px;
                    height: 25px;
                    line-height: 25px;
                    z-index: 10;
                    cursor: pointer;
                    text-align: center;
                    &>img {
                        position: relative;
                        z-index: -1;
                        width: 18px;
                        height: 18px;
                        vertical-align: middle;
                    }
                    &>span {
                        position: relative;
                        z-index: -1;
                        font-size: 14px;
                        color: #B2BAC2;
                    }
                }
            }
        }
    }
</style>
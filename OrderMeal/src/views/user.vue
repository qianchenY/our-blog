<template>
    <!--用户中心 -->
    <div>
        <ly-header></ly-header>
        <div class="user">
            <div class="user-l">              
                <Messcard></Messcard>
            </div>
            <div class="user-r">
                <nav class="user-nav">
                    <router-link :to="'/User/' + $route.params.userid + '/asks'">问答</router-link>
                    <router-link :to="'/User/' + $route.params.userid + '/posts'">文章</router-link>
                    <router-link :to="'/User/' + $route.params.userid + '/comment'">评论</router-link>
                </nav>
                <div class="user-bd">
                    <router-view></router-view>
                </div>            
            </div>            
        </div>
    </div>
</template>

<style lang="less" scoped>
    .user{
        margin: 89px auto 0 auto;
        width: 1000px;
        overflow: hidden;

        .user-l{
            float: left;
        }

        .user-r{
            float: right;
            width: 650px;
            min-height: 650px;
            background-color: #fff;
        }

        .user-nav{
            padding: 0 15px;
            overflow: hidden;
            background-color: #fcfcfc;
            border-bottom: 1px solid #ccc;

            a{
                float: left;
                display: block;
                padding: 15px;
                font-size: 14px;
                font-weight: 700;
                color: #666;

                &:hover{
                    color: #337ab7;
                }
                
                &.active{
                    color: #337ab7;
                }
            }
        }

        .user-bd{
            padding: 15px;
            overflow: hidden;
        }
    }
</style>

<script>
import Header from '../components/header'
import Messcard from '../components/messcard'
    export default {
        name: 'User',
        data(){
            return{

            }
        },
        components:{
            'ly-header': Header,
            Messcard
        }
    }
</script>


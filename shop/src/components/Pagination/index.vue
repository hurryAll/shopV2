<template>
    <div class="pagination">
      <!-- true时，当前在第一页，不可点击上一页 -->
      <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
      <button v-show="startAndEnd.start>1" @click="$emit('getPageNo',1)" >1</button>
      <button v-show="startAndEnd.start>2">···</button>
  
      <!-- 中间部分 -->
      <!-- end是个数，只遍历数会从小到大。v-if是只让中间部分展示从start到end的内容,其他内容不展示 -->
      <button v-for="(page,index) in startAndEnd.end" :key="index" v-if="page>=startAndEnd.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{ page }}</button>

      
      <button v-show="startAndEnd.end<totalPage-1">···</button>
      <button v-show="startAndEnd.end<totalPage" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
      <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
      
      <button style="margin-left: 30px">共 {{total}} 条</button>
      <input type="text" style="width: 60px;text-align: center; margin: 5px;" placeholder="页面跳转" @keyup.enter="jump" v-model.lazy="inputPage">
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagination",
      data(){
        return{
          inputPage:1
        }
      },
      props:['pageNo','pageSize','total','continues'],
      computed:{
        totalPage(){
          //向上取整 得到总页数
          return Math.ceil(this.total/this.pageSize)
        },
        //获取连续字段的初始和结尾数字
        startAndEnd(){
          //总页数，当前页数,连续页数个数
          const {total,pageNo,continues}=this
          let start=0
          let end=0
          //--第一次判断(数据的总数可能还没有连续页数多）||纠正
          if(total<continues){
            start=1
            end=total
          }else{
            //--当判断正常(此时连续页数一定小于总页数)

            /* 因为是封装,所以连续页数不是一直固定,因此连续页数的首尾也不能一直是+-2
            start=pageNo-2
            end=pageNo+2 */

            //这里只是要一个范围,看start和end在pageNo的前后几个
            start=pageNo-parseInt(continues/2)//parseInt是向下取整且转化为数字型
            end=pageNo+parseInt(continues/2)
            //---第二次判断,可能start不是正整数||纠正
            console.log('1:'+end);
            if(start<1){
              start=1
              end=continues
            }
            //----第三次判断,有可能连续页码的end超出了总页数||纠正
            if(end>this.totalPage){
              end=this.totalPage
              start=this.totalPage-continues+1
              console.log('2:'+end);
            }
          }
          return {start,end}
        }
      },
      methods:{
        jump(){
          this.$emit('getPageNo',parseInt(this.inputPage))
        }
      }
    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  </style>
  
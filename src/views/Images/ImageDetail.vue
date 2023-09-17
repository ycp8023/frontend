<template>
    <div id="imageDetail" data-app style="overflow-y:scroll">
  <h2>镜像详情</h2>
  <template>
  <v-card 
    elevation="2"
    shaped
    class="mx-auto my-12"
    max-width="1000"
    display="flex"
    style="margin:30px"
    
    >
    <v-card-title class="title-style">
        镜像详情
    </v-card-title>
    <v-card-text>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-subheader class="header-style">ID</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-subheader>{{image.id}}</v-subheader>
      </v-col>
    </v-row>
  <v-divider></v-divider>
    <v-row>
      <v-col cols="4">
        <v-subheader class="header-style">操作系统</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-subheader>{{image.os}}</v-subheader>
      </v-col>
    </v-row>
  <v-divider></v-divider>
    <v-row>
      <v-col cols="4">
        <v-subheader class="header-style">架构</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-subheader>{{image.architecture}}</v-subheader>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="4">
        <v-subheader class="header-style">大小</v-subheader>
      </v-col>
      <v-col cols="8">
      <v-subheader>{{image.size}}</v-subheader>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="4">
        <v-subheader class="header-style">创建时间</v-subheader>
      </v-col>
      <v-col cols="8">
      <v-subheader>{{image.create_time}}</v-subheader>
      </v-col>
    </v-row>
  </v-container>
    </v-card-text>
    <v-card-actions>
        <!-- 删除弹窗 -->
        <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
        style="margin:20px;background-color:#D84315;color:white" 
        v-bind="attrs"
        v-on="on">
        删除镜像
      <v-icon color="primary">mdi-trash-can-outline</v-icon>
        </v-btn>
   
      </template>
      <v-card>
        <v-card-title class="text-h5">
          确认删除
        </v-card-title>
        <v-card-text>是否删除该镜像</v-card-text>
       <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="delImage()"
          >
            删除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
 </v-card-actions>
  </v-card>
  <v-card 
    elevation="2"
    shaped
    class="mx-auto my-12"
    max-width="1000"
    style="margin:30px"
  >
  <v-card-title class="title-style">
    <v-icon color="white" >mdi-tag-outline</v-icon>
    镜像标签
  </v-card-title>
  <v-card-text>
     <v-chip
      style="margin:20px;background-color:"
      v-for="(item,key) in image.tags"
      v-if="image.tags.includes(item)"
      :key="key"
      class="ma-2"
      close
      color="red"
      text-color="white"
      @click:close="delTag(item)"
    >
      {{image.tags[key]}}
    </v-chip>
  </v-card-text>
  </v-card>
  <v-card
   elevation="2"
    shaped
    class="mx-auto my-12"
    max-width="1000"
    display="flex"
    style="margin:30px"
    >
    <v-card-title class="title-style">标记镜像</v-card-title>
    <v-card-text>
        <v-form style="margin-top:20px">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="10"
        >
          <v-text-field
            v-model="newlabel"
            label="新标签"
            outlined
            shaped
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="2"
        >
          <v-btn style="margin:auto; " color="primary" dark @click="addTag()">添加</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
    </v-card-text>
  </v-card>
  </template>
</div>
</template>

<script>
export default {
    name:'imageDetail',
    data() {
        return {
            newlabel:'',
            dialog:false,
            image:{
                // Created_time:'2022-03-04',
                // Architecture:'土豆哈哈哈',
                // Os:'Linux',
                // Size:128.83,
                // Id:'001',
                // Tag:['nginx','potato'],
            },
        
        }
    },
    mounted() {
      let that=this;//将vue对象的引用保存在that中
       const formData = new FormData();
       console.log(this.$route.query.id);
        formData.append('id',this.$route.query.id);
        this.$axios({
          url: '/paas/image_info',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
      .then(function(res){
       console.log('镜像详情',res.data);
       that.image=res.data;

      })
      .catch(function(err){
       console.log(err);
      });
    },

    methods: {
        delTag(el){
            // 删除标签
                this.image.tags = this.image.tags.filter(item => item !== el);
        },
        delImage(){
            // 删除镜像
            this.dialog=false;
            console.log('删除镜像')
            const formData=new FormData();
            formData.append('id',this.$route.query.id);
            // /paas/delete_image
            this.$axios({
                url: '/paas/delete_image',
                method: 'POST',
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                data: formData
             })
           .then(function(res){
             console.log('删除镜像',res.data);

           })
           .catch(function(err){
            console.log(err);
           });
        },
        addTag(){
            // 添加标签
            console.log('添加标签')
            if((!this.image.tags.includes(this.newlabel))&&(this.newlabel!='')){
                 this.image.tags.push(this.newlabel);
                 this.newlabel='';
                //  /paas/add_tag
            }
        }
    },
}
</script>

<style>
.title-style{
    background-color: #CFD8DC;
    color: black;
    height: 50px;
}
.header-style{
    font-weight: 600;
    background-color:#F5F5F5;
}
</style>
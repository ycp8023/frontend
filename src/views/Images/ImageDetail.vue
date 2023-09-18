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
      <!-- dockerfile弹窗 -->
       <v-row justify="center">
    <v-dialog
      v-model="dialog1"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn 
        style="margin:20px;color:white" 
        dark
        color="primary"
          v-bind="attrs"
          v-on="on"
      >
        通过dockerfile修改镜像
      <v-icon color="primary">mdi-file-edit-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">通过dockerfile修改镜像</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="镜像名称"
                  v-model="docker_name"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-text-field
                  label="标签"
                  required
                ></v-text-field>
              </v-col> -->
              <v-col cols="12">
                <v-textarea
                  label="docker"
                  v-model="docker_docker"
                  required
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog1 = false"
          >
            取消
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="editDockerfile()"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
        <!-- 删除弹窗 -->
        <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-row>
          <v-col cols="12" sm="6">
          </v-col>
          <v-col cols="12" sm="6">
       
         <v-btn 
        style="margin:20px;background-color:#D84315;color:white" 
        v-bind="attrs"
        v-on="on">
        删除镜像
      <v-icon color="primary">mdi-trash-can-outline</v-icon>
        </v-btn>
          </v-col>
        </v-row>
   
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
        <!-- <v-col
          cols="12"
          sm="4"
        >
          <v-text-field
            v-model="newId"
            label="ID"
            outlined
            shaped
          ></v-text-field>
        </v-col> -->
         <v-col
          cols="12"
          sm="5"
        >
          <v-text-field
            v-model="newName"
            label="名称"
            outlined
            shaped
          ></v-text-field>
        </v-col>
         <v-col
          cols="12"
          sm="5"
        >
          <v-text-field
            v-model="newVersion"
            label="版本"
            outlined
            shaped
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="2"
        >
          <v-btn style="margin:auto;" color="primary" dark @click="addTag()">添加标签</v-btn>
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
            newId:'',
            newName:'',
            newVersion:'',
            // docker_tag:'',
            docker_name:'',
            docker_docker:'',
            dialog:false,
            dialog1:false,
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
    watch:{

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
            console.log('el',el);
            const formData=new FormData();
            formData.append('tag',el);
            // /paas/delete_image
            let that=this;
            this.$axios({
                url: '/paas/delete_tag',
                method: 'POST',
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                data: formData
             })
           .then(function(res){
             console.log('删除tag',res.data);
             if(res.data.errno==1000){
               that.image.tags = that.image.tags.filter(item => item !== el);
             }
            else
              window.alert('删除失败！');

           })
           .catch(function(err){
            console.log(err);
           });
          
        },
        editDockerfile(){
          this.dialog1=false;
          console.log('编辑dockerfile');
          // /paas/modify_image
          const formData=new FormData();
          formData.append('name',this.docker_name);
          formData.append('tag',this.image.tags[0]);
          formData.append('docker',this.docker_docker);
          this.$axios({
                url: '/paas/modify_image',
                method: 'POST',
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                data: formData
             })
           .then(function(res){
             console.log('docker',res.data);
             if(res.data.errno==1000)
             window.alert('修改成功');
            else
            window.alert('修改失败');
           })
           .catch(function(err){
            console.log(err);
           });
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
             if(res.data.msg=="success")
              window.alert('删除成功！');
            else
              window.alert('删除失败！');

           })
           .catch(function(err){
            console.log(err);
           });
        },
        addTag(){
            // 添加标签
            console.log('添加标签')
            const formData=new FormData();
            formData.append('id',this.$route.query.id);
            formData.append('name',this.newName);
            formData.append('version',this.newVersion);
            // console.log('test',this.newName.toString()+":"+this.newVersion.toString());
             var tag=this.newName.toString()+":"+this.newVersion.toString();
             let that=this;
            this.$axios({
          url: '/paas/add_tag',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
        .then(function(res){
          console.log('添加标签',res);
          // window.alert('添加成功');
           that.image.tags.push(tag);
          that.newName='';
            that.newVersion='';
          // var tag=this.newName.toString()+":"+this.newVersion.toString();
          console.log('tag',tag);
          })
         .catch(function(err){
          console.log(err);
          window.alert('添加失败');
          });

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
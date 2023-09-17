<template>
  <div id="images" data-app>
    <h2>镜像管理</h2>
    <div class="table-wrapper">
    <div class="card-style">
    <v-card>
    <v-card-title>
    <span>镜像列表</span>
        </v-card-title>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
       <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
          dark
          style="margin-left:120px;margin-right:30px"
        >
          拉取镜像
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">拉取镜像</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="镜像名称"
                  required
                  v-model="image_name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="镜像版本"
                  v-model="image_version"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col> -->
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            @click="dialog = false"
            style="margin:10px"
          >
            取消
          </v-btn>
          <v-btn
            color="blue darken-1"
            dark
            @click="newImage()"
            style="margin:10px"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </v-card-title>
    <v-data-table
      v-model="selected"
      item-key="name"
      :headers="headers"
      :items="desserts"
      :search="search"
      show-select
    >
    <template v-slot:top>
      <v-toolbar
        flat
      >
      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">确定删除该镜像？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">取消</v-btn>
              <v-btn color="primary" text @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="detailItem(item)"
      >
        mdi-pencil
      </v-icon>
       <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
  </v-card>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        search: '',
        name:'images',
        dialog:false,
        dialogDelete: false,
        selected:[],
        image_name:'',
        image_version:'',
        headers: [
          {
            text: 'id',
            align: 'start',
            filterable: false,
            value: 'short_id',
          },
          { text: '标签', value: 'tags' },
          { text: '大小', value: 'size' },
          { text: '创建时间', value: 'create_time' },
          { text: '管理', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
        desserts: [
          // // 
          // {
          //   short_id: '001',
          //   id:'',
          //   label: "nginx",
          //   size:'127.07',
          //   create_time:'',
          //   tags:[],
          // },
        ],
      }
    },
    watch: {
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods: {
      addImage(){
        this.show=true;
      },
      detailItem(el){
        console.log('id',el);
        this.$router.push({path:'/image_detail',query:{id:el.short_id}});
      },
      cancer(){
        this.show=false;
      },
      newImage(){
        this.dialog=false;
        // /paas/pull_image
        const formData = new FormData();
        console.log('image_Name',this.image_name);
        console.log('image_version',this.image_version);
        formData.append('name',this.image_name);
        formData.append('version',this.image_version);
        console.log('新镜像',formData);
        this.$axios({
          url: '/paas/pull_image',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
      .then(function(res){
       console.log('拉去镜像',res.data);

      })
      .catch(function(err){
       console.log(err);
      });
      },
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        //删除镜像
        console.log('del_item',this.desserts[this.editedIndex].short_id);
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
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    },
    mounted() {
      let that=this;//将vue对象的引用保存在that中
      this.$axios.post('/paas/list_images')
      .then(function(res){
       console.log('镜像列表',res.data);
              console.log('desserts',that.desserts);
       that.desserts=res.data;
       for(var i=0;i<that.desserts.length;i++){
        that.desserts[i].create_time=that.desserts[i].create_time.slice(0,19);
       }
      })
      .catch(function(err){
       console.log(err);
      });
    },

    //  created() {
    //   this.$axios.post('/paas/list_images')
    //   .then(function(res){
    //    console.log('镜像列表',res.data);
    //           console.log('desserts',this.desserts);
    //    this.desserts=res.data;
    //   })
    //   .catch(function(err){
    //    console.log(err);
    //   });
    // },
  }
</script>
<style>
.table-wrapper{
    /* width: 1100px; */
    display: flex;
    padding-top:30px;
    margin: auto;
    color:#263238;
}
.card-style{
    margin:20px;
    color:#263238;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 700;
}
.title{
  float: left;
  color:#263238;
}
</style>

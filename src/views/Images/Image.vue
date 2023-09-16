<template>
  <div id="images" data-app>
    <div class="table-wrapper">
    <h2>镜像管理</h2>
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
          创建新镜像
        </v-btn>
        <v-btn
          color="primary"
          dark
        >
          删除镜像
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">创建新镜像</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="镜像名称"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="镜像版本"
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
            @click="dialog = false"
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
    <!-- <template v-slot:top>
      <v-toolbar
        flat
      >
      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template> -->
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="detailItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    </v-data-table>
  </v-card>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        name:'images',
        dialog:false,
        selected:[],
        headers: [
          {
            text: 'id',
            align: 'start',
            filterable: false,
            value: 'name',
          },
          { text: '标签', value: 'label' },
          { text: '大小', value: 'size' },
          { text: '创建时间', value: 'create-time' },
          { text: '管理', value: 'actions', sortable: false },
        ],
        desserts: [
          {
            name: '001',
            label: "nginx",
            size:127.07
          },
          {
            name: '002',
            label: "nginx",
            size:23
          },
          {
            name: '003',
            label: "alpine",
            size:72.42
          }
        ],
      }
    },
    methods: {
      addImage(){
        this.show=true;
      },
      detailItem(el){
        console.log('id',el);
        this.$router.push({path:'/image_detail',query:{id:el.name}});
      },
      cancer(){
        this.show=false;
      },
      submitImage(){
        this.show=false;
        //提交表单
      }
    },
  }
</script>
<style>
.table-wrapper{
    width: 800px;
    padding:20px;
    padding-top:30px;
    margin: auto;
}
.card-style{
    margin:20px;
}
</style>
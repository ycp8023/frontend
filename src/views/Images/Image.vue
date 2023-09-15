<template>
  <div id="images">
    <div class="table-wrapper">
    <h2>镜像管理</h2>
    <div class="card-style">
    <v-card>
    <v-card-title>
    <span>镜像列表</span>
        <!-- 新镜像 -->
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    <template v-slot:activator="{ on, attrs }">
    <v-btn
      depressed
      color="primary"
      style="margin:auto;float:right"
      v-bind="attrs"
      v-on="on"
    >
      创建新镜像
    </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
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
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-card-title>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
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
        ],
        desserts: [
          {
            name: '001',
            label: "nginx",
            size:127.07
          },
          {
            name: '001',
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
      newImage(){

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
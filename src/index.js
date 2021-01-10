import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './app.scss'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

let i = 0;

const HelloVueApp = {
  el: '#vue-app',
  data() {
    return {
      id: '00001',
      author: 'Adam Koch',
      changeSets: [],
      showChangesetInput: false,
      labelsattribute: ' labels="DEV1, DEV2"'
    }
  },
  
  methods: {
      addColumn: function () {
        this.changeSets.push({id: 0, columnname: "test"})
      },
      createChangeset: function () {
        this.showChangesetInput = false;
        this.changeSets.push({
          id: i++, 
          set: false
        })
      }
  }
}


Vue.component('command', {
  props: ['tablename', 'columnname'], 
  template: `<ul>
  <li>&lt;addColumn tableName="{{tablename.toUpperCase().replaceAll(' ', '_')}}"></li>
  <li>
    <ul>
      <li>&lt;column name="{{columnname.toUpperCase().replaceAll(' ', '_')}}" type="NUMBER(3,0)"></li>
      <li>&lt;/column></li>
    </ul>
  </li>
  <li>&lt;/addColumn></li>
  </ul>`
})

Vue.component('changeset', {
  data: function () {
    return {
      tablename: 'TABLE_1',
      columnname: 'COLUMN_1',
      isSet: false
    }
  },
  props: ['id', 'author', 'labelsattribute'],
  template: `
    <fieldset>
    <div v-if=!this.isSet>
      <label>Table name:</label> <input v-model="tablename" />
    <br>
      <label>Column name:</label> <input v-model="columnname" />
    </div>
    
    <div class="changeset">&lt;changeSet id="ID-{{id}}" author="{{author}}"{{labelsattribute}}&gt;
  <command v-bind:columnname="columnname" v-bind:tablename="tablename"/>
    &lt;/changeSet&gt;</div>
    <div v-if=!this.isSet><button v-on:click="addChangeset" class="btn btn-secondary">Commit</button></div>
    </fieldset>`,
  methods: {
    addChangeset: function () {
      console.log(this.isSet)
      this.isSet = true
    }
  }
})


const app = new Vue(HelloVueApp)

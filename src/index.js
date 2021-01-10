import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './app.scss'
import ChangeSetTemplate from './changeSetTemplate.html'

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
      author: '',
      changeSets: [],
      showChangesetInput: false,
      labels: ''
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
  props: ['id', 'author', 'labels'],
  template: ChangeSetTemplate,
  methods: {
    addChangeset: function () {
      console.log(this.isSet)
      this.isSet = true
    }
  }
})


const app = new Vue(HelloVueApp)

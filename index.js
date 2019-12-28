/*********************************************************************************
 * WEB422 – Assignment 3
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: David Zak Student ID: 158458174 Date: October 10th, 2019
 *
 *
 ********************************************************************************/

import Vue from "vue";
import App from "./components/App.vue";
import BootstrapVue from "bootstrap-vue";
import "./node_modules/bootstrap/dist/css/bootstrap.css";
import "./node_modules/bootstrap-vue/dist/bootstrap-vue.css";

const app = new Vue({
  el: "#app",
  components: {
    App
  },
  template: "<App></App>"
});

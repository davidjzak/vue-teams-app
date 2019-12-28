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

<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-header">
        <strong>{{this.team.TeamName}}</strong>
        <button class="btn btn-primary btn-sm float-right" @click="saveTeam">Save</button>
      </div>
      <div class="card-body">
        <h5>Team Lead</h5>
        <multiselect
          class="single"
          v-model="team.TeamLead"
          :options="employees"
          :custom-label="teamCustomLabel"
          placeholder="Select one"
          label="fullName"
          track-by="LastName"
        ></multiselect>

        <h5>Team Members</h5>
        <multiselect
          class="multiple"
          v-model="team.Employees"
          :options="employees"
          :custom-label="employeeCustomLabel"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="fullName"
          track-by="LastName"
          :preselect-first="true"
        >

          <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
            >{{ values.length }} options selected</span>
          </template>
        </multiselect>
        <h5>Projects</h5>
        <multiselect
          class="multiple"
          v-model="team.Projects"
          :options="projects"
          :custom-label="projectCustomLabel"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Choose Project"
          label="projectName"
          track-by="ProjectName"
          :preselect-first="true"
        >
          <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
            >{{ values.length }} options selected</span>
          </template>
        </multiselect>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>


<script>
import Multiselect from "vue-multiselect"; // https://vue-multiselect.js.org/
import "../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
export default {
  name: "TeamCard",
  props: ["team", "employees", "projects"],
  components: {
    Multiselect
  },
  methods: {
    teamCustomLabel({ FirstName, LastName }) {
      return `${FirstName} ${LastName}`;
    },
    employeeCustomLabel({ FirstName, LastName }) {
      return `${FirstName} ${LastName}`;
    },
    projectCustomLabel({ ProjectName }) {
      return `${ProjectName}`;
    },
    saveTeam() {

      let currentTeam = {};
      currentTeam.Projects = this.team.Projects; 
      currentTeam.Employees = this.team.Employees;
      currentTeam.TeamLead = this.team.TeamLead;
      currentTeam._id = this.team._id;

      fetch(
       "http://pure-citadel-90161.herokuapp.com/" + currentTeam._id,
        {
          method: "PUT",
          body: JSON.stringify({
            Employees: currentTeam.Employees,
            TeamLead: currentTeam.TeamLead,
            Projects: currentTeam.Projects,
            _id: currentTeam._id
          }),
          headers: { "Content-Type": "application/json" }}
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.$emit(
            "team-updated",
            this.team.TeamName + "Finished Updating"
          );
        })
        .catch(err => {
          console.log(err);
          this.$emit(
            "team-updated",
         this.team.TeamName + " Error on update" + error
          );
        });
    }
  }
};
</script>
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
  <div class="wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand">David Zak's Assignment 3 - Team Details</a>
    </nav>
    <div class="container">
      <div class="row">
     
        <TeamCard
          v-for="(team, index) in teams"
          :key="`team-${index}`"
          :employees="employees"
          :projects="projects" 
          :team="team"
                 
          @team-updated="showModalWindow" 
        ></TeamCard>
    
      </div>
    </div>
  </div>

</template>

<style scoped>
.col-sm-4 {
  margin-top: 2em;
}
</style>

<script>
import TeamCard from "./TeamCard.vue";
import { map, pick, filter, shuffle, chunk, sortBy } from "lodash-es";
const teamsApiUrl = "https://nameless-island-49053.herokuapp.com";
export default {
  name: "App",
  data: function() {
    return {
      teams: [],
      employees: [],
      projects: []
    };
  },
  methods: {
    loadTeams: function() {
      fetch(`${teamsApiUrl}/teams`)
        .then(res =>  res.json())
        .then(teams => {
          console.log(teams);
          this.teams = teams;
          this.teams.sort(function(teama, teamb){ return teama._id > teamb._id})
            
                })
        .catch(() => {
          console.log("Error loading team info");
          this.showModalWindow(err);
        });
    },
    loadEmployees: function() {
      fetch(`${teamsApiUrl}/employees`)  //gets employees
        .then(res => res.json())
        .then(employees => {
          this.employees = map(employees, employee =>
            pick(employee, ["_id", "FirstName", "LastName"])
          );
          this.employees.forEach(employee => { //create full name property
            employee.FullName = employee.FirstName + " " + employee.LastName;
          });
        })
        .catch(err => {
          console.log("Error loading employee info");
          this.showModalWindow(err);
        });
    },
    loadProjects: function() { //load projects into team apu
      fetch(`${teamsApiUrl}/projects`)
        .then(res => res.json())
        .then(projects => {
          this.projects = projects;  // assign project data from teams api to project array
        })
        .catch(() => {
          console.log("Error loading projects info");
        });
    },
    showModalWindow: function(msg) {
      this.$bvModal.msgBoxOk(msg); // display modal
      this.showModalWindow(err);
    }
  },
  created: function() {
    // calls functions on page load
    this.loadEmployees();
        this.loadTeams();
    this.loadProjects();    

    
  },
  components: {
    TeamCard //connect to teamcard component
  }
};
</script>
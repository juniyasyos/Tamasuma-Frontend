
<template>
  <v-container fluid class="">
    <v-snackbar v-model="errorAlert" bottom left>
      {{ errorMsg }}
      <v-btn color="pink" text @click="errorAlert = false">Close</v-btn>
    </v-snackbar>
    <v-row align="center" justify="center" class="mb-5">
      <v-col cols="12" md="12" lg="12" sm="12" class="">
        <v-row
          justify="center"
          align="center"
          class="pa-5"
          :class="$vuetify.theme.dark ? 'aura-card-dark' : 'aura-card-light'"
        >
          <v-col md="6" lg="6" sm="6" cols="12">
            <p class="google-font mb-0" style="font-size: 150%;">
              Directory of past events
            </p>
            <p class="google-font mt-0 mb-0" style="font-size: 95%">
              Events are listed in reverse chronological order by date.
            </p>
          </v-col>
          <v-col md="6" lg="6" sm="6" cols="12">
            <v-text-field
              flat
              v-model="search"
              solo-inverted
              hide-details
              rounded
              prepend-inner-icon="mdi-search-web"
              label="Search"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="pa-0">
          <v-col md="12" class="pa-0">
            <v-data-table
              class="mt-3"
              :search="search"
              :mobile-breakpoint="0"
              :headers="headers"
              :items="eventsData"
              :loading="isLoading"
              sort-by="date"
              sort-desc
              :items-per-page="5"
              :class="$vuetify.theme.dark ? 'aura-card-dark' : 'aura-card-light'"
            >
              <template v-slot:[`item.name`]="{ item }">
                {{ item.name }}
              </template>

              <template v-slot:[`item.action`]="{ item }">
                <a :href="'/events/' + item.id" target="_blank">See More</a>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import service from "@/services/appservices";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {},
  computed: {
    ...mapState(["config"]),
  },
  data: () => ({
    eventsData: [],
    showData: false,
    isLoading: true,
    search: "",
    notFoundUpcomingEventFlag: false,
    errorAlert: false,
    errorMsg: "",
    headers: [
      {
        text: "Event Name",
        align: "start",
        value: "name",
      },
      { text: "Date", value: "date" },
      { text: "Venue", value: "venue.name" },
      { text: "See More", value: "action" },
    ],
  }),
  mounted() {
    this.getAllEvents();
  },
  methods: {
    getAllEvents() {
      this.isLoading = true;
      service
        .getAllEvents()
        .then((res) => {
          if (res.success) {
            this.eventsData = res.data.filter((obj) => obj.visible == true);
            this.isLoading = false;
          } else {
            this.isLoading = false;
          }
        })
        .catch((e) => {
          this.errorMsg = "Issue found with " + e;
          this.isLoading = false;
          this.errorAlert = true;
        });
    },
  },
};
</script>

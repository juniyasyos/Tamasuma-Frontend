<template>
    <v-dialog
      v-model="dialog"
      width="700"
    >
      <template v-slot:activator="{ on }">
          <div v-on="on" style="cursor: pointer;" class="text-center py-5 ma-1" :class="$vuetify.theme.dark == true?'aura-card-dark':'aura-card-light'" >
              <v-avatar size="100">
                  <img 
                    :src="getImgUrl(data.image, 'profile.jpg')"
                    :lazy-src="getImgUrl(data.image, 'profile.jpg')" alt=""
                  >
                </v-avatar>
                <p class="mt-3 mb-0 google-font mb-0" style="font-size:120%">{{data.name}}</p>
                <p class="mt-1 mb-0 google-font mt-0" style="font-size:80%">{{data.designation}}</p>
                <socialMediaDetails :data="data.socialLinks"/>
          </div>
          
      </template>

      <v-card :class="theme.isDark?'grey darken-3':'white'">
        <v-card-title
          class="px-5 google-font"
          primary-title
        >
         {{data.name}} 
        </v-card-title>

        <v-card-text class="pa-5">
            <p class="google-font">{{data.designation}}</p>
            <p class="google-font">{{data.bio}}</p>
            
            <socialMediaDetails  class="pl-0 ml-0" :data="data.socialLinks"/>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import socialMediaDetails from '@/components/common/SocialInfo'
  export default {
    components:{
        socialMediaDetails
    },
    inject: ['theme'],
    props:['data'],
    data () {
      return {
        dialog: false,
      }
    },
    mounted(){
     
    },
    methods:{
    }
  }
</script>


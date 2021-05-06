 <template>
    <v-app id="app" data-app :dark="dark" :class="[dark?'theme--dark':'theme--light']" :primary="primary" :secondary="secondary" > 
      <app_navigation :dark="dark" :primary="primary" :secondary="secondary"></app_navigation> 
      <app_main :dark="dark" :primary="primary" :secondary="secondary"></app_main>
      <login_dialog ref="login_dialog" :dark="dark" :primary="primary" :secondary="secondary"/>
    </v-app>
</template>

<script>
import app_navigation from "@/navigation.vue";
import app_main from "@/main.vue";
import login_dialog from "@/components/LoginDialog.vue";

export default {
    name: "app",
  	
    data: function() {
        return {
        	dark:false,
          	primary:"#2196F3",
            secondary:"#8BC34A",
          	
        };
    },
    components: {
        app_navigation,
        app_main,
        login_dialog
    },
    mounted() {
        this.$root.login_dialog = this.$refs.login_dialog;
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>

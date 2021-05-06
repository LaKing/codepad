<template>
    <div>
        <v-btn id="login_button" v-on:click="$root.login_dialog.open()" class="d-none d-lg-inline-flex">##&en Login in a Dialog ##&hu Login Dialogusként ##</v-btn>
		<p>##&en Or, Login built into the layout as a frame ##&hu Vagy bejelentkezés oldal tartalmába ágyazva ##</p>
        <div id="login_layout_frame" class="center"><login_layout/></div>
    </div>
</template>

<script>
import login_layout from "@/components/LoginLayout.vue";

export default {
    name: "Login",
    route: true,
    props: {
    },
    components: {
        login_layout,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login_button {
	margin: 30px;
}
#login_layout_frame {
    height: 200px;
    width: 400px;
    max-width: 100%;
    border-radius: 4px;
    background-color: powderblue;
}
#login_layout_frame > div {
    overflow: hidden;
    border-radius: 5px;
}

.center {
    margin: auto;
    width: 50%;
}
</style>

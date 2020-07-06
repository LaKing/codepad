export default {
    name: "history-component",
    template: `
<div class="children filetree">
	<div v-for="(p,i) in $store.getters.getHistory" :key="i">
        <div class="file button fileicon" @click="pad(p)"><i class="fa fa-file"></i> {{get_name(p)}}</div>
    </div>
</div>
`,
    data() {
        return {};
    },
    props: {
        path: String
    },
    methods: {
        get_name(path) {
            return path.split("/").pop();
        },
      	pad(path) {
          this.$store.commit("pad", path);
        }
    },
    computed: {

    }
};
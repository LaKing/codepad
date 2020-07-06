export default {
    name: "commits-component",
    template: `
<div class="children filetree">
	<div v-for="(p,i) in $store.getters.getCommits" :key="i">
        <div class="file button fileicon" @click="open_commit(p)"><i class="fa fa-file"></i> {{get_title(p)}}</div>
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
        get_title(p) {
            return p.message;
        },
      	open_commit(p) {
          window.open("/git/"  + p.oid + this.$store.state.pad);
        }
    },
    computed: {

    }
};
export default {
    name: "settings-component",
    template: `

<div id="settings" class="boxed">
    <div>
        <div class="boxed">
            <h3>Theme selector</h3>

            <select v-model="selected_theme">
                <option v-for="(p, i) in $store.state.settings.THEMES" :key="i" :value="p">{{p}}</option>
            </select>
            <button v-if="selected_theme" title="Apply theme" class="btn" @click="set_theme()" style=""><i class="fa fa-save"></i> Set {{selected_theme}} theme</button>
        </div>
        <br />
        <div class="boxed">
            <h3>Preferences</h3>
            <button title="Enable trash" class="btn" @click="enable_trash()" style=""><i class="fa fa-trash"></i> Enable trash: {{$store.state.trash}}</button>
        </div>
        <br />
        <div class="boxed">
            <h3>Codemirror search/replace keycodes</h3>
            <dl>
                <dt>Ctrl-F / Cmd-F</dt>
                <dd>Start searching</dd>
                <dt>Ctrl-G / Cmd-G</dt>
                <dd>Find next</dd>
                <dt>Shift-Ctrl-G / Shift-Cmd-G</dt>
                <dd>Find previous</dd>
                <dt>Shift-Ctrl-F / Cmd-Option-F</dt>
                <dd>Replace</dd>
                <dt>Shift-Ctrl-R / Shift-Cmd-Option-F</dt>
                <dd>Replace all</dd>
                <dt>Alt-F</dt>
                <dd>Persistent search (dialog doesn't autoclose, enter to find next, Shift-Enter to find previous)</dd>
                <dt>Alt-G</dt>
                <dd>Jump to line</dd>
            </dl>
        </div>
        <br />

        <h3>Codemirror configuration values</h3>
        <div v-for="(p,k, i) in $store.state.settings" :key="i">
            <p class="boxed" @click=""><i class="fa fa-check"></i> {{ display(k, p)}}</p>
        </div>
    </div>
</div>

`,
    data() {
        return {
            selected_theme: this.$store.state.settings.USER_THEME,
        };
    },
    props: {
        path: String,
    },
    methods: {
        display(key, param) {
            if (typeof param === "string") return key + ": " + param;
            if (typeof param === "number") return key + ": " + param;

            if (Object.prototype.toString.call(param) == "[object Array]") {
                return key + ": " + param.join(" ");
            }
        },
        set_theme() {
            this.$socket.client.emit("set_theme", this.selected_theme, function () {
                window.location.reload();
            });
        },
        enable_trash() {
        	this.$store.commit("enable_trash");	
        },
    },
    computed: {},
};

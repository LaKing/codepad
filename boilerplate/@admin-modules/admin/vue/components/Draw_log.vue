<template>
    <div class="draw_log">
        <div :aspect-ratio="16 / 9" height="40vw" class="log-cont scroll-cust pt-3 pb-6 pl-5 pr-5" :style="{ background: bgcolor }">
            <div v-html="log_html" class="text-left"></div>
        </div>
        <v-pagination v-model="page" :circle="true" :length="pag_length" :page="0" :total-visible="7" class="pt-4"></v-pagination>
    </div>
</template>

<script>
//import "@/admin-modiles/send_log.js";
export default {
    inheritAttrs: false,
    name: "draw_log",
    props: {
        bgcolor: {
            type: String,
            default: "#2d3950"
        },
        selectedcolor: {
            type: String,
            default: "#2d3950"
        }
    },
    data: function() {
        return {
            log_html: "",
            page: 1,
            pag_length: 1
        };
    },
    components: {},
    computed: {
        hasOffset() {
            return 1;
        },
      
    },
    created() {
        this.get_log_page();
    },

    sockets: {
        get_logs(data) {
            this.log = data;
            console.log("sockets get_logs", data);
        },
        // ez lefut elvileg minden fájl változásánál
        logs(data) {
            this.log = data;
            console.log("sockets logs");
        }
    },
    methods: {
        get_log_page() {
            //console.log("socket:", this.$socket.connected);

            this.$socket.client.emit("get_logs", this.page, data => {
                console.log("drawlog html", data);
                this.log_html = data.html ? data.html : "";
                this.pag_length = data.pages ? Math.ceil(data.pages) : 1;
                //this.page++;
            });
            console.log("get_log_page");
        }
    },
    watch: {
        page: function(newv, oldv) {
            this.get_log_page();
        }
    }
};
</script>

<style>
.log-cont {
    height: 40vw;
    overflow: auto;
    border-radius: 5px;
}
body::-webkit-scrollbar-track,
.scroll-cust::-webkit-scrollbar-track {
    background: green !important;
}
body::-webkit-scrollbar-thumb {
    background-color: yellow;
    border-radius: 6px;
    border: 3px solid orange;
}
  .draw_log{
   color: rgba(255,255,255,0.8);  
  }
</style>

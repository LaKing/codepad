<template>
    <div style="margin-left:20px;margin-right:20px;">
        <div v-if="element === 'Gain'" style="height:160px">
            <p style="margin-top:25px">{{ control }} is {{ current_value }}db</p>
            <v-btn @click="send('DEC')"><v-icon>volume_down</v-icon></v-btn>
            <v-progress-circular :rotate="90" :size="100" :width="15" :value="percent_value" :color="color_value"> {{ current_value }}db </v-progress-circular>
            <v-btn @click="send('INC')"><v-icon>volume_up</v-icon></v-btn>
        </div>
        <div v-if="element === 'Mute'" style="height:50px">
            <v-btn :color="color_value" block @click="send('TOGGLE')">{{ control }}</v-btn>
        </div>
        <div v-if="element === 'RMS Meter'" style="height:25px">
            <v-progress-linear height="23" v-model="percent_value" :color="color_value"></v-progress-linear> <span class="progress-bar-txt"> {{ control }} {{ current_value }}db </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Neutrino_ui_element",
    props: {
        device: String,
        control: String,
        element: String
    },
    data() {
        return {
            current_value: ß.NEUTRINO_CURRENT[this.device][this.control]
        };
    },
    methods: {
        send(cmd) {
          	let data = {
            	device: this.device,
                control: this.control,
                command: cmd
            };
          //Ł(this.$socket);
            this.$socket.client.emit("neutrino_ctl", data, function(response) {Ł(response);});
        }
    },
    computed: {
        percent_value: {
            get: function() {
                return this.current_value + 80;
            }
        },
        color_value: {
            get: function() {
                if (this.current_value > 0) return "red";
                else return "green";
            }
        },
        vu_meter_value: {
            get: function() {
                return this.current_value + 80;
            }
        }
    }
};
</script>

<style scoped>
.v-progress-linear {
    border-radius: 4px;
    margin: 0;
}

.progress-bar-txt {
    position: relative;
    font-size: 14px;
    top: -22px;
    left: 6px;
    z-index: 1;
    color: black;
}
</style>

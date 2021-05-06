<template>
    <v-container>
        <v-card v-if="$store.state.isConnected">
            <v-toolbar>
                <h2>{{ ctl }}</h2>
            </v-toolbar>
            <v-flex v-for="e in ui_ctl" :key="e.control"> <neutrino_ui_element :device="e.device" :control="e.control" :element="e.element" /> </v-flex>
        </v-card>
        <v-card v-if="!$store.state.isConnected"> <h2>DISCONNECTED</h2> </v-card>
    </v-container>
</template>

<script>
import neutrino_ui_element from "@/components/neutrino_ui_element.vue";

export default {
    name: "Neutrino",
    props: {
        // naming prefix we will consider
        ctl: String
    },
    components: {
        neutrino_ui_element
    },
    sockets: {
        neutrino_ctl_error(data) {
            if (data.control.startsWith(this.ctl)) alert(data.message);
        }
    },
    data() {
        let ctl = this.ctl;
        let ui_ctl = [];

        Object.keys(ß.NEUTRINO_PROJECT).forEach(function(device) {
            Object.keys(ß.NEUTRINO_PROJECT[device]).forEach(function(control) {
                if (control.startsWith(ctl)) {
                    // we need to add this,...
                    console.log("Neutrino", device, control, ctl);
                    ui_ctl.push({
                        device: device,
                        control: control,
                        element: ß.NEUTRINO_PROJECT[device][control]
                    });
                }
            });
        });
        return { ui_ctl: ui_ctl };
    },
    methods: {
        send(bool) {
            this.$socket.client.emit("answer", bool);
        }
    }
};

/*
  <template>
    <v-container>
        <v-card v-if="$store.state.isConnected">
            <v-toolbar>
            <h2>{{ ctl }}</h2>
            </v-toolbar>
            <v-list dark>
                <v-layout row wrap>
                    <v-flex xs12 sm6 md3 v-for="e in ui_ctl" :key="e.control"> <neutrino_ui_element :device="e.device" :control="e.control" :element="e.element" /> </v-flex>
                </v-layout> </v-list
        ></v-card>
        <v-card v-if="!$store.state.isConnected"> <h2>DISCONNECTED</h2> </v-card>
    </v-container>
</template>
  */
</script>

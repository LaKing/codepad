<template>
    <v-navigation-drawer v-model="open" fixed temporary right :dark="isdark" height="100vh" width="456px" overlay-opacity="0.3">
        <h4 class="white--text my-4 uppercase">Kosár tartalma</h4>
        <v-data-table :dark="isdark" :headers="headers" :items="$store.state.cart.items" hide-default-footer class="elevation-1">
            <template v-slot:item.count="{ item }">
                <div class="" style="white-space:nowrap">
                    <span class="mx-4">{{ item.count }}</span>
                </div>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="primary" x-small class="" fab @click="delete_item(item)">
                    <v-icon small>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </template>
            <template v-slot:item.count="{ item }">
                <div class="space-between" style="white-space:nowrap">
                    <v-btn color="primary" x-small class="" fab @click="increment(item)">
                        <v-icon small>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                    <span class="mx-4">{{ item.count }}</span>
                    <v-btn color="primary" x-small class="" fab @click="decrement(item)">
                        <v-icon small>
                            mdi-minus
                        </v-icon>
                    </v-btn>
                </div>
            </template>
            <template v-slot:item.huf="{ item }"> {{ item.huf }} Ft </template>
            <template v-slot:item.description_hu="{ item }"> {{ get_name(item) }} Ft </template>
        </v-data-table>
        <div class="mt-7">
            <v-btn color="primary" @click="to_cart()">##&en To cart ##&hu Tovább a kosárhoz ##</v-btn>
        </div>
        <div class="mt-7">
            <v-btn color="white" @click="to_shop()" outlined>##&en Back ##&hu Tovább vásárolás ##</v-btn>
        </div>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "navigation",
    props: {
        open_drawer: {
            default: false
        },
      isdark:{
          default:true
        }
    },
    data: function() {
        return {
            open: false,
            headers: [
                { text: "Név", align: "start", sortable: false, value: "description_hu" },
                { text: "Darabszám", value: "count" },
                { text: "Egységár", value: "huf" },
                { text: "Törlés", value: "actions", sortable: false }
            ]
        };
    },
    components: {},
    methods: {
        to_cart() {
            this.open = false;
            this.$root.$router.push("/cart");
        },
        to_shop() {
            this.open = false;
            this.$root.$router.push("/products");
        },
        delete_item: function(item) {
            this.$store.dispatch("cart/delete", item);
        },
        increment: function(item) {
            this.$store.dispatch("cart/increment", item);
        },
        decrement: function(item) {
            this.$store.dispatch("cart/decrement", item);
        },
        get_name(item) {
            let n = item["description_##&en en ##&hu hu ##"];
            if (item.custom_logo) n += " - ##&en log ##&hu saját logó ##";
            return n;
        }
    },
    watch: {
        open: function(newv, oldv) {
            this.$emit("update_drawer", this.open);
        },
      	open_drawer: function(newv, oldv) {
            this.open = this.open_drawer; 
        }
    }
};
</script>
<style>
.v-data-table__mobile-row,
.v-data-table__mobile-row > div {
    height: auto !important;
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>

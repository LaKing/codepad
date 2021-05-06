<template>
    <v-data-table
        :headers="headers"
        :items="users"
        sort-by="email"
        class="elevation-1 transition-fast-in-fast-out admintable"
        :search="search"
        :single-expand="true"
        :expanded.sync="expanded"
        show-expand
        item-key="_id"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New user</v-btn>
                    </template>
                    <v-card dark>
                        <v-card-title>
                            {{ formTitle }}
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form ref="form_ref" v-model="form_valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="6" sm="6" v-if="editedIndex > -1">
                                            <v-text-field v-model="editedItem.local.email" label="Email" type="email" :rules="emailRules"></v-text-field>
                                        </v-col>

                                        <v-col cols="6" sm="6" v-if="editedIndex > -1">
                                            <v-switch v-model="editedItem.local.verified" class="ma-2" label="Verified"></v-switch>
                                        </v-col>
                                    </v-row>
                                    <v-row v-if="editedIndex === -1">
                                        <v-col cols="6" sm="6">
                                            <v-text-field v-model="new_user.email" label="Email" type="email" :rules="emailRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" sm="6">
                                            <v-text-field v-model="new_user.password" label="Password" type="password"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.local.verified="{ item }">
            <div v-if="typeof item.local.verified === 'boolean'">
                <v-icon color="success" v-if="item.local.verified">fa-check</v-icon>
                <v-icon color="warning" v-if="!item.local.verified">fa-times</v-icon>
            </div>
        </template>
        <template v-slot:item.loggedwith="{ item }">
            <!--  <v-icon color="success" v-if="loggedwith(item) === 'facebook'">fa-facebook</v-icon>
				<v-icon color="warning" v-if="!loggedwith(item) !== 'google' && loggedwith(item) !== 'facebook'">fa-envelope</v-icon>
                <v-icon color="warning" v-if="loggedwith(item) === 'google'">fa-google</v-icon>-->
            <v-icon color="#5d7ebf" v-if="item.facebook" class="mx-1">fab fa-facebook</v-icon>
            <v-icon color="#d04d43" v-if="item.google" class="mx-1">fab fa-google</v-icon>
            <v-icon color="#b1b1b1" v-if="item.hasOwnProperty('local') && item.local.email" class="mx-1">fa-envelope</v-icon>
        </template>
        <template v-slot:item.local.email="{ item }">
            <div v-if="item.hasOwnProperty('local') && typeof item.local.email !== 'undefined'">
                {{ item.local.email || "" }}
            </div>
            <div v-else>
                <span v-if="item.hasOwnProperty('profile') && typeof item.profile.email !== 'undefined'"> {{ item.profile.email || "" }}</span>
                <span v-else
                    ><span v-if="item.hasOwnProperty('facebook') && typeof item.facebook.email !== 'undefined'"> {{ item.facebook.email || "" }}</span></span
                >
            </div>
        </template>
        <template v-slot:item.profile.name="{ item }">
            <div v-if="item.hasOwnProperty('profile') && typeof item.profile.name !== 'undefined'">
                {{ item.profile.name || "" }}
            </div>
            <div v-else>
                <span v-if="item.hasOwnProperty('facebook') && typeof item.facebook.name !== 'undefined'"> {{ item.facebook.name || "" }}</span>
                <span v-else
                    ><span v-if="item.hasOwnProperty('local') && typeof item.local.name !== 'undefined'"> {{ item.local.name || "" }}</span></span
                >
            </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <template>
                    <v-treeview :items="getArray(item)" class="mt-3 mb-4 text-left" open-on-click>
                        <template v-slot:label="{ item, open }">
                            <v-text-field
                                v-model="item.value"
                                :label="item.name"
                                type="text"
                                v-if="!item.children && typeof item.value !== 'boolean'"
                                :disabled="item.name === '_id'"
                            ></v-text-field>
                            <v-switch
                                v-model="item.value"
                                class="ma-2"
                                :label="item.name"
                                v-if="!item.children && typeof item.value === 'boolean'"
                                hide-details
                                color="primary"
                                style="margin-left:0 !important"
                            ></v-switch>
                            <span v-if="item.children" class="">
                                <v-chip class="ma-2" :color="Array.isArray(item.value) ? '#268186' : 'primary'" label text-color="white" v-if="item.name">
                                    {{ item.name }}
                                </v-chip>
                                <v-chip class="ma-2" color="#268186" label text-color="white" v-else>
                                    <i class="fas fa-compact-disc"></i>
                                </v-chip>
                            </span>
                        </template>
                    </v-treeview>
                </template>
                <v-btn @click="save_item" class="mb-5" color="#2779a9">save</v-btn>
            </td>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon small @click="deleteItem(item)">
                delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="">Reset</v-btn>
        </template>
        <v-alert type="success" v-model="showalert">
            {{ alerttext }}
        </v-alert>
    </v-data-table>
</template>

<script>
// import userjson from "@/mint_user.json";
export default {
    data: () => ({
        dialog: false,
        name: "draw_users",
        headers: [
            {
                text: "Email",
                align: "left",
                sortable: false,
                value: "local.email"
            },
            { text: "Name", value: "profile.name" },
            { text: "Id", value: "_id" },
            { text: "Logged in with", value: "loggedwith" },
            { text: "Verified", value: "local.verified" },
            { text: "change", value: "action", sortable: false, align: "right" },
            { text: "", value: "data-table-expand" }
        ],
        editedIndex: -1,
        editedItem: {
            name: "",
            verified: false,
            email: ""
        },
        defaultItem: {
            name: "",
            verified: false,
            email: ""
        },
        users: [],
        re: ß.getRegexEmail(),
      form_valid:false,
        emailRules: [v => !!v || "Required", v => (v && ß.getRegexEmail().test(v)) || "Invalid email"],
        search: "",
        new_user: { email: "", password: "" },
        expanded: [],
        showalert: false,
        alerttext: ""

        //	user_json:userjson
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New user" : "Edit user";
        },
        convert_users() {
            return this.users.map(m => {
                return { _id: m._id, list: this.prepareNode(m) };
            });
        }
    },

    watch: {
        dialog(val) {
            if (!val) this.close();
        }
    },

    created() {
        this.$socket.client.emit("get-users", {});
    },
    sockets: {
        users(u) {
           // console.log("users", Object.assign({}, u));
            /*	u.forEach(f=>{
              if(!f.hasOwnProperty('mixer_locations')){
                	console.log("no mixer object",f);
                  	f.mixer_locations= Object.assign({}, this.default_locations);
                }
              //if it added later
              for(let n in this.default_locations){
               	if(!f.mixer_locations.hasOwnProperty(n)){
                 	 f.mixer_locations[n] = false;
                }
              }
            });*/
            this.users = u;
        },
        alert(type, str) {
            console.log("alert");
            this.showalert = true;
            this.alerttext = str;
        }
    },

    methods: {
        /* editItem(item) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);

            this.dialog = true;
        },
*/
        deleteItem(item) {
            const index = this.users.indexOf(item);
            if (confirm("Are you sure you want to delete this item?")) {
                this.$socket.client.emit("admin-delete-user", item._id, function(data) {
                   // console.log("user deleted", data);
                });
            }
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            if (this.$refs.form_ref.validate()) {
                if (this.editedIndex === -1) {
                    this.$socket.client.emit("add_user", { email: this.new_user.email, password: this.new_user.password }, function(data) {
                       // console.log("new user", data);
                    });
                    //this.users.push(this.editedItem);
                }
                this.close();
            }
        },
        getArray(item) {
            console.log("getarray", item);
            //return this.prepareNodes.filter(f=> f._id === item._id);
            console.log("item", this.prepareNode(item));
            let n = this.convert_users.filter(m => m._id === item._id);
            if (n.length > 0) n = n[0];
            return n.list || [];
            //return this.prepareNode(item);
        },

        prepareNode(item) {
            let arr = [],
                obj = {},
                id = "",
                prop_i = 0;

            if (typeof item === "object") {
                id = item._id || "";
                if (!Array.isArray(item)) {
                    for (let n in item) {
                        //obj = {};
                        obj = {};
                        obj.name = n;
                        obj.value = item[n];
                        obj.id = id + "_" + prop_i;
                        obj._id = id;
                        obj.prop_deep = prop_i;
                        prop_i++;
                        if (typeof item[n] === "object") {
                            if (Object.prototype.toString.call(item[n]) !== "[object Date]") {
                                if (Array.isArray(item[n])) {
                                    obj.children = this.prepareNode(item[n]);
                                } else {
                                    if (item.hasOwnProperty("_id")) {
                                        item[n]._id = item._id;
                                    }
                                    obj.children = this.prepareNode(item[n]);
                                }
                            } else {
                                obj.value = item[n].toString();
                            }
                        }
                        arr.push(obj);
                    }
                } else {
                    item.forEach(f => {
                        arr.push({ children: this.prepareNode(f) });
                    });
                }
            }
            return arr;
        },
        loggedwith(item) {
            //ß.USE_PASSPORT_FACEBOOK
        },

        orig_v(convert_obj, orig_obj) {
            convert_obj.forEach(f => {
                if (f.hasOwnProperty("name")) {
                    convert_obj[f.name] = f.value;
                    orig_obj[f.name] = f.value;
                }
                if (f.hasOwnProperty("children")) {
                    this.orig_v(f.children, convert_obj[f.name]);
                }
            });
        },
        save_item() {
            if (this.expanded.length > 0) {
                const orig_obj = this.expanded[0];
                let convert_obj = this.convert_users.filter(f => {
                    return f._id === orig_obj._id;
                });
                if (convert_obj.length > 0 && convert_obj[0].hasOwnProperty("list")) {
                    convert_obj = convert_obj[0].list;

                    let curr_obj = orig_obj;
                    this.orig_v(convert_obj, orig_obj);
                    console.log("changed object", orig_obj);
                    this.$socket.client.emit("admin-save-user", orig_obj, function(data) {
                        //console.log("user saved", data);
                    });
                }
            }
        }
    }
};
</script>
<style>
.admintable.v-data-table tbody tr.v-data-table__expanded__content {
    background: #2d3950;
}
.admintable.v-data-table tbody tr.v-data-table__expanded__content .v-treeview {
}
  
  /* Change autocomplete styles in WebKit */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: transparent;
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px #34415a inset;
    transition: background-color 5000s ease-in-out 0s;
}
</style>

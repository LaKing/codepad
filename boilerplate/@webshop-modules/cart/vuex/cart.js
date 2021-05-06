import Vue from "vue";

// initial state
const state = {
    items: [],
    shipping_type: {}
};

// getters
const getters = {
    items: function(state) {
      	if (state.items) return state.items.length;
      	return 0;
    },
    count: function(state) {
        var n = 0;
      	if (state.items)
        for (let i in state.items) {
            n += state.items[i].count;
        }
        return n;
    }
};

// actions
const actions = {
    save: function(context) {
        //context.dispatch("server/save_session_data", { cart: state.items, shipping_type: state.shipping_type }, { root: true });
        // simplification
        context.dispatch("server/save_session_data", { cart: state }, { root: true });
    },
    load: function(context) {
        context.commit("set", context.rootState.server.session.data.cart);
    },
    add: function(context, item) {
        context.commit("add", item);
        context.dispatch("save");
    },
    increment: function(context, item) {
        context.commit("increment", item);
        context.dispatch("save");
    },
    decrement: function(context, item) {
        context.commit("decrement", item);
        context.dispatch("save");
    },
    delete: function(context, item) {
        context.commit("delete", item);
        context.dispatch("save");
    },
    clear: function(context, item) {
        context.commit("clear");
        context.dispatch("save");
    },
    change_shipping: function(context, shipping_obj) {
        context.commit("change_shipping", shipping_obj);
        context.dispatch("save");
    }
};

// mutations
const mutations = {
    add: function(state, item) {
        var items = Array.from(state.items);

        if (item.product_code === "GIFT_CARD") {
            //state.items = state.items.filter(f => f.product_code !== "GIFT_CARD");
            items.push(item);
            state.items = items;
            return;
        }

        // check if we have this product already in the cart
        for (let i = 0; i < items.length; i++) {
            if (items[i].product_code === item.product_code && (typeof items[i] === "undefined" || items[i].selected_subtype === item.selected_subtype)) {
                // found one, so just increment it
                if (item.count > 1) {
                    items[i].count += item.count;
                } else {
                    items[i].count++;
                }
                state.items = items;
                return;
            }
        }
        items.push(item);
        state.items = items;
    },
    increment: function(state, item) {
        var items = Array.from(state.items);
        items.forEach(f => {
            if (f.product_code === item.product_code && item.selected_subtype === f.selected_subtype) f.count++;
        });
        state.items = items;
    },
    decrement: function(state, item) {
        var items = Array.from(state.items);
        items.forEach(f => {
            if (f.product_code === item.product_code && f.count > 1 && item.selected_subtype === f.selected_subtype) f.count--;
        });
        state.items = items;
    },
    set: function(state, payload) {
        if (!payload) return;
        if (payload.items) state.items = payload.items;
        if (payload.shipping_type) state.shipping_type = payload.shipping_type;
    },
    delete: function(state, item) {
        //state.items = state.items.filter(f => f.product_code !== item.product_code && f.subcategory!==item.subcategory);
        state.items = state.items.filter(f => {
            return f.product_code === item.product_code && f.selected_subtype === item.selected_subtype ? false : true;
        });
    },
    clear: function(state) {
        state.items = [];
        state.shipping_type = {};
    },
    change_shipping: function(state, shipping_obj) {
        state.shipping_type = shipping_obj;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

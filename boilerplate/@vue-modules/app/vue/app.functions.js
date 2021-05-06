//Global functions attached to the vue instance.
//in template: $app.uri() ,...
//in vue script: this.$app.uri() ,...
export default {
    uri: function(u) {
        if (!u) return "";
        return "https://" + ß.HOSTNAME + "/" + u;
    },
    url: "https://" + ß.HOSTNAME + "/",
    lang: "##&en en ##&hu hu ##",
};

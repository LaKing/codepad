if (!ß.connect_histry_api_fallback_options) ß.connect_histry_api_fallback_options = {};
if (!ß.connect_histry_api_fallback_options.rewrites) ß.connect_histry_api_fallback_options.rewrites = [];

ß.connect_histry_api_fallback_options.rewrites.push({
    from: /\/api($|\/)/,
    to: function(context) {
        return context.parsedUrl.pathname;
    }
});

// new method

/*
prepare parameters with ß.lib.szamlazz.prepare() ...
*/

module.exports = function(prepared_parameters, callback) {
  
    const client = new ß.szamlazz.Client(ß.szamlazz_config.client);

    client.issueInvoice(prepared_parameters, (err, result) => {
        if (err) return đ(err);

        ß.msg("Created invoice " + result.invoiceId);
		if (callback) callback(err, result);
        ß.run_hook("invoice", result);
    });
};

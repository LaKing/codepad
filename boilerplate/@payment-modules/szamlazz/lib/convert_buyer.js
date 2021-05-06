module.exports = function convert_buyer(parameters) {
  	
  	// source
  	var s = {};
  
    var r = {
        name: "Ismeretlen Név",
        country: "Magyarország",
        zip: "0000",
        city: "Budapest",
        address: "Ismeretlen cím.",
        issuerName: "",
        identifier: 1,
        phone: "",
        comment: ""
    };

    if (s.billing) {
        if (s.billing.name) r.name = s.billing.name;
        if (s.billing.zip) r.zip = s.billing.zip;
        if (s.billing.city) r.city = s.billing.city;
        if (s.billing.address) r.address = s.billing.address;
        if (s.billing.taxNumber) r.taxNumber = s.billing.taxNumber;
        if (s.billing.phone) r.phone = s.billing.phone;
    }

    return r;
};
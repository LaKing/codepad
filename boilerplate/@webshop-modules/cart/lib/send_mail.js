const header_txt = `<h3>BARBARA LEBER - MEGRENDELÉS!</h3>
			<p>Köszönjük, hogy BARBARA LEBER terméket rendelt.</p>
<p>Az alábbi módokon juthat el Önhöz a termék</p>
<p>- Személyes átvétel esetén, a megrendeléstől számított  ötödik (5.) munkanapon tudja átvenni, érintésmentesen a megrendelését, az ÁTVÉTELI PONTON.  Ez az utcai üzlethelységünk kb. 100 méterre van a BARBARA LEBER  SHOWROOM-tól, a MOM Park irányában
 (1123 Bp., Alkotás u. 47. Közvetlenül a Budai Rajziskola MELLETT). Minden munkanapon 13-15 óráig tartunk nyitva. Szombaton zárva vagyunk.<br>
- Házhozszállítás esetén, szintén a megrendeléstől  számított ötödik (5.) munkanapon adjuk át a futárnak a megrendelt terméket. Péntek 18 óráig beérkezett rendeléseket szerdán tudjuk átadni, de a hétvégi megrendelések már hétfőinek számítanak, így azok átvételére csütörtökön kerülhet sor. A ruhák, pólók, trikók megrendelése estén 5 munkanap leteltével tudjuk átadni a termékéket.</p>
<P>Köszönjük megértésüket.</P>`;

function get_name(item) {
    let n = item.description_hu;
    if (item.custom_logo) n += " - saját logó";
    return n;
}

module.exports = function(parameters) {
    const invoice = parameters.invoice;
    const cart = parameters.data.cart;
    const shipping_type = parameters.data.cart.shipping_type || {};

    const billing = parameters.session.user_profile.billing;
    const shipping = parameters.session.user_profile.shipping;
    let payment_method = "Banki átutalás";

    if (parameters.paypal) payment_method = "paypal " + ł(parameters, "paypal.order.id") || "";
    if (parameters.simplepay) payment_method = "Simplepay " + ł(parameters, "simplepay.transactionId") || "";

    const sum = ß.getCartSum(cart);

    let cart_str = `<table style="width:100%" class="custom-table">
          <tr style="text-align:left; background: #e8e2d6;border-radius: 5px 5px 0 0;">
            <th style="text-align:left">Termék</th>
            <th style="text-align:left">Tipus</th>
            <th >Mennyiség</th>
    <th>Ár</th>
    <th>Részösszeg</th>
          </tr>`;

    cart.items.forEach(f => {
        cart_str += `<tr>
                        <td style="">${get_name(f)}</td>
                        <td style="">${f.selected_subtype || ""}</td>
                        <td style="">${f.count}</td>
                        <td style="text-align:right">${f.huf} Ft</td>
                        <td style="text-align:right">${f.count * parseInt(f.huf)} Ft</td>
                    </tr>`;
    });

    cart_str += `<tr><td style="text-align:right" colspan="4">Kézbesítés ${shipping_type.name}</td><td style="text-align:right">${shipping_type.huf} Ft</td></tr>`;
    cart_str += `<tr><td style="text-align:right" colspan="4"><b>Összesen (bruttó)</b></td><td style="text-align:right"><b>${sum} Ft</b></td></tr>`;
    cart_str += `</table><br>`;

    let billing_shipping_str = `<table style="width:100%" class="custom-table">
            <tr style="text-align:left; background: #e8e2d6;border-radius: 5px 5px 0 0;">
            <th style="text-align:left">Számlázási adatok</th>
            <th style="text-align:left">Szállítási adatok</th>
            
          </tr>
          <tr>
            <td style="padding: 10px 15px;line-height:1.5">${billing.name}<br>
                ${billing.phone}<br>
                ${billing.country}<br>
                ${billing.city}<br>
                ${billing.zip}<br>
                ${billing.address}<br>
                ${billing.email}<br>
            </td>
            <td style="padding: 10px 15px;line-height:1.5">${shipping.name}<br>
                ${shipping.country}<br>
                ${shipping.city}<br>
                ${shipping.zip}<br>
                ${shipping.address}<br>
            </td>
            
          </tr>
		</table><br>`;
	let comment_str = `<table style="width:100%" class="custom-table">
            <tr style="text-align:left; background: #e8e2d6;border-radius: 5px 5px 0 0;">
            <th style="text-align:left">Számlázási adatok</th>
            
          </tr>
          <tr>
            <td style="padding: 10px;line-height:1.5">
				${shipping.comment}<br>
            </td>
          </tr>
		</table><br>`;
    let html_str = `<html><head><style>${style}</style></head><body>`;
  
    html_str += `<div style="max-width:1100px;margin:auto">
				${header_txt}
            <div>
            Számla sorszáma: <b>${invoice.invoiceId}</b><br>
            Rendelés dátuma: <b>${ß.now()}</b><br>
            Fizetés módja: <b>${payment_method}</b><br>
            </div>
            <br>`;

    html_str += billing_shipping_str;
    html_str += cart_str;
  	if(typeof shipping.comment === 'string' && shipping.comment.length>0){
     	html_str += comment_str; 
    }
    html_str += `<div style="text-align:center;margin-top:20px"><img style="max-width:500px; width:100%" src="https://${ß.HOSTNAME}/public-logo.jpg"/></div>`;
    html_str += `</div></body></html>`;

    var to = "design.barbaraleber@gmail.com," + billing.email;
    if (ß.MODE === "development" || ß.DEBUG) {
        to = "boho.andrea@gmail.com";
        ß.ntc("Az email ide megy: " + to);
    }
    var message = {
        from: "BARBARA LEBER <web@" + ß.HOSTNAME + ">",
        to: to,
        subject: "RENDELÉS BARBARA LEBER LIFESTYLE",
        text: "Köszönjük rendelését. A részletek az üzenet HTML tartalmában, számla a csatolmányban.",
        html: html_str,
        attachments: [
            {
                filename: "BARBARA LEBER " + invoice.invoiceId + ".pdf",
                content: invoice.pdf
            }
        ]
    };
    let logo = cart.items.map(f => f.custom_logo);

    ß.transporter.sendMail(message, function(err, info) {
        if (err) return đ(err);
        ß.msg(billing.email + " " + info.response);
    });
};

// Static CSS

const style = `table{
                border-radius: 5px;
                border: 1px solid rgba(0, 0, 0, 0.12);
                border-spacing: 0;
            }
            .custom-table thead tr:last-child th {
                border-bottom: 1px solid rgba(0,0,0,.12);
            }
            .custom-table thead tr:last-child th {
                border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            }
            .custom-table thead tr th {
                color: rgba(0,0,0,.54);
            }
            .custom-table thead tr th {
                color: rgba(0, 0, 0, 0.54);
            }
            .v-application--is-ltr .custom-table th {
                text-align: left;
            }
            .v-application--is-ltr .custom-table th {
                text-align: left;
            }
            .v-application .text-start {
                text-align: start!important;
            }
            .v-application .text-start {
                text-align: start !important;
            }
            .custom-table td, .custom-table th {
                padding: 0 16px;
            }
            .custom-table th {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                font-size: 12px;
                height: 48px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.12);
                border-bottom: 3px solid rgb(210, 150, 46);
            }
            .custom-table td, .custom-table th {
                padding: 0 16px;
            }
            .custom-table tbody tr:not(:last-child) td:last-child {
                border-bottom: 1px solid rgba(0,0,0,.12);
            }

            .custom-table tbody tr:not(:last-child) td:not(.custom-table__mobile-row) {
                border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            }
            .custom-table td {
                font-size: 14px;
                height: 48px;
            }
            .custom-table td, .custom-table th {
                padding: 0 16px;
            }
         
            body{
                font-family: "Avenir", Helvetica, Arial, sans-serif;
            }h3{
                text-transform: uppercase;
                color: darkgoldenrod;
                font-size: 16px;
            }
.im{
color: black !important;
}
`;

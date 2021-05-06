(function() {

    //##&-- http://upgrade-bootstrap.bootply.com/ Convert bootstrap3 to bootstrap4. ... Use font awesome icons in json files. ##

    var app = angular.module('app');
    app.directive('smartForm', function() {
        return {
            scope: {
                formDefs: '=definition',
                formResp: '=response',
                formEdit: '=?edited',
                formSave: '=?onsave',
                formSaveTitle: '=?savetitle',
                formUpload: '=?onupload'
            },
            templateUrl: "smartforms.html",
            link: function(scope, element, attr) {

                scope.status = {};
                scope.formCheck = true;
                scope.upload = function(file, part, field) {

                    if (!file) return;
                    if (!scope.formResp[part]) scope.formResp[part] = {};
                    if (!scope.status[part]) scope.status[part] = {};
                    scope.status[part][field] = 0;
                    scope.$apply();

                    var ssocket = io.connect();
                    console.log('upload-' + part + '-' + field);

                    var stream = ss.createStream();
                    ss(ssocket).emit('upload-' + part + '-' + field, stream, {
                        size: file.size
                    });

                    var blobStream = ss.createBlobReadStream(file);
                    var size = 0;
                    var progress = 0;
                    var last = 0;
                    blobStream.on('data', function(chunk) {
                        size += chunk.length;
                        progress = Number(Math.floor(size / file.size * 100));
                        if (progress !== last) {
                            scope.status[part][field] = progress;
                            console.log(progress);
                            last = progress;
                            scope.$apply();
                        }
                        if (size === file.size) {
                            console.log("ready", part, field);
                            scope.formResp[part][field] = file.name;
                            ssocket.disconnect();

                            scope.status[part][field] = undefined;
                            scope.$apply();
                            scope.formCheck = true;
                        }
                    });
                    blobStream.pipe(stream);
                };

                scope.formEdit = false;
                scope.edited = function(arg) {
                    scope.formEdit = true;
                    scope.formCheck = arg;
                };

                scope.empty = function(arg) {
                    if (arg === undefined) return true;
                    if (arg === '') return true;
                    return false;
                };

                scope.fails = function(obj, forms) {
                    if (!scope.formCheck) return '##&en Please wait ##&hu Kérem várjon ##';
                    // obj is resultobject
                    // forms are definitions    
                    var res = '';
                    if (obj)
                        Object.keys(obj).forEach(function(part) {
                            if (forms[part])
                                if (res === '')
                                    for (var i = 0; i < forms[part].definitions.length; i++) {
                                        var e = forms[part].definitions[i];
                                        var fail = scope.fail(obj[part], e);

                                        if (res === '' && fail !== '') res = fail;
                                    }

                        });

                    return res;
                };

                // ##&-- itt kapjuk vissza az adot f form-elem-re nézett elemzést, azaz az adott o objektum mezőire végrehajtott ellenőrzés hibaüzenetét ##
                scope.fail = function(o, f) {
                    if (!scope.formCheck) return '';
                    // o is formresponse object with keys
                    // f is formdef field
                    if (!o) return '';
                    //if (!f) return 'no-f';
                    //if (f.input === undefined) return "";

                    var re;

                    if (f.check === undefined) return '';

                    // t is the string to be checked
                    var t = o[f.field];

                    // amikor nincs mi kitöltve
                    if (t === undefined && f.value !== undefined) return '';
                    if (t === undefined && f.oblig === false) return '';

                    if (t === '' && f.value !== undefined) return '';
                    if (t === '' && f.oblig === false) return '';

                    if (t === undefined && f.oblig === true && f.files === true) return f.label + ' ##&en has to be uploaded ##&hu feltöltése szükséges. ##';
                    if (t === undefined && f.oblig === true && f.input === true) return f.label + ' ##&en has to be entered ##&hu magadása szükséges. ##';



                    // ha filefeltöltés, és van rá check, akkor akkor fogadjuk el ha a check az érték amire vágyunk
                    if (f.input === false && f.oblig === true && t !== f.check) return f.label + ' ##&en is invalid ##&hu nem elfogadott. ##';

                    // kötelező mezők hossza minimum 2 karakter
                    if (t.length < 2 && f.oblig === true) return f.label + ' ##&en is too short ##&hu túl rövid. ##';
                    
                    if (f.check === 'password') {
                        if (t.length < 3 ) return f.label + ' ##&en is too short ##&hu túl rövid. ##';
                        return '';
                    }

                    if (f.check !== 'email') {
                        // Kukac elvileg csak email címben lehet
                        if (t.indexOf('@') > -1) return f.label + ' ##&en has the at charcater falsely ##&hu kukacot tartalmaz. ##';
                    }

                    if (f.check === 'email') {
                        
                      // this is for developers, delete in production
                        if (t === 'admin' || t === 'x') return '';
                                                
                        re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!re.test(t)) return '##&en Not a valid email address ##&hu Nem érvényes email cím. ##';
                    }

                    if (f.check === 'phone') {
                        re = /^([\( \+]?36|06|0036[\) ]?)?[\-\(\. ]?((1|[2-9]0)[\-\)\. ]?([\-\. ]?[0-9]){7}|([\-\(\. ]?[2-9][1-9][\-\)\. ]?)([\-\. ]?[0-9]){6})$/;
                        if (!re.test(t)) return '##&en Not a valid phone number ##&hu Nem érvényes telefonszám. ##';
                    }


                    if (f.check === 'datum') {
                        // 1920 után, 2009 -ig
                        re = /^(19[2-9][0-9]|200[0-9])[\-\.]([1-9]|0[1-9]|10|11|12|)[\-\.]([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-2])$/;
                        if (!re.test(t)) return '##&en Please use a YYYY-MM-DD notation##&hu A dátumot ÉÉÉÉ-HH-NN formátumban kérnénk. ##';
                    }

                    if (f.check === 'zip') {
                        if (t.length < 4) return '##&en Too short zip code ##&hu Túl rövid irányítószám. ##';
                        re = /^(10[0-9][0-9]|11[0-9][0-9]|12[0-9][0-9]|[2-9][0-9]{3})$/;
                        if (!re.test(t)) return '##&en Not a valid ZIP code ##&hu Nem érvényes irányítószám. ##';
                    }

                    if (f.check === 'szig') {
                        if (t.length < 6) return '##&en Wrong format ##&hu Nem megfelelő formátum. ##';
                    }


                    if (f.check === 'adoszam') {
                        if (t.length < 4) return '##&en Too short ##&hu Túl rövid adószám. ##';
                        re = /^([0-9]{8}[\- ]?[1-5][\- ]?[0-5][0-9])$/;
                        if (!re.test(t)) return '##&en Invalid format. ##&hu Nem érvényes adószám formátum. ## xxxxxxxx-y-zz';
                    }

                    if (f.check === 'bankszamlaszam') {
                        if (t.length < 4) return '##&en Too short ##&hu Túl rövid bankszámlaszám. ##';
                        re = /^([0-9]{8}[ \-][0-9]{8}|[0-9]{8}[ \-][0-9]{8}[ \-][0-9]{8})$/;
                        if (!re.test(t)) return '##&en Invalid format. ##&hu Nem érvényes bankszámlaszám. ## xxxxxxxx-yyyyyyyy';
                    }

                    if (f.check === 'cegjegyzekszam') {
                        if (t.length < 4) return '##&en Too short ##&hu Túl rövid cégjegyzékszám. ##';
                        re = /^(20|[0-1][0-9])[\- ](20|21|22|23|[0-1][0-9])[\- ]([0-9]{8})$/;
                        if (!re.test(t)) return '##&en Invalid format ##&hu Nem érvényes cegjegyzekszám ## xx-yy-zzzzzzzzzz.';
                    }



                    return '';
                };
            }

        };
    });

})();

//<div ng-controller="profile">
//    <div smart-form definition="forms" response="responsedata" onsave="onsaveform"></div>
//</div>

/* ##&--
   
    field
    title
    label
    check
    glyph / signo
    uedit
    
    input
    oblig
    multi
    mongo
    
    files
    
    
## */

/*ßoilerplate */

ß.userSchema.methods.updateLocal = function(email, password) {
    
    //Ł(email, password);
    
    var mail_modified = false;
    var modified = false;
    var id = this._id;
    
    if (email)
    if (this.local.email !== email) {
        this.local.verified = false;
        this.local.email = email;
        //this.markModified("local");
        mail_modified = true;
        modified = true;
        console.log("local password update", id);
    }
    


    if (password) {
        modified = true;
        this.local.password = ß.bcrypt.hashSync(password, ß.bcrypt.genSaltSync(8), null);
        console.log("local password update", email, id);
    }


    if (modified) {

        this.markModified("local");
        this.save(function(err) {
            if (err) console.log(err);
            if (mail_modified) ß.lib.passport_hash.send(id);
            
            //Ł(this.local);

        });
    }
    
    return modified;
};

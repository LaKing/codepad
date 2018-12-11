// the stamper

module.exports = function(realpath) {
    // timestamp write operations
    ß.file_write_operation_inprogress[realpath] = process.hrtime()[0];
    //Ł(realpath, ß.file_write_operation_inprogress[realpath]);
};

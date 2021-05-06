var static_files = ß.BACKGROUND_PATH || ß.get_module_path("background") + "/static";

let has = false;

if (!ß.BACKGROUND_VIDEO_FILES) {
    ß.BACKGROUND_VIDEO_FILES = "";
    ß.fs.traverse_path_process_files(static_files, function(f) {
        // process only mp4 files
        let ext = ß.path.extname(f);
        if (ext !== ".mp4") return;

        // create string to pass to the frontend
        if (has) ß.BACKGROUND_VIDEO_FILES += "|";
        ß.BACKGROUND_VIDEO_FILES += f;
        has = true;
    });
}

if (!ß.BACKGROUND_IMAGE_FILES) {
    has = false;
    ß.BACKGROUND_IMAGE_FILES = "";
    ß.fs.traverse_path_process_files(static_files, function(f) {
        // process only mp4 files
        let ext = ß.path.extname(f);
        if (ext !== ".png" && ext !== ".jpg") return;

        // create string to pass to the frontend
        if (has) ß.BACKGROUND_IMAGE_FILES += "|";
        ß.BACKGROUND_IMAGE_FILES += f;
        has = true;
    });
}

if (ß.BACKGROUND_VIDEO_FILES.length < 5) ß.error("Check your background video files " + static_files);
if (ß.BACKGROUND_IMAGE_FILES.length < 5) ß.error("Check your background image files " + static_files);
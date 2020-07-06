// boilerplate

if (!ß.GITDIR) ß.GITDIR = ß.path.join(ß.PROJECTDIR, ".git");
return;

const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

async function init() {
    await ß.git.init({ fs, dir, bare: false }, đ);
    console.log(" - git init");

    /*    await git.add({ fs, dir });

    let sha = await git.commit({
        fs,
        dir,
        author: {
            name: "Codepad",
            email: "codepad@" + ß.HOSTNAME
        },
        message: "init"
    });
    console.log(sha);*/
}

async function add() {
    const repo = { fs, dir };
  
// encountered a bug here :( 
// https://github.com/isomorphic-git/isomorphic-git/issues/1139
  
await git.statusMatrix(repo).then((status) =>
Ł, đ
);
  
    console.log(" - git add -A .");
}

async function test(n) {
    //  await ß.git.init({ fs, dir: ß.CWD, bare: false }, đ);
    /*
    await ß.git.add({ fs: ß.fs, dir: ß.GITDIR, filepath: "." }, đ);

    let sha = await ß.git.commit({
        fs: ß.fs,
        dir: ß.CWD,
        author: {
            name: "Mr. Test",
            email: "mrtest@example.com"
        },
        message: "Added the aaa files"
    });

    Ł(sha);

    // All the files in the previous commit
    let files = await git.listFiles({ fs: ß.fs, dir: ß.GITDIR }, đ);
    console.log(files);
    // All the files in the current staging area
    files = await git.listFiles({ fs: ß.fs, dir: ß.GITDIR }, đ);
    console.log(files);

    let commits = await git.log({ fs, dir, depth: 1 });
    console.log(commits[0]);

    files = await git.listFiles({ fs, dir });
    console.log(files);
*/

    let commits = await git.log({ fs, dir });
    Ł(commits.length);

    //let commitOid = await git.resolveRef({ fs, dir, ref: "master", depth: 1  });
    //console.log(commitOid);

    let { blob } = await git.readBlob({
        fs,
        dir,
        oid: commits[n].oid,
        filepath: "version"
    });
    Ł(Buffer.from(blob).toString("utf8"));
}

if (!ß.fs.existsSync(ß.GITDIR)) init();
add();

//test(0);
//test(1);
//test(10);

console.log("______________________ Complete ___________________");

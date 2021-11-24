let fs=require("fs");
let path = require("path");

function organiseFn(dirPath){
    // console.log("organize command implemnted for ", dirPath);
// 1. input -> directory path given
let destPath;
if(dirPath==undefined){
destPath=process.cwd();
return;
}
else{
let doesExists=fs.existsSync(dirPath);
if(doesExists){

            // 2. create -> organized_files -> directory
          destPath= path.join(dirPath,"organized_files");
        if (fs.existsSync(destPath)==false){
            fs.mkdirSync(destPath);
        }
}
else{
console.log("Kindly Enter the Correct Path");
return;
}

}
organiseHelper(dirPath,destPath);
}
function organiseHelper(src,destPath){
let childNames=fs.readdirSync(src);
for(let i=0; i<childNames.length; i++){
    let childAddress=path.join(src,childNames[i]);
    let isFile=fs.lstatSync(childAddress).isFile();
    if(isFile){
       // console.log(childNames[i]);
       let cateGory=getCategory(childNames[i]);
       console.log(childNames[i],"belongs to -- ",cateGory);
       sendFiles(childAddress,destPath,cateGory);
    }
}

}
function getCategory(name){
let ext= path.extname(name);
ext=ext.slice(1);
console.log(ext);
for(let type in types){
    let cTypeArr=types[type];
    for(let i=0; i<cTypeArr.length; i++){
      if(ext==cTypeArr[i]){
          return type;
      }
    }
}
return "others";
}
function sendFiles(srcFile,destPath,cateGory){
let cateGoryPath=path.join(destPath,cateGory);
if(fs.existsSync(cateGoryPath)==false){
    fs.mkdirSync(cateGoryPath);
}
let fileName=path.basename(srcFile);
let destFilePath=path.join(cateGoryPath,fileName);
fs.copyFileSync(srcFile,destFilePath);
fs.unlinkSync(srcFile);
console.log(fileName," copied to ",cateGory);
}
module.exports={
    organiseKey:organiseFn
    }
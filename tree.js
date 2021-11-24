let fs=require("fs");
let path = require("path");


function treeFn(dirPath){

    //  let destPath;
  if(dirPath==undefined){
  treeHelper(process.cwd(),"");
      return;
  }
  else{
      let doesExists=fs.existsSync(dirPath);
      if(doesExists){
               treeHelper(dirPath,"");
  }
  else{
      console.log("Kindly Enter the Correct Path");
      return;
  }
  
  }
  
  }
  function treeHelper(dirPath,indent){
      let isFile=fs.lstatSync(dirPath).isFile();
          if(isFile==true){
              let fileName=path.basename(dirPath);
              console.log(indent+ "----   "+fileName);
          }
          else{
              let dirName=path.basename(dirPath);
              console.log(indent+"----   "+dirName);
              let childrens=fs.readdirSync(dirPath);
              for(let i=0; i<childrens.length; i++){
                  let childPath=path.join(dirPath,childrens[i]);
                  treeHelper(childPath,indent + "\t");
              }
          }
  }
  module.exports={
    treeKey:treeFn
    }
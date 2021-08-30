#!/usr/bin/env node
let fs=require("fs");
//fs.writeFileSync("../a.txt","this is file a \n\n\n\n proper @@@@@\n\n");
//fs.writeFileSync("../b.txt","this is file b \n perfect \n\n@$@&@ho&l&h");
// console.log(fs.readFileSync("../a.txt","utf-8"));
// console.log(fs.readFileSync("../b.txt","utf-8"));
let argument=process.argv.slice(2);
var command=[];
var filenames=[];
let secondaryarguments=[];
for(i of argument){
    if(i[0]=="-"){
        command.push(i);
    }
    else if(i[0]=="$"){
        secondaryarguments.push(i.slice(1));
    }
    else{
        filenames.push(i);
    }
}
// if(command.length==0){
//     console.log("not a command");
// }
// else{
//     for(filename of filenames){
//         let filedata=fs.readFileSync(filename,"utf-8");
//         console.log(filedata.split(" ").join(""));
//     }
// }
for(filename of filenames ){
    let filedata=fs.readFileSync(filename,"utf-8");
    for(let flag of command){
        if(flag=="-rs"){
            filedata=filedata.split(" ").join("");
            console.log(filedata);
        }
        if(flag=="-rn"){
            filedata=filedata.split("\n").join("");
            console.log(filedata);
        }
        if(flag=="-rsc"){
            for(let secondaryarg of secondaryarguments){
                filedata=filedata.split(secondaryarg).join("");
            }
            console.log(filedata);
        }
        if(flag=="-s"){             //serialize all
               filedat =serial(filedata);
                for( file of filedat){
                    console.log(file);
                }
            }   
         
        if(flag=="-sn"){     //serialize non empty
            filedat =serialwith(filedata);
            for( file of filedat){
                console.log(file);
            }
        }
        if(flag=="-rmes"){    //remove empty lines and serialize non empty
            filedat =remserialize(filedata);
            for( file of filedat){
                console.log(file);
            }   
        }
        if(flag=="-rme"){    //removes multiple empty lines and leaves only one between non empty lines
            filedata=fileremove(filedata);
            for(file of filedata){
               console.log(file);
            }
        }
    }
}
function remserialize(filedata){  // this function removes all empty lines serialize all other lines 
        filedata=filedata.split("\n");
        let i=1;
        let arr=[];
        for(file of filedata){
            if(file!=""){
                arr[i-1]=i+file;
                i++;
            }
        }
        return arr;
}
function serial(filedata){  //this function serialize all the lines 
    filedata=filedata.split("\n");
    console.log(filedata);
    for(i in filedata){
        filedata[i]=(parseInt(i)+1)+" "+filedata[i];
    }
    console.log(filedata);
    return filedata;
}
function serialwith(filedata){    //this function serial only those lines which dont have spaces 
    filedata=filedata.split("\n");
    let count=1;
    for(i in filedata){
        if(filedata[i]!=""){
            filedata[i]=count+" "+filedata[i];
            count++;
        }
    }
    return filedata;
}
function fileremove(filedata){  //this function removes double empty lines and leaves one empty line
    filedata=filedata.split("\n");
    for(let i=1;i<filedata.length;i++){
        if(filedata[i]==""&&filedata[i-1]==""){
            filedata[i]=null;
        }
        if(filedata[i]==""&&filedata[i-1]==null){
            filedata[i]=null;
        }
    }
    let filer=[];
    for(file of filedata){
        if(file!=null){
            filer.push(file);
        }
    }
    return filer;
}

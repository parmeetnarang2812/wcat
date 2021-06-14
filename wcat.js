#!/usr/bin/env node

let fs = require("fs");
//input
let inputArr = process.argv.slice(2);
// console.log(inputArr);

//options
let optionArr = [];
let filesArr = [];

//identify -> option
for (let i = 0; i < inputArr.length; i++) {
  let firstChar = inputArr[i].charAt(0);
  if (firstChar == "-") {
    optionArr.push(inputArr[i]);
  } else {
    filesArr.push(inputArr[i]);
  }
}

//option-check
let isBothPresent = optionArr.includes("-b") && optionArr.includes("-n");
if(isBothPresent==true)
{
    console.log("either enter -b or -n");
    return;
}

//existence 
for(let i=0; i<filesArr.length; i++)
{
let isPresent = fs.existsSync(filesArr[i]);
if(isPresent==false) {
    console.log(`file ${filesArr[i]} is not present`)
    return;
}
}
//read
let content = "";
for(let i=0;i<filesArr.length;i++)
{
    let buffer = fs.readFileSync(filesArr[i]);
    content += buffer + "\r\n";
}
// console.log(content);

let contentArr = content.split("\r\n");
// console.log(contentArr);

// -s
let isSpresent = optionArr.includes("-s");
if(isSpresent==true) {
    for(let i=0; i<contentArr.length; i++)
    {
        if(contentArr[i]=="" && contentArr[i-1]=="")
        {
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null)
        {
            contentArr[i]=null;
        }
    }
    let tempArr = [];
    for(let i=0; i<contentArr.length; i++)
    {
        if(contentArr[i]!=null)
        {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr; 
}
// console.log("---------------------------------");
// console.log(contentArr.join("\n"));

//-n
let isNpresent = optionArr.includes("-n");
if(isNpresent==true)
{
    for(let i=0; i<contentArr.length; i++)
    contentArr[i] = `${i+1} ${contentArr[i]}` ;

}
// console.log(contentArr.join("\n"));

//-b
let isBpresent = optionArr.includes("-b");
if(isBpresent==true) {
    let counter = 1;
    for(let i=0; i<contentArr.length; i++) {
        if(contentArr[i]!="")
        {
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));

const varField = document.getElementById('varField')
const buttonVar = document.getElementById('btn__var')
const outputVar = document.getElementById('outputVar')

const conField = document.getElementById('conField')
const buttonCon = document.getElementById('btn__con')
const outputCon = document.getElementById('outputCon')

const methodField = document.getElementById('methodField')
const buttonMethod = document.getElementById('btn__method')
const outputMethod = document.getElementById('outputMethod')


function varConverterUML (str){
    let result = "";
    const strArr = str.split('\n');
    for(let i = 0; i < strArr.length; i++){
        let tmp = ""
        const testStr = strArr[i].replace(';', '')
        if(testStr.split(' ')[0].localeCompare("private") === 0){
            tmp += '- '
        }else if(testStr.split(' ')[0].localeCompare("public") === 0){
            tmp += '+ '
        }else if(testStr.split(' ')[0].localeCompare("protected") === 0){
            tmp += '# '
        }
        tmp +=`${testStr.split(' ')[2]} : ${testStr.split(' ')[1]}` 
        result += tmp + "<br>"
    }
    return result
}
function constructorConverterUML (str){
    const strArr = str.split('\n');
    let result = ""
    for(let i = 0; i < strArr.length; i++){
        let tmp = ""
        tmp += constructorConverter(strArr[i])
        result += tmp + "<br>"
    }
    return result
}
function methodConverterUML (str){
    const strArr = str.split('\n');
    let result = ""
    for(let i = 0; i < strArr.length; i++){
        let tmp = ""
        tmp += methodConverter(strArr[i])
        result += tmp + "<br>"
    }
    return result
}
function constructorConverter(str){
    let names = str.match(/^.*?(?=[(])/gm)[0].split(' ');
    let symbol = "";
    if(names[0].localeCompare("private") === 0){
        symbol += '- '
    }else if(names[0].localeCompare("public") === 0){
        symbol += '+ '
    }else if(names[0].localeCompare("protected") === 0){
        symbol += '# '
    }
    return `${symbol} ${names[1]} ${parameterModify(str)}`;
}
function methodConverter(str){
    let names = str.match(/^.*?(?=[(])/gm)[0].split(' ');
    let symbol = "";
    if(names[0].localeCompare("private") === 0){
        symbol += '- '
    }else if(names[0].localeCompare("public") === 0){
        symbol += '+ '
    }else if(names[0].localeCompare("protected") === 0){
        symbol += '# '
    }
    return `${symbol} ${names[2]} ${parameterModify(str)} : ${names[1]}`;
}
function parameterModify(str){
    let arr = [];
    let parameters = str.match(/(?<=\()(.*?)(?=\))/gm)[0].split(', '); 
    
   
    try{
        if(str.match(/[(][)]/gm)[0].localeCompare("()") === 0){
            return `()`
        } 

    }catch(e){
        for(let i = 0; i < parameters.length; i++){
            let tmp = `${parameters[i].split(' ')[1]} : ${parameters[i].split(' ')[0]}`;
            arr.push(tmp)
        }
        return `(${arr.join(', ')})`;
    }

    
}

buttonVar.addEventListener('click', function(){
    outputVar.innerHTML = varConverterUML(varField.value)
})
buttonCon.addEventListener('click', function(){
    outputCon.innerHTML = constructorConverterUML(conField.value)
})
buttonMethod.addEventListener('click', function(){
    outputMethod.innerHTML = methodConverterUML(methodField.value)
})
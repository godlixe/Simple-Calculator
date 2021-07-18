let resultArr = []
let processArr = []
let historyArr = []
let history = document.getElementById("history")
let result = document.getElementById("result")

function pushArray(arr1, arr2){
    let currLength = arr1.length
        for(let i = 0; i < currLength; i++){
            arr2.unshift(arr1.pop())
        }
}

function precedence(char){
    if(char == '+' || char == '-'){
        return -1;
    }
    else if(char == '*'){
        return 1;
    }
    else if(char == '/'){
        return 2;
    }
    else if(char == '^'){
        return 3;
    }
    else return -2;
}

function foo(operation){
    let arr = []
    let result = []
    for(let i=0; i<operation.length; i++){
      let curr = operation[i]
      if(Number.isInteger(parseInt(curr, 10))){
          result.push(curr)
      }
      else if(curr == '('){
          arr.push('(')
      }
      else if(curr == ')'){
          while(arr[arr.length-1]!='('){
              result.push(arr[arr.length-1]);
              arr.pop()
          }
          arr.pop()
      }
      else{
          while(arr.length!=0 && precedence(operation[i])<=precedence(arr[arr.length-1])){
              result.push(arr[arr.length-1]);
              arr.pop();
          }
          arr.push(curr);
      }
  }
      while(arr.length!=0){
          result.push(arr[arr.length-1]);
          arr.pop();
      }
      
  return result;
}


function eval(operation){
    let arr = [];
    for(let i=0; i<operation.length; i++){
    curr = operation[i];
        if(Number.isInteger(parseInt(curr, 10))){
            arr.push(curr);
        }
        else{
            let a = parseFloat(arr[arr.length-1]);
            arr.pop();
            let b = parseFloat(arr[arr.length-1]);
            arr.pop();
            if(curr == '+'){
                arr.push(a+b);
            }
            else if(curr == '-'){
                arr.push(b-a);
            }
            else if(curr == '*'){
                arr.push(a*b);
            }
            else if(curr == '/'){
                arr.push(b/a);
            }
        }
    }
    return arr.pop();
}

function processArray(arr1, arr2){
    processArr.length = 0
    let counter = 0
    while(arr1.length!=0){
        if(Number.isInteger(parseInt(arr1[0], 10))){
            if(arr2[counter] == undefined){
                arr2[counter] = arr1[0];
            }
            else{
                arr2[counter] = (arr2[counter]*10) + Number.parseInt(arr1[0],10);
            }
            arr1.shift()
        }
        else{
            arr2[counter] = arr2[counter].toString()
            counter++;
            arr2.push(arr1[0])
            arr1.shift()
            counter++;
        }
    }
    arr2[counter] = arr2[counter].toString()
}

function updateDisplay(){
    if(resultArr.length!=0){
        result.innerText = resultArr.join("")
    }
    else{
        result.innerText = "0"
    }
}
function updateHistory(){
    if(historyArr.length!=0){
        history.innerText = historyArr.join("")
    }
    else{
        history.innerText = "0"
    }
}

for(let i = 0; i < document.getElementsByClassName("num").length; i++){
    document.getElementsByClassName("num")[i].addEventListener("click", ()=>{
        resultArr.push(document.getElementsByClassName("num")[i].innerHTML)
        updateDisplay()
    })
}
for(let i = 0; i < document.getElementsByClassName("oper").length; i++){
        document.getElementsByClassName("oper")[i].addEventListener("click", ()=>{
            if(Number.isInteger(parseInt(resultArr[resultArr.length-1], 10))){
                resultArr.push(document.getElementsByClassName("oper")[i].innerHTML)
                updateDisplay()
            }
            else{
                alert("Operators can only be put after operands")
            }
        })
}
document.getElementsByClassName("del")[0].addEventListener("click", ()=>{
    resultArr.pop()
    updateDisplay()
})
document.getElementsByClassName("eq")[0].addEventListener("click", ()=>{
    if(Number.isInteger(parseInt(resultArr[resultArr.length-1], 10))){
        historyArr.length = 0
        pushArray(resultArr, historyArr)
        updateHistory()
        processArray(historyArr, processArr)
        resultArr = [eval(foo(processArr))]
        updateDisplay()
    }
    else{
        alert("Equal operator is put after an operand")
    }
})

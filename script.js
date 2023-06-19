let expression = [];

const container1 = document.querySelector('#rus');
const container2 = document.querySelector('#ops');

function add (a,b){
    return a+b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function operation (a, b, f){
    let a1 = Number(a);
    let b1 = Number(b);
    switch (f){
        case "+":
            return add(a1,b1);
        case "-":
            return subtract(a1,b1);
        case "*":
            return multiply(a1,b1);
        case "/":
            return divide(a1,b1);
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
         if (container2.textContent == "invalid expression" ){
             container2.textContent = "";   
             expression = [] ;
        }
        if (button.textContent == "c"){
            container2.textContent = "";
            expression = [];
        }else if (button.textContent == "e"){
            container2.textContent = container2.textContent.slice(0,container2.textContent.length-1)
            if (expression.length > 0){
                if ( expression[expression.length-1].length > 1){
                    let temp = expression[expression.length-1];
                    temp = temp.slice(0,temp.length-1);
                    expression[expression.length-1] = temp;
                }else{
                    expression.pop();
                }
            }
            
        }else if(button.textContent == "="){
            if (expressionValidation(expression)){
                calculate1 ();
                container2.textContent = "";   
                expression = [] ;
            }
        }else {
            container2.textContent += button.textContent;
            let arr = ['+','-','*','/'];
            let checB = (button.textContent);
            let checE = (expression[expression.length-1]);

            if (!arr.includes(checB)){
                if (expression.length == 0){
                    expression.push(button.textContent) //bullding an array containe expression   
                }else{
                    if (!arr.includes(checE)){
                        expression[expression.length-1] +=  button.textContent;
                    }else if(['+','-'].includes(checE)){
                        if(arr.includes(expression[expression.length-2])){
                            expression[expression.length-1] +=  button.textContent;
                        }else{
                            expression.push(button.textContent) //bullding an array containe expression     
                        }
                    }else{
                        expression.push(button.textContent) //bullding an array containe expression  
                    }
                }       
            }else{
                expression.push(button.textContent) //bullding an array containe expression
            }   
        } 
        console.log(expression);
    });
  });

function showEx (str){  
    container2.textContent = str;
}

function showRe (str){  
    container1.textContent = str;
}


function expressionValidation (exp){
    let arr = ["*","/"];
    let arr1 = ["+","-","*","/"];
    if (arr.includes(exp[0]) || arr.includes(exp[exp.length-1])){
        expression = [];
        showEx("invalid expression");
        return false;
    }
    for (let i = 0; i<exp.length; i++ ){
        if (arr.includes(exp[i])){
            if (arr.includes(exp[i+1])){
                showEx("invalid expression");
                return false;  
            } else if (arr1.includes(exp[i+1])){
                if (arr1.includes(exp[i+1])){
                    showEx("invalid expression");
                    return false;
                }
            }
        }
    }
    return true;
}

function checkOp (exp){
    for (let i = 1 ; i<exp.length ; i++){
        if (["+","-","*","/"].includes(exp[i])){
            return true
        }
    }
    return false;
}



function calculate1 (){
    if (checkOp(expression)) {
        for (let i = 0 ; i<expression.length ; i++){
            if (['*','/'].includes(expression[i])){
                let op = operation (expression[i-1],expression[i+1],expression[i]);
                expression.splice(i-1,3,op);
                i = 0;
            }
        }
        for (let i = 0 ; i<expression.length ; i++){
            if (['+','-'].includes(expression[i])){
                let op = operation (expression[i-1],expression[i+1],expression[i]);
                expression.splice(i-1,3,op);
                i = 0;
            }
        }
        container1.textContent = expression.join("");
    }else{
        container1.textContent = expression.join("");  
    }
}

function checkNumber(number){
    const num=Number(number)
    if (isNaN(num))
    {return false}
    else{
        return true
    }
}
let myform=document.getElementById('myform')
let text=document.getElementById('prime')
let errorcontainer=document.getElementById('error')
let errortext=document.getElementsByClassName('Alert Text')[0]

let ul=document.getElementById('attempts')
let search=document.getElementById('search')

let result


if(myform){
    myform.addEventListener('submit',(event)=>{
        event.preventDefault()
        console.log(text.value)
        if(text.value.trim()){
            errorcontainer.hidden=true
            let number=text.value
            if(!number){
                text.value=""
                errortext.textContent="Invalid Output"
                errorcontainer.hidden=false
                text.focus()
            }
            if(checkNumber(number)==false){
                text.value=''
                    errortext.textContent="Enter a number"
                    errorcontainer.hidden=false
                    text.focus()
                    return
            }
            if(number<0){
                text.value=''
                errortext.textContent="Negative number not allowed"
                errorcontainer.hidden=false
                text.focus()
                return
            }
            if(number%1!==0){
                text.value=''
                errortext.textContent="Decimal number not allowed"
                errorcontainer.hidden=false
                text.focus()
                return
            }
            // if(Number.isInteger(number)==false){
            //     text.value=''
            //     errortext.textContent="Enter a number"
            //     errorcontainer.hidden=false
            //     text.focus()
            //     return
            // }
           
            result=CheckPrime(number)

            if(result==true){
                let li=document.createElement('li')
                li.classList.add('is-prime')
                li.innerHTML=`${text.value} is a prime number`
                ul.appendChild(li)
            }
            else{
                let li = document.createElement('li')
                li.classList.add('not-prime')
                li.innerHTML=`${text.value} is NOT a prime number`
                ul.appendChild(li)
            }
            myform.reset()
            text.focus()
        }
        else{
            text.value=''
            errortext.textContent="Input Text is empty"
            errorcontainer.hidden=false
            text.focus()
        }
    })
}
function CheckPrime(number){
    if(!number){throw"Error: Enter a number"}
    //if(number<0){throw"Error: Negarive number not allowed"}
    let isPrime=true
    if(number==1||number==0){
        isPrime=false
    }
    else if(number>1){
        for(i=2;i<number;i++){
            if(number%i==0){
                isPrime=false
                break;
            }
        }
    }
return isPrime
}


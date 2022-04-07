const questionOne = function questionOne(arr) {
    arr = arr.map(x=>x*x)
    let sum=0
    for (let i=0;i<arr.length;i++){
        sum=sum+arr[i]
    }
    return sum

}


const questionTwo = function questionTwo(num) { 
    if (num<1){
        return 0    
    }
    else if(num==1||num==2){
        return 1
    }
    else {
        Fibonacci=questionTwo(num-1)+questionTwo(num-2)
        return Fibonacci
    }
}

   


const questionThree = function questionThree(text) {
    text=text.toLowerCase()
    let count=0
    for (let i =0;i<text.length;i++){
        if (text[i]=='a'||text[i]=='e'||text[i]=='i'||text[i]=='o'||text[i]=='u'){
            count=count + 1
        }
    }
    return count
}



const questionFour = function questionFour(num) {
    if (num<0){
        return NaN
    }
    else{
        let fact=1
        for (let i=1;i<=num;i++){
            fact=fact*i
        }
        return fact
}
}





module.exports = {
    firstName: "Sahil Mahendra", 
    lastName: "Mody", 
    studentId: "20007262",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};
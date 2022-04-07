checkArray=(val)=>{
    if (typeof val=== "undefined"){throw "Error: undefined type"}
    if (val.length===0) {throw "Error: Array is Empty"}
    if (val.constructor !== Array){throw "Error: It is not an Array"}
    for (j=0;j<val.length;j++){
        if (typeof val[j]!== "number"){throw "Error: Array element is not a number"}
    }
    
    //if(!Array.isArray(val)) {throw"It is not an Arra"}    
}


mean=(array)=>{
    checkArray(array);
    let sum=0
    for(let i=0;i<array.length;i++){
        sum=sum+array[i]
    }
    mean=sum/array.length
    return mean
}


medianSquared=(array)=>{
    checkArray(array)
    array=array.sort()
        if(array.length%2){
            median=Math.floor(array.length/2)
            return array[median]**2
        }
        else{
            middle1=Math.floor((array.length-1)/2)
            middle2=Math.floor((array.length+1)/2)
            median=((array[middle1]+array[middle2])/2)
            return median**2
        }

}

maxElement=(array)=>{
    checkArray(array)
    x=Math.max.apply(null,array)
    z=array.indexOf(x)
    let obj={}
    key=x
    obj[key]=z
    return obj

}
checkArray1=(num)=>{
    if(num===undefined){throw "Error: enter end parameter please" }
    if(typeof num!=="number"){throw "Error: Enter a number"}
    if(num<=0){throw "Error: Enter a positive number, greater than zero"}   
}

fill=(end,value)=>{
    checkArray1(end)
    array=[]
    if(value==null){
        for(i=0;i<end;i++){
            array.push(i)
        }
        return array
    }
    else{
        for(i=0;i<end;i++){
            array.push(value)
        }
        return array
    }
}

checkArray2=(array)=>{
    if (typeof array=== "undefined"){throw "Error: undefined type"}
    if (array.constructor !== Array){throw "Error: It is not an Array"}

}


countRepeating=(array)=>{
    let object={}
    let result={}
    checkArray2(array)
    if(array.length==0){
        return {}
    }
    for(i=0;i<array.length;i++){
        if (object[array[i]]){
            object[array[i]]+=1
        }
        else{
            object[array[i]]=1
        }
    }
     for (const [k, value] of Object.entries(object)) {
        if(value>=2){
            key=k
            result[key]=object[key]
            a = result
        }
        else{
            a = result
        }
    }
    return a
}
isEqual=(arrayOne,arrayTwo)=>{
    checkArray2(arrayOne)
    checkArray2(arrayTwo)
    if(arrayOne.length==arrayTwo.length){
        arrayOne=arrayOne.flat()
        arrayTwo=arrayTwo.flat()
        arrayOne=arrayOne.sort()
        arrayTwo=arrayTwo.sort()
        if(arrayOne.every((value,index)=>value==arrayTwo[index])){
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}
module.exports={
    firstname: "Sahil Mahendra",
    lastname: "Mody",
    studentId: "20007262",
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
};


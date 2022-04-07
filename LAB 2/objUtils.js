checkArray3=(val)=>{
    if (typeof val=== "undefined"){throw "Error: undefined type"}
    if (val.length===0) {throw "Error: Array is Empty"}
    if (val.constructor !== Array){throw "Error: It is not an Array"}
    for (j=0;j<val.length;j++){
        if (typeof val[j]!== "object"){throw "Error: Array element is not a object"}
        if(Object.keys(val[j]).length==0){throw"Error: object in the array should not be empty"}
   }
    if(val.length<=1){throw "Error: Must be minimum Two Objects"}  
}

makeArrays=(objects)=>{
    checkArray3(objects)
    let r=[]
    for (const [k, value] of Object.entries(objects)) {
        b=Object.entries(value)
        r.push(b)
    }
    r=r.flat()
    return r;
}

checkObject=(object)=>{
    if(typeof object=== "undefined"){throw "Error: undefined type"}
    if(typeof object !== "object"){throw "Error: Not an object"}
    if(object.constructor==Array){throw " Error: Arrays Not allowed"}

}
isDeepEqual=(obj1, obj2)=>{
    checkObject(obj1)
    checkObject(obj2)
    const flattenObj=(obj)=>{
        let result={}
        for (const i in obj){
            //console.log(obj[i])
            if(typeof obj[i]=="object" && !Array.isArray(obj[i])){
                temp=flattenObj(obj[i])
                for (j in temp){
                    result[i+"."+j]=temp[j]
                }
            }
            else{
                result[i]=obj[i]
            }
        }
         return result
    }
    obj1=(flattenObj(obj1))
    obj2=(flattenObj(obj2))

    obj1key=Object.keys(obj1)
    obj2key=Object.keys(obj2)
    obj1value=Object.values(obj1)
    obj2value=Object.values(obj2)
    obj1key=obj1key.sort()
    obj1value=obj1value.sort()
    obj2key=obj2key.sort()
    obje2value=obj2value.sort()

    if(obj1key.every((value,index)=>value==obj2key[index])){
        if(obj1value.every((value,index)=>value==obj2value[index])){
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

checkObject1=(object,func)=>{
    if(typeof object !== "object"){throw "Error: Not an object"}
    if (typeof func !="function"){throw "Error: Not an function"}
    for (const [k, value] of Object.entries(object)){
        if(typeof value != "number"){throw "Error: Object value should be number"}
    }
}
computeObject=(object, func)=>{
    checkObject1(object,func)
    for (const [k, value] of Object.entries(object)){
        object[k]=func(value)
    }
    return object
}


module.exports={
    firstname: "Sahil Mahendra",
    lastname: "Mody",
    studentId: "20007262",
    makeArrays,
    isDeepEqual,
    computeObject
};
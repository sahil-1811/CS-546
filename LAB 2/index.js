const s = require("./arrayUtils");
const a = require("./stringUtils")
const h = require("./objUtils")

try{
    console.log(s.mean([1,2,4,7]))
    console.log("mean passed successfully")
    }
    catch(e){
        console.log("e")
    }
try{
    console.log(s.mean(["banana"]))
    console.log("Mean not problem")
    }
    catch(e){
        console.log(e)
        console.log("Mean Failed Case")
    }
console.log("---------------------------------------------------------------------------------------")
try{
    console.log(s.medianSquared([1,2,3,3]))
    console.log("medianSquared passed successfully")
    
        }
        catch(e){
            console.log(e)
        }
try{
    console.log(s.medianSquared(1,2,3))
    console.log("MedianSquared not problem")
        }
        catch(e){
            console.log(e)
            console.log("medianSquared Failed Case")
            }
console.log("-----------------------------------------------------------------------------------")
try{
    console.log(s.maxElement([-1,2,30,4,1,17]))
    console.log("maxElement passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(s.maxElement((1,2,4)))
    console.log("MaxElement not problem")
        }
        catch(e){
                console.log(e)
                console.log("maxElement Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
try{
    console.log(s.fill(4,"Hello"))
    console.log("fill passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(s.fill())
    console.log("fill not problem")
        }
        catch(e){
                console.log(e)
                console.log("fill Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
try{
    console.log(s.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]))
    console.log("countRepeating passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(s.countRepeating({a: 1, b: 2, c: "Patrick"}))
    console.log("countRepeating not problem")
        }
        catch(e){
                console.log(e)
                console.log("countRepeating Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
try{
    console.log(s.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]))
    console.log("isEqual passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(s.isEqual((1,2,3)))
    console.log("isEqual not problem")
        }
        catch(e){
                console.log(e)
                console.log("isEqual Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
try{
    console.log(a.camelCase("hello how are you"))
    console.log("camelCase passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(a.camelCase(1,2,3))
    console.log("camelCasenot problem")
        }
        catch(e){
                console.log(e)
                console.log("camelCase Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
try{
    console.log(a.replaceChar("Hello, How are you? I hope you are well"))
    console.log("replaceChar passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(a.replaceChar(""))
    console.log("replaceChar not problem")
        }
        catch(e){
                console.log(e)
                console.log("replaceChar Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
try{
    console.log(a.mashUp("Patrick", "Hill"))
    console.log("mashUp passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(a.mashUp("Patrick", "a"))
    console.log("mashUp not problem")
        }
        catch(e){
                console.log(e)
                console.log("mashUp Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
try{
    console.log(h.makeArrays([first, second, third]))
    console.log("makeArrays passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(h.makeArrays([first]))
    console.log("makeArrays not problem")
        }
        catch(e){
                console.log(e)
                console.log("makeArrays Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
const first1 = {a: 2, b: 3};
const second1 = {a: 2, b: 4};
const third1 = {a: 2, b: 3};
const forth1 = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth1  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
try{
    console.log(h.isDeepEqual(forth1,fifth1))
    console.log("isDeepEqual passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(h.isDeepEqual(first))
    console.log("isDeepEqual not problem")
        }
        catch(e){
                console.log(e)
                console.log("isDeepEqual Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
try{
    console.log(h.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2))
    console.log("computeObject passed successfully")

        }
        catch(e){
                console.log(e)
                }
try{
    console.log(h.computeObject({ a: 3, b: 7, c: 5 }, 5))
    console.log("computeObjectnot problem")
        }
        catch(e){
                console.log(e)
                console.log("computeObject Failed Case")
                }
console.log("-------------------------------------------------------------------------------------")
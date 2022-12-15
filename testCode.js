const propsFirst = [1,3,6,9,2]
setFirstNum(propsFirst[Math.floor(Math.random()*propsFirst.length)])

const handleSelection = (selectedItem)=>{
    if(selectedItem.value=='time1'){
        setTimeAttack(true)
        setQuestionAmount(1000)
        setTimeAmount(10)
    }
    else if(selectedItem.value=='time2'){
        setTimeAttack(true)
        setQuestionAmount(1000)
        setTimeAmount(30)
    }
    else if(selectedItem.value=='time3'){
        setTimeAttack(true)
        setQuestionAmount(1000)
        setTimeAmount(60)
    }
    else{
    setQuestionAmount(selectedItem.value)
}}

// NOTE: Open issue cause error in console:
// ReactDOM.render is no longer supported in React 18
// possible temp fixes:
// https://github.com/expo/expo/issues/18485
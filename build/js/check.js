function getArrayElementsSum(array){
	var sum = 0;
	var i = 0;
    for(i = 0; i < array.length; i++){
        sum += array[i];
        }
    	return sum;
}

function getSumOfMultiplingArrays(array1, array2){
	var result = 0;
	var i = 0;
	for(i = 0; i < array1.length && i < array2.length; i++) {
			result += array1[i] * array2[i];
		}
		return result;	
}

function getMessage(a, b) {
	
	if (typeof a == "boolean") {
		if (a) {
			return "Я попал в " + b;
		}
		else {
			return "Я никуда не попал";
		}
	}
	 else if (typeof a == "number") {
		return "Я прыгнул на " + a * 100 + " сантиметров";
	}
	 else if (typeof a == "object" && typeof b !== "object") {
		return "Я прошёл " + getArrayElementsSum(a) + " шагов";
	} 
	else if (typeof a == "object" && typeof b == "object") {		
		return "Я прошёл " + getSumOfMultiplingArrays(a, b) +" метров";
	}
}

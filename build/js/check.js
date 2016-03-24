function sum(array){
	var arraySum = 0;
    for(var i = 0; i < array.length; i++){
        arraySum += array[i];
        }
    	return arraySum;
}

function length(array1, array2){
	var arrayProd = 0;
	for(var i = 0; i < array1.length && i < array2.length; i++) {
			arrayProd += array1[i] * array2[i];
		}
		return arrayProd;	
}

function getMessage(a, b) {
	
	if (typeof a == "boolean") {
		if (a) {
			return "Я попал в [" + b + "]";
		}
		else {
			return "Я никуда не попал";
		}
	}
	 else if (typeof a == "number") {
		return "Я прыгнул на [" + a * 100 + "] сантиметров";
	}
	 else if (typeof a == "object" && typeof b !== "object") {
		return "Я прошёл [" + sum(a) + "] шагов";
	} 
	else if (typeof a == "object" && typeof b == "object") {		
		return "Я прошёл [" + length(a, b) +"] метров";
	}
}

let qty = [1, 2, 3, 4, 5]
let price = [5, 10, 15, 20, 25, 30, 40 , 45]

const hbfunction = (array1, array2) => {
    let mults = [];
    for (let i = 0; i < array1.length; i++) {
        mults.push(array1[i] * array2[i])     
    }
    const initial = 0;
    const sum = mults.reduce(
        (accumulator, currentValue) => accumulator + currentValue, initial
    )
    return sum;
}

hbfunction(qty, price);
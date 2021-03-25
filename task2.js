function findPermutations(word) {
    if (!word || typeof word !== "string") {
        return "Invalid data";
    }
    else if(word.length <= 1) {
        return word;
    }

    let permutationsArray = [];
    for (let i = 0; i < word.length; i++) {
        let symbol = word[i];
        if(word.indexOf(symbol) !== i) continue;
        let remainingChars = word.slice(0, i) + word.slice(i + 1, word.length);
        console.log(remainingChars);
        for (let permutation of findPermutations(remainingChars)) {
            permutationsArray.push(symbol + permutation);
        }
    }
    return permutationsArray;
}


console.log(findPermutations("qwe"))
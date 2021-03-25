function findMostFrequentElement(elements) {
    let freqElem, times = 1, count = 0;
    for (let i = 0; i < elements.length; i++) {
        for (let j = i; j < elements.length; j++) {
            if(elements[i] == elements[j]) count++;
            if(times < count) {
                times = count;
                freqElem = elements[i];
            }
        }
        count = 0;
    }
    console.log("The most frequent element = " + freqElem + "(" + times + ")");
}

findMostFrequentElement([1, 2, 3, 2, 2, 2, 1, 3, 2, 2, 3, 1]);
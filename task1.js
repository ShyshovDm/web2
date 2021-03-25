function splitSentence(sentence) {
    if (!sentence || typeof sentence !== "string") {
        console.log("Invalid data");
        return;
    }

    let words = sentence.split(' ');
    console.log(words);
}

splitSentence("My name is Ihor");
splitSentence("");

function getDaysNumber(month, year) {

    if (typeof year !== "number" || year <= 0)
        return "Invalid year"

    if (month % 2 === 0) {
        // Feb
        if (month === 2)
            return year % 4 === 0 ? 29 : 28;
        // Aug
        else if (month === 8)
            return 31;
        else
            return 30;
    } else
        return 31;
}

console.log(getDaysNumber(2, 2019));
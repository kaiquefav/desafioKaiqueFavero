export default function Validate(day, month, year) {

    if ((day > 31) || (day < 1) || (month > 12) || (month < 1)) {
        return false
    }
    else {
        const currentDate = day + '/' + month + '/' + year
        return currentDate
    }

}
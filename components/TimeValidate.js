export default function TimeValidate(hour, minute) {

    if ((hour > 24) || (minute > 60)) {
        return false
    }
    else {
        const time = hour + ':' + minute
        return time
    }

}
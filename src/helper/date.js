function dateParse(params) {
    const date=new Date(params)
    const year=date.getFullYear()
    const month=date.getMonth()+1
    const day=date.getDate()
    const hours=date.getHours()
    const min=date.getMinutes()
    const seconds=date.getSeconds()
    return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hours)}:${addZero(min)}:${addZero(seconds)}`
}
function addZero(num) {
    return num=num<10?`0${num}`:num
}
export default dateParse


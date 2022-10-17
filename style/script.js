/* 공통 페이지를 위한 자바스크립트 */

let goMain = () => {
    location.href = "./index.html"
}
let goWriter = () => {
    location.href = "./introduce_writer.html"
}
let goChar = () => {
    location.href = "./introduce_char.html"
}
let goStory = () => {
    location.href = "./story.html"
}
let goLink = url => {
    window.open(url)
}
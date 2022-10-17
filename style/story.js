/* 스토리 진행을 위한 자바스크립트 */

let movePage = false;
let pageCount = 1; //1 페이지부터 시작
const lastPage = 5; //5 페이지가 마지막 페이지

let setPage = () => {
    if(movePage) {
        while(1) {
            var input = prompt(`이동하고자 하는 페이지를 입력하세요 (1 ~ ${lastPage}page)`);
            if(input == null) break; //취소 버튼 누를 시 멈춤

            input = Number(input)
            if(isNaN(input)) { //isNaN을 통해 입력받은 것이 숫자가 맞는지 판별
                alert("올바른 숫자를 입력해주세요")
            } else if(input < 1 || input > lastPage) { //숫자의 범위가 1 ~ lastPage 까지인지 판별
                alert(`올바른 페이지를 입력해주세요 (1 ~ ${lastPage}page)`)
            } else {
                //현재 페이지수를 갱신, 깜빡임 효과 제거
                pageCount = input;
                $("#nextPage").removeClass("spark")
                $("#nowPage").text(pageCount);
                //맞는 페이지로 이동
                for(var i=1; i<=lastPage; i++) {
                    (i==pageCount)?playPage(i):clearPage(i);
                }
                //모든 처리를 끝냈으니 멈춤
                break;
            }
        }
    }
}

//전 페이지로 이동하는 함수
let prevPage = () => {
    if (pageCount==1) {
        alert("첫번째 페이지입니다.")
    } else if(movePage) {
        clearPage(pageCount)
        pageCount -= 1
        $("#nowPage").text(pageCount);
        $("#nextPage").removeClass("spark")
        playPage(pageCount)
    }
}

//다음 페이지로 이동하는 함수
let nextPage = () => {
    if (pageCount==lastPage) {
        alert("마지막 페이지입니다.")
    } else if(movePage) {
        clearPage(pageCount)
        pageCount += 1
        $("#nowPage").text(pageCount);
        $("#nextPage").removeClass("spark")
        playPage(pageCount)
    }
}

//페이지를 넘길 때 전 페이지를 정리해주는 함수
let clearPage = page => {
    $(`#background1`).css("opacity","0")
    $(`#background2`).css("opacity","0")
    lineList[page-1].forEach((i)=>{
        $(`#page${page}_text${i}`).css("opacity","0")
    })
    $(`#page${page}`).addClass("hide")
}

//새로운 페이지를 불러오는 함수
let playPage = page => {
    movePage = false;
    delayTime = 0
    nowPage = pageCount

    background1 = false;
    background2 = false;
    backCounter = 0;

    $(`#page${page}`).removeClass("hide")
    lineList[page-1].forEach((i)=>{
        setTimeout(()=>{
            if(nowPage == pageCount) $(`#page${page}_text${i}`).css("opacity","1")
            if(i==backgroundList[page-1][backCounter]) {
                if(!background1 && !background2) {
                    $(`#background1`).css(
                        "background-image",
                        `linear-gradient(to bottom, rgb(90, 90, 90, 0.8), rgba(0,0,0,0)), url(./style/background${(backCounter==0)?page:page+'-'+backCounter}.png)`
                    )

                    $(`#background1`).css("opacity", `0.5`)
                    
                    background1 = true;
                    background2 = false;   
                } else if(background1 && !background2) {
                    $(`#background2`).css(
                        "background-image",
                        `linear-gradient(to bottom, rgb(90, 90, 90, 0.8), rgba(0,0,0,0)), url(./style/background${(backCounter==0)?page:page+'-'+backCounter}.png)`
                    )

                    $(`#background1`).css("opacity", `0`)    
                    $(`#background2`).css("opacity", `0.5`)

                    background1 = false;
                    background2 = true 
                } else if(!background1 && background2) {
                    $(`#background1`).css(
                        "background-image",
                        `linear-gradient(to bottom, rgb(90, 90, 90, 0.8), rgba(0,0,0,0)), url(./style/background${(backCounter==0)?page:page+'-'+backCounter}.png)`
                    )

                    $(`#background2`).css("opacity", `0`)    
                    $(`#background1`).css("opacity", `0.5`)
                    
                    background1 = true;
                    background2 = false;   
                }
                backCounter++;
            }
            if(i==lineList[page-1].length) {
                if(pageCount!= lastPage) $("#nextPage").addClass("spark")
                movePage = true;
            }
        }, delayTime += delayList[page-1][i-1])
    })
}

//각 페이지마다 가진 줄의 수
lineList = [
    [1,2,3,4,5,6,7,8,9], //9 Line
    [1,2,3,4,5,6,7], // 7 Line
    [1,2,3,4,5,6,7,8, 9], // 9 Line
    [1,2,3,4,5,6,7,8], // 8 Line
    [1,2,3,4,5,6,7] // 7 Line(Final)
]

//배경이 바뀌는 줄
backgroundList = [
    [3], //3번째 대사에서 배경 삽입
    [1, 6], //1, 6번째 대사에서 배경 삽입, 
    [1, 6], //1, 6번째 대사에서 배경 삽입
    [1, 3, 4], //1, 3, 4번째 대사에서 배경 삽입
    [3] //3번째 대사에서 배경 삽입
]

//대사의 딜레이
delayList = [
    [0, 1500, 1500, 1000, 1500, 1500, 800, 1000, 2000], //9 Line
    [0, 2000, 1000, 1500, 500, 1000, 2000], // 7 Line
    [0, 2000, 1000, 1500, 500, 1000, 1000, 500, 2000], // 9 Line
    [0, 2000, 800, 3000, 2000, 2000, 2000, 2000], // 8 Line
    [0, 1000, 1500, 2500, 1500, 500, 2000] // 7 Line(Final)
]

//윈도우가 준비되면 1페이지부터 재생 시작
$(()=>{
    $("#nowPage").text(pageCount);
    $("#lastPage").text(lastPage);
    playPage(1)
})
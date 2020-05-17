"use strict";
var example = {
    a: 3,
    b: 7,
    c: 1
};
// 인터페이스 같은 이름으로 만들수 있음
var rsp = {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
};
//실수로 바꾸는것을 막아주는 as const
//rsp.ROCK = '9'; 
var imgCoords = '0'; //string 보다 좁은 범위로 설정해줘야함
function computerChoice(imgCoords) {
    return Object.keys(rsp).find(function (k) { return rsp[k] === imgCoords; });
}
var interval;
//let point : number = 0;
function intervalMaker() {
    interval = setInterval(function () {
        if (imgCoords === rsp.ROCK) {
            imgCoords = rsp.SCISSORS;
        }
        else if (imgCoords === rsp.SCISSORS) {
            imgCoords = rsp.PAPER;
        }
        else {
            imgCoords = rsp.ROCK;
        }
        // const computer = document.querySelector<HTMLDivElement>('#computer') //ts는 #computer 가 같다는 걸 인식하지 못한다. 
        //!대체하고
        if (document.querySelector('#computer')) {
            // 타입 형변환
            document.querySelector('#computer').style.background = "url(https://en.pimg.jp/023/182/267/1/23182267.jpg) " + imgCoords + " 0";
        }
    }, 100);
}
intervalMaker();
document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        clearInterval(interval);
        setTimeout(intervalMaker, 2000);
        var myChoice = this.textContent; //강제로 타입 변환 (textContent가 string|| null이므로)
        var myScore = score[myChoice];
        var computerScore = score[computerChoice(imgCoords)];
        var diff = myScore - computerScore;
        if (diff === 0) {
            console.log('비겼습니다.');
        }
        else if ([-1, 2].includes(diff)) {
            console.log('이겼습니다!');
            // point++;
            // (document.querySelector('#point') as HTMLDivElement)!.textContent = point;
        }
        else {
            console.log('졌습니다ㅜ');
            // point--;
            // (document.querySelector('#point') as HTMLDivElement)!.textContent = point;
        }
    });
});

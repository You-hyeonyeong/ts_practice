
//type HI = string | number;
// type HELLO = {
//     readonly ROCK: '0'; // 바꿀수 없게 해줌
//     readonly SCISSORS: '-142px';
//     readonly PAPER: '-284px';
// } | string;
/*
인터페이스 특징
1. extends 로 상속이 가능하다.
2. 이름 같은 interface는 합쳐진다. (남의 라이브러리를 쉽게 수정 가능하다.)
3. 뭐가 들어올지 모를때 여유를 둘 수 있다. 
4. alis
5. 강제 형변환 
6. 함수를 쓰는 경루 this 의 타입을 첫번째 매개변수로
7. ! 로 null 인 가능성에 확신을 줌 (! 안쓰려면 if 문으로 설정)

*/
//인터페이스에 뭐가 들어올지 모를때
interface Example {
    a: 3,
    b : 7,
    [key: string] : number; //불가피한 상황이 생길때
}
const example : Example = {
    a: 3,
    b: 7,
    c: 1
}


interface RSP {
    readonly ROCK: '0'; // 바꿀수 없게 해줌
    readonly SCISSORS: '-142px';
    readonly PAPER: '-284px';
}
// 인터페이스 같은 이름으로 만들수 있음
const rsp: RSP = { //객체 타입을 인터페이스로
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
};
const score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
} as const;
//실수로 바꾸는것을 막아주는 as const
//rsp.ROCK = '9';
let imgCoords: RSP[keyof RSP] = '0'; //string 보다 좁은 범위로 설정해줘야함
function computerChoice(imgCoords : RSP[keyof RSP]): keyof RSP {
    return (Object.keys(rsp) as ['ROCK', 'SCISSORS', 'PAPER']).find((k) => rsp[k] === imgCoords)!;
}
let interval : number; 
//let point : number = 0;

function intervalMaker() {
    interval = setInterval(function() {
        if(imgCoords === rsp.ROCK) {
            imgCoords = rsp.SCISSORS;
        } else if(imgCoords === rsp.SCISSORS){
            imgCoords = rsp.PAPER;
        } else {
            imgCoords = rsp.ROCK;
        }
       // const computer = document.querySelector<HTMLDivElement>('#computer') //ts는 #computer 가 같다는 걸 인식하지 못한다. 
        //!대체하고
       if(document.querySelector('#computer')) {
           // 타입 형변환
            (document.querySelector('#computer') as HTMLElement).style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`
        }
    }, 100);
}

intervalMaker();

document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function(this: HTMLButtonElement ,e: Event){ //화살표함수아닌 곳에서 첫번째 매개변수에 this의 타입
        clearInterval(interval);
        setTimeout(intervalMaker, 2000);
        
        const myChoice = this.textContent as keyof RSP; //강제로 타입 변환 (textContent가 string|| null이므로)
        const myScore = score[myChoice];
        const computerScore = score[computerChoice(imgCoords)];
        const diff = myScore - computerScore;

        if(diff === 0){
            console.log('비겼습니다.')
        } else if([-1, 2].includes(diff)){
            console.log('이겼습니다!')
            // point++;
            // (document.querySelector('#point') as HTMLDivElement)!.textContent = point;
        } else{
            console.log('졌습니다ㅜ');
            // point--;
            // (document.querySelector('#point') as HTMLDivElement)!.textContent = point;
        }
    });
});

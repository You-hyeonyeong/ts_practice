const { body } = document;
let candidate: number[];
let array: number[];

function chooseNUmber(): void {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array = [];
    for (let i = 0; i < 3; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
}
function refresh() :void {
    input.value = '';
    input.focus();
}
chooseNUmber();
//console.log(array);

const result = document.createElement('h1');
body.append(result);
const form = document.createElement('form');
document.body.append(form);
const input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
const button = document.createElement('button');
button.textContent = '입력!';
form.append(button);

let wrongCount = 0;
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const answer = input.value;
    if(answer === array.join('')){ //답이 맞으면
    result.textContent = '홈 런~!'
    refresh();
    chooseNUmber();
    wrongCount = 0;
    } else {
        const answerArray = answer.split('');
        let strike = 0;
        let ball = 0;
        wrongCount  += 1;
        if(wrongCount > 10) { //10번 넘게 틀린 경우
            result.textContent = `실패입니다. 답은 ${array.join(',')}였습니다.`;
            refresh();
            chooseNUmber();
            wrongCount = 0;
        } else { //아직 답알려줄 시간 안되었을 경우
            for(let i =0; i <= 3; i++) {
                if(Number(answerArray[i]) === array[i]) {
                    console.log('위치가 맞는 스트라이크~!');
                    strike += 1;
                } else if (array.indexOf(Number(answerArray[i])) > -1){
                    console.log('숫자가 맞는 볼~!');
                    ball += 1;
                }
            }
            result.textContent = `${strike} 스트라이크 / ${ball} 볼`;
            refresh();
        }
    }
});
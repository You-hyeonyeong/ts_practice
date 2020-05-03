var body = document.body;
var candidate;
var array;
function chooseNUmber() {
    candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    array = [];
    for (var i = 0; i < 3; i += 1) {
        var chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
}
function refresh() {
    input.value = '';
    input.focus();
}
chooseNUmber();
console.log(array);
var result = document.createElement('h1');
body.append(result);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
var button = document.createElement('button');
button.textContent = '입력!';
form.append(button);
var wrongCount = 0;
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var answer = input.value;
    if (answer === array.join('')) { //답이 맞으면
        result.textContent = '홈 런~!';
        refresh();
        chooseNUmber();
        wrongCount = 0;
    }
    else {
        var answerArray = answer.split('');
        var strike = 0;
        var ball = 0;
        wrongCount += 1;
        if (wrongCount > 10) { //10번 넘게 틀린 경우
            result.textContent = "\uC2E4\uD328\uC785\uB2C8\uB2E4. \uB2F5\uC740 " + array.join(',') + "\uC600\uC2B5\uB2C8\uB2E4.";
            refresh();
            chooseNUmber();
            wrongCount = 0;
        }
        else { //아직 답알려줄 시간 안되었을 경우
            for (var i = 0; i <= 3; i++) {
                if (Number(answerArray[i]) === array[i]) {
                    console.log('위치가 맞는 스트라이크~!');
                    strike += 1;
                }
                else if (array.indexOf(Number(answerArray[i])) > -1) {
                    console.log('숫자가 맞는 볼~!');
                    ball += 1;
                }
            }
            result.textContent = strike + " \uC2A4\uD2B8\uB77C\uC774\uD06C / " + ball + " \uBCFC";
            refresh();
        }
    }
});

let oneNum = Math.ceil(Math.random() * 9);
let twoNum = Math.ceil(Math.random() * 9);
let result = oneNum * twoNum;

//html에 만들수 있는건데 타입스크립스테서 사용할 수 있도록 만들어 놓은것 HTMLDivElement
const word = document.createElement('div');
word.textContent = `${oneNum} 곱하기 ${twoNum}`;
document.body.append(word);

const form = document.createElement('form');
document.body.append(form);

const input = document.createElement('input');
input.type = 'number';
form.append(input);

const button = document.createElement('button');
button.textContent = '입력';
form.append(button);

const resultDiv = document.createElement('div');
document.body.append(resultDiv);

form.addEventListener('submit', (e) => {
   e.preventDefault(); 
   /* 현재 이벤트의 기본 동작 중단

   */
    if(result == Number(input.value)){ //===로 비교할때 타입을 찾아주는 것도 자스보다 훨 좋네
        resultDiv.textContent = "맞았습니다.";
        oneNum = Math.ceil(Math.random() * 9);
        twoNum = Math.ceil(Math.random() * 9);
        result = oneNum * twoNum;
        word.textContent = `${oneNum} 곱하기 ${twoNum}`;
        input.value = ''; //input 초기화
    } else { 
        resultDiv.textContent = "틀렸습니다.";
        input.value = ''; //input 초기화
        input.minLength = 1;
        input.focus(); //input에 포커싱 해두는 것
    }
})

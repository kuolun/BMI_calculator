
var btn = document.querySelector('button');



var alert = document.querySelector('.alert');

var BMI, height, weight;

var calculateBMI = function () {
    if (document.querySelector('.height').value === "" || !document.querySelector('.weight').value === "") {

        alert.textContent = '請輸入完整資料!';
        alert.style.color = 'red';
        alert.style.fontSize = '24px';
        return;
    }

    alert.textContent = '';
    height = parseInt(document.querySelector('.height').value);
    weight = parseInt(document.querySelector('.weight').value);



    // Math.pow 算冪次
    BMI = (weight / Math.pow((height / 100), 2)).toFixed(2);

    var result = document.querySelector('.result');

    if (BMI < 18.5) {
        btn.textContent = BMI;

        btn.style.color = '#31BAF9';
        btn.style.fontSize = '32px';
        btn.style.background = '#424242';
        btn.style.border = '3px solid #31BAF9';
        result.textContent = '過輕';
        result.style.color = '#31BAF9';

        saveToLocal(result.textContent, result.style.color);

    } else if (BMI >= 18.5 && BMI <= 23.9) {
        btn.textContent = BMI;
        btn.style.color = '#86D73F';
        btn.style.fontSize = '32px';
        btn.style.background = '#424242';
        btn.style.border = '3px solid #86D73F';
        result.textContent = '正常';
        result.style.color = '#86D73F';
        saveToLocal(result.textContent, result.style.color);

    } else if (BMI >= 24 && BMI <= 27.9) {
        btn.textContent = BMI;

        btn.style.color = '#FF982D';
        btn.style.fontSize = '32px';
        btn.style.background = '#424242';
        btn.style.border = '3px solid #FF982D';
        result.textContent = '超重';
        result.style.color = '#FF982D';
        saveToLocal(result.textContent, result.style.color);

    } else {
        btn.textContent = BMI;

        btn.style.color = '#FF1200';
        btn.style.fontSize = '32px';
        btn.style.background = '#424242';
        btn.style.border = '3px solid #FF1200';
        result.textContent = '肥胖';
        result.style.color = '#FF1200';
        saveToLocal(result.textContent, result.style.color);
    }

    // 清空inputbox內的值
    document.querySelector('.height').value = "";
    document.querySelector('.weight').value = "";



};


function saveToLocal(status, color) {
    var date = new Date();
    var record = {
        BMI: BMI,
        weight: weight,
        height: height,
        date: `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
        status: status,
        color: color
    };
    // 產生unique key
    var key = date.getTime();

    localStorage.setItem(key, JSON.stringify(record));

    showRecord();
}


function showRecord() {

    var RecItem = document.querySelector('.record');
    var str = '';
    str += `<div class='recordtitle'>BMI紀錄</div>`;


    for (var i = 0; i < localStorage.length; i++) {
        var name = localStorage.key(i);
        var value = localStorage.getItem(name);
        var valueObj = JSON.parse(value);
        str += `<ul style="border-left:3px solid ${valueObj.color}">
            <li>${valueObj.status}</li>
            <li>BMI ${valueObj.BMI}</li>
            <li>weight ${valueObj.weight}</li>
            <li>height ${valueObj.height}</li>
            <li>${valueObj.date}</li>
            </ul>`;
        RecItem.innerHTML = str;
    }


}



// add click event
btn.addEventListener('click', calculateBMI)


// 載入localStorage資料
showRecord();

let aa = '123';
let bg_data = {};

function kk() {
    console.log('dddd');
}

function getBgData() {
    return bg_data
}

function setBgData(data) {
    console.log('执行了');
    console.log(data);
    bg_data = data
}
import DanhSachNhiemVu from "./dsnhiemvu.js";
import Services from "./services.js";

let services = new Services();
let arr = []
const getEle = (id) => document.getElementById(id);

const getListTasks = () => {
    services.fetchData()
        .then((result) => {
            arr = result.data;
            console.log(result.data);
            renderHtml(arr);
        })
        .catch((error) => {
            console.log(error);
        })
}
getListTasks();

const renderHtml = (data) => {

    // const content = data.reduce((contentHTML, item) => {
    //     return (contentHTML += `
    //                      <li>
    //                      ${item.tenNhiemVu}
    //                      <div>
    //                         <i onclick ="xoaNhiemVu(${item.id})" style="line-height:30px;color:gray;cursor:pointer" class="fas fa-trash-alt"></i>
    //                         <i onclick ="nhiemVuHoanThanh(${item.id})"style="line-height:30px;color:gray;cursor:pointer" class="fas fa-check-circle"></i>
    //                      </div>

    //                      </li>

    //     `)
    // }, "")
    // getEle('todo').innerHTML = content; 
    let content = '';
    let complete = '';
    for (let i = 0; i < data.length; i++) {
        if (data[i].value == "") {
            content += `
                    <li class="borderhover">${data[i].tenNhiemVu}
                        <div class ="bluehover">
                                <i onclick ="xoaNhiemVu(${data[i].id})" style="line-height:30px;color:gray;cursor:pointer" class="fas fa-trash-alt"></i>
                                <i onclick ="nhiemVuHoanThanh(${data[i].id})"style="line-height:30px;color:gray;cursor:pointer" class="fas fa-check-circle"></i>
                        </div>
                    </li>
        `
        }

        getEle('todo').innerHTML = content;
        if (data[i].value == "check") {
            complete += `
                    <li style="border: 2px solid rgb(14, 195, 14);">${data[i].tenNhiemVu}
                        <div class ="bluehover">
                                <i onclick ="xoaNhiemVu(${data[i].id})" style="line-height:30px;color:gray;cursor:pointer;" class="fas fa-trash-alt"></i>
                                <i onclick ="nhiemVuHoanThanh(${data[i].id})"style="line-height:30px;color:rgb(14, 195, 14);cursor:pointer;" class="fas fa-check-circle"></i>
                        </div>
                    </li>
        `
        }
        getEle('completed').innerHTML = complete;
    }
}

const xoaNhiemVu = (id) => {
    if (confirm('Bạn có muốn xóa không')) {
        services.deleteTasks(id)
            .then(() => {
                getListTasks();
            })
            .catch((error) => {
                console.log(error);
            })
    }
}
window.xoaNhiemVu = xoaNhiemVu;

getEle('addItem').addEventListener('click', () => {
    let nhiemvu = getEle('newTask').value;
    let dsnhiemvu = new DanhSachNhiemVu("", "", nhiemvu);
    console.log(dsnhiemvu);
    if (nhiemvu) {
        services.addTasks(dsnhiemvu)
            .then(() => {
                getListTasks();
            })
    }
    getEle('newTask').value = "";
})

const nhiemVuHoanThanh = (id) => {
    console.log(id);
    let nhiemvu = "";
    let value = "";
    for (let i = 0; i < arr.length; i++) {

        if (id == arr[i].id) {
            // complete.push(arr[i])
            nhiemvu = arr[i].tenNhiemVu;
            value = "check";
        };
        console.log(nhiemvu);
    }
    let dsnhiemvu = new DanhSachNhiemVu(id, value, nhiemvu)
    services.updateTasks(dsnhiemvu)
        .then((result) => {
            console.log(result.data);
            getListTasks();
        })
        .catch((error) => {
            console.log(error);
        })


}
window.nhiemVuHoanThanh = nhiemVuHoanThanh;

getEle('two').onclick = function () {
    arr.sort((a, b) => (a.tenNhiemVu !== b.tenNhiemVu ? (a.tenNhiemVu < b.tenNhiemVu ? -1 : 1) : 0));
    renderHtml(arr);
}
getEle('three').onclick = function () {
    arr.sort((a, b) => (a.tenNhiemVu !== b.tenNhiemVu ? (a.tenNhiemVu < b.tenNhiemVu ? 1 : -1) : 0));
    renderHtml(arr);
}




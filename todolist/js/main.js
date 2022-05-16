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

    for (let i = 0; i < data.length; i++) {

        
        content += `
                    <li>${data[i].tenNhiemVu}
                        <div>
                                <i onclick ="xoaNhiemVu(${data[i].id})" style="line-height:30px;color:gray;cursor:pointer" class="fas fa-trash-alt"></i>
                                <i onclick ="nhiemVuHoanThanh(${data[i].id})"style="line-height:30px;color:gray;cursor:pointer" class="fas fa-check-circle"></i>
                        </div>
                    </li>
        `

    }
    getEle('todo').innerHTML = content; 
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
    let dsnhiemvu = new DanhSachNhiemVu("","", nhiemvu);
    console.log(dsnhiemvu);
    if (nhiemvu) {
        services.addTasks(dsnhiemvu)
            .then(() => {
                getListTasks();
            })
    }
    getEle('newTask').value = "";
})

// let complete = [];
const nhiemVuHoanThanh = (id) => {
    console.log(id);
    for (let i = 0; i < arr.length; i++) {
        
        if (id == arr[i].id) {
            // complete.push(arr[i])
            arr[i].value = "complete";

        };
        console.log(arr);
    }
    // console.log(complete);
    // renderComplete();
}
window.nhiemVuHoanThanh = nhiemVuHoanThanh;

// const renderComplete = () => {
//     let html = ""
//     for (let i = 0; i < complete.length; i++) {
//          html += `<li>${complete[i].tenNhiemVu}</li>`
//     }
//     getEle('completed').innerHTML = html;
// }
// window.renderComplete = renderComplete;
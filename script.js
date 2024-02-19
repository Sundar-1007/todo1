const inputfield = document.getElementById('inputfield');
let listsContainer = document.querySelector('.list-container');
let lists = document.querySelectorAll('.list-container li');
let loaderContainer = document.querySelector('.loader-container');
const loader = `<div class="loader">
<div class="lds-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
</div>`;

function handleSubmit(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (event.target.value.length > 0) {
            // createList(event.target.value)
            console.log(event.target.value);
            postData(event.target.value);
            event.target.value = '';
        }
        else {
            alert('give value')
        }
    }
}

// function createList(value) {
//     let createList = document.createElement('li');
//     let createtext = document.createTextNode(value);
//     createList.setAttribute('class', 'lists');
//     createList.addEventListener('click', strike);
//     createList.appendChild(createtext);
//     listsContainer.appendChild(createList);


//     addclosebtn(createList);
//     addEditBtn(createList);
// }

function strike() {
    this.classList.toggle('strike');
}

// lists.forEach(element => {
//     element.addEventListener('click', strike);
//     element.setAttribute('class', 'lists')
//     addclosebtn(element);
//     addEditBtn(element);
// });

// close btn syntax
function addclosebtn(list) {
    let createclosebtn = document.createElement('button');
    let createIcon = document.createElement('i');
    createIcon.setAttribute('class', 'bi bi-trash text-danger');
    createclosebtn.appendChild(createIcon);
    createclosebtn.addEventListener('click', close)
    list.appendChild(createclosebtn);
}

function close(event) {
    let element = this.parentNode;
    let attrName = element.getAttribute('key');
    element.style.transition = '.5s ease';
    element.style.opacity = '.5';
    setTimeout(() => {
        element.remove();
        deleteData(attrName);
    }, 500);
    event.stopImmediatePropagation();
}


// edit btn syntax

function addEditBtn(list) {
    let createBtn = document.createElement('button');
    let createIcon = document.createElement('i');
    createIcon.setAttribute('class', 'bi-pencil-square text-primary');
    createBtn.appendChild(createIcon);
    createBtn.addEventListener('click', handleEdit)
    list.appendChild(createBtn)
}

function handleEdit(event) {
    let newValue = prompt('Edit item:', this.parentNode.firstChild.nodeValue);

    let key = this.parentNode.getAttribute('key');
    // Check if the user clicked cancel or entered an empty value
    if (newValue !== null) {
        this.parentNode.firstChild.nodeValue = newValue.trim();
        updateData(newValue, key);
    }

    // Stop propagation to prevent triggering the strike event
    event.stopPropagation();
}


inputfield.addEventListener('keydown', handleSubmit);



let api = 'https://64c35105eb7fd5d6ebd0b965.mockapi.io/todo';
let store = [];

const fetchdata = async () => {
    try {
        loaderContainer.innerHTML = loader;
        let res = await fetch(api);
        if (res.status == 200) {
            listsContainer.innerHTML = '';
            const data = await res.json();
            store = await data;
            await store.map((data) => {
                const createElement = document.createElement('li');
                const textnode = document.createTextNode(data.todolist);
                createElement.appendChild(textnode);
                createElement.addEventListener('click', strike);
                createElement.setAttribute('class', 'lists');
                createElement.setAttribute('key', data.id);
                addclosebtn(createElement);
                addEditBtn(createElement);
                listsContainer.appendChild(createElement);
            })
            console.log(store);
        } else {
            console.log('api error: ' + res.status);
        }
    } catch (err) {
        console.error('Error:' + `fetch data is not working`);
    }finally{
        loaderContainer.innerHTML = ''
    }
}

const postData = async (newValue) => {
    try {
        let res = await fetch(api, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ todolist: newValue })
        })
        if (res.ok) {
            console.log('data insetred');
            await fetchdata();
        } else {
            console.log('api error: ' + res.status);
        };
    } catch {
        console.log('server eroor');
    }
};

let deleteData = async (id) => {
    let res = await fetch(api + '/' + id, {
        method: "DELETE",
    });
    if (res.ok) {
        console.log('task deleted successfully');
        await fetchdata();
    } else {
        console.log('task not deleted successfully');
    }
}

let updateData = async (newValue, id) => {
    let res = await fetch(api + '/' + id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todolist: newValue })
    });
    if (res.ok) {
        console.log('task updated successfully');
        await fetchdata();
    } else {
        console.log('task not updated successfully');
    }
}

fetchdata();
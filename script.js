const inputfield = document.getElementById('inputfield');
let listsContainer = document.querySelector('.list-container');
let lists = document.querySelectorAll('.list-container li');

function handleSubmit(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (event.target.value.length > 0) {
            createList(event.target.value)
            event.target.value = '';
        }
        else {
            alert('give value')
        }
    }
}

function createList(value) {
    let createList = document.createElement('li');
    let createtext = document.createTextNode(value);
    createList.setAttribute('class', 'lists');
    createList.addEventListener('click', strike);
    createList.appendChild(createtext);
    listsContainer.appendChild(createList);


    addclosebtn(createList);
    addEditBtn(createList);
}

function strike() {
    this.classList.toggle('strike');
}

lists.forEach(element => {
    element.addEventListener('click', strike);
    element.setAttribute('class', 'lists')
    addclosebtn(element);
    addEditBtn(element);
});

// close btn syntax
function addclosebtn(list){
    let createclosebtn = document.createElement('button');
    let createbtntext = document.createTextNode('x');
    createclosebtn.appendChild(createbtntext);
    createclosebtn.addEventListener('click', close)
    list.appendChild(createclosebtn);
}

function close(){
    let element = this.parentNode;
    element.style.transition = '.5s ease';
    element.style.opacity = '.5';
        setTimeout(() => {
            element.remove();
        }, 500);
    event.stopImmediatePropagation();
}


// edit btn syntax

function addEditBtn(list){
    let createBtn = document.createElement('button');
    let createText = document.createTextNode('edit');
    createBtn.appendChild(createText);
    createBtn.addEventListener('click', handleEdit)
    list.appendChild(createBtn)
}

function handleEdit() {
    let newValue = prompt('Edit item:', this.parentNode.firstChild.innerHTML || this.parentNode.firstChild.nodeValue);
    
    // Check if the user clicked cancel or entered an empty value
    if (newValue !== null) {
        this.parentNode.firstChild.innerHTML = newValue.trim();
        this.parentNode.firstChild.nodeValue = newValue.trim();
    }
    
    // Stop propagation to prevent triggering the strike event
    event.stopPropagation();
}


inputfield.addEventListener('keydown', handleSubmit)
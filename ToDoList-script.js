/* 1- Dom Variables*/
const currentDayTxt = document.querySelector('#currentDayTxt');
const currentDateTxt = document.querySelector('#currentDateTxt');
const currentTimeClockTxt = document.querySelector('#currentTimeClockTxt');
const button = document.querySelector("#enter");
const button2 = document.querySelector("#enter2");
const userInput = document.querySelector("#userInput");
const ul = document.querySelector("ul");
const dateValue = document.querySelector(".dateValue");
const dateInput = document.querySelector(".dateInput");

/* 2- Current Date and Time: */
const startTime = () => {
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const addZero = num => {
  if (num < 10) {num = `0${num}`};
  return num;
  }

  let currentSecond = addZero(today.getSeconds());
  let currentMinute = addZero(today.getMinutes());
  let currentHour = addZero(today.getHours());
  let currentDayName = days[today.getDay()];
  let currentDayNumber = addZero(today.getDate());
  let currentMonth = addZero(today.getMonth()+1);
  let currentYear = today.getFullYear();

  currentDayTxt.innerHTML = `${currentDayName}`;
  currentDateTxt.innerHTML = `${currentDayNumber} / ${currentMonth} / ${currentYear}`;
  currentTimeClockTxt.innerHTML = `${currentHour} : ${currentMinute} : ${currentSecond}`;
  setInterval(startTime, 1000);
}

/* 3- Creation's function: */
const inputLength = () => userInput.value.length;

const createListItem = () => {   
  let div = document.createElement("div");
  div.classList.add("item");
  ul.appendChild(div);

  div.innerHTML = `
    <button class="doneBtn"><i class="fas fa-check"></i></button>
    <button class="delBtn"><i class="fas fa-trash-alt"></i></button>
    <li class="itemTXT">${userInput.value}</li>
    <div id="date">
      <span class="dateValue">AT</span>
      <input type="datetime-local" class="dateInput">	
    </div>
    `
    userInput.value = ""
}

/* 4- Creation Events: */
const addItemOnClick = () => inputLength() > 0 ? createListItem() : false;
button.addEventListener("click", addItemOnClick);
button2.addEventListener("click", addItemOnClick);

const addItemOnKeypress = () => inputLength() > 0 && event.keyCode === 13 ? createListItem() : false;
userInput.addEventListener("keypress", addItemOnKeypress);


/* 5- Done, Delete & Date Events: */
const DoneItem = icon => {
  if(icon.target.className === "fas fa-check") {
    icon.target.parentElement.parentElement.children[2].classList.toggle("doneText");
    icon.target.parentElement.parentElement.classList.toggle("doneItem");
  }
}
ul.addEventListener("click", DoneItem);

const DeleteItem = icon => icon.target.className === "fas fa-trash-alt" ? icon.target.parentElement.parentElement.remove() : false;
ul.addEventListener("click", DeleteItem);

/* 6- addDate Event: */
//Changing the format and the order of the date and the time to become like this:
// hh:mm dd/mm/yyyy

const addDate = calendar => {
  if(calendar.target.className === "dateInput" && calendar.target.value !== "") {
    const dateInputValue = calendar.target.value;

    const day = dateInputValue.slice(8, 10);
    const month = dateInputValue.slice(5, 7);
    const year = dateInputValue.slice(0, 4);

    const time = dateInputValue.slice(11, 16);
    const fullDate = `${day}/${month}/${year}`;
    
    calendar.target.parentElement.children[0].innerText = (`AT ${time} OF ${fullDate} `);
  } else if(calendar.target.className === "dateInput" && c.target.value === "") {
    calendar.target.parentElement.children[0].innerText = (`AT`);
  }
}
ul.addEventListener("input", addDate);

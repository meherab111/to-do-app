let inputField = document.getElementById("inputField");

let btn = document.querySelector(".btn");

let todoListsElem = document.querySelector(".todoListsElem");

const showData = (currElem) => {
  let newTodoListElem = document.createElement("div");

  newTodoListElem.classList.add("newTodoListElem");

  newTodoListElem.innerHTML = `<li>${currElem}</li> <button class="deleteBtn">Delete</button>`;

  todoListsElem.append(newTodoListElem);

  inputField.value = "";
};

const getValueStorage = () => {
  return JSON.parse(localStorage.getItem("friendsValue"));
};

const setValueStorage = (inputArrayPara) => {
  localStorage.setItem("friendsValue", JSON.stringify(inputArrayPara));
};

let inputArray = getValueStorage() || [];

const clickBtn = (event) => {
  event.preventDefault();

  let inputFieldValue = inputField.value.trim();

  if (inputFieldValue !== "" && !inputArray.includes(inputFieldValue)) {
    inputArray.push(inputFieldValue);

    inputArray = [...new Set(inputArray)];

    localStorage.setItem("friendsValue", JSON.stringify(inputArray));

    showData(inputFieldValue);
  }

  inputField.value = "";
};

inputArray.forEach((currElem) => {
  showData(currElem);
});

const deleteBtn = (event) => {
  event.preventDefault();

  let findLiTagValue = event.target.previousElementSibling.innerText;

  let findDivTag = event.target.parentElement;

  inputArray = inputArray.filter((currElem) => {
    return currElem !== findLiTagValue;
  });

  setValueStorage(inputArray);

  findDivTag.remove();
};

todoListsElem.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteBtn")) {
    deleteBtn(event);
  }
});

btn.addEventListener("click", (event) => {
  clickBtn(event);
});

// ----INCOMES----
const incomeName = document.getElementById("income-name");
const incomeValue = document.getElementById("income-value");
const addIncomeButton = document.getElementById("add-income-button");
const incomesList = document.getElementById("incomes-list");

let incomes = [];

const addIncome = (e) => {
  e.preventDefault();

  let _income = {
    name: incomeName.value,
    value: Number(incomeValue.value),
    id: Math.random(),
  };

  incomes.push(_income); // -najpierw dane dodane do array
  addIncomeToList(_income); // - a potem do Listy('ul) Elementów

  console.log(_income);

  console.log(incomes);

  incomeName.value = "";
  incomeValue.value = "";
};
// --- Dodajemy poszczególne elementy do listy przychodów---

const addIncomeToList = (income) => {
  const listElement = document.createElement("li"); // -elementListy i do niego wrzucamy mane, value, editButton, removeButton
  listElement.classList.add("list-income-item");
  listElement.id = income.id;

  const name = document.createElement("p");
  name.innerText = income.name;

  const value = document.createElement("p");
  value.innerText = income.value;

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.classList.add("buttons-wrapper");

  const editButton = document.createElement("button");
  editButton.innerText = "Edytuj";
  editButton.id = income.id;

  const removeButton = document.createElement("button");
  removeButton.innerText = "Usuń";
  removeButton.id = income.id;

  listElement.appendChild(name);
  listElement.appendChild(value);

  buttonsWrapper.appendChild(editButton);
  buttonsWrapper.appendChild(removeButton);
  listElement.appendChild(buttonsWrapper);

  incomesList.appendChild(listElement); // -do listyPrzychodów (ul w HTML) wrzucamy elementListy stworzony w jsf

  removeButton.addEventListener("click", removeIncome);

  console.log(removeButton.id);
};

addIncomeButton.addEventListener("click", addIncome);

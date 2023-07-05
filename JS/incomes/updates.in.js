"use strict";

import { incomesList, incomesSum, displayCurrentBalance } from "../main.js";
import { incomes, deleteIncome, editIncomesList } from "./actions.in.js";

export const renderIncomesList = () => {
  incomesList.innerHTML = "";

  for (let income of incomes) {
    const listElement = document.createElement("li"); // -tworzy Element Listy wraz z: name, value, editButton, removeButton
    listElement.classList.add("list-income-item");
    listElement.id = income.id;

    const listElementWrapper = document.createElement("div");
    listElementWrapper.classList.add("income-list-element-wrapper");

    const name = document.createElement("p");
    name.innerText = income.name;

    const value = document.createElement("p");
    value.innerText = income.value;

    const buttonsWrapper = document.createElement("div"); // tworzy Wrapper dla obu przycisków (jakby Container)
    buttonsWrapper.classList.add("buttons-wrapper");

    const editButton = document.createElement("button");
    editButton.innerText = "Edytuj";
    editButton.id = income.id;

    const removeButton = document.createElement("button");
    removeButton.innerText = "Usuń";
    removeButton.id = income.id;

    buttonsWrapper.appendChild(editButton);
    buttonsWrapper.appendChild(removeButton);
    incomesList.appendChild(listElement); // -do listyPrzychodów (ul w HTML) wrzucamy elementListy stworzony w jsf

    listElementWrapper.appendChild(name);
    listElementWrapper.appendChild(value);
    listElementWrapper.appendChild(buttonsWrapper);

    listElement.appendChild(listElementWrapper);

    editButton.addEventListener("click", renderUpdateInputs);
    removeButton.addEventListener("click", deleteIncome);
  }

  calculateIncomesSum();
};

// ---funkcja do przycisku edit:
const renderUpdateInputs = (e) => {
  const id = e.target.id;
  const listElement = document.getElementById(id);

  if (document.getElementById(`update-${id}`)) {
    return false;
  }

  const updateInputsWrapper = document.createElement("div");
  updateInputsWrapper.id = `update-${id}`;

  const nameInput = document.createElement("input");
  nameInput.id = `update-name-${id}`;

  const incomeInput = document.createElement("input");
  incomeInput.type = "number";
  incomeInput.id = `update-income-${id}`;

  const saveButton = document.createElement("button");
  saveButton.innerText = "ZAPISZ";
  saveButton.id = `update-save-${id}`;

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "ANULUJ";
  cancelButton.id = `update-cancel-${id}`;

  updateInputsWrapper.appendChild(nameInput);
  updateInputsWrapper.appendChild(incomeInput);
  updateInputsWrapper.appendChild(saveButton);
  updateInputsWrapper.appendChild(cancelButton);

  listElement.appendChild(updateInputsWrapper);

  saveButton.addEventListener("click", editIncomesList);
  cancelButton.addEventListener("click", cancelEditInputs);
};

const cancelEditInputs = (e) => {
  e.preventDefault();

  const id = e.target.id.split("-")[2];
  const listElement = document.getElementById(id);
  const updateElement = document.getElementById(`update-${id}`);
  listElement.removeChild(updateElement);
  console.log(id);
};

const calculateIncomesSum = () => {
  const _incomesSum = incomes.reduce((acc, income) => {
    return acc + income.value;
  }, 0);

  incomesSum.innerText = _incomesSum;
  displayCurrentBalance();
};
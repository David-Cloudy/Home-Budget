"use strict";

import { incomesList, incomesSum, displayCurrentBalance } from "../main.js";
import { incomes, deleteIncome, editIncomesList } from "./actions.in.js";

export const renderIncomesList = () => {
  incomesList.innerHTML = "";

  for (let income of incomes) {
    const listElement = document.createElement("li");
    listElement.classList.add("list-income-item");
    listElement.id = income.id;

    const listElementWrapper = document.createElement("div");
    listElementWrapper.classList.add("income-list-element-wrapper");

    const name = document.createElement("p");
    name.classList.add("element-data");
    name.innerText = income.name;
    name.id = `income-item-name-${income.id}`;

    const value = document.createElement("p");
    value.classList.add("element-data");
    value.innerText = income.value;
    value.id = `income-item-value-${income.id}`;

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("buttons-wrapper");

    const editButton = document.createElement("button");
    editButton.innerText = "Edytuj";
    editButton.id = income.id;

    const removeButton = document.createElement("button");
    removeButton.innerText = "Usuń";
    removeButton.id = income.id;

    buttonsWrapper.appendChild(editButton);
    buttonsWrapper.appendChild(removeButton);
    incomesList.appendChild(listElement);

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
  const currentName = document.getElementById(
    `income-item-name-${id}`
  ).textContent;

  const currentValue = document.getElementById(
    `income-item-value-${id}`
  ).textContent;

  const updateInputsWrapper = document.createElement("form");
  updateInputsWrapper.classList.add("update-inputs-wrapper");
  updateInputsWrapper.id = `update-${id}`;

  const nameInput = document.createElement("input");
  nameInput.classList.add("element-data-input-update");
  nameInput.id = `update-name-${id}`;
  nameInput.required = true;
  nameInput.value = currentName;

  const incomeInput = document.createElement("input");
  incomeInput.classList.add("element-data-input-update");
  incomeInput.type = "number";
  incomeInput.id = `update-income-${id}`;
  incomeInput.required = true;
  incomeInput.min = "0.01";
  incomeInput.step = "0.01";
  incomeInput.value = currentValue;

  const saveButton = document.createElement("button");
  saveButton.innerText = "ZAPISZ";
  saveButton.type = "submit";
  saveButton.id = `update-save-${id}`;

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "ANULUJ";
  cancelButton.id = `update-cancel-${id}`;

  updateInputsWrapper.appendChild(nameInput);
  updateInputsWrapper.appendChild(incomeInput);
  updateInputsWrapper.appendChild(saveButton);
  updateInputsWrapper.appendChild(cancelButton);

  listElement.appendChild(updateInputsWrapper);

  updateInputsWrapper.addEventListener("submit", editIncomesList);
  cancelButton.addEventListener("click", cancelEditInputs);
};

const cancelEditInputs = (e) => {
  e.preventDefault();

  const id = e.target.id.split("-")[2];
  const listElement = document.getElementById(id);
  const updateElement = document.getElementById(`update-${id}`);
  listElement.removeChild(updateElement);
};

const calculateIncomesSum = () => {
  const _incomesSum = incomes.reduce((acc, income) => {
    return acc + income.value;
  }, 0);

  incomesSum.innerText = _incomesSum;
  displayCurrentBalance();
};

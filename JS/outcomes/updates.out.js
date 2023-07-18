"use strict";

import { outcomesList, outcomesSum, displayCurrentBalance } from "../main.js";
import { outcomes, deleteOutcome, editOutcomesList } from "./actions.out.js";

export const renderOutcomesList = () => {
  outcomesList.innerHTML = "";

  for (let outcome of outcomes) {
    const listElement = document.createElement("li");
    listElement.classList.add("list-outcome-item");
    listElement.id = outcome.id;

    const listElementWrapper = document.createElement("div");
    listElementWrapper.classList.add("outcome-list-element-wrapper");

    const name = document.createElement("p");
    name.classList.add("element-data");
    name.innerText = outcome.name;
    name.id = `outcome-item-name-${outcome.id}`;

    const value = document.createElement("p");
    value.classList.add("element-data");
    value.innerText = outcome.value;
    value.id = `outcome-item-value-${outcome.id}`;

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("buttons-wrapper");

    const editButton = document.createElement("button");
    editButton.innerText = "Edytuj";
    editButton.id = outcome.id;

    const removeButton = document.createElement("button");
    removeButton.innerText = "Usuń";
    removeButton.id = outcome.id;

    buttonsWrapper.appendChild(editButton);
    buttonsWrapper.appendChild(removeButton);
    outcomesList.appendChild(listElement);

    listElementWrapper.appendChild(name);
    listElementWrapper.appendChild(value);
    listElementWrapper.appendChild(buttonsWrapper);

    listElement.appendChild(listElementWrapper);

    editButton.addEventListener("click", renderUpdateInputs);
    removeButton.addEventListener("click", deleteOutcome);
  }

  calculateOutcomesSum();
};

// ---funkcja do przycisku edit:
const renderUpdateInputs = (e) => {
  const id = e.target.id;
  const listElement = document.getElementById(id);

  if (document.getElementById(`update-${id}`)) {
    return false;
  }
  const currentName = document.getElementById(
    `outcome-item-name-${id}`
  ).textContent;

  const currentValue = document.getElementById(
    `outcome-item-value-${id}`
  ).textContent;

  const updateInputsWrapper = document.createElement("form");
  updateInputsWrapper.classList.add("update-inputs-wrapper");
  updateInputsWrapper.id = `update-${id}`;

  const nameInput = document.createElement("input");
  nameInput.classList.add("element-data-input-update");
  nameInput.id = `update-name-${id}`;
  nameInput.required = true;
  nameInput.value = currentName;

  const outcomeInput = document.createElement("input");
  outcomeInput.classList.add("element-data-input-update");
  outcomeInput.type = "number";
  outcomeInput.id = `update-outcome-${id}`;
  outcomeInput.required = true;
  outcomeInput.min = "0.01";
  outcomeInput.step = "0.01";
  outcomeInput.value = currentValue;

  const saveButton = document.createElement("button");
  saveButton.innerText = "ZAPISZ";
  saveButton.id = `update-save-${id}`;
  saveButton.type = "submit";

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "ANULUJ";
  cancelButton.id = `update-cancel-${id}`;

  updateInputsWrapper.appendChild(nameInput);
  updateInputsWrapper.appendChild(outcomeInput);
  updateInputsWrapper.appendChild(saveButton);
  updateInputsWrapper.appendChild(cancelButton);

  listElement.appendChild(updateInputsWrapper);

  updateInputsWrapper.addEventListener("submit", editOutcomesList);
  cancelButton.addEventListener("click", cancelEditInputs);
};

const cancelEditInputs = (e) => {
  e.preventDefault();

  const id = e.target.id.split("-")[2];
  const listElement = document.getElementById(id);
  const updateElement = document.getElementById(`update-${id}`);
  listElement.removeChild(updateElement);
};

const calculateOutcomesSum = () => {
  const newOutcomesSum = outcomes.reduce((acc, outcome) => {
    return acc + outcome.value;
  }, 0);

  outcomesSum.innerText = newOutcomesSum;
  displayCurrentBalance();
};

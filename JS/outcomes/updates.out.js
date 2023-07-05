"use strict";

import { outcomesList, outcomesSum, displayCurrentBalance } from "../main.js";
import { outcomes, deleteOutcome, editOutcomesList } from "./actions.out.js";

export const renderOutcomesList = () => {
  outcomesList.innerHTML = "";

  for (let outcome of outcomes) {
    const listElement = document.createElement("li"); // -tworzy Element Listy wraz z: name, value, editButton, removeButton
    listElement.classList.add("list-outcome-item");
    listElement.id = outcome.id;

    const listElementWrapper = document.createElement("div");
    listElementWrapper.classList.add("outcome-list-element-wrapper");

    const name = document.createElement("p");
    name.innerText = outcome.name;

    const value = document.createElement("p");
    value.innerText = outcome.value;

    const buttonsWrapper = document.createElement("div"); // tworzy Wrapper dla obu przycisków (jakby Container)
    buttonsWrapper.classList.add("buttons-wrapper");

    const editButton = document.createElement("button");
    editButton.innerText = "Edytuj";
    editButton.id = outcome.id;

    const removeButton = document.createElement("button");
    removeButton.innerText = "Usuń";
    removeButton.id = outcome.id;

    buttonsWrapper.appendChild(editButton);
    buttonsWrapper.appendChild(removeButton);
    outcomesList.appendChild(listElement); // -do listyWydatkówów (ul w HTML) wrzucamy elementListy stworzony w js

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

  const updateInputsWrapper = document.createElement("div");
  updateInputsWrapper.id = `update-${id}`;

  const nameInput = document.createElement("input");
  nameInput.id = `update-name-${id}`;

  const outcomeInput = document.createElement("input");
  outcomeInput.type = "number";
  outcomeInput.id = `update-outcome-${id}`;

  const saveButton = document.createElement("button");
  saveButton.innerText = "ZAPISZ";
  saveButton.id = `update-save-${id}`;

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "ANULUJ";
  cancelButton.id = `update-cancel-${id}`;

  updateInputsWrapper.appendChild(nameInput);
  updateInputsWrapper.appendChild(outcomeInput);
  updateInputsWrapper.appendChild(saveButton);
  updateInputsWrapper.appendChild(cancelButton);

  listElement.appendChild(updateInputsWrapper);

  saveButton.addEventListener("click", editOutcomesList);
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

const calculateOutcomesSum = () => {
  const _outcomesSum = outcomes.reduce((acc, outcome) => {
    return acc + outcome.value;
  }, 0);

  outcomesSum.innerText = _outcomesSum;
  displayCurrentBalance();
};

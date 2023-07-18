"use strict";

import { incomeName, incomeValue } from "../main.js";
import { renderIncomesList } from "./updates.in.js";

export let incomes = [];

export const addIncome = (e) => {
  e.preventDefault();

  const newIncome = {
    name: incomeName.value,
    value: Number(incomeValue.value),
    id: Math.random().toString(),
  };

  incomes.push(newIncome); // - dodaje dane do tablicy

  renderIncomesList(); // -renderuje tablicę

  incomeName.value = "";
  incomeValue.value = "";
};

//- FUNKCJA do przycisku zapisz:
export const editIncomesList = (e) => {
  e.preventDefault();

  const idToEdit = e.target.id.split("-")[1];
  const nameValue = document.getElementById(`update-name-${idToEdit}`).value;
  const incomeValue = document.getElementById(
    `update-income-${idToEdit}`
  ).value;

  if (nameValue && incomeValue) {
    incomes = incomes.map((income) => {
      if (income.id === idToEdit) {
        return {
          ...income,
          name: nameValue,
          value: Number(incomeValue),
        };
      }
      return income;
    });
    renderIncomesList();
  }
};

//- FUNKCJA do przycisku usuń:
export const deleteIncome = (e) => {
  e.preventDefault();

  const idToDelete = e.target.id;

  incomes = incomes.filter((el) => el.id !== idToDelete);

  renderIncomesList();
};

"use strict";

import { addIncome } from "./incomes/actions.in.js";
import { addOutcome } from "./outcomes/actions.out.js";

export const incomeName = document.getElementById("income-name");
export const incomeValue = document.getElementById("income-value");
export const incomesList = document.getElementById("incomes-list");
export const incomesSum = document.getElementById("incomes-sum");

export const outcomeName = document.getElementById("outcome-name");
export const outcomeValue = document.getElementById("outcome-value");
export const outcomesList = document.getElementById("outcomes-list");
export const outcomesSum = document.getElementById("outcomes-sum");

const balanceInfoText = document.getElementById("info-text");

const inputIncomeValue = document.getElementById("income-value");

const addIncomeButton = document.getElementById("add-income-button");
const addOutcomeButton = document.getElementById("add-outcome-button");

addIncomeButton.addEventListener("click", addIncome);
addOutcomeButton.addEventListener("click", addOutcome);

export const displayCurrentBalance = () => {
  const income = Number(incomesSum.innerText);
  const outcome = Number(outcomesSum.innerText);

  if (income > outcome) {
    balanceInfoText.innerText = `Możesz jeszcze wydać ${
      income - outcome
    } złotych`;
  } else if (outcome > income) {
    balanceInfoText.innerText = `Bilans jest ujemny. Jesteś na minusie ${
      outcome - income
    } złotych`;
  } else {
    balanceInfoText.innerText = "Bilans wynosi zero";
  }
};

document.ready(function () {
  inputIncomeValue.keypress(function () {
    if (inputIncomeValue.value.length == 6) {
      return false;
    }
  });
});

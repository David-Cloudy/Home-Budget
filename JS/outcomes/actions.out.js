"use strict";

import { outcomeName, outcomeValue } from "../main.js";
import { renderOutcomesList } from "./updates.out.js";

export let outcomes = [];

export const addOutcome = (e) => {
  e.preventDefault();

  const _outcome = {
    name: outcomeName.value,
    value: Number(outcomeValue.value),
    id: Math.random().toString(),
  };

  outcomes.push(_outcome); // -najpierw dane dodaje do tablicy

  renderOutcomesList(); // -renderuje tablicę

  outcomeName.value = "";
  outcomeValue.value = "";
};

//- FUNKCJA do przycisku zapisz:
export const editOutcomesList = (e) => {
  e.preventDefault();

  const idToEdit = e.target.id.split("-")[2];
  const nameValue = document.getElementById(`update-name-${idToEdit}`).value;
  const outcomeValue = document.getElementById(
    `update-outcome-${idToEdit}`
  ).value;

  if (nameValue && outcomeValue) {
    outcomes = outcomes.map((outcome) => {
      if (outcome.id === idToEdit) {
        return {
          ...outcome,
          name: nameValue,
          value: Number(outcomeValue),
        };
      }
      return outcome;
    });
    renderOutcomesList();
  }
};

//- FUNKCJA do przycisku usuń:
export const deleteOutcome = (e) => {
  e.preventDefault();

  const idToDelete = e.target.id; //- jest to oznaczenie elementu, ktory mamy skasować identyfikując go po id

  outcomes = outcomes.filter((el) => el.id !== idToDelete); // -filtruje tablicę, pozbywając się elementów z id do skasowania

  renderOutcomesList();
};

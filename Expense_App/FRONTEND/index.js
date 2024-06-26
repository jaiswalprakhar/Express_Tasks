import { handleFormSubmit } from "./expense.js";

const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);
import { handleFormSubmit } from "./booking.js";

const form = document.querySelector("form");
form.addEventListener('submit', handleFormSubmit);
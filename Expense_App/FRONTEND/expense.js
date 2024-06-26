const expenseTable = document.querySelector('.expense-table');

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/admin/get-expense")
    .then((response) => {
        for(let i = 0; i < response.data.allExpenses.length; i++)
        {
            showExpenses(response.data.allExpenses[i]);
        }
        console.log("All Expenses are being displayed");
    })
    .catch((err) => {
        console.log(err);
        showErrors(err);
    })
});

export function handleFormSubmit(event){
    event.preventDefault();
        const amount= event.target.amount.value;
        const description= event.target.description.value;
        const category= event.target.category.value;
    let myobj = {
        amount: amount,
        description: description,
        category: category
    }

    event.target.amount.value = "";
    event.target.description.value = "";
    event.target.category.value = "Choose Category";
    createExpense(myobj);
}

const createExpense = (obj) => {
    axios.post("http://localhost:3000/admin/create-expense", obj)
        .then((response) => {
            showExpenses(response.data.newExpense);
            console.log(response.data.message);
        })
        .catch((err) => {
            console.log(err);            
            showErrors(err);
        })
}

const showExpenses = (expense) => {
    const childNode = `<tr id = ${expense.id} class="text-center active-row">
                        <th scope="row">${expense.id}</th>
                        <td>${expense.amount}</td>
                        <td>${expense.description}</td>
                        <td>${expense.category}</td>
                        <td><button class="btn btn-success m-1" onclick = deleteExpense('${expense.id}')> Delete </button>
                        <button class="btn btn-success m-1" onclick = getEditExpense('${expense.id}')> Edit </button></td>
                       </tr>`;
    expenseTable.innerHTML = expenseTable.innerHTML + childNode;
}

const showErrors = (err) => {
    for(let i = 0; i < err.response.data.errorMessage.errors.length; i++)
    {
        const childNode = `<tr class="active-row">
                            <th scope="row" class="text-center">Error</th>
                            <td colspan="4">Something went wrong: ${err.response.data.errorMessage.errors[i].message}</td>                
                           </tr>`;
        expenseTable.innerHTML = expenseTable.innerHTML + childNode;
    }
}

window.deleteExpense = (expenseId) => {
    axios.delete(`http://localhost:3000/admin/delete-expense/${expenseId}`)
    .then((response) => {
        console.log(response.message);
        removeExpense(expenseId);
    })
    .catch((err) => {
        console.log(err.errorMessage);
    })
}

const removeExpense = (expenseId) => {
    const childElement = document.getElementById(expenseId);
    if(childElement)
    {
        expenseTable.removeChild(childElement);
    }
}

const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const addButton = document.getElementById('addExpense');
const editButton = document.getElementById('editExpense');

window.getEditExpense = (expenseId) => {
    axios.get(`http://localhost:3000/admin/get-edit-expense/${expenseId}`) 
    .then((response) => {
        console.log(response.data.message);
        console.log(response.data.expense);

        amount.value = response.data.expense.amount;
        description.value = response.data.expense.description;
        category.value = response.data.expense.category;

       removeExpense(expenseId);

        editButton.disabled = false;
        addButton.disabled = true;
        editButton.onclick = (event) =>  {
            console.log("Edit Button clicked");

            let myobj = {
                amount: amount.value,
                description: description.value,
                category: category.value
            }
            amount.value = "";
            description.value = "";
            category.value = "Choose Category"

            postEditExpense(response.data.expense.id, myobj);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

const postEditExpense = (expenseId, obj) => {
    axios.patch(`http://localhost:3000/admin/post-edit-expense/${expenseId}`, obj)
        .then((response) => {
            showExpenses(response.data.editedExpense);
            console.log(response.data.message);
        })
        .catch((err) => {
            console.log(err);            
            showErrors(err);
        })
        editButton.disabled = true;
        addButton.disabled = false;
}
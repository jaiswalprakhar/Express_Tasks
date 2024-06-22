const ul = document.getElementById('bookedAppointment');

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/admin/get-appointment")
    .then((response) => {
        //console.log(response);
        console.log(response.data);
        for(let i = 0; i < response.data.allAppointments.length; i++)
        {
            showBooking(response.data.allAppointments[i]);
        }
        //console.log(document.getElementById('bus').value);
        console.log("All Appointments are being displayed");
    })
    .catch((err) => {
        ul.innerHTML = ul.innerHTML + `<h4>Something went wrong(${err.errorMessage})</h4>`;
        console.log(err);
    })
});

export const handleFormSubmit = (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const emailID = event.target.emailID.value;
    const phoneNumber = event.target.phoneNumber.value;
       const obj = {
        userName,
        emailID,
        phoneNumber
    }

    event.target.userName.value = "";
    event.target.emailID.value = "";
    event.target.phoneNumber.value = "";

    createBooking(obj);
}

const createBooking = (obj) => {
axios.post("http://localhost:3000/admin/create-appointment", obj)
    .then((response) => {
        /* For redirecting to page -
        if(response.data.redirect)
        {
            window.location.href = response.data.redirect;
        }*/
        showBooking(response.data.newUserDetail);
        console.log(response.data.message);
    })
    .catch((err) => {
        console.log(err);
        const childNode = `<li class="booking list-group-item fw-semibold"> Something went wrong ${err}</li>`;
        ul.innerHTML = ul.innerHTML + childNode;
    })
}

const showBooking = (user) => {
    const childNode = `<li id = ${user.id} class="booking list-group-item fw-semibold"> ${user.userName} ${user.emailID} ${user.phoneNumber}
                        <button class="btn btn-primary m-1" onclick = deleteBooking('${user.id}')> Delete </button>                
                        </li>`;
    ul.innerHTML = ul.innerHTML + childNode;
}

window.deleteBooking = (userId) => {
    //console.log(userId);
    axios.delete(`http://localhost:3000/admin/delete-appointment/${userId}`)
    .then((response) => {
        console.log(response.message);
        removeBooking(userId);
    })
    .catch((err) => {
        console.log(err.errorMessage);
    })
}

const removeBooking = (userId) => {
    const childElement = document.getElementById(userId);
    if(childElement)
    {
        ul.removeChild(childElement);
    }
}
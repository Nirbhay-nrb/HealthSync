// Deleting the timing
async function deleteAppointment(appointmentId) {
    try {
        // make the API call to delete the timing with the specified ID
        await fetch(`http://localhost:3000/appointments/delete/${appointmentId}`, {
            method: "DELETE"
        });
        // remove the timing from the DOM
        const appointmentListItem = document.getElementById(`appointment-${appointmentId}`);
        appointmentListItem.remove();
    } catch (error) {
        console.error(error);
    }
}

async function populateAppointments() {
    // get the doctor ID from local storage
    const patientId = localStorage.getItem("userId");
    console.log(patientId);
    // make the API call to get the timings for the doctor ID
    await fetch(`http://localhost:3000/appointments/patient/${patientId}`)
        .then(response => response.json())
        .then(appointments => {
            // get the appointment list element
            const appointmentDiv = document.getElementById("appointment-list");
            const heading = document.createElement("h3");
            heading.innerHTML = "Upcoming meetings";
            appointmentDiv.appendChild(heading);
            const appointmentList = document.createElement("ul");

            // loop through the appointments and add them as list items to the timing list element
            appointments.forEach(appointment => {
                console.log(appointment._id);
                const appointmentListItem = document.createElement("li");
                appointmentListItem.setAttribute("id", `appointment-${appointment._id}`);
                appointmentListItem.innerHTML = `
            <span class="appointment-day">${appointment.timingId.dayOfWeek}</span>
            <span class="appointment-name">${appointment.timingId.startTime} to ${appointment.timingId.endTime}</span>
            <span class="appointment-location">${appointment.timingId.location}</span>
            <span class="appointment-roomno">${appointment.timingId.roomNo}</span>
            <span class="appointment-doctor">${appointment.patientId.name}</span>
            <span class="appointment-patient">Dr. ${appointment.doctorId.name}</span>
            <button class="delete-button" id="${appointment._id}">Delete</button>
        `;
                const delButton = appointmentListItem.querySelector(".delete-button");
                delButton.addEventListener("click", () => {
                    console.log('delete button clicked');
                    deleteAppointment(appointment._id);
                });
                appointmentList.appendChild(appointmentListItem);
            });

            appointmentDiv.appendChild(appointmentList);
        })
        .catch(error => console.error(error));
}

// book appointment
async function bookAppointment(timingId, doctorId, patientId) {
    try {
        // make the API call to book the appointment
        const response = await fetch(`http://localhost:3000/appointments/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "timingId": timingId,
                "doctorId": doctorId,
                "patientId": patientId,
                "date": new Date().toISOString().slice(0, 10),
            })
        });
        if (response.ok) {
            alert("Appointment booked successfully");
            const appointmentDiv = document.getElementById("appointment-list");
            appointmentDiv.innerHTML = "";
            populateAppointments();
        } else {
            alert("Appointment booking failed");
        }
    } catch (error) {
        console.error(error);
    }
}


// getting the list of all the timings
async function populateTimings() {
    const patientId = localStorage.getItem("userId");
    const timingsList = document.getElementById('timing-list');
    // Fetch the list of timings from the server
    await fetch('http://localhost:3000/timings/getAll')
        .then(response => response.json())
        .then(timings => {
            // get the appointment list element
            const timingDiv = document.getElementById("timing-list");
            const heading = document.createElement("h3");
            heading.innerHTML = "Available timings of each doctor";
            timingDiv.appendChild(heading);
            const timingsList = document.createElement("ul");

            // loop through the appointments and add them as list items to the timing list element
            timings.forEach(timing => {
                console.log(timing._id);
                const timingListItem = document.createElement("li");
                timingListItem.setAttribute("id", `timing-${timing._id}`);
                timingListItem.innerHTML = `
            <span class="timing-doctor-name">${timing.doctorId.name}</span>
            <span class="timing-day">${timing.dayOfWeek}</span>
            <span class="timing-name">${timing.startTime} to ${timing.endTime}</span>
            <span class="timing-location">${timing.location}</span>
            <span class="timing-roomno">${timing.roomNo}</span>
            <button class="book-button" id="${timing._id}">Book</button>
        `;
                const bookButton = timingListItem.querySelector(".book-button");
                bookButton.addEventListener("click", () => {
                    console.log('book button clicked');
                    console.log(timing._id, timing.doctorId._id, patientId);
                    bookAppointment(timing._id, timing.doctorId._id, patientId);
                });
                timingsList.appendChild(timingListItem);
            });

            timingDiv.appendChild(timingsList);
        })
        .catch(error => console.error(error));
}



// getting the Patient profile
function populatePatientProfile() {
    // Retrieve Patient user ID from local storage
    const patientId = localStorage.getItem("userId");
    console.log(patientId);
    // Send GET request to API to retrieve doctor profile
    fetch(`http://localhost:3000/patprofile/get/${patientId}`)
        .then((response) => response.json())
        .then((data) => {
            // Populate form fields with retrieved data
            document.getElementById("patient-name").innerHTML = data.name;
            document.getElementById("name").value = data.name;
            document.getElementById("dob").value = data.dob;
            document.getElementById("gender").value = data.gender;
            document.getElementById("email").value = data.email;
            document.getElementById("phone").value = data.phone;
            document.getElementById("height").value = data.height;
            document.getElementById("weight").value = data.weight;
            document.getElementById("blood-group").value = data.bloodGroup;
            document.getElementById("medical-conditions").value =
                data.medicalConditions;
        })
        .catch((error) => console.error(error));
}

// getting the list of all doctors
async function populateDoctorsList() {
    const doctorsList = document.getElementById('doctors-row');
    // Fetch the list of doctors from the server
    await fetch('http://localhost:3000/docprofile/list')
        .then(response => response.json())
        .then(doctors => {
            // Create an unordered list to hold the doctors

            // Loop through each doctor and create a list item for them
            doctors.forEach(doctor => {
                const doctorDiv = document.createElement('div');
                doctorDiv.setAttribute('class', 'doctor');
                const doctorInfo = document.createElement('div');
                doctorInfo.setAttribute('class', 'doctor-info');
                // const doctorImage = document.createElement('img');
                const doctorName = document.createElement('h3');
                const doctorSpecialty = document.createElement('p');
                const doctorExperience = document.createElement('p');

                // Set the doctor information
                // doctorImage.src = `imgs/doc1.png`;
                // doctorImage.alt = `Doctor ${doctor.id}`;
                doctorName.textContent = doctor.name;
                doctorSpecialty.textContent = `Specialty: ${doctor.speciality}`;
                doctorExperience.textContent = `Handles ages: ${doctor.ageGroup} years`;

                // Add the doctor information to the list item
                // doctorInfo.appendChild(doctorImage);
                doctorInfo.appendChild(doctorName);
                doctorInfo.appendChild(doctorSpecialty);
                doctorInfo.appendChild(doctorExperience);
                doctorDiv.appendChild(doctorInfo);

                // Add the list item to the doctors list
                doctorsList.appendChild(doctorDiv);
            });

        })
        .catch(error => {
            console.error(error);
        });

}

// delete a particular doc
async function deleteDoc(docId) {
    console.log(docId);
    try {
        const response = await fetch(`http://localhost:3000/documents/delete/${docId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            const data = await response.json();
            alert("Document deleted");
            const docDiv = document.getElementById(`doc-${docId}`);
            docDiv.remove();
        } else {
            alert("Error deleting document");
        }
    } catch (error) {
        console.error(error);
    }
}

// populating the documents list
async function populateDocuments() {
    // get the doctor ID from local storage
    const patientId = localStorage.getItem("userId");
    console.log(patientId);
    // make the API call to get the timings for the doctor ID
    await fetch(`http://localhost:3000/documents/patient/${patientId}`)
        .then(response => response.json())
        .then(docs => {
            // get the timing list element
            console.log(docs);
            const docDiv = document.getElementById("document-list");
            const heading = document.createElement("h3");
            heading.innerHTML = "All documents";
            docDiv.appendChild(heading);
            const docList = document.createElement("ul");

            // loop through the timings and add them as list items to the timing list element
            docs.forEach(doc => {
                console.log(doc._id);
                const docListItem = document.createElement("li");
                docListItem.setAttribute("id", `doc-${doc._id}`);
                docListItem.innerHTML = `
            <span class="document-name">${doc.name}</span>
            <span class="document-date">${doc.dateOfUpload}</span>
            <button class="delete-button" id="${doc._id}">Delete</button>
        `;
                const docNameButton = docListItem.querySelector(".document-name");
                docNameButton.addEventListener("click", () => {
                    console.log(doc.path);
                    window.location.href = `http://127.0.0.1:5500/backend/${doc.path}`;
                });
                const delButton = docListItem.querySelector(".delete-button");
                delButton.addEventListener("click", () => {
                    deleteDoc(doc._id);
                });
                docList.appendChild(docListItem);
            });

            docDiv.appendChild(docList);
        })
        .catch(error => console.error(error));
}

window.onload = function () {
    populatePatientProfile();
    populateDoctorsList();
    populateDocuments();
    populateAppointments();
    populateTimings();
};


// updating doctor profile

async function updatePatientProfile() {
    const id = localStorage.getItem("userId");
    console.log(id);
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const gender = document.getElementById("gender").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const bloodGroup = document.getElementById("blood-group").value;
    const medicalConditions = document.getElementById(
        "medical-conditions"
    ).value;

    try {
        const response = await fetch(`http://localhost:3000/patprofile/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": name,
                "dob": dob,
                "email": email,
                "phone": phone,
                "gender": gender,
                "height": height,
                "weight": weight,
                "bloodGroup": bloodGroup,
                "medicalConditions": medicalConditions,

            }),
        });

        if (response.ok) {
            const data = await response.json();
            alert("Patient profile updated");
        } else {
            alert("Patient profile update failed");
        }
    } catch (error) {
        console.error(error);
        alert("Patient profile update failed - catch block");
    }
}

document.getElementById("update").addEventListener("click", (event) => {
    event.preventDefault();
    updatePatientProfile();
});

// uploading a document 
async function uploadDocument() {
    const patientId = localStorage.getItem("userId");
    const fileInput = document.getElementById("document-file");
    const fileName = document.getElementById("document-name").value;
    const date = new Date().toISOString();
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("patientId", patientId);
    formData.append("name", fileName);
    formData.append("dateOfUpload", date);
    console.log(fileInput, fileName, patientId, date);

    const blob = new Blob([formData], { type: "multipart/form-data" });
    const contentLength = blob.size;
    console.log(contentLength);

    try {
        const response = await fetch("http://localhost:3000/documents/upload", {
            method: "POST",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                "Content-Length": contentLength.toString(),
            },
            body: formData,
        });

        if (response.ok) {
            // const data = await response.json();
            alert("Document uploaded");
            // add document to UI
            const docDiv = document.getElementById("document-list");
            docDiv.innerHTML = "";
            populateDocuments();
        } else {
            alert("Document upload failed");
        }
    } catch (error) {
        console.error(error);
        alert("Document upload failed - catch block");
    }

}

document.getElementById("upload-doc").addEventListener("click", (event) => {
    event.preventDefault();
    console.log("uploading document button clicked");
    uploadDocument();
});

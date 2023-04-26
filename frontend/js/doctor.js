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
  const doctorID = localStorage.getItem("userId");
  console.log(doctorID);
  // make the API call to get the timings for the doctor ID
  await fetch(`http://localhost:3000/appointments/doctor/${doctorID}`)
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
          <span class="appointment-doctor">${appointment.doctorId.name}</span>
          <span class="appointment-patient">${appointment.patientId.name}</span>
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

// getting the doctor profile

function populateDoctorProfile() {
  // Retrieve doctor user ID from local storage
  const doctorId = localStorage.getItem("userId");

  // Send GET request to API to retrieve doctor profile
  fetch(`http://localhost:3000/docprofile/get/${doctorId}`)
    .then((response) => response.json())
    .then((data) => {
      // Populate form fields with retrieved data
      document.getElementById("doctor-name").innerHTML = data.name;
      document.getElementById("name").value = data.name;
      document.getElementById("dob").value = data.dob;
      document.getElementById("gender").value = data.gender;
      document.getElementById("email").value = data.email;
      document.getElementById("phone").value = data.phone;
      document.getElementById("speciality").value = data.speciality;
      document.getElementById("age-group").value = data.ageGroup;
      document.getElementById("highest-qualification").value =
        data.highestQualification;
      document.getElementById("achievements").value = data.achievements;
    })
    .catch((error) => console.error(error));
}
// getting the list of all patients
async function populatePatientsList() {
  const patientsList = document.getElementById('patients-row');
  // Fetch the list of patients from the server
  await fetch('http://localhost:3000/patprofile/list')
    .then(response => response.json())
    .then(patients => {
      // Create an unordered list to hold the doctors

      // Loop through each patient and create a list item for them
      patients.forEach(patient => {
        const patientDiv = document.createElement('div');
        patientDiv.setAttribute('class', 'patient');
        const patientInfo = document.createElement('div');
        patientInfo.setAttribute('class', 'patient-info');
        // const patientImage = document.createElement('img');
        const patientName = document.createElement('h3');
        const patientSpecialty = document.createElement('p');
        const patientExperience = document.createElement('p');

        // Set the doctor information
        // patientImage.src = `imgs/doc1.png`;
        // patientImage.alt = `Doctor ${patient.id}`;
        patientName.textContent = patient.name;
        patientSpecialty.textContent = `Gender: ${patient.gender}`;
        patientExperience.textContent = `DOB: ${patient.dob}`;

        // Add the doctor information to the list item
        // patientInfo.appendChild(patientImage);
        patientInfo.appendChild(patientName);
        patientInfo.appendChild(patientSpecialty);
        patientInfo.appendChild(patientExperience);
        patientDiv.appendChild(patientInfo);

        // Add the list item to the doctors list
        patientsList.appendChild(patientDiv);
      });

    })
    .catch(error => {
      console.error(error);
    });

}

// Deleting the timing
async function deleteTiming(timingId) {
  try {
    // make the API call to delete the timing with the specified ID
    await fetch(`http://localhost:3000/timings/delete/${timingId}`, {
      method: "DELETE"
    });

    // remove the timing from the DOM
    const timingListItem = document.getElementById(`timing-${timingId}`);
    timingListItem.remove();
  } catch (error) {
    console.error(error);
  }
}

async function populateTimings() {
  // get the doctor ID from local storage
  const doctorID = localStorage.getItem("userId");
  console.log(doctorID);
  // make the API call to get the timings for the doctor ID
  await fetch(`http://localhost:3000/timings/get/${doctorID}`)
    .then(response => response.json())
    .then(timings => {
      // get the timing list element
      const timingDiv = document.getElementById("timing-list");
      const heading = document.createElement("h3");
      heading.innerHTML = "All Timings";
      timingDiv.appendChild(heading);
      const timingList = document.createElement("ul");

      // loop through the timings and add them as list items to the timing list element
      timings.forEach(timing => {
        console.log(timing._id);
        const timingListItem = document.createElement("li");
        timingListItem.setAttribute("id", `timing-${timing._id}`);
        timingListItem.innerHTML = `
          <span class="timing-day">${timing.dayOfWeek}</span>
          <span class="timing-name">${timing.startTime} to ${timing.endTime}</span>
          <span class="timing-location">${timing.location}</span>
          <span class="timing-roomno">${timing.roomNo}</span>
          <button class="delete-button" id="${timing._id}">Delete</button>
      `;
        const delButton = timingListItem.querySelector(".delete-button");
        delButton.addEventListener("click", () => {
          deleteTiming(timing._id);
        });
        timingList.appendChild(timingListItem);
      });

      timingDiv.appendChild(timingList);
    })
    .catch(error => console.error(error));
}

window.onload = function () {
  populateDoctorProfile();
  populatePatientsList();
  populateTimings();
  populateAppointments();
};


// updating doctor profile

async function updateDoctorProfile() {
  const id = localStorage.getItem("userId");
  console.log(id);
  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const gender = document.getElementById("gender").value;
  const speciality = document.getElementById("speciality").value;
  const ageGroup = document.getElementById("age-group").value;
  const highestQualification = document.getElementById(
    "highest-qualification"
  ).value;
  const achievements = document.getElementById("achievements").value;

  try {
    const response = await fetch(`http://localhost:3000/docprofile/update/${id}`, {
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
        "speciality": speciality,
        "ageGroup": ageGroup,
        "highestQualification": highestQualification,
        "achievements": achievements,
        // "timings": [],
        // "patients": [],
        // "appointments": [],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Doctor profile updated");
    } else {
      alert("Doctor profile update failed");
    }
  } catch (error) {
    console.error(error);
    alert("Doctor profile update failed - catch block");
  }
}

document.getElementById("update").addEventListener("click", (event) => {
  event.preventDefault();
  updateDoctorProfile();
});

// uploading a new timing
async function addTiming() {
  const doctorId = localStorage.getItem("userId");
  const dayOfWeek = document.getElementById("day-select").value;
  const startTime = document.getElementById("time-from-select-start").value;
  const endTime = document.getElementById("time-to-select-end").value;
  const location = document.getElementById("location-input").value;
  const roomNo = document.getElementById("room-input").value;
  console.log(doctorId, dayOfWeek, startTime, endTime, location, roomNo);

  try {
    const response = await fetch(`http://localhost:3000/timings/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "doctorId": doctorId,
        "dayOfWeek": dayOfWeek,
        "startTime": startTime,
        "endTime": endTime,
        "location": location,
        "roomNo": roomNo,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Timing added successfully");
      // updating the UI
      const timingDiv = document.getElementById("timing-list");
      while (timingDiv.firstChild) {
        timingDiv.removeChild(timingDiv.firstChild);
      }
      populateTimings();
    } else {
      alert("Timing addition failed");
    }
  } catch (error) {
    console.error(error);
    alert("Timing addition failed - catch block");
  }
}

document.getElementById("timing-add").addEventListener("click", (event) => {
  event.preventDefault();
  addTiming();
});

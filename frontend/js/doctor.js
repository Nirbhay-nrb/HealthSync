// getting the doctor profile

function populateDoctorProfile() {
  // Retrieve doctor user ID from local storage
  const doctorId = localStorage.getItem("userId");

  // Send GET request to API to retrieve doctor profile
  fetch(`http://localhost:3000/docprofile/get/${doctorId}`)
    .then((response) => response.json())
    .then((data) => {
      // Populate form fields with retrieved data
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
              const patientImage = document.createElement('img');
              const patientName = document.createElement('h3');
              const patientSpecialty = document.createElement('p');
              const patientExperience = document.createElement('p');

              // Set the doctor information
              patientImage.src = `imgs/doc1.png`;
              patientImage.alt = `Doctor ${patient.id}`;
              patientName.textContent = patient.name;
              patientSpecialty.textContent = `Gender: ${patient.gender}`;
              patientExperience.textContent = `DOB: ${patient.dob}`;

              // Add the doctor information to the list item
              patientInfo.appendChild(patientImage);
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

window.onload = function() {
  populateDoctorProfile();
  populatePatientsList();  
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

document.getElementById("update").addEventListener("click", () => {
  updateDoctorProfile();
});



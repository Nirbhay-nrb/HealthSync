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
                const doctorImage = document.createElement('img');
                const doctorName = document.createElement('h3');
                const doctorSpecialty = document.createElement('p');
                const doctorExperience = document.createElement('p');

                // Set the doctor information
                doctorImage.src = `imgs/doc1.png`;
                doctorImage.alt = `Doctor ${doctor.id}`;
                doctorName.textContent = doctor.name;
                doctorSpecialty.textContent = `Specialty: ${doctor.specialty}`;
                doctorExperience.textContent = `Handles ages: ${doctor.ageGroup} years`;

                // Add the doctor information to the list item
                doctorInfo.appendChild(doctorImage);
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

window.onload = function() {
    populatePatientProfile();
    populateDoctorsList();
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

document.getElementById("update").addEventListener("click", () => {
    updatePatientProfile();
});
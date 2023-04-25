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

window.onload = populatePatientProfile;


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
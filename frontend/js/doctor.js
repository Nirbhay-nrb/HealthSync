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

window.onload = populateDoctorProfile;


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



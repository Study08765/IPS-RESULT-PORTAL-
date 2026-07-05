import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.getElementById("saveBtn").addEventListener("click", async () => {

  const roll = document.getElementById("roll").value.trim();

  if (!roll) {
    alert("Roll Number is required");
    return;
  }

  const student = {
    Name: document.getElementById("name").value,
    Father: document.getElementById("father").value,
    Class: document.getElementById("class").value,

    Hindi: Number(document.getElementById("hindi").value),
    English: Number(document.getElementById("english").value),
    Mathematics: Number(document.getElementById("mathematics").value),
    Science: Number(document.getElementById("science").value),
    SocialScience: Number(document.getElementById("socialscience").value),

    Result: "PASS"
  };

  try {
    await setDoc(doc(db, "students", roll), student);

    alert("✅ Student Saved Successfully");

    document.getElementById("roll").value = "";
    document.getElementById("name").value = "";
    document.getElementById("father").value = "";
    document.getElementById("class").value = "";
    document.getElementById("hindi").value = "";
    document.getElementById("english").value = "";
    document.getElementById("mathematics").value = "";
    document.getElementById("science").value = "";
    document.getElementById("socialscience").value = "";

  } catch (error) {
    alert("❌ Error: " + error.message);
  }

});

import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.searchResult = async function () {

  const roll = document.getElementById("roll").value.trim();

  if (!roll) {
    alert("Roll Number Enter Kare");
    return;
  }

  const ref = doc(db, "students", roll);
  const snap = await getDoc(ref);

  if (snap.exists()) {

    const s = snap.data();

    document.getElementById("result").innerHTML = `
      <h2>${s.Name}</h2>
      <p><b>Roll No:</b> ${roll}</p>
      <p><b>Class:</b> ${s.Class}</p>
      <p><b>Total:</b> ${s.Total}</p>
      <p><b>Result:</b> <span style="color:green">${s.Result}</span></p>
    `;

  } else {

    document.getElementById("result").innerHTML =
      "<h2 style='color:red'>Result Not Found</h2>";

  }

}

import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tbody = document.getElementById("students");

async function loadStudents() {

  tbody.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "students"));

  querySnapshot.forEach((doc) => {

    const s = doc.data();

    tbody.innerHTML += `
      <tr>
        <td>${doc.id}</td>
        <td>${s.Name || ""}</td>
        <td>${s.Class || ""}</td>
        <td>${s.Result || ""}</td>
      </tr>
    `;

  });

}

loadStudents();

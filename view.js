import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tbody = document.getElementById("students");

async function loadStudents() {
  try {
    const querySnapshot = await getDocs(collection(db, "students"));

    alert("Students Found: " + querySnapshot.size);

    tbody.innerHTML = "";

    querySnapshot.forEach((student) => {
      const s = student.data();

      tbody.innerHTML += `
      <tr>
        <td>${student.id}</td>
        <td>${s.Name}</td>
        <td>${s.Class}</td>
        <td>${s.Result}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>`;
    });

  } catch (e) {
    alert("Error: " + e.message);
  }
}

loadStudents();

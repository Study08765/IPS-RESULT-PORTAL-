import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.searchResult = async function () {

  const roll = document.getElementById("roll").value.trim();

  const snap = await getDoc(doc(db, "students", roll));

  if (!snap.exists()) {
    document.getElementById("result").innerHTML = "<h2>Result Not Found</h2>";
    return;
  }

  const s = snap.data();

  document.getElementById("result").innerHTML = `
    <pre>${JSON.stringify(s, null, 2)}</pre>
  `;
}

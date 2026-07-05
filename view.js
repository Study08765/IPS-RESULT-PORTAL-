1  import { db } from "./firebase.js";
2  import {
3    collection,
4    getDocs
5  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
6
7  const tbody = document.getElementById("students");
8
9  async function loadStudents() {
10
11   tbody.innerHTML = "";
12
13   const querySnapshot = await getDocs(collection(db, "students"));
14
15   querySnapshot.forEach((doc) => {
16
17     const s = doc.data();
18
19     tbody.innerHTML += `
20 <tr>
21 <td>${doc.id}</td>
22 <td>${s.Name || ""}</td>
23 <td>${s.Class || ""}</td>
24 <td>${s.Result || ""}</td>
25 <td>
26 <button onclick="editStudent('${doc.id}')">✏️ Edit</button>
27 <button onclick="deleteStudent('${doc.id}')">🗑 Delete</button>
28 </td>
29 </tr>
30 `;
31
32   });
33
34 }
35
36 loadStudents();
37
38 window.editStudent = function(id) {
39   alert("Edit Student : " + id);
40 }
41
42 window.deleteStudent = function(id) {
43   alert("Delete Student : " + id);
44 }

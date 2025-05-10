// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Submit Form
document.getElementById("newsForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const imageUrl = document.getElementById("imageUrl").value;

  db.collection("news").add({
    title, content, imageUrl, timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("News submitted!");
    document.getElementById("newsForm").reset();
  });
});

// Load News
db.collection("news").orderBy("timestamp", "desc").onSnapshot(snapshot => {
  const newsList = document.getElementById("news-list");
  newsList.innerHTML = "";
  snapshot.forEach(doc => {
    const news = doc.data();
    const div = document.createElement("div");
    div.className = "news-item";
    div.innerHTML = `
      <h3>${news.title}</h3>
      <p>${news.content}</p>
      ${news.imageUrl ? `<img src="${news.imageUrl}" alt="News Image"/>` : ""}
    `;
    newsList.appendChild(div);
  });
});
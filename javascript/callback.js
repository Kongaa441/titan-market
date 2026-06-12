const status = document.getElementById("status");

status.innerHTML = `
<p><strong>Full URL:</strong></p>
<p>${window.location.href}</p>

<p><strong>Search:</strong></p>
<p>${window.location.search}</p>

<p><strong>Hash:</strong></p>
<p>${window.location.hash}</p>
`;

console.log("FULL URL:", window.location.href);
console.log("SEARCH:", window.location.search);
console.log("HASH:", window.location.hash);
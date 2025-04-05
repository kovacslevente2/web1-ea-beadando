const apiUrl = "https://example.com/api"; // Replace with your API URL
const userCode = "DSOCWPefg456"; // Replace with your Neptun code + custom suffix

// Read Data
document.getElementById("readData").addEventListener("click", () => {
    fetch(`${apiUrl}?op=read&code=${userCode}`)
        .then(response => response.json())
        .then(data => {
            const dataDisplay = document.getElementById("dataDisplay");
            const heightStats = document.getElementById("heightStats");
            let heights = [];
            dataDisplay.innerHTML = data.list.map(item => `<p>ID: ${item.id}, Name: ${item.name}, Height: ${item.height}, Weight: ${item.weight}</p>`).join("");
            heights = data.list.map(item => parseFloat(item.height));
            const sum = heights.reduce((a, b) => a + b, 0);
            const avg = (sum / heights.length).toFixed(2);
            const max = Math.max(...heights);
            heightStats.innerHTML = `<p>Sum: ${sum}, Average: ${avg}, Max: ${max}</p>`;
        })
        .catch(() => {
            document.getElementById("dataDisplay").innerText = "Error loading data.";
        });
});

// Create Data
document.getElementById("createForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("createName").value.trim();
    const height = document.getElementById("createHeight").value.trim();
    const weight = prompt("Enter weight:").trim(); // Example for weight input
    if (name && height && weight) {
        fetch(`${apiUrl}?op=create&name=${encodeURIComponent(name)}&height=${encodeURIComponent(height)}&weight=${encodeURIComponent(weight)}&code=${userCode}`, {
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("createFeedback").innerText = data === 1 ? "Data created successfully!" : "Error creating data.";
            })
            .catch(() => {
                document.getElementById("createFeedback").innerText = "Error creating data.";
            });
    }
});

// Update Data
document.getElementById("getDataForId").addEventListener("click", () => {
    const id = document.getElementById("updateId").value.trim();
    fetch(`${apiUrl}?op=read&code=${userCode}`)
        .then(response => response.json())
        .then(data => {
            const record = data.list.find(item => item.id === id);
            if (record) {
                document.getElementById("updateFields").style.display = "block";
                document.getElementById("updateName").value = record.name;
                document.getElementById("updateHeight").value = record.height;
                document.getElementById("updateWeight").value = record.weight;
            } else {
                document.getElementById("updateFeedback").innerText = "Record not found.";
            }
        })
        .catch(() => {
            document.getElementById("updateFeedback").innerText = "Error fetching data.";
        });
});

document.getElementById("updateForm").addEventListener("submit", event => {
    event.preventDefault();
    const id = document.getElementById("updateId").value.trim();
    const name = document.getElementById("updateName").value.trim();
    const height = document.getElementById("updateHeight").value.trim();
    const weight = document.getElementById("updateWeight").value.trim();
    if (id && name && height && weight) {
        fetch(`${apiUrl}?op=update&id=${id}&name=${encodeURIComponent(name)}&height=${encodeURIComponent(height)}&weight=${encodeURIComponent(weight)}&code=${userCode}`, {
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("updateFeedback").innerText = data === 1 ? "Data updated successfully!" : "Error updating data.";
            })
            .catch(() => {
                document.getElementById("updateFeedback").innerText = "Error updating data.";
            });
    }
});

// Delete Data
document.getElementById("deleteForm").addEventListener("submit", event => {
    event.preventDefault();
    const id = document.getElementById("deleteId").value.trim();
    if (id) {
        fetch(`${apiUrl}?op=delete&id=${id}&code=${userCode}`, {
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("deleteFeedback").innerText = data === 1 ? "Data deleted successfully!" : "Error deleting data.";
            })
            .catch(() => {
                document.getElementById("deleteFeedback").innerText = "Error deleting data.";
            });
    }
});

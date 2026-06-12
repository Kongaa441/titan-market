// ==========================
// LOAD BOTS FROM BACKEND
// ==========================

async function loadBots() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/bots"
        );

        const bots = await response.json();

        const botTableBody =
        document.getElementById("botTableBody");

        botTableBody.innerHTML = "";

        bots.forEach(bot => {

            const row =
            document.createElement("tr");

            row.innerHTML = `
                <td>${bot.name}</td>
                <td>${bot.created}</td>
                <td>${bot.status}</td>
                <td>
                    <i class="fas fa-trash"></i>
                </td>
            `;

            botTableBody.appendChild(row);

        });

    } catch(error) {

        console.error(error);

    }

}// ==========================
// RUN BUTTON
// ==========================

const runBtn = document.getElementById("runBtn");
const status = document.getElementById("status");

let botRunning = false;

runBtn.addEventListener("click", () => {

    botRunning = !botRunning;

    if(botRunning){

        status.textContent = "Bot is running";
        status.style.color = "green";

        runBtn.innerHTML =
        '<i class="fas fa-stop"></i> Stop';

    }else{

        status.textContent = "Bot is not running";
        status.style.color = "#555";

        runBtn.innerHTML =
        '<i class="fas fa-play"></i> Run';

    }

});

// ==========================
// BOT ACTIONS
// ==========================

const copyButtons =
document.querySelectorAll(".fa-copy");

const saveButtons =
document.querySelectorAll(".fa-save");

const deleteButtons =
document.querySelectorAll(".fa-trash");

// COPY BOT

copyButtons.forEach(button => {

    button.addEventListener("click", () => {

        const row = button.closest("tr");

        const clone = row.cloneNode(true);

        row.parentNode.appendChild(clone);

        alert("Bot copied successfully");

    });

});

// SAVE BOT

saveButtons.forEach(button => {

    button.addEventListener("click", () => {

        const row =
        button.closest("tr");

        row.cells[2].textContent =
        "Saved";

        alert("Bot saved");

    });

});

// DELETE BOT

deleteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const confirmDelete =
        confirm("Delete this bot?");

        if(confirmDelete){

            const row =
            button.closest("tr");

            row.remove();

        }

    });

});

// ==========================
// CARD CLICKS
// ==========================

const cards =
document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        const name =
        card.querySelector("h3").textContent;

        alert(name + " selected");

    });

});

// ==========================
// FLOATING BUTTON
// ==========================

const floatingHelp =
document.querySelector(".floating-help");

if(floatingHelp){

    floatingHelp.addEventListener("click", () => {

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

// ==========================
// NAVIGATION ACTIVE STATE
// ==========================

const navLinks =
document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {

            item.style.color = "#444";

        });

        link.style.color = "#1a1ad4";

    });

});// ==========================
// CREATE NEW BOT
// ==========================

const createBotBtn = document.getElementById("createBotBtn");
const botTableBody = document.getElementById("botTableBody");

if (createBotBtn) {

    createBotBtn.addEventListener("click", () => {

        const botName = prompt("Enter Bot Name:");

        if (!botName) return;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${botName}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td class="status-running">Stopped</td>
            <td>
                <i class="fas fa-copy action-copy"></i>
                <i class="fas fa-save action-save"></i>
                <i class="fas fa-trash action-delete"></i>
            </td>
        `;

        botTableBody.appendChild(row);

        attachBotActions();

    });

}

// ==========================
// BOT ACTIONS FUNCTION
// ==========================

function attachBotActions() {

    document.querySelectorAll(".action-copy").forEach(btn => {

        btn.onclick = function() {

            const row = this.closest("tr");
            const clone = row.cloneNode(true);

            botTableBody.appendChild(clone);

            attachBotActions();

            alert("Bot copied");
        };

    });

    document.querySelectorAll(".action-save").forEach(btn => {

        btn.onclick = function() {

            const row = this.closest("tr");

            row.cells[2].innerHTML =
            '<span class="status-running">Saved</span>';

            alert("Bot saved");
        };

    });

    document.querySelectorAll(".action-delete").forEach(btn => {

        btn.onclick = function() {

            if(confirm("Delete this bot?")) {

                this.closest("tr").remove();

            }

        };

    });

}

console.log("Option AI Loaded Successfully");
loadBots();
app.post("/api/deriv/connect", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  connectDeriv(token);

  res.json({
    message: "Connecting to Deriv demo account..."
  });
});
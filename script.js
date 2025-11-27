 

 
 async function loadSectors() {
    const res = await fetch("https://api-hellhub-collective.koyeb.app/api/sectors");

    const json = await res.json();
    return json.data;
}

 function showPlanetesOfOneSector(id){

    (async () => {
        const planets = await loadPlanetsOfSector(id);
        displayInfo(planets);
    })();
}

async function loadPlanetsOfSector(id) {
    const res = await fetch(`https://api-hellhub-collective.koyeb.app/api/sectors/${id}/planets`);
    const json = await res.json();
    return json.data;
}

function displayInfo( planets) {
    const info = document.getElementById("info");
    info.innerHTML = ` 
        <strong>Planètes :</strong>
        <ul>
            ${planets.map(p => `
            <li><a href="planete.html?id=${p.id}&name=${p.name}">${p.name}</a> — (x: ${p.positionX}, y: ${p.positionY}) Nombre de Helldivers : ${p.players} Mise à jour : ${p.updatedAt} </li>
            `).join("")}
        </ul>
    `;
}


async function loadGalaxyStats() {
    const res = await fetch("https://api-hellhub-collective.koyeb.app/api/statistics/galaxy");

    const json = await res.json();
    return json.data;
}


        
        function drawSector(sector) {
            const map = document.getElementById("map");

            // Simulation d’une position (dans la vraie API, il n’y a pas de coordonnées de secteurs)
            const x = ((sector.index + 1) % 10) * 10 + 10;
            const y = Math.floor((sector.index + 1) / 10) * 15 + 10;

            const div = document.createElement("div");
            div.className = "sector";
            // div.style.left = 1 + "%";
            // div.style.top = y + "%";
            div.innerText = sector.name;

            div.onclick = async () => {
                const planets = await loadPlanetsOfSector(sector.id);
                displayInfo(sector, planets);
            };

            map.appendChild(div);
        }

        

        (async () => {
           
           // const sectors = await loadSectors();
            //sectors.forEach(drawSector);


            const galaxyStats = await loadGalaxyStats();
            console.log(galaxyStats);
            const mortEnemisTotal = galaxyStats.automatonKills +
                galaxyStats.illuminateKills +
                galaxyStats.bugKills;


            // Affiche la somme totale
            document.getElementById('EnemisMortsGenerale').textContent = mortEnemisTotal;
            document.getElementById('automatonsMorts').textContent = JSON.stringify(galaxyStats.automatonKills, null, 2);
            document.getElementById('MortsIluministes').textContent = JSON.stringify(galaxyStats.illuminateKills, null, 2);
            document.getElementById('Terminides').textContent = JSON.stringify(galaxyStats.bugKills, null, 2);
            document.getElementById('MunitionenGenerale').textContent = JSON.stringify(galaxyStats.bulletsFired, null, 2);
        })();

        const tooltip = document.getElementById("sector-tooltip");

      document.querySelectorAll(".laser").forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
          const text = el.dataset.desc;

          // Si pas de texte → on cache et on stoppe
          if (!text || text.trim() === "") {
            tooltip.style.display = "none";
            return;
          }

          tooltip.textContent = text;
          tooltip.style.display = "block";
        });

        el.addEventListener("mousemove", (e) => {
          const text = el.dataset.desc;

          // Si pas de texte → ne pas afficher/pousser la boite
          if (!text || text.trim() === "") return;

          const offset = 15;
          tooltip.style.left = e.clientX + offset + "px";
          tooltip.style.top = e.clientY + offset + "px";
        });

        el.addEventListener("mouseleave", () => {
          tooltip.style.display = "none";
        });
      });



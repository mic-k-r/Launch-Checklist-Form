// Write your JavaScript code here!

window.addEventListener("load", (e) => {

   const button = document.querySelector("button");
   const pilotName = document.querySelector("input[name = pilotName]");
   const copilotName = document.querySelector("input[name = copilotName");
   const fuelLevel = document.querySelector("input[name = fuelLevel");
   const cargoMass = document.querySelector("input[name = cargoMass");

   fetch("https://handlers.education.launchcode.org/static/planets.json").then((response) => {

      response.json().then((json) => {
         const missionTarget = document.getElementById("missionTarget");
         const index = Math.floor(Math.random() * json.length);
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[index].name}</li>
                  <li>Diameter: ${json[index].diameter}</li>
                  <li>Star: ${json[index].star}</li>
                  <li>Distance from Earth: ${json[index].distance}</li>
                  <li>Number of Moons: ${json[index].moons}</li>
               </ol>
            <img src="${json[index].image}">
         `;
      });
   });

      button.addEventListener("click", (e) => {    

         const faultyItems = document.getElementById("faultyItems");
         const pilotStatus = document.getElementById("pilotStatus");
         const copilotStatus = document.getElementById("copilotStatus");
         const fuelStatus = document.getElementById("fuelStatus");
         const cargoStatus = document.getElementById("cargoStatus");
         const launchStatus = document.getElementById("launchStatus");

         pilotStatus.innerText = `Pilot Ready: ${pilotName.value}`;
         copilotStatus.innerText = `Copilot Ready: ${copilotName.value}`;

         if (!pilotName.value || !copilotName.value || !fuelLevel.value || !cargoMass.value) {
            alert("All fields are required.");
            e.preventDefault();
         }
         
         else if (!pilotName.value.match(/^[a-zA-Z\s]*$/)) {
            alert("Invalid input for Pilot Name.");
            e.preventDefault();
         }
         
         else if (!copilotName.value.match(/^[a-zA-Z\s]*$/)) {
            alert("Invalid input for Copilot Name.");
            e.preventDefault();
         } 

         else if (fuelLevel.value < 10000) {
            faultyItems.style.visibility = "visible";
            fuelStatus.innerText = "Not enough fuel for the journey";
            launchStatus.innerText = "Shuttle not ready for launch";
            e.preventDefault();
         }

         else if (cargoMass.value > 10000) {
            faultyItems.style.visibility = "visible";
            cargoStatus.innerText = "Too much cargo for the journey.";
            launchStatus.innerText = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            e.preventDefault();
         }

         else {
            launchStatus.style.color = "green";
            launchStatus.innerText = "Shuttle is ready for launch";
            cargoStatus.innerText = "Cargo mass low enough for launch";
            fuelStatus.innerText = "Fuel level high enough for launch";
            e.preventDefault();
         }
   });
});


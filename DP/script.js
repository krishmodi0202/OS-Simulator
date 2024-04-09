const THINKING = 0;
const HUNGRY = 1;
const EATING = 2;

let N = 0; // Number of philosophers
let timeGap = 0; // Time gap between actions
let eatTime = 0; // Time for eating

let state = []; // Array to keep track of everyone's state
let continueSimulation = true; // Flag to control simulation continuation

let forks = []; // Array to represent forks

let mutex = 1; // Semaphore for mutual exclusion
let suspendedQueue = []; // Queue to maintain philosophers waiting for forks


function startSimulation() {
    N = parseInt(document.getElementById("pnum").value);
    timeGap = parseInt(document.getElementById("timeGap").value);
    eatTime = parseInt(document.getElementById("eatTime").value);

    if (isNaN(N) || isNaN(timeGap) || isNaN(eatTime)) {
        document.getElementById("output").innerHTML = "Please fill all the fields with valid numbers.";
        return;
    }

    state = new Array(N).fill(THINKING);
    document.getElementById("output").innerHTML = "Simulation started.";

    document.getElementById("startButton").disabled = true;
    

    // Start the simulation
    philosopher(0); // Start with the first philosopher
}

function stopSimulation() {
    continueSimulation = false; // Set the flag to false to stop the simulation
    
    document.getElementById("output").innerHTML = "Simulation completed.";
    document.getElementById("proceedButton").disabled = true;
}


function restartSimulation() {
    location.reload(); // Reload the page
}

function philosopher(i) {
    if (!continueSimulation) return; // Check if simulation should continue

    setTimeout(() => {
        takeForks(i);
        if (state[i] !== EATING) {
            console.log("Philosopher " + i + " failed to eat, retrying...");
            philosopher((i + 1) % N); // Move to the next philosopher in a round-robin manner
        } else if (!state.some(s => s === HUNGRY)) {
            // If all philosophers have tried to eat and none are currently hungry, stop the simulation
            proceedSimulation();
        }
    }, timeGap * 1000);           //changing time from milliseconds to seconds
}

function think(i) {
    wait(mutex); // Enter critical section
    state[i] = THINKING;
    signal(mutex); // Exit critical section
    updateUI();
}

function takeForks(i) {
    console.log("Philosopher " + i + " is trying to take forks...");
    state[i] = HUNGRY;
    updateUI();

    // Simulate some time for taking forks
    setTimeout(() => {
        eat(i);
    }, timeGap * 1000); // Adjust this delay as needed
}

function eat(i) {
    console.log("Philosopher " + i + " is eating...");
    state[i] = EATING;
    updateUI();

    // Simulate eating time
    setTimeout(() => {
        console.log("Philosopher " + i + " finished eating.");
        state[i] = THINKING;
        updateUI();
    }, eatTime * 1000);
}

function putForks(i) {
    wait(mutex); // Enter critical section
    forks[i] = true; // Left fork
    forks[(i + 1) % N] = true; // Right fork
    signal(mutex); // Exit critical section
    updateUI();
}


function updateUI() {
    // Update UI to reflect the state of philosophers
    let output = "";
    for (let i = 0; i < N; i++) {
        output += "Philosopher " + i + " is " + (state[i] === THINKING ? "thinking" : state[i] === HUNGRY ? "hungry" : "eating") + "<br>";
    }
    document.getElementById("output").innerHTML = output;
}

function wait(s) {
    s--; // Decrement semaphore
    if (s < 0) {
        suspendedQueue.push(i); // Place the process in the suspended queue
    }
}

function signal(s) {
    s++; // Increment semaphore
    if (s <= 0) {
        if (suspendedQueue.length > 0) {
            // Remove a process from suspended queue and place it in ready queue
            suspendedQueue.shift();
        }
    }
}
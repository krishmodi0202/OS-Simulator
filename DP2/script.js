function startSimulation() {

    // inputting the values entered by the user
    var n = parseInt(document.getElementById("pnum").value);
    const outputDiv = document.getElementById("output1");
    var t1 = parseInt(document.getElementById("time1").value);
    var t2 = parseInt(document.getElementById("time2").value);

    if (n < 2) {
        alert("Minimum number of philosophers is 2");
        return false;
    } else if (t1 <= 0) {
        alert("Time gap can't be 0 or negative");
        return false;
    } else if (t2 <= 0) {
        alert("Eatinng time should be greater than 0");
        return false;
    } else if (isNaN(n) || isNaN(t1) || isNaN(t2)) {
        alert("Please fill all the details");
        return false;
    }

    // Starting the philosophers and forks array
    const philo = [];
    const forks = [];

    // Entering the elements in the arrays created
    for (let i = 0; i < n; i++) {
        philo.push(i);
        forks.push(i);
    }

    console.log("The initial forks array is: " + forks);
    console.log("The initial philosophers' array is: " + philo);

    outputDiv.innerHTML = "";

    //loop for the entire array
    for (let i = 0; i < forks.length; i++) {

        // We are setting a timer, which will print the messages after a fixed time interval
        setTimeout(function () {
            const numberElem = document.createElement("p");

            // Simply printing the fork number picked up by a philosopher
            if (i < (forks.length - 1)) {
                numberElem.textContent = "Philosopher(" + philo[i] + ") picked up fork(" + forks[i] + ").";
            }

            // For the final philosopher, we are inversing the rules
            else if (i = (forks.length - 1)) {
                numberElem.textContent = "Philosopher(" + philo[i] + ") could not pick up pick up fork(" + forks[i - 1] + ") as it has already been picked up by Philosopher(" + philo[i - 1] + "). This means that fork(" + forks[i] + ") is now available for Philosopher(" + philo[i - 1] + "), which will initiate the solution.";
            }
            outputDiv.appendChild(numberElem);
        }, i * t1 * 1000);
    }

}

function proceedSimulation() {

    var n = parseInt(document.getElementById("pnum").value);
    const outputDiv = document.getElementById("output2");
    var t2 = parseInt(document.getElementById("time2").value);

    const philo = [];
    const forks = [];

    for (let i = 0; i < n; i++) {
        philo.push(i);
        forks.push(i);
    }

    console.log("The initial forks' array is: " + forks);
    console.log("The initial philosophers' array is: " + philo);

    outputDiv.innerHTML = "";

    // Here, we are reversing the array as we want to start the solution from the second last Philosopher
    philo.reverse();
    forks.reverse();
    console.log("The reversed philosophers' array is: " + philo);
    console.log("The reversed forks' array is : " + forks);

    const firstElement1 = philo.shift(); // remove the first element from the array
    philo.push(firstElement1); // Placing the first element at the end of these arrays
    console.log("The rearranged philosophers' array is: " + philo);
    const firstElement2 = forks.shift();
    forks.push(firstElement2);
    console.log("The rearranged forks' array is: " + forks);

    for (let i = 0; i < forks.length; i++) {

        // Setting the timer again, which can have a different time interval
        setTimeout(function () {
            const numberElem = document.createElement("p");

            // These messages will print the order in which the philosphers will pick up the second fork and put it back
            if (i === 0) {
                numberElem.textContent = "Philosopher(" + philo[i] + ") picked up fork(" + forks[(forks.length - 1)] + "), eats for " + t2 + " seconds, and puts it back along with fork(" + forks[i] + "), which makes fork(" + forks[i] + ") and fork(" + forks[(forks.length - 1)] + ") available.";
            }

            // Printing the message for the last philosopher
            else if (i !== 0) {
                numberElem.textContent = "Philosopher(" + philo[i] + ") picked up fork(" + forks[i - 1] + "), eats for " + t2 + " seconds, and puts it back along with fork(" + forks[i] + "), which makes fork(" + forks[i] + ") and fork(" + forks[(i - 1)] + ") available.";
            }

            outputDiv.appendChild(numberElem);
        }, i * t2 * 1000);
    }

}
let choice, head, direction, queue;

function runSimulation() {

    choice = parseInt(document.getElementById("choice").value);

    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
      
        if (charCode === 44 || (charCode >= 48 && charCode <= 57)) {
          return true;
        }
        else {
          return false;
        }
      }
      
    if (choice === 1) {

        queue = document.getElementById("queue").value;
        queue = queue.split(",");

        
        for (var i = 0; i < queue.length; i++) {
            queue[i] = parseInt(queue[i]);
        }
        
        

        document.getElementById("output1").innerHTML = "The array entered by the user is: " + queue;

        
        head = parseInt(document.getElementById("head").value);
        direction = parseInt(document.getElementById("direction").value);

        if (head < 0) {
            alert("!! Please enter a valid head value !!")
            return false;
        }

        if (direction === 1) {
            queue = queue.filter(q => q < head).sort((a, b) => b - a).concat(queue.filter(q => q >= head).sort((a, b) => a - b));
        }
        else if (direction === -1) {
            queue = queue.filter(q => q >= head).sort((a, b) => a - b).concat(queue.filter(q => q < head).sort((a, b) => b - a));
        }
        else {
            alert("!! Please make a valid choice !!")
        }

        console.log(queue);

        let maxNumber = Math.max(...queue);
        console.log(maxNumber);
        let minNumber = Math.min(...queue);
        console.log(minNumber);

        let a1 = parseInt(maxNumber) - parseInt(head);
        let a2 = parseInt(maxNumber) - parseInt(minNumber);
        let final = parseInt(a1) + parseInt(a2);
        console.log(final);

        document.getElementById("output2").innerHTML = "The seek sequence is: " + queue + "<br> The total number of seek operations is: " + final;

    }
    
    else if (choice === -1) {

        queue = document.getElementById("queue").value;
        queue = queue.split(",");

        
        for (var i = 0; i < queue.length; i++) {
            queue[i] = parseInt(queue[i]);
        }

        document.getElementById("output1").innerHTML = "The array entered by the user is: " + queue;
        head = parseInt(document.getElementById("head").value);
        direction = parseInt(document.getElementById("direction").value);

        if (head < 0) {
            alert("!! Please enter a valid head value !!")
            return false;
        }

        if (direction === 1) {
            queue = queue.filter(q => q < head).sort((a, b) => b - a).concat(queue.filter(q => q >= head).sort((a, b) => b - a));
        } else {
            queue = queue.filter(q => q >= head).sort((a, b) => a - b).concat(queue.filter(q => q < head).sort((a, b) => a - b));
        }

        console.log(queue);
        let maxNumber = Math.max(...queue);
        console.log(maxNumber);
        let minNumber = Math.min(...queue);
        console.log(minNumber);
        const closest = queue.reduce(function (prev, curr) {
            return Math.abs(curr - head) < Math.abs(prev - head) ? curr : prev;
        });
        console.log(closest);
        let a1 = parseInt(maxNumber) - parseInt(head);
        let a2 = parseInt(maxNumber) - parseInt(minNumber);
        let a3 = parseInt(closest) - parseInt(minNumber);
        let final = parseInt(a1) + parseInt(a2) + parseInt(a3);
        console.log(final);

        document.getElementById("output2").innerHTML = "The seek sequence is: " + queue + "<br> The total number of seek operations is: " + final;

    }

    else {
        alert("!! Please make a valid choice !!")
        return false;

    }

}

function printGraph() {

    let labels = queue.map((_, i) => i + 1);

    let data = queue;

    let config = {

        type: "line",
        data: {
            labels: labels,

            datasets: [
                {
                    label: "Seek sequence",
                    data: data,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1
                }
            ]
        },

        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Look"
                }
            },

            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Position"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "value"
                    },
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    };

    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, config);
}
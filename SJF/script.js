let processes = [];

function addProcess() {
  const arrivalTime = parseInt(document.getElementById('arrival-time').value);
  const burstTime = parseInt(document.getElementById('burst-time').value);

  // Validate arrival and burst times
  if (isNaN(arrivalTime) || arrivalTime < 0) {
    alert('Arrival time must be a non-negative number.');
    return;
  }

  if (isNaN(burstTime) || burstTime <= 0) {
    alert('Burst time must be a positive number.');
    return;
  }

  // Valid data processing continues...
  processes.push({ id: processes.length + 1, arrivalTime, burstTime });

  const tableBody = document.getElementById('process-table-body');
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${processes[processes.length - 1].id}</td>  <td>${arrivalTime}</td>
      <td>${burstTime}</td>
      <td></td> <td></td> <td></td> `;
  tableBody.appendChild(row);

  document.getElementById('arrival-time').value = '';
  document.getElementById('burst-time').value = '';
}

const runSJFButton = document.getElementById('bttn');
runSJFButton.addEventListener('click', runSJF);

function runSJF() {
  if (processes.length === 0) {
    alert('Please add some processes before running SJF.');
    return;
  }

  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  // Get existing table body element
  const processTableBody = document.getElementById('process-table-body');

  let currentTime = 0;
  let avgTurnaroundTime = 0;
  let avgWaitingTime = 0;
  let hasDisplayedAverageTimes = false; // Flag to track if average times were displayed

  processes.forEach((process, index) => {
    const waitingTime = Math.max(0, currentTime - process.arrivalTime);
    const completionTime = currentTime + process.burstTime;
    const turnaroundTime = completionTime - process.arrivalTime;

    avgWaitingTime += waitingTime;
    avgTurnaroundTime += turnaroundTime;

    // Get the existing row for this process (assuming first cell has process ID)
    const processRow = processTableBody.rows[index];

    // Update the cells with calculated values (adjust cell indices if needed)
    processRow.cells[3].textContent = completionTime;
    processRow.cells[4].textContent = waitingTime;
    processRow.cells[5].textContent = turnaroundTime;

    currentTime = completionTime;
    process.end = completionTime; // Store completion time for after use

    console.log(`Process ${index + 1}: Completion Time: ${completionTime}, Waiting Time: ${waitingTime}, Turnaround Time: ${turnaroundTime}`); // Example for logging
  });

  // Calculate and display average times only once
  if (!hasDisplayedAverageTimes) {
    avgTurnaroundTime /= processes.length;
    avgWaitingTime /= processes.length;

    // Select the container for average times
    // const averageTimesContainer = document.getElementById('average-times-container');
    // Inside the runSJF function, after appending the average times div
    const averageTimesContainer = document.getElementById('average-times-container');
    const processTable = document.getElementById('process-table'); // Assuming process table has an ID

    // Create a new div for displaying average times
    const div = document.createElement('div');
    div.textContent = `Average Turnaround Time: ${avgTurnaroundTime.toFixed(2)}, Average Waiting Time: ${avgWaitingTime.toFixed(2)}`;

    // Append the average times to the container (only once)
    averageTimesContainer.appendChild(div);


    const tableHeight = processTable.offsetHeight; // Get table height
    averageTimesContainer.style.top = `${tableHeight}px`; // Set top position after table height


    hasDisplayedAverageTimes = true; // Set flag to prevent further display
  }

  // Making of Gantt chart with completion labels
  const ganttChart = document.getElementById('gantt-chart');
  ganttChart.innerHTML = ''; // Clear existing Gantt chart content

  processes.forEach((process, index) => {
    const bar = document.createElement('div');
    bar.className = 'gantt-bar';
    const barWidth = (process.burstTime / currentTime) * 100;
    const barLeft = index === 0 ? 0 : (processes[index - 1].end / currentTime) * 100;
    bar.style.width = `${barWidth}%`;
    bar.style.left = `${barLeft}%`;
    bar.style.backgroundColor = `hsl(${process.id * 30}, 100%, 50%)`;
    bar.textContent = `P${process.id}`;
    ganttChart.appendChild(bar);

    // Completion time label
    const completionLabelLeft = (barLeft + barWidth / 2);
    const completionLabel = document.createElement('div');
    completionLabel.className = 'completion-label';
    completionLabel.style.left = `${completionLabelLeft}%`;
    completionLabel.textContent = process.end;
    ganttChart.appendChild(completionLabel);
  });
}


function clearProcesses() {
  processes = [];
  const processTableBody = document.getElementById('process-table-body');
  const ganttChart = document.getElementById('gantt-chart');
  const averageTimesContainer = document.getElementById('average-times-container');
  processTableBody.innerHTML = '';
  ganttChart.innerHTML = '';
  averageTimesContainer.innerHTML = '';
}

//your JS code here. If required.
// Function to simulate a promise resolving after a random time (between 1 to 3 seconds)
function createRandomPromise(promiseName) {
  const delay = Math.random() * 2 + 1; // Random delay between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ promiseName, time: delay.toFixed(3) });
    }, delay * 1000); // Convert seconds to milliseconds
  });
}

// Create 3 promises
const promises = [
  createRandomPromise('Promise 1'),
  createRandomPromise('Promise 2'),
  createRandomPromise('Promise 3')
];

// Wait for all promises to resolve using Promise.all
Promise.all(promises)
  .then((results) => {
    // Remove the loading message
    const outputTable = document.getElementById('output');
    outputTable.innerHTML = ''; // Clear the loading row

    // Append rows with the resolved times of each promise
    let totalTime = 0;
    results.forEach((result, index) => {
      totalTime = Math.max(totalTime, parseFloat(result.time)); // Track the longest time
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${result.promiseName}</td>
        <td>${result.time}</td>
      `;
      outputTable.appendChild(row);
    });

    // Add the Total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${totalTime.toFixed(3)}</td>
    `;
    outputTable.appendChild(totalRow);
  })
  .catch((error) => {
    console.error("Error with one or more promises:", error);
  });

// Pass/fail example using if-else.
const score = 72;

if (score >= 50) {
  console.log('You passed!');
} else {
  console.log('You failed');
}

// An else-if checks another condition when the first if condition is false.
if (score >= 80) {
  console.log('Grade: A');
} else if (score >= 50) {
  console.log('Grade: Pass');
} else {
  console.log('Grade: Needs improvement');
}

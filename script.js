const writtenWorksData = document.querySelector(".written-works-data");
const performanceTasksData = document.querySelector(".performance-tasks-data");
const quarterlyAssessmentsData = document.querySelector(
  ".quarterly-assessment-data"
);
const mainButtons = document.querySelector(".main-buttons");
const grading1 = document.querySelector(".grading1Input input");
const grading2 = document.querySelector(".grading2Input input");
const grading3 = document.querySelector(".grading3Input input");
const contentGradingSystem = document.querySelector(".content-grading-system");
const contentMainData = document.querySelector(".content-main-data");
const contentResults = document.querySelector(".content-results");
const finaleGrade = document.querySelector(".final-grade");
const remarks = document.querySelector(".remarks");

let writtenAvg, performanceAvg, quarterlyAvg;

function createInput(button) {
  const section = button.closest(
    ".written-works-data, .performance-tasks-data, .quarterly-assessment-data"
  );

  let rowClass, inputBase;
  if (section.classList.contains("written-works-data")) {
    rowClass = "written-work";
    inputBase = "writtenInput";
  } else if (section.classList.contains("performance-tasks-data")) {
    rowClass = "performance-task";
    inputBase = "performanceInput";
  } else {
    rowClass = "quarterly-assessment";
    inputBase = "quarterlyInput";
  }
  const row = document.createElement("div");
  row.classList.add(rowClass);
  const score = document.createElement("input");
  score.classList.add(inputBase, "score");
  score.placeholder = "Score";
  const overall = document.createElement("input");
  overall.placeholder = "Overall";
  overall.classList.add(inputBase, "overall");

  row.append(score, overall);
  const buttons = section.querySelector(".main-buttons");
  section.insertBefore(row, buttons);
}

function deleteInput(button) {
  const section = button.closest(
    ".written-works-data, .performance-tasks-data, .quarterly-assessment-data"
  );

  let rowSelector;
  if (section.classList.contains("written-works-data")) {
    rowSelector = ".written-work";
  } else if (section.classList.contains("performance-tasks-data")) {
    rowSelector = ".performance-task";
  } else {
    rowSelector = ".quarterly-assessment";
  }

  const rows = document.querySelectorAll(rowSelector);
  if (rows.length > 1) {
    rows[rows.length - 1].remove();
  } else {
    rows[0].querySelectorAll("input").forEach((i) => (i.value = ""));
  }
}

function submitData() {
  const writtenDataScore = document.querySelectorAll(".writtenInput.score");
  const performanceDataScore = document.querySelectorAll(
    ".performanceInput.score"
  );
  const quarterlyDataScore = document.querySelectorAll(".quarterlyInput.score");

  const writtenDataOverall = document.querySelectorAll(".writtenInput.overall");
  const performanceDataOverall = document.querySelectorAll(
    ".performanceInput.overall"
  );
  const quarterlyDataOverall = document.querySelectorAll(
    ".quarterlyInput.overall"
  );

  const data1Score = Array.from(writtenDataScore).reduce(
    (acc, cur) => acc + Number(cur.value),
    0
  );
  const data2Score = Array.from(performanceDataScore).reduce(
    (acc, cur) => acc + Number(cur.value),
    0
  );
  const data3Score = Array.from(quarterlyDataScore).reduce(
    (acc, cur) => acc + Number(cur.value),
    0
  );

  const data1Overall = Array.from(writtenDataOverall).reduce(
    (acc, cur) => acc + Number(cur.value),
    0
  );
  const data2Overall = Array.from(performanceDataOverall).reduce(
    (acc, cur) => acc + Number(cur.value),
    0
  );
  const data3Overall = Array.from(quarterlyDataOverall).reduce(
    (acc, cur) => acc + Number(cur.value),
    0
  );

  const writtenAverage = data1Score / data1Overall;
  const performanceAverage = data2Score / data2Overall;
  const quarterlyAverage = data3Score / data3Overall;

  const finalGrade =
    writtenAverage * writtenAvg +
    performanceAverage * performanceAvg +
    quarterlyAverage * quarterlyAvg;

  contentMainData.classList.toggle("hidden");
  contentResults.classList.toggle("hidden");
  finaleGrade.textContent = finalGrade.toFixed(2) + "%";
  if (finalGrade > 75) {
    finaleGrade.style.color = "green";
    remarks.textContent = "Good job! :)";
  } else {
    finaleGrade.style.color = "red";
    remarks.textContent = "Better luck next time :(";
  }
}

function startProgram() {
  if (grading1.value !== "" && grading2.value !== "" && grading3.value !== "") {
    writtenAvg = grading1.value;
    performanceAvg = grading2.value;
    quarterlyAvg = grading3.value;
    contentGradingSystem.classList.toggle("hidden");
    contentMainData.classList.toggle("hidden");
  } else {
    alert("Don’t leave any grading fields empty.");
  }
}

function resetAllSections() {
  const writtenSection = document.querySelector(".written-works-data");
  const writtenBlocks = writtenSection.querySelectorAll(".written-work");
  writtenBlocks.forEach((block, i) => {
    if (i > 0) {
      block.remove();
    } else {
      block.querySelectorAll("input").forEach((input) => (input.value = ""));
    }
  });

  const performanceSection = document.querySelector(".performance-tasks-data");
  const performanceBlocks =
    performanceSection.querySelectorAll(".performance-task");
  performanceBlocks.forEach((block, i) => {
    if (i > 0) {
      block.remove();
    } else {
      block.querySelectorAll("input").forEach((input) => (input.value = ""));
    }
  });

  const quarterlySection = document.querySelector(".quarterly-assessment-data");
  const quarterlyBlocks = quarterlySection.querySelectorAll(
    ".quarterly-assessment"
  );
  quarterlyBlocks.forEach((block, i) => {
    if (i > 0) {
      block.remove();
    } else {
      block.querySelectorAll("input").forEach((input) => (input.value = ""));
    }
  });

  console.log("All sections reset and inputs cleared ✅");
}

function calculateAgain() {
  writtenAvg = performanceAvg = quarterlyAvg = 0;
  resetAllSections();
  grading1.value = "";
  grading2.value = "";
  grading3.value = "";

  if (!contentMainData.classList.contains("hidden")) {
    contentGradingSystem.classList.toggle("hidden");
    contentMainData.classList.toggle("hidden");
  } else {
    contentGradingSystem.classList.toggle("hidden");
    contentResults.classList.toggle("hidden");
  }
}

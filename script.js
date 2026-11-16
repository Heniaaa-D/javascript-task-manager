function getCurrentDate() {
  const date = new Date();

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = date
    .toLocaleString("en-US", options)
    .replace(",", " ·");

  return formattedDate;
}
const currentDate = getCurrentDate();

document.getElementById("date").textContent = currentDate;

const addBtn = document.querySelector(".add-button-js");
const showAddDiv = document.querySelector(".show-add-task-div");
const closeAddBtn = document.querySelector(".close-add-button");

const taskInputEdit = document.querySelector(".task-input-edit");

const empty = document.getElementById("empty");

const addTaskBtn = document.querySelector(".add-task-button");
const taskInputAdd = document.querySelector(".task-input-add");

const container = document.querySelector(".tasks-container");

const showEditDiv = document.querySelector(".show-edit-task-div");
const deleteButton = showEditDiv.querySelector(".deleteButton");

const categoryButtons = showAddDiv.querySelectorAll(".category-button-js");
const categoryButtonsEdit = showEditDiv.querySelectorAll(".category-button-js");
const saveEditBtn = document.querySelector(".save-edit-button");
const noCategoryText = document.querySelector(".no-Category-Text");

addBtn.addEventListener("click", () => {
  showAddDiv.classList.remove("hidden");
  noCategoryText.classList.add("hidden");
});

closeAddBtn.addEventListener("click", () => {
  showAddDiv.classList.add("hidden");
});

const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

const renderTask = () => {
  const tasks = getTasks();

  if (tasks.length > 0) {
    empty.classList.add("hidden");
  }
  tasks.forEach((task) => {
    addSingleTask(task);
  });
};

document.addEventListener("DOMContentLoaded", renderTask);

const addSingleTask = (task) => {
  const div = document.createElement("div");
  const el = `
    <div id=${task.id} class="task bg-white py-3 px-2 rounded-lg flex items-center justify-between mb-2.5 border border-lightgray">
      <div class=" flex gap-3 items-center">
      <div class="w-1.5 h-1.5 rounded-full bg-redorange"></div>
      <div class="w-5 h-5  rounded-md   border border-lightgray bg-white"></div>
       <div class="flex flex-col gap-3 justify-center">
        <p class="taskTitle font-bold">${task.text}</p>
        <div class="flex gap-2 items-center">
        <button data-category="${task.category}" class="taskCategory active border border-lightgray bg-transparent text-gray text-[10px] font-[400px] px-3 py-1.5 rounded-3xl cursor-pointer">${task.category}</button>
        <div class="w-1 h-1 bg-gray rounded-full"></div>
        <div class="flex flex-col gap-2">
          <p class="createdAt font-[400px] text-[10px] text-gray">Created at: ${task.createdAt}</p>
          <p class="editAt ${!task?.editAt && "hidden"} font-[400px] text-[10px] text-gray" >Edited at: <span>${task?.editAt}</span></p>
        </div>
        </div>
       </div>
      </div>
      <div class="flex gap-1">
      <button class="w-5 h-5 rounded-md bg-neutralbeige2 flex items-center justify-center" onclick="editTask(${task.id})">
      <svg class="edit-button" width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.104 7.54799C6.624 7.54799 6.34 7.50399 6.252 7.41599C6.212 7.37599 6.096 7.29999 5.904 7.18799C5.72 7.07599 5.452 6.93199 5.1 6.75599C5.02 6.71599 4.876 6.63999 4.668 6.52799C4.46 6.40799 4.216 6.27999 3.936 6.14399C3.896 6.11999 3.828 6.08399 3.732 6.03599C3.644 5.98799 3.552 5.93999 3.456 5.89199C3.36 5.83599 3.288 5.79599 3.24 5.77199L3.024 5.66399C3.008 5.65599 2.984 5.64399 2.952 5.62799C2.92 5.61199 2.884 5.59199 2.844 5.56799L2.508 5.39999C2.452 5.36799 2.388 5.33199 2.316 5.29199C2.252 5.25199 2.184 5.21599 2.112 5.18399L0.528001 4.34399C0.464001 4.15999 0.408001 3.99199 0.36 3.83999C0.312001 3.68799 0.280001 3.55199 0.264001 3.43199C0.248001 3.31199 0.216001 3.16399 0.168001 2.98799C0.120001 2.81199 0.0640005 2.60799 5.21541e-07 2.37599C0.0960005 2.16799 0.184001 1.98799 0.264001 1.83599C0.344001 1.67599 0.416001 1.55199 0.480001 1.46399C0.528001 1.39999 0.580001 1.32799 0.636001 1.24799C0.692001 1.15999 0.768001 1.03999 0.864001 0.887995C0.904001 0.831994 0.940001 0.771994 0.972 0.707995C1.012 0.635995 1.048 0.567995 1.08 0.503994C1.144 0.487994 1.228 0.463994 1.332 0.431995C1.436 0.399995 1.516 0.379995 1.572 0.371995C1.708 0.347995 1.864 0.307994 2.04 0.251994C2.216 0.195994 2.356 0.151994 2.46 0.119994C2.572 0.0799944 2.712 0.0399945 2.88 -5.48363e-06L3.756 0.539995C3.948 0.659995 4.132 0.763994 4.308 0.851994C4.484 0.939995 4.652 1.03599 4.812 1.13999L5.148 1.35599C5.388 1.50799 5.572 1.62799 5.7 1.71599C5.836 1.80399 5.92 1.86399 5.952 1.89599C5.984 1.92799 6.048 1.97199 6.144 2.02799C6.24 2.08399 6.368 2.15999 6.528 2.25599C6.768 2.39999 7.008 2.54399 7.248 2.68799C7.496 2.82399 7.74 2.96399 7.98 3.10799C8.132 3.20399 8.256 3.28799 8.352 3.35999C8.448 3.43999 8.564 3.55599 8.7 3.70799C8.836 3.85199 8.952 4.00399 9.048 4.16399L9.708 5.26799C10.052 5.84399 10.312 6.28399 10.488 6.58799C10.672 6.89199 10.768 7.06399 10.776 7.10399C10.8 7.17599 10.812 7.23199 10.812 7.27199C10.812 7.35999 10.772 7.41999 10.692 7.45199C10.62 7.48399 10.528 7.49999 10.416 7.49999C10.28 7.49999 10.14 7.50399 9.996 7.51199C9.852 7.51199 9.712 7.51199 9.576 7.51199L7.44 7.53599C7.384 7.53599 7.328 7.53999 7.272 7.54799C7.216 7.54799 7.16 7.54799 7.104 7.54799ZM0.888 3.91199C0.904001 3.91199 0.920001 3.91199 0.936001 3.91199C0.952001 3.90399 0.968001 3.89999 0.984001 3.89999L1.224 3.86399C1.32 3.86399 1.472 3.81199 1.68 3.70799C1.776 3.65999 1.9 3.60799 2.052 3.55199C2.204 3.48799 2.304 3.45599 2.352 3.45599C2.368 3.43999 2.408 3.37599 2.472 3.26399C2.544 3.14399 2.584 3.06799 2.592 3.03599L2.652 2.87999C2.684 2.79199 2.72 2.71999 2.76 2.66399C2.808 2.59999 2.848 2.54799 2.88 2.50799C2.952 2.41999 3.012 2.33599 3.06 2.25599C3.084 2.21599 3.112 2.17199 3.144 2.12399C3.184 2.06799 3.232 2.00799 3.288 1.94399C3.28 1.91199 3.26 1.85199 3.228 1.76399C3.196 1.67599 3.148 1.55999 3.084 1.41599C2.964 1.12799 2.888 0.935995 2.856 0.839994L2.736 0.455994L2.412 0.575994C2.332 0.607994 2.252 0.639994 2.172 0.671994C2.092 0.695995 2.032 0.711995 1.992 0.719995L1.392 0.887995C1.376 0.911995 1.336 0.971995 1.272 1.06799C1.216 1.15599 1.18 1.21199 1.164 1.23599L0.816001 1.78799C0.760001 1.88399 0.696001 1.99199 0.624001 2.11199C0.552001 2.22399 0.480001 2.33599 0.408 2.44799L0.576001 3.01199C0.608001 3.11599 0.636001 3.19599 0.660001 3.25199C0.684001 3.29999 0.704001 3.35199 0.720001 3.40799L0.888 3.91199ZM8.136 4.46399V3.64799L7.32 3.11999C7.264 3.07999 7.196 3.03999 7.116 2.99999C7.036 2.95199 6.952 2.90799 6.864 2.86799L6.624 2.74799C6.592 2.73199 6.56 2.71599 6.528 2.69999C6.496 2.68399 6.472 2.67199 6.456 2.66399L5.532 2.07599C5.476 2.03599 5.424 2.00399 5.376 1.97999C5.336 1.95599 5.304 1.93599 5.28 1.91999L3.216 0.623994L3.324 0.899994C3.348 0.963995 3.372 1.03199 3.396 1.10399C3.42 1.16799 3.432 1.21599 3.432 1.24799C3.432 1.27999 3.444 1.34399 3.468 1.43999C3.5 1.53599 3.536 1.63199 3.576 1.72799C3.616 1.81599 3.644 1.88399 3.66 1.93199C3.7 1.98799 3.796 2.05999 3.948 2.14799C4.036 2.18799 4.108 2.22799 4.164 2.26799C4.22 2.30799 4.264 2.34799 4.296 2.38799C4.368 2.45999 4.452 2.52799 4.548 2.59199L4.692 2.68799C4.74 2.71999 4.788 2.74799 4.836 2.77199C4.892 2.79599 4.936 2.81599 4.968 2.83199C5.112 2.87999 5.204 2.91599 5.244 2.93999C5.292 2.96399 5.376 3.01199 5.496 3.08399C5.544 3.11599 5.596 3.14799 5.652 3.17999C5.708 3.20399 5.768 3.22799 5.832 3.25199C5.936 3.28399 6.032 3.32799 6.12 3.38399C6.216 3.43999 6.368 3.53599 6.576 3.67199L7.344 4.03199C7.424 4.06399 7.496 4.09999 7.56 4.13999C7.624 4.17199 7.676 4.19999 7.716 4.22399L8.136 4.46399ZM1.608 2.95199C1.488 2.95199 1.388 2.89599 1.308 2.78399C1.236 2.66399 1.2 2.52799 1.2 2.37599C1.2 2.19999 1.248 2.03199 1.344 1.87199C1.44 1.70399 1.552 1.56799 1.68 1.46399C1.816 1.35199 1.944 1.29599 2.064 1.29599C2.208 1.29599 2.316 1.34399 2.388 1.43999C2.46 1.53599 2.496 1.66399 2.496 1.82399C2.496 1.89599 2.468 1.99599 2.412 2.12399C2.356 2.24399 2.284 2.36799 2.196 2.49599C2.108 2.62399 2.012 2.73199 1.908 2.81999C1.804 2.90799 1.704 2.95199 1.608 2.95199ZM7.296 6.16799C7.456 6.03999 7.576 5.92399 7.656 5.81999C7.744 5.71599 7.8 5.62399 7.824 5.54399C7.848 5.46399 7.868 5.38799 7.884 5.31599C7.908 5.24399 7.936 5.17999 7.968 5.12399L8.04 4.96799C7.912 4.88799 7.788 4.81199 7.668 4.73999C7.556 4.65999 7.444 4.57999 7.332 4.49999C7.244 4.46799 7.172 4.43999 7.116 4.41599C7.068 4.39199 7 4.35199 6.912 4.29599L6.672 4.12799C6.392 3.92799 6.204 3.82799 6.108 3.82799C6.012 3.82799 5.88 3.76799 5.712 3.64799L5.16 3.23999C5.112 3.19999 5.044 3.16399 4.956 3.13199C4.868 3.09199 4.72 3.03599 4.512 2.96399C4.368 2.90799 4.256 2.84799 4.176 2.78399C4.128 2.74399 4.08 2.71199 4.032 2.68799C3.992 2.66399 3.952 2.63999 3.912 2.61599L3.744 2.51999C3.712 2.49599 3.676 2.47599 3.636 2.45999C3.604 2.44399 3.568 2.42399 3.528 2.39999C3.376 2.57599 3.3 2.69199 3.3 2.74799C3.3 2.81199 3.256 2.91199 3.168 3.04799L2.832 3.55199L2.988 3.65999C3.076 3.72399 3.168 3.77599 3.264 3.81599L3.42 3.88799C3.596 3.97599 3.744 4.06399 3.864 4.15199C3.928 4.19199 3.98 4.22799 4.02 4.25999C4.06 4.29199 4.096 4.31599 4.128 4.33199L5.664 5.18399C5.72 5.21599 5.792 5.25999 5.88 5.31599C5.968 5.37199 6.06 5.43199 6.156 5.49599L6.876 5.95199C6.908 5.96799 6.94 5.98799 6.972 6.01199C7.012 6.02799 7.048 6.04399 7.08 6.05999L7.296 6.16799ZM6.408 6.95999L6.984 6.47999C6.96 6.46399 6.936 6.45199 6.912 6.44399C6.888 6.42799 6.868 6.41199 6.852 6.39599C6.828 6.37999 6.804 6.36399 6.78 6.34799C6.756 6.33199 6.728 6.31599 6.696 6.29999L6.576 6.21599C6.56 6.19999 6.504 6.16399 6.408 6.10799L5.688 5.67599C5.664 5.65999 5.62 5.63599 5.556 5.60399C5.5 5.56399 5.424 5.52799 5.328 5.49599C5.2 5.44799 5.088 5.39599 4.992 5.33999C4.904 5.28399 4.816 5.23599 4.728 5.19599C4.68 5.13999 4.636 5.09599 4.596 5.06399C4.564 5.03199 4.536 4.99999 4.512 4.96799C4.472 4.92799 4.384 4.87999 4.248 4.82399L4.092 4.76399C3.916 4.69999 3.776 4.61599 3.672 4.51199C3.552 4.39199 3.456 4.32799 3.384 4.31999C3.288 4.31199 3.184 4.26799 3.072 4.18799C2.944 4.09999 2.832 4.03199 2.736 3.98399C2.64 3.92799 2.544 3.87999 2.448 3.83999C2.416 3.85599 2.34 3.87999 2.22 3.91199C2.108 3.94399 2.032 3.96399 1.992 3.97199C1.912 3.97999 1.836 3.99999 1.764 4.03199C1.7 4.06399 1.624 4.09999 1.536 4.13999L1.32 4.24799C1.528 4.37599 1.724 4.49999 1.908 4.61999C2.1 4.73999 2.3 4.84799 2.508 4.94399L2.88 5.11199C2.92 5.12799 2.964 5.14799 3.012 5.17199C3.06 5.19599 3.108 5.21599 3.156 5.23199C3.196 5.24799 3.256 5.27599 3.336 5.31599C3.424 5.35599 3.528 5.40799 3.648 5.47199L4.368 5.85599C4.488 5.91999 4.608 5.98799 4.728 6.05999C4.848 6.13199 4.968 6.19999 5.088 6.26399C5.168 6.30399 5.244 6.34799 5.316 6.39599C5.388 6.44399 5.464 6.48799 5.544 6.52799C5.632 6.57599 5.756 6.64399 5.916 6.73199C6.084 6.81199 6.248 6.88799 6.408 6.95999ZM6.912 7.11599C6.944 7.11599 7.008 7.11599 7.104 7.11599C7.208 7.10799 7.324 7.10399 7.452 7.10399C7.596 7.10399 7.744 7.10399 7.896 7.10399C8.056 7.09599 8.228 7.09199 8.412 7.09199C8.62 7.09199 8.824 7.09599 9.024 7.10399C9.224 7.10399 9.424 7.10399 9.624 7.10399C9.72 7.10399 9.812 7.03599 9.9 6.89999C9.988 6.75599 10.032 6.63999 10.032 6.55199C10.032 6.51199 9.996 6.43199 9.924 6.31199C9.86 6.19199 9.784 6.07199 9.696 5.95199L9.528 5.71199C9.464 5.61599 9.384 5.49599 9.288 5.35199C9.192 5.20799 9.112 5.07199 9.048 4.94399L8.952 4.75199C8.928 4.70399 8.892 4.64399 8.844 4.57199C8.796 4.49199 8.748 4.41999 8.7 4.35599L8.52 4.10399L8.496 4.24799C8.488 4.29599 8.484 4.34399 8.484 4.39199C8.484 4.43999 8.484 4.49199 8.484 4.54799V4.61999C8.492 4.63599 8.496 4.65599 8.496 4.67999C8.496 4.71999 8.536 4.80799 8.616 4.94399C8.656 5.00799 8.696 5.07599 8.736 5.14799C8.776 5.21999 8.824 5.29599 8.88 5.37599C8.8 5.31199 8.716 5.25599 8.628 5.20799C8.548 5.15999 8.484 5.13599 8.436 5.13599C8.364 5.13599 8.328 5.18399 8.328 5.27999C8.328 5.35999 8.4 5.48399 8.544 5.65199C8.688 5.81199 8.84 5.96799 9 6.11999C8.96 6.10399 8.916 6.09199 8.868 6.08399C8.828 6.07599 8.788 6.06799 8.748 6.05999L8.484 5.95199C8.452 5.93599 8.4 5.92399 8.328 5.91599C8.256 5.90799 8.196 5.90399 8.148 5.90399C8.028 5.90399 7.928 5.94799 7.848 6.03599C7.768 6.12399 7.728 6.19999 7.728 6.26399C7.728 6.33599 7.756 6.40399 7.812 6.46799C7.876 6.52399 7.96 6.59199 8.064 6.67199C7.976 6.67199 7.904 6.67599 7.848 6.68399C7.8 6.68399 7.76 6.68399 7.728 6.68399C7.688 6.68399 7.644 6.68799 7.596 6.69599C7.556 6.69599 7.512 6.69599 7.464 6.69599C7.312 6.69599 7.18 6.73999 7.068 6.82799C6.956 6.91599 6.864 7.00799 6.792 7.10399L6.912 7.11599Z" fill="#73706B"/>
      </svg>
      </button>
      <div class="w-5 h-5 rounded-md bg-neutralbeige2 flex items-center justify-center">
      <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg class="trash-button"
    onclick="deleteTask(${task.id})"
    width="11px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25V3.75ZM22.5 5.25C22.9142 5.25 23.25 4.91421 23.25 4.5C23.25 4.08579 22.9142 3.75 22.5 3.75V5.25ZM1.5 5.25H22.5V3.75H1.5V5.25Z" fill="#71717A"/>
    <path d="M9.75 1.5V0.75V1.5ZM8.25 3H7.5H8.25ZM7.5 4.5C7.5 4.91421 7.83579 5.25 8.25 5.25C8.66421 5.25 9 4.91421 9 4.5H7.5ZM15 4.5C15 4.91421 15.3358 5.25 15.75 5.25C16.1642 5.25 16.5 4.91421 16.5 4.5H15ZM15.75 3H16.5H15.75ZM14.25 0.75H9.75V2.25H14.25V0.75ZM9.75 0.75C9.15326 0.75 8.58097 0.987053 8.15901 1.40901L9.21967 2.46967C9.36032 2.32902 9.55109 2.25 9.75 2.25V0.75ZM8.15901 1.40901C7.73705 1.83097 7.5 2.40326 7.5 3H9C9 2.80109 9.07902 2.61032 9.21967 2.46967L8.15901 1.40901ZM7.5 3V4.5H9V3H7.5ZM16.5 4.5V3H15V4.5H16.5ZM16.5 3C16.5 2.40326 16.2629 1.83097 15.841 1.40901L14.7803 2.46967C14.921 2.61032 15 2.80109 15 3H16.5ZM15.841 1.40901C15.419 0.987053 14.8467 0.75 14.25 0.75V2.25C14.4489 2.25 14.6397 2.32902 14.7803 2.46967L15.841 1.40901Z" fill="#71717A"/>
    <path d="M9 17.25C9 17.6642 9.33579 18 9.75 18C10.1642 18 10.5 17.6642 10.5 17.25H9ZM10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75H10.5ZM10.5 17.25V9.75H9V17.25H10.5Z" fill="#71717A"/>
    <path d="M13.5 17.25C13.5 17.6642 13.8358 18 14.25 18C14.6642 18 15 17.6642 15 17.25H13.5ZM15 9.75C15 9.33579 14.6642 9 14.25 9C13.8358 9 13.5 9.33579 13.5 9.75H15ZM15 17.25V9.75H13.5V17.25H15Z" fill="#71717A"/>
    <path d="M18.865 21.124L18.1176 21.0617L18.1176 21.062L18.865 21.124ZM17.37 22.5L17.3701 21.75H17.37V22.5ZM6.631 22.5V21.75H6.63093L6.631 22.5ZM5.136 21.124L5.88343 21.062L5.88341 21.0617L5.136 21.124ZM4.49741 4.43769C4.46299 4.0249 4.10047 3.71818 3.68769 3.75259C3.2749 3.78701 2.96818 4.14953 3.00259 4.56231L4.49741 4.43769ZM20.9974 4.56227C21.0318 4.14949 20.7251 3.78698 20.3123 3.75259C19.8995 3.7182 19.537 4.02495 19.5026 4.43773L20.9974 4.56227ZM18.1176 21.062C18.102 21.2495 18.0165 21.4244 17.878 21.5518L18.8939 22.6555C19.3093 22.2732 19.5658 21.7486 19.6124 21.186L18.1176 21.062ZM17.878 21.5518C17.7396 21.6793 17.5583 21.75 17.3701 21.75L17.3699 23.25C17.9345 23.25 18.4785 23.0379 18.8939 22.6555L17.878 21.5518ZM17.37 21.75H6.631V23.25H17.37V21.75ZM6.63093 21.75C6.44274 21.75 6.26142 21.6793 6.12295 21.5518L5.10713 22.6555C5.52253 23.0379 6.06649 23.25 6.63107 23.25L6.63093 21.75ZM6.12295 21.5518C5.98449 21.4244 5.89899 21.2495 5.88343 21.062L4.38857 21.186C4.43524 21.7486 4.69172 22.2732 5.10713 22.6555L6.12295 21.5518ZM5.88341 21.0617L4.49741 4.43769L3.00259 4.56231L4.38859 21.1863L5.88341 21.0617ZM19.5026 4.43773L18.1176 21.0617L19.6124 21.1863L20.9974 4.56227L19.5026 4.43773Z" fill="#71717A"/>
    </svg>
      </div>
      </div>

    </div>
  `;
  div.innerHTML = el;
  container.appendChild(div);
  taskInputAdd.value = "";
};

addTaskBtn.addEventListener("click", () => {
  const text = taskInputAdd.value;
  const noTitleText = document.querySelector(".no-title-text");
  const addTaskInfoText = document.querySelector(".add-task-info-text");

  if (taskInputAdd === null) {
    noTitleText.classList.remove("hidden");
    return;
  } else {
    noTitleText.classList.add("hidden");
  }

  if (!text) {
    noTitleText.classList.remove("hidden");
    return;
  }
  const selectedCategory = document.querySelector(".category-button-js.active");

  if (selectedCategory === null) {
    noCategoryText.classList.remove("hidden");
    return;
  }

  if (!text) {
    noCategoryText.classList.remove("hidden");
    return;
  }
  const category = selectedCategory.getAttribute("data-category");
  const id = Date.now();

  const createdAt = getCurrentDate();

  const task = {
    text,
    category,
    id,
    createdAt,
  };

  addSingleTask(task);
  const tasks = getTasks();
  tasks.push(task);
  const stringifiedTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringifiedTasks);
  taskInputAdd.value = "";
  empty.classList.add("hidden");
  showAddDiv.classList.add("hidden");
  selectedCategory.classList.remove("active");
});

const deleteTask = (id) => {
  const currentTask = document.getElementById(id);
  currentTask.parentElement.remove();
  const allTasks = document.querySelectorAll(".task");
  if (allTasks.length === 0) {
    empty.classList.remove("hidden");
  }
  const tasks = getTasks();

  const filteredTasks = tasks.filter((task) => task.id != id);
  const stringifiedTasks = JSON.stringify(filteredTasks);
  localStorage.setItem("tasks", stringifiedTasks);
};

deleteButton.addEventListener("click", () => {
  const id = showEditDiv.getAttribute("task-id");
  showEditDiv.classList.add("hidden");
  deleteTask(id);
});

const editTask = (id) => {
  const currentTask = document.getElementById(id);
  showEditDiv.classList.remove("hidden");
  const currentValue = currentTask.querySelector(".taskTitle").textContent;
  taskInputEdit.value = currentValue;

  showEditDiv.setAttribute("task-id", id);

  const categoryButton = currentTask.querySelector(".taskCategory");
  const currentCategory = categoryButton.getAttribute("data-category");
  categoryButtonsEdit.forEach((btn2) => btn2.classList.remove("active"));
  categoryButtonsEdit.forEach((btn) => {
    const categoryValue = btn.getAttribute("data-category");
    if (categoryValue === currentCategory) {
      btn.classList.add("active");
    }
  });
};

const closeEditBtn = document.querySelector(".close-edit-button");

saveEditBtn.addEventListener("click", () => {
  const text = taskInputEdit.value;
  const noTitleTextEdit = showEditDiv.querySelector(".no-title-text");
  if (taskInputEdit === null) {
    noTitleTextEdit.classList.remove("hidden");
    return;
  }

  if (!text) {
    noTitleTextEdit.classList.remove("hidden");
    return;
  }
  const selectedCategory = showEditDiv.querySelector(
    ".category-button-js.active",
  );
  const id = showEditDiv.getAttribute("task-id");
  const currentElement = document.getElementById(id);
  const taskTitle = currentElement.querySelector(".taskTitle");

  taskTitle.textContent = text;

  const taskCategory = currentElement.querySelector(".taskCategory");
  const attribute = selectedCategory.getAttribute("data-category");
  taskCategory.innerHTML = attribute;
  taskCategory.setAttribute("data-category", attribute);
  showEditDiv.classList.add("hidden");

  const editDateElement = currentElement.querySelector(".editAt");
  const editDate = editDateElement.querySelector("span");
  editDateElement.classList.remove("hidden");
  const editAt = getCurrentDate();
  editDate.textContent = editAt;

  const tasks = getTasks();

  const modifiedArray = tasks.map((task) => {
    if (task.id == id) {
      return {
        ...task,
        text: text,
        category: attribute,
        editAt: editAt,
      };
    }
    return task;
  });

  const stringifiedTasks = JSON.stringify(modifiedArray);
  localStorage.setItem("tasks", stringifiedTasks);
});

closeEditBtn.addEventListener("click", () => {
  showEditDiv.classList.add("hidden");
});

categoryButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    categoryButtons.forEach((btn2) => btn2.classList.remove("active"));
    btn.classList.add("active");
  }),
);

categoryButtonsEdit.forEach((btn) =>
  btn.addEventListener("click", () => {
    categoryButtonsEdit.forEach((btn2) => btn2.classList.remove("active"));
    btn.classList.add("active");
  }),
);

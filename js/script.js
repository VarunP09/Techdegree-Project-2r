/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
//use getElementsByClassName method to select the class('student-list')[0]
const linkList = document.getElementsByClassName('link-list')[0];
const studentList = document.getElementsByClassName('student-list')[0];
let itemData = data;
function showPage(list ,page){
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   studentList.innerHTML = '';
   let studentInfo = '';
      //If no results found during search
      if(list.length === 0){
         studentInfo += `<p class="no-results">No Results Found</p>`;
      } else {
       for (let i = 0; i < list.length; i++){
      if (i >= startIndex && i < endIndex){
         studentInfo += `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>    
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
          </div>
         </li>`;

     }
    }
  }
  studentList.insertAdjacentHTML("beforeend", studentInfo);
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   let pagenumber = Math.ceil(list.length/9);
   linkList.innerHTML = '';
// Math.ceil always rounds a number up to the next largest integer. 
for(let i = 1; i <= pagenumber; i++){
linkList.insertAdjacentHTML('beforeend',
   `<li>
      <button type="button">${i}</button>
   </li>`);
 }
   const firstbutton = document.querySelector('button');
   firstbutton.setAttribute("class","active");
   linkList.addEventListener('click',(e) =>{
      if(e.target.tagName === 'BUTTON'){
         const removebutton = document.querySelector('.active');
         removebutton.className = '';
         const addbutton = e.target;
         addbutton.className = 'active';
         const display = addbutton.textContent;
         showPage(list,display);
      } 
    });
}   
 //setAttribute() method adds the specified attribute to an element, and gives it the specified value.
 function insertSearchBar() {
   const header = document.querySelector('.header');
   searchBarHTML = `
   <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button" class="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
          </label>`;
   header.insertAdjacentHTML("beforeend", searchBarHTML);
}

// Call functions
showPage(data,1);
addPagination(data);
insertSearchBar();

// Variables for search bar
const searchField = document.getElementById('search');
const searchBtn = document.querySelector('button.submit');


//click event for pagination buttons

 
//removed the active class first then add it to the event target
//call the showPage function passing 2 arguments 
// Click event for search bar
searchField.addEventListener('keyup', () => {
   let searchText = searchField.value.toUpperCase();
   searchBtn.onclick = () => {
      searchField.value = '';
   }

   const filteredList = data.filter(student => {
      return (
         student.name.first.toUpperCase().includes(searchText) ||
         student.name.last.toUpperCase().includes(searchText)
      );
   });
   itemData = filteredList;
   currentPage = 1
   showPage(itemData, currentPage);
   addPagination(itemData); 
});

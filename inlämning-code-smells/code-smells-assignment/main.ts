/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

  function getLength(jumpings: number[]): number {
    let totalNumber = 0;
  
    totalNumber = jumpings.reduce(
      (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
    );
  
    return totalNumber;
  }

  //Förenkling 
  function getLengthResults(jumpings: number[]): number { 
    return jumpings.reduce((total, jump) => total + jump, 0);
  }
  
  /*
    2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
    */
  
  class Student {
    constructor(
      public name: string,
      public handedInOnTime: boolean,
      public passed: boolean
    ) {}
  }
  
  function getStudentStatus(student: Student): string {
    student.passed =
      student.name == "Sebastian"
        ? student.handedInOnTime
          ? true
          : false
        : false;
  
    if (student.passed) {
      return "VG";
    } else {
      return "IG";
    }
  }

 
  //Förenkling 
  class StudentPass {
    constructor(
      public name: string,
      public handedInOnTime: boolean,
      public passed: boolean
    ) {}
  }
  function getStudentResult(student: StudentPass): string {
    student.passed = student.name === "Sebastian" && student.handedInOnTime;
    return student.passed ? "VG" : "IG";
  }
  
  /*
    3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
    Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
    */
  
  class Temp {
    constructor(public q: string, public where: Date, public v: number) {}
  }
  
  function averageWeeklyTemperature(heights: Temp[]) {
    let r = 0;
  
    for (let who = 0; who < heights.length; who++) {
      if (heights[who].q === "Stockholm") {
        if (heights[who].where.getTime() > Date.now() - 604800000) {
          r += heights[who].v;
        }
      }
    }
  
    return r / 7;
  }


  //Förenkling 
  class CalcTemp {
    constructor(public city:string, public date: Date, public temperature: number){}
  }
  
  function calcWeeklyTemp(celcius: CalcTemp[]) {
    const oneWeekLength = Date.now() - 604800000; 

    const recentReadning = celcius.filter(
      (read) => read.city === "Stockholm" && read.date.getTime() > oneWeekLength)

    if(recentReadning.length === 0){
      return 0;
    }

    const totalTemperature = recentReadning.reduce((sum, r) => sum + r.temperature, 0)
    return totalTemperature / recentReadning.length 
  }

  /*
    4. Följande funktion kommer att presentera ett objekt i dom:en. 
    Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
    */
  
  function showProduct(
    name: string,
    price: number,
    amount: number,
    description: string,
    image: string,
    parent: HTMLElement
  ) {
    let container = document.createElement("div");
    let title = document.createElement("h4");
    let pris = document.createElement("strong");
    let imageTag = document.createElement("img");
  
    title.innerHTML = name;
    pris.innerHTML = price.toString();
    imageTag.src = image;
  
    container.appendChild(title);
    container.appendChild(imageTag);
    container.appendChild(pris);
    parent.appendChild(container);
  }


  //Förenkling 
  function displayProduct(
    name: string,
    price: string,
    description: string,
    image: string,
    parent: HTMLElement
  ) {
    const content = document.createElement("div")

    content.innerHTML = 
    `<h4>${displayProduct.name}</h4>
      <p><strong>${price}</strong></p>
      <img src="${image}" alt="${showProduct.name}">`

    parent.appendChild(content);
  }
  
  /*
    5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
    går att göra betydligt bättre. Gör om så många som du kan hitta!
    */

  function presentStudents(students: Student[]) {
    for (const student of students) {
      if (student.handedInOnTime) {
        let container = document.createElement("div");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
  
        container.appendChild(checkbox);
        let listOfStudents = document.querySelector("ul#passedstudents");
        listOfStudents?.appendChild(container);
      } else {
        let container = document.createElement("div");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = false;
  
        container.appendChild(checkbox);
        let listOfStudents = document.querySelector("ul#failedstudents");
        listOfStudents?.appendChild(container);
      }
    }
  }  

  //förenkling 
function displayStudents(students: Student[]){
  let passedList= document.querySelector("ul#passedstudents");
  let failedList = document.querySelector("ul#failedstudents")
  
  const createCheckboxRow = (isPassed: boolean) => {
    return
    `<div>
      <input type="checkbox" ${isPassed ? 'checked' : ''}>
      </div>
    `};

students.forEach(student => {
  const infoRow = createCheckboxRow(student.handedInOnTime);
  const studentResult = student.handedInOnTime ? passedList:failedList; 

  if(studentResult) {
    studentResult.innerHTML += infoRow; 
  }
});
}


  /*
    6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
    Lorem, ipsum, dolor, sit, amet
    Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
    */
  function concatenateStrings() {
    let result = "";
    result += "Lorem";
    result += "ipsum";
    result += "dolor";
    result += "sit";
    result += "amet";
  
    return result;
  }

  //Förenkling 
function concatenateStrings1(){
  const loremArray = ["Lorem", "ipsum", "dolor", "sit", "amet"]; 
  return loremArray.join(" ")
}
  
  /* 
  7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
      Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
      fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
      lösning som är hållbar och skalar bättre. 
  */
  function createUser(
    name: string,
    birthday: Date,
    email: string,
    password: string
  ) {
    // Validation
  
    let ageDiff = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDiff);
    let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  
    console.log(userAge);
  
    if (!(userAge < 20)) {
      // Logik för att skapa en användare
    } else {
      return "Du är under 20 år";
    }
  }
  

  //Förenkling 
  interface CreateUser {
    name: string;
    birthday: Date;
    email: string,
    password: string 
  }
   
  function isUserAdult(birthDate: Date, minAge = 20): boolean { 
    const age = new Date().getFullYear() - birthDate.getFullYear(); 
    return age >= minAge 
    } 
   
  function registerUser(newUser: CreateUser) { 
    if (!isUserAdult(newUser.birthday)) { 
      return ('Du är under 20 år!'); 
      } 
    } 

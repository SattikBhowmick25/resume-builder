// Taking elements from HTML
const main = document.querySelector(".container");
const info = document.querySelector(".info-form");
const inpCont=document.querySelector(".input-container");
const resumeTemp=document.querySelector(".resume");
const tempSelect=document.querySelector(".tempSelector");
const genButton=document.querySelector(".generate");
const leftSide=document.querySelector(".left");
const head1=document.getElementById("head1");
const head2=document.getElementById("head2");
const head3=document.getElementById("head3");

tempSelect.style.display='none';
resumeTemp.style.display='none';

// Function to add a new language input field
function addLanguageField() {
    let newnode = document.createElement("input");
    newnode.classList.add("inp", "added", "lan-input");
    newnode.setAttribute("placeholder", "Enter language");
    let lanSection = document.querySelector(".lan");
    let lanAddBtn = document.querySelector(".lanAdd");
    lanSection.insertBefore(newnode, lanAddBtn);
}
const lanBtn = document.querySelector(".lanBtn");
lanBtn.addEventListener("click", addLanguageField);

// Function to add a new link input field
function addLinkField() {
    let newnode = document.createElement("input");
    newnode.classList.add("inp", "added", "link-input");
    newnode.setAttribute("placeholder", "Enter link here");
    let linkField = document.querySelector(".link");
    let linkAddBtn = document.querySelector(".linkAdd");
    linkField.insertBefore(newnode, linkAddBtn);
}
const linkBtn = document.querySelector(".linkBtn");
linkBtn.addEventListener("click", addLinkField);

// Function to add a new skill input field
function addSkillField() {
    let newnode = document.createElement("input");
    newnode.classList.add("inp", "added", "skill-input");
    newnode.setAttribute("placeholder", "Enter skill");
    let skillField = document.querySelector(".skills");
    let skillAddBtn = document.querySelector(".addSkill");
    skillField.insertBefore(newnode, skillAddBtn);
}
const skillBtn = document.querySelector(".skillBtn");
skillBtn.addEventListener("click", addSkillField);

// Function to add experience field
function addExperienceField() {
    let newnode = document.createElement("textarea");
    newnode.classList.add("added", "expr");
    newnode.setAttribute("placeholder", "Enter experience");
    let expField = document.querySelector(".exper");
    let expAddBtn = document.querySelector(".addExp");
    expField.insertBefore(newnode, expAddBtn);
}
const expBtn = document.querySelector(".expBtn");
expBtn.addEventListener("click", addExperienceField);

// Handling file input and cropping
const imgField = document.getElementById('imgField');
const imagePreview = document.getElementById('imagePreview');
const cropButton = document.getElementById('cropButton');
let cropper;
let croppedImageURL;

// Display uploaded image for cropping
imgField.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block'; // Show the image for cropping
        cropButton.style.display = 'block'; // Show crop button
        if (cropper) {
            cropper.destroy(); // Remove the previous cropper if it exists
        }
        cropper = new Cropper(imagePreview, {
            aspectRatio: 1, // Set aspect ratio, change if needed
            viewMode: 1,
            autoCropArea: 1,
        });
    };
    reader.readAsDataURL(file);
});

// Crop and save the image
cropButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        croppedImageURL = croppedCanvas.toDataURL('image/png');
        document.getElementById('imgTemplate').src = croppedImageURL; // Set cropped image in the resume
        document.getElementById('imgTemplate').style.display = 'block'; // Show the cropped image in the resume

        
        cropButton.style.display = 'none'; // Hide crop button
        cropper.destroy(); // Remove the cropper after cropping
        imagePreview.style.display = 'none'; // Hide preview after cropping
    }
});

document.getElementById("grad-date").addEventListener("click", function () {
    this.showPicker();  // Ensure calendar pops up on click
});

// Function to generate the resume
function generateResume(event) {
    // Personal information
    const fname = info["firstname"].value;
    const lname = info["lastname"].value;
    const address = info["address"].value;
    const phone = info["phone"].value;
    const email = info["email"].value;

    document.getElementById("Name").innerHTML = `${fname} ${lname}`;
    document.getElementById("Contact").innerHTML = phone;
    document.getElementById("Email").innerHTML = email;
    document.getElementById("Addr").innerHTML = address;



    // Languages
    const languages = document.getElementsByClassName("lan-input");
    let lanF = "";
    for (let i = 0; i < languages.length; i++) {
        if (languages[i].value.trim() !== "") {
            lanF += `<li><span>${languages[i].value}</span></li>`;
        }
    }
    document.getElementById("Lan").innerHTML = lanF;

    // Links
    const links = document.getElementsByClassName("link-input");
    let linkF = "";
    for (let i = 0; i < links.length; i++) {
        if (links[i].value.trim() !== "") {
            linkF += `<li><span>${links[i].value}</span></li>`;
        }
    }
    document.getElementById("Links").innerHTML = linkF;

    // Education

    // Function to format the month-year input to "August 2032"
    function formatMonthYear(dateValue) {
        const [year, month] = dateValue.split('-');  // Split the value into year and month
        const date = new Date(year, month - 1);  // Create a Date object (month is 0-indexed)
        const options = { year: 'numeric', month: 'long' };  // Formatting options

        return date.toLocaleDateString('en-US', options);  // Example: "August 2032"
    }

    const inst = document.getElementById("institute").value;
    const deg = document.getElementById("degree").value;
    const fos = document.getElementById("fieldofstudy").value;
    const marks = document.getElementById("marks").value;
    const gradDate = document.getElementById("grad-date").value;

    const formattedDate = formatMonthYear(gradDate);
    
    let eduF = `<p>${deg}</p><p>${fos}</p><p>${inst}</p><p>${formattedDate}</p><p>${marks}</p>`;
    document.getElementById("Edu").innerHTML = eduF;

    // Skills
    const skills = document.getElementsByClassName("skill-input");
    let skillF = "";
    for (let i = 0; i < skills.length; i++) {
        if (skills[i].value.trim() !== "") {
            skillF += `<li><span>${skills[i].value}</span></li>`;
        }
    }
    document.getElementById("Skills").innerHTML = skillF;

    // Objective and Experience
    const obj = document.getElementById("objective").value;
    document.getElementById("Objective").innerHTML = obj;

    const experiences = document.getElementsByClassName("expr");
    let expF = "";
    for (let i = 0; i < experiences.length; i++) {
        if (experiences[i].value.trim() !== "") {
            expF += `<li><span>${experiences[i].value}</span></li>`;
        }
    }
    document.getElementById("Exp").innerHTML = expF;


     // Set the cropped image in the resume (if available)
     if (croppedImageURL) {
        document.getElementById('imgTemplate').src = croppedImageURL;
    }
    
    //Manipulating colors
    console.log(event.target.id);
    const tempId=event.target.id;
    switch(tempId){
        case 'tempPic1':    console.log('Hello 1',leftSide);
                            leftSide.classList.add("leftColor1");
                            head1.classList.add("chColor1");
                            head2.classList.add("chColor1");
                            head3.classList.add("chColor1");
                            break;
        case 'tempPic2':    console.log('Hello 2');
                            leftSide.classList.add("leftColor2");
                            head1.classList.add("chColor2");
                            head2.classList.add("chColor2");
                            head3.classList.add("chColor2");
                            break;
        case 'tempPic3':    console.log('Hello 3');
                            leftSide.classList.add("leftColor3");
                            head1.classList.add("chColor3");
                            head2.classList.add("chColor3");
                            head3.classList.add("chColor3");
                            break;

    }
    genButton.style.display='none';
    inpCont.style.display='none';
    tempSelect.style.display='none';
    resumeTemp.style.display='block';
}

// Function to display the template options
function displayTemplate(){
    genButton.style.display='none';
    tempSelect.style.display='flex';
    inpCont.style.display='none';
    resumeTemp.style.display='none';
}
// Event listener for generating the resume
const genBtn=document.querySelector(".generateBtn");
genBtn.addEventListener("click", displayTemplate);


// Print Resume
function printResume() {
    inpCont.style.display = "none";
    const content = document.querySelector(".resume");
    const btnN = document.getElementById("btnN");
    const btnE = document.getElementById("btnE");

    btnN.style.display = "none";
    btnE.style.display = "none";

    content.style.display = "block";
    document.querySelector(".left").style.display = "block";

    html2pdf()
        .from(content)
        .set({
            margin: 0.5, // Remove margins
            filename: `resume_${Date.now()}.pdf`,
            html2canvas: {
                scale: 2,
                scrollY: 0,
                windowWidth: 208 * 3.7795275591, // A4 width
                windowHeight: 295 * 3.7795275591, // A4 height
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .save()
        .then(() => {
            btnN.style.display = "flex";
            btnE.style.display = "flex";
        });
}

const printBtn=document.querySelector(".printResume");
printBtn.addEventListener("click",printResume);

function editResume(){
    leftSide.classList.remove("leftColor1");
    head2.classList.remove("chColor1");
    head3.classList.remove("chColor1");
    head1.classList.remove("chColor1");
    leftSide.classList.remove("leftColor2");
    head2.classList.remove("chColor2");
    head3.classList.remove("chColor2");
    head1.classList.remove("chColor2");
    leftSide.classList.remove("leftColor3");
    head2.classList.remove("chColor3");
    head3.classList.remove("chColor3");
    head1.classList.remove("chColor3");
    resumeTemp.style.display='none';
    inpCont.style.display='block';
    genButton.style.display='flex';

}

const editBtn=document.querySelector(".editResume");
editBtn.addEventListener("click",editResume);

function valPic(){
    console.log(1);
}
const t1=document.getElementById("temp1");
const t2=document.getElementById("temp2");
const t3=document.getElementById("temp3");

t1.addEventListener("click", generateResume);
t2.addEventListener("click", generateResume);
t3.addEventListener("click", generateResume);
// document.addEventListener('DOMContentLoaded', () => {
//     // Hamburger Menu functionality
//     const hamburgerMenu = document.querySelector('.hamburger-menu');
//     const menuItems = document.querySelector('.menu-items');

//     hamburgerMenu.addEventListener('click', () => {
//         menuItems.style.display = menuItems.style.display === 'block' ? 'none' : 'block';
//     });

  
    const loginForm = document.querySelector('.login-form'); // Selector based on class used in index.html
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const data = {
                key1: username,
                key2: password
              };

            fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify(data),
            })
                .then(response => {
                    window.location.href = 'http://127.0.0.1:8080/upload.html';
                    
                });
                
                     // Redirect to the upload page on successful login
                   
              
                // .catch(error => {
                //     console.error('Error:', error);
                //     alert('Login failed. Please try again.');
                // });
        });
    }

    // Handle Registration Form Submission
    const registrationForm = document.querySelector('.registration-form'); // Selector based on class used in reg.html
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();
    
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;

            const data = {
                key1: username,
                key2: email,
                key3: password
              };

            fetch("http://127.0.0.1:5000/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify(data),
            })
            .then(response => {
                    console.log("boo");
                    window.location.href = "http://192.168.0.171:8080/index.html"; // Redirect to the login page on successful registration
                
                 });
                

                
                
               
        });
    }

// document.addEventListener('DOMContentLoaded', () => {
//     //Hamburger Menu functionality
//     const hamburgerMenu = document.querySelector('.hamburger-menu');
//     const menuItems = document.querySelector('.menu-items');

// hamburgerMenu.addEventListener('click', () => {
//     menuItems.style.display = menuItems.style.display === 'block' ? 'none' : 'block';
// });

// Drag and Drop functionality for the file input areas
document.querySelectorAll('.file-drop-area').forEach(dropArea => {
    const fileInput = dropArea.querySelector('.file-input');
    const fileMsg = dropArea.querySelector('.file-msg');
    const fakeBtn = dropArea.querySelector('.fake-btn');

    dropArea.addEventListener('dragover', (event) => {
        event.stopPropagation();
        event.preventDefault();
        dropArea.classList.add('highlight');
        fileMsg.textContent = 'Release to upload files';
    });

    dropArea.addEventListener('dragleave', (event) => {
        dropArea.classList.remove('highlight');
        fileMsg.textContent = 'or drag and drop files here';
    });

    dropArea.addEventListener('drop', (event) => {
        event.stopPropagation();
        event.preventDefault();
        dropArea.classList.remove('highlight');
        const files = event.dataTransfer.files;
        if (files.length > 1) {
            alert('You can only upload one file in each field.');
        } else {
            fileInput.files = files;
            fileMsg.textContent = files[0].name;
        }
    });
});

// Form submission for file upload
const uploadForm = document.getElementById('uploadForm');
const fileList = document.getElementById('file-list');
const uploadedFilesSection = document.getElementById('uploaded-files-list');

uploadForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Create a FormData object and append files
    const formData = new FormData(this);
    const fileInputs = document.querySelectorAll('.file-input');

    if (fileInputs.length === 2 && fileInputs[0].files.length && fileInputs[1].files.length) {
        formData.append('file1', fileInputs[0].files[0]);
        formData.append('file2', fileInputs[1].files[0]);
    } else {
        alert('Please select two Excel files to upload.');
        return;
    }

    // Use fetch API to send the files to the server
    fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
    })
        // .then(response => response.json())
        .then(data => {
            // if (data.success) {
            // Clear previous list and display success message
            fileList.innerHTML = '';
            uploadedFilesSection.style.display = 'block';
            fileList.appendChild(document.createElement('li')).textContent = 'File 1 uploaded successfully: ' + fileInputs[0].files[0].name;
            fileList.appendChild(document.createElement('li')).textContent = 'File 2 uploaded successfully: ' + fileInputs[1].files[0].name;
            alert('Excel files uploaded successfully!');
            // } else {
            //     alert(data.message || 'Upload failed.');
            // }
        })
        .catch(error => {
            console.error('Done:', error);
            alert('Uploaded Successfully!');
        });
});
// });

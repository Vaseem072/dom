//   document.querySelector('form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent actual form submission

//     const username = document.querySelector('input[type="text"]').value;
//     const password = document.querySelector('input[type="password"]').value;

//     // Dummy check: In real projects, validate securely on the server
//     if (username && password) {
//    
//     //   alert(`Welcome, ${username}! You are now logged in.`);
//     } else {
//       alert('Please enter both username and password.');
//     }
//   });


   // localStorage.setItem('vaseem', 1234);
    const username = document.querySelector('input[type="text"]')
   const password = document.querySelector('input[type="password"]')
   
   document.getElementById("singbtn").addEventListener("click",(e)=>{
  if(username.value=="vaseem" && password.value==1234){
     window.location.href="Home.html"
   }
   else{
    alert("Your password is incorrect")
   }
   })
 
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register("/sw.js")
  .then(reg => {
    console.log("serviceWorker Reg Successful!");
  })
  .catch(error => {
    console.log("serviceWorker Reg Fail???");
  });
}
var resizee = new Resizee([
  {
    name: "onDesktop",
    rules: {
      minHeight: 500
    }
  }
]);
resizee.on("onDesktop", eventName => {
  console.log(eventName);
});

# Resizee

Resizee is simply an event emitter, but a bit helpful.
It listens `resize` event on the `window` object. Whenever a `resize` event happens, it checks your configured `events`
and fire their listeners if window size satisfies the event rules.

# How to use ?

```
var resizee = new Resizee([
  {
    name: "onDesktop",
    rules: {
      minHeight: 500 // px
    }
  }
]);
resizee.on("onDesktop", eventName => {
  console.log(eventName);
});
```

# Rules

You can use any of below rules to create your events.

`minHeight`
`maxHeight`
`minWidth`
`maxWidth`

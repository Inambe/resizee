(function() {
  // const
  const ruleNames = {
    minH: "minHeight",
    maxH: "maxHeight",
    minW: "minWidth",
    maxW: "maxWidth"
  };
  // models
  function dimensionModel(w, h) {
    this.w = w;
    this.h = h;
  }
  // functions
  function lookForEvents(dimension, events) {
    return new Promise((res, rej) => {
      const winW = dimension.w;
      const winH = dimension.h;
      events.forEach(event => {
        const rules = event.rules;
        let doesApply = true;
        for (let ruleKey in rules) {
          switch (ruleKey) {
            case ruleNames.minH:
              doesApply = winH >= rules[ruleKey] ? true : false;
              break;
            case ruleNames.maxH:
              doesApply = winH <= rules[ruleKey] ? true : false;
              break;
            case ruleNames.minW:
              doesApply = winW >= rules[ruleKey] ? true : false;
              break;
            case ruleNames.maxW:
              doesApply = winW <= rules[ruleKey] ? true : false;
              break;
          }
          if (!doesApply) {
            break;
          }
        }
        if (doesApply) {
          res(event.name);
        }
      });
    });
  }
  function emitEvents(eventName, eventListeners) {
    eventListeners[eventName] = eventListeners[eventName] || [];
    eventListeners[eventName].forEach(listener => {
      listener(eventName);
    });
  }
  function onWindowResize(events, eventListeners) {
    const dimension = new dimensionModel(window.innerWidth, window.innerHeight);
    lookForEvents(dimension, events).then(eventName => {
      emitEvents(eventName, eventListeners);
    });
  }
  function Resizee(events) {
    // constructor
    this.events = events;
    this.eventListeners = {};
    this.windowResizeEventListener = onWindowResize.bind(
      null,
      this.events,
      this.eventListeners
    );
    this.windowResizeEventListener();
    window.addEventListener("resize", this.windowResizeEventListener);
  }
  Resizee.prototype.destroy = function() {
    window.removeEventListener("resize", this.windowResizeEventListener);
  };
  Resizee.prototype.on = function(eventName, listener) {
    this.eventListeners[eventName] = this.eventListeners[eventName] || [];
    this.eventListeners[eventName].push(listener);
  };
  window.Resizee = Resizee;
})();

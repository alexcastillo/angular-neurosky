const { createClient } = require("node-thinkgear-sockets");
const { fromEvent } = require("rxjs/observable/fromEvent");
const io = require("socket.io")(4501);

const brain = createClient();

brain.connect();

const emit = (socket, metric) => data => {
  console.log(metric, data);
  socket.emit(`metric/${metric}`, data);
};

io.on("connection", socket => {
  socket.on("start", () => {
    console.log("socket start");

    const freqSubscription = fromEvent(brain, "data").subscribe(
      emit(socket, "eeg")
    );
    const blinksSubscription = fromEvent(brain, "blink_data").subscribe(
      emit(socket, "blinks")
    );

    socket.on("stop", () => {
      console.log("socket stop");
      freqSubscription.unsubscribe();
      blinksSubscription.unsubscribe();
    });
  });
});

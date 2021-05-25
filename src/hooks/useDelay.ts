import React, { useState } from "react";

// const Delay = (lastState = {}) => {
//   let state = {
//     duration: 300,
//     callAmount: 0,
//     callStack: 0,
//     ...lastState,
//   };
//   const behavior = (state) => ({
//     ...canHandleDelay(state),
//   });
//   Object.assign(state, behavior(state));
//   return state;
// };

// const canHandleDelay = (state) => ({
//   increment: () => {
//     state.callStack += 1;
//     state.callAmount += 1;
//     return state;
//   },
//   decrement: () => {
//     state.callStack -= 1;
//     return state;
//   },
//   run: ({ callback, args }) => {
//     state.decrement();
//     if (state.callStack === 0) {
//       callback(args);
//     }
//     return state;
//   },
//   runAsync: (callback, args) => {
//     if (state.callStack === 0) state.callAmount = 0;
//     state.increment();
//     setTimeout(state.run, state.duration, { callback, args });
//     return state;
//   },
// });
interface IDelayRunArgs {
  callback: (args: any) => void;
  args: any;
}
class Delay {
  duration: number;
  callAmount: number;
  callStack: number;
  constructor(initialDuration = 300) {
    this.duration = initialDuration;
    this.callAmount = 0;
    this.callStack = 0;
  }
  private increment() {
    this.callStack += 1;
    this.callAmount += 1;
  }
  private decrement() {
    this.callStack -= 1;
    this.callAmount -= 1;
  }
  private run({ callback, args }: IDelayRunArgs) {
    this.decrement();
    if (this.callStack === 0) {
      callback(args);
    }
    return this;
  }
  runAsync(callback: (args: any) => void, args: any) {
    if (this.callStack === 0) this.callAmount = 0;
    this.increment();
    const runDelayWithContext = (payload: IDelayRunArgs) => this.run(payload);
    setTimeout(runDelayWithContext, this.duration, { callback, args });
    return this;
  }
  get() {
    return this;
  }
}

const useDelay = (duration?: number) => {
  const delay = new Delay(duration);
  const [state, setState] = useState(delay);
  const runAsync = (callback: (args: any) => void, args?: any) => {
    const nextState = state.runAsync(callback, args);
    setState(nextState);
  };
  return { state, runAsync };
};

export default useDelay;

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module "rc-collapse" {
  export default class Collapse extends React.Component<any, any> {}

  export class Panel extends React.Component<any, any> {}
}

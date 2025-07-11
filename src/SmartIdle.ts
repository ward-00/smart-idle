export interface SmartIdleOptions {
  timeout?: number;
  onIdle?: () => void;
  onActive?: () => void;
  events?: string[];
}

export class SmartIdle {
  private timeout: number;
  private onIdle: () => void;
  private onActive: () => void;
  private _timer: ReturnType<typeof setTimeout> | null = null;
  private _idle: boolean = false;
  private _paused: boolean = false;
  private _events: string[] = [];

  constructor(options: SmartIdleOptions = {}) {
    this.timeout = options.timeout || 60000;
    this.onIdle = options.onIdle || (() => {});
    this.onActive = options.onActive || (() => {});
    this._events = options.events || [
      "mousemove", "keydown", "scroll", "touchstart", "visibilitychange"
    ];

    this._handleEvent = this._handleEvent.bind(this);
  }

  public start() {
    this._events.forEach(e => window.addEventListener(e, this._handleEvent));
    this._resetTimer();
  }

  public stop() {
    this._events.forEach(e => window.removeEventListener(e, this._handleEvent));
    if (this._timer) clearTimeout(this._timer);
  }

  public pause() {
    this._paused = true;
    if (this._timer) clearTimeout(this._timer);
  }

  public resume() {
    if (!this._paused) return;
    this._paused = false;
    this._resetTimer();
  }

  public isIdle(): boolean {
    return this._idle;
  }

  public triggerIdle() {
    if (!this._idle) {
      this._idle = true;
      this.onIdle();
      window.dispatchEvent(new CustomEvent("idle"));
    }
  }

  public triggerActive() {
    if (this._idle) {
      this._idle = false;
      this.onActive();
      window.dispatchEvent(new CustomEvent("active"));
      this._resetTimer();
    }
  }

  public destroy() {
    this.stop();
    this._idle = false;
    this._paused = false;
    this._timer = null;
  }

  private _handleEvent() {
    if (this._paused) return;
    if (this._idle) {
      this._idle = false;
      this.onActive();
      window.dispatchEvent(new CustomEvent("active"));
    }
    this._resetTimer();
  }

  private _resetTimer() {
    if (this._timer) clearTimeout(this._timer);
    if (this._paused || document.hidden) return;

    this._timer = setTimeout(() => {
      this._idle = true;
      this.onIdle();
      window.dispatchEvent(new CustomEvent("idle"));
    }, this.timeout);
  }
}
/**
 * Grok Cinematic Scroll Engine
 * ----------------------------
 * Pure JavaScript frame-sequence engine that produces the
 * Draftly-style "3D cinematic scroll" effect.
 *
 * No WebGL. No Three.js. Just native scroll + canvas.
 */

export interface ScrollEngineOptions {
  canvasId?: string;
  stageSelector?: string;
  frameCount?: number;
  framePath?: string;
  extension?: string;
  /** How many frames to preload before considering the engine ready */
  preloadCount?: number;
  onReady?: () => void;
  onProgress?: (progress: number, frame: number) => void;
}

export class GrokScrollEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stage: HTMLElement;
  private frameCount: number;
  private framePath: string;
  private extension: string;
  private frames: (HTMLImageElement | null)[];
  private loaded = 0;
  private currentFrame = -1;
  private isReady = false;
  private dpr = 1;
  private onReady?: () => void;
  private onProgress?: (progress: number, frame: number) => void;
  private boundOnScroll: () => void;
  private boundOnResize: () => void;

  constructor(options: ScrollEngineOptions = {}) {
    const canvas = document.getElementById(
      options.canvasId || "frame-canvas"
    ) as HTMLCanvasElement | null;

    if (!canvas) {
      throw new Error(
        `Canvas element "#${options.canvasId || "frame-canvas"}" not found`
      );
    }

    const stage = document.querySelector(
      options.stageSelector || ".cinematic-stage"
    ) as HTMLElement | null;

    if (!stage) {
      throw new Error(
        `Stage element "${options.stageSelector || ".cinematic-stage"}" not found`
      );
    }

    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Could not get 2D context");
    this.ctx = ctx;

    this.stage = stage;
    this.frameCount = options.frameCount ?? 120;
    this.framePath = options.framePath ?? "/frames/frame_";
    this.extension = options.extension ?? "webp";
    this.frames = new Array(this.frameCount).fill(null);
    this.onReady = options.onReady;
    this.onProgress = options.onProgress;

    this.boundOnScroll = () => requestAnimationFrame(() => this.onScroll());
    this.boundOnResize = () => this.resize();

    this.resize();
    window.addEventListener("resize", this.boundOnResize);
  }

  /** Start loading frames and attach scroll listener */
  async start() {
    await this.preload();
    window.addEventListener("scroll", this.boundOnScroll, { passive: true });
    this.onScroll(); // initial paint
  }

  /** Clean up listeners */
  destroy() {
    window.removeEventListener("scroll", this.boundOnScroll);
    window.removeEventListener("resize", this.boundOnResize);
  }

  private resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    if (this.isReady && this.currentFrame >= 0) {
      this.draw(this.currentFrame);
    }
  }

  private async preload() {
    const BATCH = 16;

    for (let i = 0; i < this.frameCount; i += BATCH) {
      const promises: Promise<void>[] = [];
      for (let j = 0; j < BATCH && i + j < this.frameCount; j++) {
        promises.push(this.loadFrame(i + j));
      }
      await Promise.all(promises);
    }

    this.isReady = true;
    this.onReady?.();
  }

  private loadFrame(index: number): Promise<void> {
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.src = `${this.framePath}${String(index).padStart(4, "0")}.${this.extension}`;

      img.onload = () => {
        this.frames[index] = img;
        this.loaded++;
        resolve();
      };

      img.onerror = () => {
        console.warn(`Failed to load frame ${index}`);
        resolve();
      };
    });
  }

  private onScroll() {
    if (!this.isReady) return;

    const rect = this.stage.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;

    // Avoid division by zero on very short stages
    const progress =
      totalScrollable <= 0
        ? 0
        : Math.max(0, Math.min(1, -rect.top / totalScrollable));

    const targetFrame = Math.min(
      this.frameCount - 1,
      Math.floor(progress * (this.frameCount - 1))
    );

    if (targetFrame !== this.currentFrame) {
      this.currentFrame = targetFrame;
      this.draw(targetFrame);
      this.onProgress?.(progress, targetFrame);
    }
  }

  private draw(index: number) {
    const img = this.frames[index];
    if (!img) return;

    const canvasW = window.innerWidth;
    const canvasH = window.innerHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasW / canvasH;

    let drawW: number;
    let drawH: number;
    let offsetX: number;
    let offsetY: number;

    // object-fit: cover behaviour
    if (imgRatio > canvasRatio) {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      offsetX = (canvasW - drawW) / 2;
      offsetY = 0;
    } else {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      offsetX = 0;
      offsetY = (canvasH - drawH) / 2;
    }

    this.ctx.clearRect(0, 0, canvasW, canvasH);
    this.ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }

  /** Public helpers */
  get progress() {
    return this.currentFrame / Math.max(1, this.frameCount - 1);
  }

  get current() {
    return this.currentFrame;
  }

  get ready() {
    return this.isReady;
  }
}

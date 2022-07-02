import { libs } from "components/system/Desktop/Wallpapers/hexells";
import type { OffscreenRenderProps } from "components/system/Desktop/Wallpapers/types";
import { isWebGLAvailable } from "utils/functions";

/* eslint-disable vars-on-top, no-var  */
declare global {
  var Demo: new (canvas: OffscreenCanvas) => void;
  var demoCanvasRect: DOMRect;
  var devicePixelRatio: number;
}
/* eslint-enable vars-on-top, no-var */

globalThis.addEventListener(
  "message",
  ({ data }: { data: DOMRect | OffscreenRenderProps | string }) => {
    if (!isWebGLAvailable) return;

    if (data === "init") {
      globalThis.importScripts(...libs);
    } else if (data instanceof DOMRect) {
      globalThis.demoCanvasRect = data;
    } else {
      const { canvas, devicePixelRatio } = data as OffscreenRenderProps;

      globalThis.devicePixelRatio = devicePixelRatio;

      // eslint-disable-next-line no-new
      new globalThis.Demo(canvas);
    }
  },
  { passive: true }
);

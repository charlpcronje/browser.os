import type { config } from "components/apps/V86/config";
import type { V86ImageConfig } from "components/apps/V86/image";

export type SizeCallback = (dimensions: number[]) => void;

type EventListener = (event: string, callback: SizeCallback) => void;

export type V86Starter = {
  add_listener: EventListener;
  destroy: () => void;
  lock_mouse: () => void;
  remove_listener: EventListener;
  save_state: (callback: (error: Error, newState: ArrayBuffer) => void) => void;
};

export type V86Config = V86ImageConfig &
  typeof config & {
    boot_order: number;
    filesystem?: {
      basefs: string;
      baseurl: string;
    };
    initial_state?: { url: string };
    memory_size: number;
    screen_container: HTMLDivElement | null;
    vga_memory_size: number;
  };

type V86Constructor = new (v86Config: V86Config) => V86Starter;

declare global {
  interface Window {
    DEBUG?: boolean;
    V86Starter: V86Constructor;
  }
}

export type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};

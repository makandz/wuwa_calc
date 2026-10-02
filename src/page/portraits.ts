import { PORTRAITS } from "./portrait-assets.js";

export const PORTRAIT_CACHE = "wuwa-character-portraits-v1";
const sources = new Map<string, Promise<string>>();

export function portrait(name: string): string {
  const file = Object.hasOwn(PORTRAITS, name) ? PORTRAITS[name] : undefined;
  return file ? `<img class="character-portrait" data-portrait="${file}" alt="" width="24" height="24" decoding="async">` : "";
}

// Cache Storage keeps the bytes across visits; one blob URL per image serves every rendered row.
export function portraitSource(source: string): Promise<string> {
  const existing = sources.get(source);
  if (existing) return existing;
  const pending = readPortrait(source).catch((error: unknown) => {
    sources.delete(source);
    throw error;
  });
  sources.set(source, pending);
  return pending;
}

async function readPortrait(source: string): Promise<string> {
  let cache: Cache | undefined;
  let response: Response | undefined;
  try {
    cache = await caches.open(PORTRAIT_CACHE);
    response = await cache.match(source);
  } catch {
    // Storage may be unavailable in private browsing or on an insecure origin.
  }
  if (!response) {
    response = await fetch(source, { cache: "force-cache" });
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
      throw new Error(`Portrait request failed: ${response.status}`);
    }
    try {
      await cache?.put(source, response.clone());
    } catch {
      // A full cache still permits the image to display for this visit.
    }
  }
  return URL.createObjectURL(await response.blob());
}

export function loadPortraits(root: ParentNode): void {
  for (const image of root.querySelectorAll<HTMLImageElement>("img[data-portrait]:not([src])")) {
    const source = new URL(`./assets/portraits/${image.dataset.portrait}`, document.baseURI).href;
    image.addEventListener("error", () => {
      image.style.visibility = "hidden";
    }, { once: true });
    void portraitSource(source).then((url) => {
      if (image.isConnected) image.src = url;
    }).catch(() => {
      image.style.visibility = "hidden";
    });
  }
}

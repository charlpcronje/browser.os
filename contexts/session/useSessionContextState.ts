import type { SortBy } from "components/system/Files/FileManager/useSortBy";
import { useFileSystem } from "contexts/fileSystem";
import type {
  ClockSource,
  SessionContextState,
  SessionData,
  SortOrders,
  WallpaperFit,
  WindowStates,
} from "contexts/session/types";
import { useCallback, useEffect, useState } from "react";
import type { ThemeName } from "styles/themes";
import { DEFAULT_THEME } from "utils/constants";

const SESSION_FILE = "/session.json";

const useSessionContextState = (): SessionContextState => {
  const { exists, readFile, writeFile } = useFileSystem();
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [foregroundId, setForegroundId] = useState("");
  const [stackOrder, setStackOrder] = useState<string[]>([]);
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME);
  const [clockSource, setClockSource] = useState<ClockSource>("local");
  const [windowStates, setWindowStates] = useState<WindowStates>(
    Object.create(null) as WindowStates
  );
  const [sortOrders, setSortOrders] = useState<SortOrders>(
    Object.create(null) as SortOrders
  );
  const [wallpaperFit, setWallpaperFit] = useState<WallpaperFit>("fill");
  const [wallpaperImage, setWallpaperImage] = useState("VANTA");
  const [runHistory, setRunHistory] = useState<string[]>([]);
  const prependToStack = useCallback(
    (id: string) =>
      setStackOrder((currentStackOrder) => [
        id,
        ...currentStackOrder.filter((stackId) => stackId !== id),
      ]),
    []
  );
  const removeFromStack = useCallback(
    (id: string) =>
      setStackOrder((currentStackOrder) =>
        currentStackOrder.filter((stackId) => stackId !== id)
      ),
    []
  );
  const setWallpaper = useCallback(
    (image: string, fit?: WallpaperFit): void => {
      if (fit) setWallpaperFit(fit);
      setWallpaperImage(image);
    },
    []
  );

  useEffect(() => {
    if (sessionLoaded) {
      writeFile(
        SESSION_FILE,
        JSON.stringify({
          clockSource,
          runHistory,
          sortOrders,
          themeName,
          wallpaperFit,
          wallpaperImage,
          windowStates,
        }),
        true
      );
    }
  }, [
    clockSource,
    runHistory,
    sessionLoaded,
    sortOrders,
    themeName,
    wallpaperFit,
    wallpaperImage,
    windowStates,
    writeFile,
  ]);
  const setSortOrder = useCallback(
    (
      directory: string,
      order: string[] | ((currentSortOrder: string[]) => string[]),
      sortBy?: SortBy,
      ascending?: boolean
    ): void =>
      setSortOrders((currentSortOrder = {}) => {
        const [currentOrder, currentSortBy, currentAscending] =
          currentSortOrder[directory] || [];
        const newOrder =
          typeof order === "function" ? order(currentOrder) : order;

        return {
          ...currentSortOrder,
          [directory]: [
            newOrder,
            sortBy ?? currentSortBy,
            ascending ?? currentAscending,
          ],
        };
      }),
    []
  );

  useEffect(() => {
    const initSession = async (): Promise<void> => {
      if (await exists(SESSION_FILE)) {
        const sessionData = await readFile(SESSION_FILE);
        const session = JSON.parse(
          sessionData.toString() || "{}"
        ) as SessionData;

        if (session.clockSource) setClockSource(session.clockSource);
        if (session.sortOrders) setSortOrders(session.sortOrders);
        if (session.themeName) setThemeName(session.themeName);
        if (session.wallpaperImage) {
          setWallpaper(session.wallpaperImage, session.wallpaperFit);
        }
        if (session.windowStates) setWindowStates(session.windowStates);
        if (session.runHistory) setRunHistory(session.runHistory);
      }

      setSessionLoaded(true);
    };

    initSession();
  }, [exists, readFile, setWallpaper]);

  return {
    clockSource,
    foregroundId,
    prependToStack,
    removeFromStack,
    runHistory,
    sessionLoaded,
    setClockSource,
    setForegroundId,
    setRunHistory,
    setSortOrder,
    setThemeName,
    setWallpaper,
    setWindowStates,
    sortOrders,
    stackOrder,
    themeName,
    wallpaperFit,
    wallpaperImage,
    windowStates,
  };
};

export default useSessionContextState;

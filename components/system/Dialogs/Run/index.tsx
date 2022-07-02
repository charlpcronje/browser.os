import type { ComponentProcessProps } from "components/system/Apps/RenderComponent";
import StyledRun from "components/system/Dialogs/Run/StyledRun";
import StyledButton from "components/system/Dialogs/Transfer/StyledButton";
import {
  getProcessByFileExtension,
  getShortcutInfo,
} from "components/system/Files/FileEntry/functions";
import useFileDrop from "components/system/Files/FileManager/useFileDrop";
import { useFileSystem } from "contexts/fileSystem";
import { useProcesses } from "contexts/process";
import processDirectory from "contexts/process/directory";
import { useSession } from "contexts/session";
import { extname } from "path";
import { useCallback, useEffect, useRef, useState } from "react";
import { PACKAGE_DATA, SHORTCUT_EXTENSION } from "utils/constants";
import spawnSheep from "utils/eSheep";

const OPEN_ID = "open";

const resourceAliasMap: Record<string, string> = {
  cmd: "Terminal",
  dos: "JSDOS",
  explorer: "FileExplorer",
  monaco: "MonacoEditor",
  vlc: "VideoPlayer",
};

const MESSAGE = `Type the name of a program, folder, document, or Internet resource, and ${PACKAGE_DATA.alias} will open it for you.`;

const notFound = (resource: string): void =>
  // eslint-disable-next-line no-alert
  alert(
    `Cannot find '${resource}'. Make sure you typed the name correctly, and then try again.`
  );

const utilCommandMap: Record<string, () => void> = {
  esheep: spawnSheep,
  sheep: spawnSheep,
};

const Run: FC<ComponentProcessProps> = () => {
  const {
    open,
    closeWithTransition,
    processes: { Run: runProcess } = {},
  } = useProcesses();
  const { exists, readFile, stat } = useFileSystem();
  const { foregroundId, runHistory, setRunHistory } = useSession();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(true);
  const [isEmptyInput, setIsEmptyInput] = useState(!runHistory[0]);
  const runResource = useCallback(
    async (resource?: string) => {
      if (!resource) return;

      const addRunHistoryEntry = (): void =>
        setRunHistory((currentRunHistory) =>
          currentRunHistory[0] !== resource
            ? [resource, ...currentRunHistory]
            : currentRunHistory
        );
      const [resourcePid, ...resourceUrl] = resource.split(" ");
      let resourcePath = resource;
      const resourceExists = await exists(resourcePath);

      if (!resourceExists) {
        resourcePath =
          resourceUrl.length > 0 ? resourceUrl.join(" ") : resourcePid;
      }

      if (resourceExists || (await exists(resourcePath))) {
        const stats = await stat(resourcePath);

        if (stats.isDirectory()) {
          open("FileExplorer", { url: resourcePath }, "");
          addRunHistoryEntry();
        } else if (
          resourcePid &&
          resourceUrl.length > 0 &&
          resourcePath !== resource
        ) {
          const pid = Object.keys(processDirectory).find(
            (processName) =>
              processName.toLowerCase() === resourcePid.toLowerCase()
          );

          if (pid) {
            open(pid, { url: resourcePath });
            addRunHistoryEntry();
          } else {
            notFound(resourcePid);
          }
        } else {
          const extension = extname(resourcePath);

          if (extension === SHORTCUT_EXTENSION) {
            const { pid, url } = getShortcutInfo(await readFile(resourcePath));

            if (pid) open(pid, { url });
          } else {
            const basePid = getProcessByFileExtension(extension);

            if (basePid) open(basePid, { url: resourcePath });
          }

          addRunHistoryEntry();
        }
      } else {
        const pid = Object.keys(processDirectory).find(
          (processName) =>
            processName.toLowerCase() ===
            (
              resourceAliasMap[resourcePath.toLowerCase()] || resourcePath
            ).toLowerCase()
        );

        if (pid) {
          open(pid);
          addRunHistoryEntry();
        } else if (utilCommandMap[resource.toLowerCase()]) {
          utilCommandMap[resource.toLowerCase()]();
          addRunHistoryEntry();
        } else {
          notFound(resource);
        }
      }

      closeWithTransition("Run");
    },
    [closeWithTransition, exists, open, readFile, setRunHistory, stat]
  );

  useEffect(() => {
    if (foregroundId === "Run") {
      inputRef.current?.focus();
      if (inputRef.current?.value) inputRef.current?.select();
    }
  }, [foregroundId]);

  useEffect(() => {
    if (runProcess?.url && inputRef.current) {
      inputRef.current.value = `${inputRef.current.value.trimEnd()} ${
        runProcess.url.includes(" ") ? `"${runProcess.url}"` : runProcess.url
      }`.trim();
      setIsEmptyInput(false);
    }
  }, [runProcess?.url]);

  return (
    <StyledRun {...useFileDrop({ id: "Run" })}>
      <figure>
        <img alt="Run" src="/System/Icons/32x32/run.webp" />
        <figcaption>{MESSAGE}</figcaption>
      </figure>
      <div>
        <label htmlFor={OPEN_ID}>Open:</label>
        <div>
          <input
            ref={inputRef}
            autoComplete="off"
            defaultValue={runHistory[0]}
            enterKeyHint="go"
            id={OPEN_ID}
            onBlurCapture={({ relatedTarget }) => {
              if (
                !runProcess?.componentWindow ||
                runProcess.componentWindow.contains(relatedTarget)
              ) {
                inputRef.current?.focus();
              } else {
                setIsInputFocused(false);
              }
            }}
            onFocusCapture={() => setIsInputFocused(true)}
            onKeyDown={({ key }) => {
              if (key === "Enter") runResource(inputRef.current?.value.trim());
              if (key === "Escape") closeWithTransition("Run");
            }}
            onKeyUp={({ target }) =>
              setIsEmptyInput(!(target as HTMLInputElement)?.value)
            }
            spellCheck="false"
            type="text"
          />
          <select
            disabled={runHistory.length === 0}
            onChange={({ target }) => {
              if (inputRef.current) {
                inputRef.current.value = target.value;
                setIsEmptyInput(false);
              }
            }}
            onClick={({ target }) => {
              if (
                target instanceof HTMLSelectElement &&
                target.selectedIndex !== -1
              ) {
                // eslint-disable-next-line no-param-reassign
                target.selectedIndex = -1;
              }
            }}
          >
            {runHistory.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={`${entry}-${index}`} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </div>
      </div>
      <nav>
        <StyledButton
          $active={isInputFocused}
          disabled={isEmptyInput}
          onClick={() => runResource(inputRef.current?.value.trim())}
        >
          OK
        </StyledButton>
        <StyledButton onClick={() => closeWithTransition("Run")}>
          Cancel
        </StyledButton>
      </nav>
    </StyledRun>
  );
};

export default Run;

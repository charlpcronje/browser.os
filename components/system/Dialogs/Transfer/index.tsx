import type { ComponentProcessProps } from "components/system/Apps/RenderComponent";
import StyledButton from "components/system/Dialogs/Transfer/StyledButton";
import StyledTransfer from "components/system/Dialogs/Transfer/StyledTransfer";
import type { FileReaders } from "components/system/Dialogs/Transfer/useTransferDialog";
import { useProcesses } from "contexts/process";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MAX_TITLE_LENGTH = 37;

const Dialog: FC<ComponentProcessProps> = ({ id }) => {
  const {
    closeWithTransition,
    processes: { [id]: process } = {},
    title,
  } = useProcesses();
  const { fileReaders = [] } = process || {};
  const [currentTransfer, setCurrentTransfer] = useState<[string, File]>();
  const [cd = "", { name = "" } = {}] = currentTransfer || [];
  const [progress, setProgress] = useState(0);
  const processReader = useCallback(
    ([[file, directory, reader], ...remainingReaders]: FileReaders) => {
      let fileProgress = 0;

      setCurrentTransfer([directory, file]);

      reader.addEventListener("progress", ({ loaded = 0 }) => {
        const progressLoaded = loaded - fileProgress;

        setProgress((currentProgress) => currentProgress + progressLoaded);
        fileProgress = loaded;
      });
      reader.addEventListener("loadend", () => {
        if (remainingReaders.length > 0) {
          processReader(remainingReaders);
        } else {
          closeWithTransition(id);
        }
      });
      reader.readAsArrayBuffer(file);
    },
    [closeWithTransition, id]
  );
  const totalTransferSize = useMemo(
    () => fileReaders.reduce((acc, [{ size = 0 }]) => acc + size, 0) || 0,
    [fileReaders]
  );
  const processing = useRef(false);

  useEffect(() => {
    if (!processing.current) {
      if (fileReaders.length > 0) {
        processing.current = true;
        title(id, "Copying...");
        processReader(fileReaders);
      } else {
        closeWithTransition(id);
      }
    }
  }, [closeWithTransition, fileReaders, id, processReader, title]);

  return (
    <StyledTransfer>
      <h1>
        {`Copying '${
          name.length >= MAX_TITLE_LENGTH
            ? `${name.slice(0, MAX_TITLE_LENGTH)}...`
            : name
        }'`}
      </h1>
      <div>
        <h2>{`To '${cd}'`}</h2>
        <progress max={totalTransferSize} value={progress} />
      </div>
      <nav>
        <StyledButton
          onClick={() => {
            // eslint-disable-next-line unicorn/no-unreadable-array-destructuring
            fileReaders.forEach(([, , reader]) => reader.abort());
            closeWithTransition(id);
          }}
        >
          Cancel
        </StyledButton>
      </nav>
    </StyledTransfer>
  );
};

export default Dialog;

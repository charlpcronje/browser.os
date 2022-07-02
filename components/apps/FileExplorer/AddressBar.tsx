import { Refresh } from "components/apps/FileExplorer/NavigationIcons";
import StyledAddressBar from "components/apps/FileExplorer/StyledAddressBar";
import { useFileSystem } from "contexts/fileSystem";
import { useProcesses } from "contexts/process";
import { basename } from "path";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "styles/common/Button";
import { ROOT_NAME } from "utils/constants";
import { label } from "utils/functions";

type AddressBarProps = {
  id: string;
};

const AddressBar: FC<AddressBarProps> = ({ id }) => {
  const addressBarRef = useRef<HTMLInputElement | null>(null);
  const {
    url: changeUrl,
    processes: {
      [id]: { icon, url = "" },
    },
  } = useProcesses();
  const displayName = basename(url) || ROOT_NAME;
  const [addressBar, setAddressBar] = useState(displayName);
  const { exists, updateFolder } = useFileSystem();
  const style = useMemo(
    () => ({
      backgroundImage: `url('${icon.replace("/Icons/", "/Icons/16x16/")}')`,
    }),
    [icon]
  );

  useEffect(() => {
    if (addressBarRef.current) {
      if (addressBar === url) {
        addressBarRef.current.select();
      } else if (addressBar === displayName) {
        window.getSelection()?.removeAllRanges();
      } else if (document.activeElement !== addressBarRef.current) {
        setAddressBar(displayName);
      }
    }
  }, [addressBar, displayName, url]);

  return (
    <StyledAddressBar style={style}>
      <input
        ref={addressBarRef}
        enterKeyHint="go"
        onBlurCapture={() => setAddressBar(displayName)}
        onChange={({ target }) => setAddressBar(target.value)}
        onFocusCapture={() => setAddressBar(url)}
        onKeyDown={async ({ key }) => {
          if (key === "Enter" && addressBarRef.current) {
            const { value } = addressBarRef.current;
            if (value && (await exists(value))) changeUrl(id, value);
            addressBarRef.current.blur();
          }
        }}
        spellCheck={false}
        type="text"
        value={addressBar}
      />
      <Button
        id="refresh"
        onClick={() => updateFolder(url)}
        {...label("Refresh")}
      >
        <Refresh />
      </Button>
    </StyledAddressBar>
  );
};

export default AddressBar;

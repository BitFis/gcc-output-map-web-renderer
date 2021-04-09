import { Alert, AlertTitle, Box, Button } from "@material-ui/core";
import { useState, VFC } from "react";
import { FileDrop } from "react-file-drop";
import { useFilePicker } from "use-file-picker";
import MapParser from "../parser/MapParser";

function parseFile(files: FileList | null): Promise<ArrayBuffer> {
  if (files?.length === 1) {
    return (files.item(0) as File).arrayBuffer().then((buffer: ArrayBuffer) => {
      // do things
      console.log("lets work on the file size: ", buffer.byteLength);

      new MapParser(buffer).parser();

      return buffer;
    });
  } else {
    return new Promise((res, rej) => {
      rej("provide one file!");
      console.error(files);
    });
  }
}

const OutputDrop: VFC = () => {
  const [filesContent, errors, openFileSelector, loading] = useFilePicker({
    multiple: false,
    // accept: '.ics,.pdf',
    accept: [".map"],
  });
  // TMP
  openFileSelector;
  const [dropLoading, setDropLoading] = useState(false);
  const [dropError, setDropError] = useState<boolean | string>(false);
  const [filesystemError, setFilesystemError] = useState<boolean | string>(
    false
  );
  const [hover, setHover] = useState(false);

  if (filesContent[0]) {
    console.log(
      "loading through filesystem currently not supported!",
      JSON.stringify(filesContent)
    );
  }

  return (
    <div>
      {errors.length > 0 ? (
        <Alert onClose={() => (errors.length = 0)} severity="error">
          <AlertTitle>Error occured while opening file!</AlertTitle>
          {JSON.stringify(errors)}
        </Alert>
      ) : (
        ""
      )}
      {filesystemError ? (
        <Alert onClose={() => setFilesystemError(false)} severity="warning">
          <AlertTitle>{filesystemError}</AlertTitle>
          Drop the file onto the region.
        </Alert>
      ) : (
        ""
      )}
      {dropError ? (
        <Alert onClose={() => setDropError(false)} severity="error">
          <AlertTitle>Loading Dropped file failed!</AlertTitle>
          {dropError}
        </Alert>
      ) : (
        ""
      )}
      <FileDrop
        onDrop={(files) => {
          setDropLoading(true);
          parseFile(files)
            .catch((err) => setDropError(err))
            .finally(() => setDropLoading(false));
        }}
        onDragOver={() => {
          if (!hover) {
            setHover(true);
            console.log("setHover(true)");
          }
        }}
        onDragLeave={() => {
          if (hover) {
            setHover(false);
            console.log("setHover(false)");
          }
        }}
      >
        <Box
          sx={{ p: 0, border: "1px dashed grey", m: "auto" }}
          justifyContent="center"
          justifyItems="center"
        >
          <Button
            disabled={loading || dropLoading}
            onClick={() => {
              // openFileSelector()
              setFilesystemError("openFileSelector currently not supported");
            }}
            sx={{ p: 3, m: "auto" }}
            fullWidth={true}
            style={
              hover
                ? {
                    backgroundColor: "rgba(63, 81, 181, 0.04)",
                  }
                : {}
            }
          >
            {loading || dropLoading ? "Loading ..." : "Drop output.map here"}
          </Button>
        </Box>
      </FileDrop>
    </div>
  );
};

export default OutputDrop;

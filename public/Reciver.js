const file = {};

let percent = 0;

self.onmessage = (e) => {
  const data = e.data;
  console.log("data");

  if (data.mode === "dataTransfer") {
    if (!file[data.meta?.name ?? "noname"]) {
      file[data.meta?.name ?? "noname"] = [];
    }

    file[data.meta?.name ?? "noname"].push(data.data);
    const per = ((data.currentByte ?? 0) / (data.meta?.size ?? 1)) * 100;

    if (per >= percent + 3) {
      percent = per;
      self.postMessage({ percent: percent });
    }
  } else if (data.mode === "complete") {
    percent = 0;
    const ff = new Blob(file[data.meta?.name ?? "noname"]);

    console.log("complete", data.meta.size, file[data.meta?.name]?.length);
    file[data.meta?.name ?? "noname"] = [];
    self.postMessage({ meta: data.meta, data: ff });
  }
};

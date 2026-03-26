const https = require("https");
const fs = require("fs");

const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzI1ZTYwNDM4NWY5ZjQ1ODNhMDEyNGQ0ODE5YzQ4ZjBkEgsSBxCYqbyblgIYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjU2MDczNTYzMTg3MjE0MzIyOQ&filename=&opi=96797242";

https.get(url, (res) => {
  const file = fs.createWriteStream("stitch_card.html");
  res.pipe(file);
  file.on("finish", () => {
    file.close();
    console.log("Download complete.");
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

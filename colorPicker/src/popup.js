import { pickColor } from "./colorPicker.js";

const btn = document.querySelector(".btn");
const color = document.getElementById("color");
const text = document.getElementById("text");

btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: {
        tabId: tab.id,
        allFrames: true,
      },
      function: pickColor,
    },
    resultHandle
  );
});

const resultHandle = async (result) => {
  try {
    let dataObj = result[0].result;
    if (dataObj.status) {
      navigator.clipboard.writeText(dataObj.result.sRGBHex).then(() => {
        color.style.backgroundColor = dataObj.result.sRGBHex;
        color.style.display = "block";

        text.innerText = `Color, Copied to ClipBoard`;
      });
    }
  } catch (err) {
    console.log(err, ":err");
  }
};

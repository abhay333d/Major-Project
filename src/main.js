import {
  bootstrapCameraKit,
  createMediaStreamSource,
  Transform2D,
} from "@snap/camera-kit";

(async function () {
  const apiToken =
    "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQ0MzYzNjY2LCJzdWIiOiIzOWU5YzhhNy04NmM5LTQxNGEtYTYyOS1jMDI2ZjAwNzVjMmV-U1RBR0lOR341MWU0MmQ1Mi0xMGNhLTRlZDUtOGM3ZS0yYmEwZDdhNzQwZmYifQ.vJV4ifQz_GzEQqukF56RXbtwm2UOtaldkVhKcyisVB4";
  const cameraKit = await bootstrapCameraKit({ apiToken });

  const canvas = document.getElementById("my-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
  const session = await cameraKit.createSession({ liveRenderTarget: canvas });

  session.events.addEventListener("error", (event) => {
    if (event.detail.error.name === "LensExecutionError") {
      console.log(
        "The current Lens encountered an error and was removed.",
        event.detail.error
      );
    }
  });

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const source = createMediaStreamSource(stream, {
    transform: Transform2D.MirrorX,
    cameraType: "front",
  });
  await session.setSource(source);

  const lens = await cameraKit.lensRepository.loadLens(
    "8e8ad6e6-4148-4711-803e-4a1fb4ef2838",
    "630d1061-61c4-4ba4-b23e-260ef8c88f2e"
  );
  await session.applyLens(lens);

  await session.play();
  console.log("Lens rendering has started!");
})();

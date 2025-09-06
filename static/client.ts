const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const stopBtn = document.getElementById("stopBtn") as HTMLButtonElement;
const localVideo = document.getElementById("localVideo") as HTMLVideoElement;
const localAudio = document.getElementById("localAudio") as HTMLAudioElement;
const statusElem = document.getElementById("status") as HTMLElement;

let localStream: MediaStream | null = null;

startBtn.addEventListener("click", async () => {
  statusElem.textContent = "Requesting camera and microphone...";
  try {
    const constraints: MediaStreamConstraints = {
      video: { width: 1280, height: 720 },
      audio: true,
    };
    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideo.srcObject = localStream;
    const audioTracks = localStream.getAudioTracks();
    if (audioTracks.length > 0) {
      const audioOnly = new MediaStream(audioTracks.map((t) => t.clone()));
      localAudio.srcObject = audioOnly;
      await localAudio.play().catch(() => {});
      localAudio.style.display = "block";
    } else {
      localAudio.style.display = "none";
    }
    statusElem.textContent = "Preview started.";
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (err: any) {
    console.error(err);
    statusElem.textContent = `Error: ${err?.name ?? err}`;
  }
});

stopBtn.addEventListener("click", () => {
  if (!localStream) return;
  localStream.getTracks().forEach((t) => t.stop());
  localStream = null;
  localVideo.srcObject = null;
  localAudio.srcObject = null;
  statusElem.textContent = "Stopped.";
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

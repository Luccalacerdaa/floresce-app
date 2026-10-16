"use client";

import { useEffect, useRef, useState } from "react";

// Voz do app: síntese de fala do próprio aparelho, em português.
export function speak(text: string, { rate = 0.88, pitch = 1.25 } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "pt-BR";
  u.rate = rate;
  u.pitch = pitch;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("pt"));
  if (voice) u.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

let ctx: AudioContext | null = null;

// Um "plim" curtinho para acertos.
export function chime(high = false) {
  try {
    ctx ??= new AudioContext();
    const now = ctx.currentTime;
    [0, 0.09].forEach((offset, i) => {
      const osc = ctx!.createOscillator();
      const gain = ctx!.createGain();
      osc.type = "sine";
      osc.frequency.value = (high ? 988 : 784) * (i ? 1.5 : 1);
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.18, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.35);
      osc.connect(gain).connect(ctx!.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.4);
    });
  } catch {}
}

/**
 * Nível do microfone (0 a ~0,5), medido no aparelho. Nada é gravado nem enviado.
 */
export function useMicLevel() {
  const [level, setLevel] = useState(0);
  const [status, setStatus] = useState<"off" | "on" | "denied">("off");
  const res = useRef<{ stream?: MediaStream; ctx?: AudioContext; raf?: number }>({});

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false },
      });
      const audio = new AudioContext();
      const analyser = audio.createAnalyser();
      analyser.fftSize = 512;
      audio.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      let last = 0;
      const loop = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (const v of data) sum += ((v - 128) / 128) ** 2;
        const rms = Math.sqrt(sum / data.length);
        if (Math.abs(rms - last) > 0.005) {
          last = rms;
          setLevel(rms);
        }
        res.current.raf = requestAnimationFrame(loop);
      };
      loop();
      res.current = { ...res.current, stream, ctx: audio };
      setStatus("on");
    } catch {
      setStatus("denied");
    }
  }

  useEffect(() => {
    const r = res.current;
    return () => {
      if (r.raf) cancelAnimationFrame(r.raf);
      r.stream?.getTracks().forEach((t) => t.stop());
      r.ctx?.close();
    };
  }, []);

  return { level, status, start };
}

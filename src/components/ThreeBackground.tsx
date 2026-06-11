"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Subtle, elegant WebGL backdrop — a slowly drifting particle field in
 * emerald/graphite tones. No additive "glow" blending, low opacity, gentle
 * mouse parallax. Pauses when the tab is hidden and honors reduced-motion.
 */
export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // --- particle field --------------------------------------------------
    const COUNT = 1100;
    const positions = new Float32Array(COUNT * 3);
    const radius = 26;
    for (let i = 0; i < COUNT; i++) {
      // distribute roughly within a sphere shell for depth
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const isDark = document.documentElement.classList.contains("dark");
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(isDark ? 0x3fa688 : 0x2c8a6e),
      size: 0.14,
      sizeAttenuation: true,
      transparent: true,
      opacity: isDark ? 0.55 : 0.4,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // a faint second, larger-spaced layer for parallax depth
    const farGeo = geometry.clone();
    const farMat = material.clone();
    farMat.size = 0.08;
    farMat.opacity = isDark ? 0.28 : 0.2;
    const farPoints = new THREE.Points(farGeo, farMat);
    farPoints.scale.setScalar(1.6);
    scene.add(farPoints);

    // --- interaction -----------------------------------------------------
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.y = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("pointermove", onPointer);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // --- render loop -----------------------------------------------------
    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!running) return;
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;

      const baseRot = prefersReduced ? 0 : t * 0.02;
      points.rotation.y = baseRot + current.x;
      points.rotation.x = current.y * 0.5;
      farPoints.rotation.y = baseRot * 0.6 + current.x * 0.5;
      farPoints.rotation.x = current.y * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- cleanup ---------------------------------------------------------
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      farGeo.dispose();
      material.dispose();
      farMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 40%, #000 55%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 40%, #000 55%, transparent 100%)",
      }}
    />
  );
}

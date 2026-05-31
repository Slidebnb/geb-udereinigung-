'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particle system — nodes
    const nodeCount = 120;
    const positions: number[] = [];
    const colors: number[] = [];
    const blueColor  = new THREE.Color('#4BB8F5');
    const greenColor = new THREE.Color('#2DC94E');
    const nodeData: { x: number; y: number; z: number; vx: number; vy: number; vz: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 30;
      positions.push(x, y, z);
      nodeData.push({ x, y, z, vx: (Math.random() - 0.5) * 0.02, vy: (Math.random() - 0.5) * 0.02, vz: (Math.random() - 0.5) * 0.01 });
      const c = Math.random() > 0.4 ? blueColor : greenColor;
      colors.push(c.r, c.g, c.b);
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    nodeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const nodeMat = new THREE.PointsMaterial({ size: 0.5, vertexColors: true, transparent: true, opacity: 0.9 });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    // Connection lines
    const lineMat = new THREE.LineBasicMaterial({ color: '#4BB8F5', transparent: true, opacity: 0.12 });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    // Floating house geometry (subtle)
    const houseGroup = new THREE.Group();
    // Roof
    const roofGeo = new THREE.ConeGeometry(4, 3, 4);
    const roofMat = new THREE.MeshBasicMaterial({ color: '#4BB8F5', wireframe: true, transparent: true, opacity: 0.15 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(12, 6, -5);
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);

    // Second roof (green)
    const roof2Geo = new THREE.ConeGeometry(3, 2.5, 4);
    const roof2Mat = new THREE.MeshBasicMaterial({ color: '#2DC94E', wireframe: true, transparent: true, opacity: 0.12 });
    const roof2 = new THREE.Mesh(roof2Geo, roof2Mat);
    roof2.position.set(14, 7, -5);
    roof2.rotation.y = Math.PI / 4;
    houseGroup.add(roof2);

    // Torus ring accent
    const torusGeo = new THREE.TorusGeometry(8, 0.08, 8, 60);
    const torusMat = new THREE.MeshBasicMaterial({ color: '#4BB8F5', transparent: true, opacity: 0.08 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(-10, 0, -10);
    houseGroup.add(torus);

    const torus2Geo = new THREE.TorusGeometry(5, 0.06, 8, 60);
    const torus2Mat = new THREE.MeshBasicMaterial({ color: '#2DC94E', transparent: true, opacity: 0.07 });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.position.set(10, -3, -8);
    houseGroup.add(torus2);

    scene.add(houseGroup);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.005;

      // Update node positions
      const pos = nodeGeo.attributes.position;
      for (let i = 0; i < nodeCount; i++) {
        nodeData[i].x += nodeData[i].vx;
        nodeData[i].y += nodeData[i].vy;
        nodeData[i].z += nodeData[i].vz;
        if (Math.abs(nodeData[i].x) > 30) nodeData[i].vx *= -1;
        if (Math.abs(nodeData[i].y) > 20) nodeData[i].vy *= -1;
        if (Math.abs(nodeData[i].z) > 15) nodeData[i].vz *= -1;
        pos.setXYZ(i, nodeData[i].x, nodeData[i].y, nodeData[i].z);
      }
      pos.needsUpdate = true;

      // Draw connection lines
      lineGroup.clear();
      const threshold = 10;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodeData[i].x - nodeData[j].x;
          const dy = nodeData[i].y - nodeData[j].y;
          const dz = nodeData[i].z - nodeData[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < threshold) {
            const opacity = (1 - dist / threshold) * 0.25;
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(nodeData[i].x, nodeData[i].y, nodeData[i].z),
              new THREE.Vector3(nodeData[j].x, nodeData[j].y, nodeData[j].z),
            ]);
            const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: '#4BB8F5', transparent: true, opacity }));
            lineGroup.add(line);
          }
        }
      }

      // Rotate house group
      houseGroup.rotation.y = time * 0.3;
      torus.rotation.z = time * 0.2;
      torus2.rotation.x = time * 0.15;

      // Camera parallax
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

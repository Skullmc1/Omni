"use client";
import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";

export default function BombExplosion() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const bombRef = useRef<Matter.Body>();
  const particlesRef = useRef<Matter.Body[]>([]);
  const isExplodedRef = useRef(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Matter.js setup
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;

    // Create engine
    const engine = Engine.create({ gravity: { x: 0, y: 1 } });
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 500,
        height: 500,
        wireframes: false,
        background: "transparent",
      },
    });

    // Create bomb
    const bomb = Bodies.circle(250, 250, 30, {
      render: {
        fillStyle: "#1a1a1a",
        strokeStyle: "#dc2626",
        lineWidth: 3,
      },
      isStatic: true,
    });
    bombRef.current = bomb;

    // Create fuse
    const fuse = Bodies.rectangle(250, 210, 4, 20, {
      render: {
        fillStyle: "#dc2626",
      },
      isStatic: true,
    });

    World.add(engine.world, [bomb, fuse]);

    // Run the engine
    Engine.run(engine);
    Render.run(render);

    // Trigger explosion after delay
    setTimeout(() => {
      if (isExplodedRef.current) return;
      isExplodedRef.current = true;

      // Remove bomb and fuse
      World.remove(engine.world, [bomb, fuse]);

      // Create explosion particles
      const particles = Array.from({ length: 30 }, (_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const speed = 15;
        const particle = Bodies.circle(250, 250, Math.random() * 8 + 4, {
          render: {
            fillStyle: i % 2 === 0 ? "#dc2626" : "#991b1b",
          },
          friction: 0.05,
          restitution: 0.8,
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
          },
        });
        return particle;
      });

      particlesRef.current = particles;
      World.add(engine.world, particles);

      // Fade out particles
      setTimeout(() => {
        particles.forEach((particle, index) => {
          setTimeout(() => {
            World.remove(engine.world, particle);
          }, index * 50);
        });
      }, 2000);
    }, 2000);

    // Cleanup
    return () => {
      Render.stop(render);
      World.clear(engine.world, true);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, []);

  return (
    <div ref={sceneRef} className="w-[500px] h-[500px] relative mx-auto" />
  );
}

"use client";
import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function PhysicsSimulation() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const controlPointRef = useRef<Matter.Body>();
  const mainCircleRef = useRef<Matter.Body>();
  const constraintRef = useRef<Matter.Constraint>();
  const requestRef = useRef<number>();
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!sceneRef.current) return;

    // Matter.js setup
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Constraint = Matter.Constraint;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

    // Create engine
    const engine = Engine.create();
    engine.gravity.y = 0;
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

    // Create main circle (non-static to allow rotation)
    const mainCircle = Bodies.circle(250, 250, 100, {
      render: {
        fillStyle: "#dc2626",
        opacity: 0.5,
      },
      isStatic: false,
      friction: 0.1,
      restitution: 0.6,
    });
    mainCircleRef.current = mainCircle;

    // Create control point
    const controlPoint = Bodies.circle(350, 250, 10, {
      render: {
        fillStyle: "#ffffff",
      },
      mass: 0.1,
    });
    controlPointRef.current = controlPoint;

    // Create rigid constraint between main circle and control point
    const constraint = Constraint.create({
      bodyA: mainCircle,
      bodyB: controlPoint,
      pointA: { x: 100, y: 0 },
      length: 0,
      stiffness: 1,
      render: {
        visible: true,
        strokeStyle: "#ffffff",
        lineWidth: 2,
      },
    });
    constraintRef.current = constraint;

    // Create boundaries to keep everything contained
    const walls = [
      Bodies.rectangle(250, 0, 500, 20, { isStatic: true }), // top
      Bodies.rectangle(250, 500, 500, 20, { isStatic: true }), // bottom
      Bodies.rectangle(0, 250, 20, 500, { isStatic: true }), // left
      Bodies.rectangle(500, 250, 20, 500, { isStatic: true }), // right
    ];

    // Create small objects
    const smallObjects = [...Array(20)].map(() => {
      const isSquare = Math.random() > 0.5;
      const size = Math.random() * 10 + 15;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 70;
      const x = 250 + Math.cos(angle) * radius;
      const y = 250 + Math.sin(angle) * radius;

      const body = isSquare
        ? Bodies.rectangle(x, y, size, size, {
            render: {
              fillStyle: "#991b1b",
            },
            friction: 0.1,
            restitution: 0.6,
            mass: 0.1,
          })
        : Bodies.circle(x, y, size / 2, {
            render: {
              fillStyle: "#991b1b",
            },
            friction: 0.1,
            restitution: 0.6,
            mass: 0.1,
          });

      return body;
    });

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    // Event handling for rotation
    Matter.Events.on(mouseConstraint, "mousemove", (event) => {
      if (mouseConstraint.body === controlPoint) {
        const mousePosition = event.mouse.position;
        const centerPos = mainCircle.position;

        // Calculate angular velocity based on mouse movement
        const angle = Math.atan2(
          mousePosition.y - centerPos.y,
          mousePosition.x - centerPos.x,
        );

        // Apply rotation to main circle
        Matter.Body.setAngularVelocity(mainCircle, angle * 0.1);

        // Store last mouse position
        lastMousePos.current = mousePosition;
      }
    });

    // Add all bodies to the world
    World.add(engine.world, [
      mainCircle,
      controlPoint,
      constraint,
      mouseConstraint,
      ...walls,
      ...smallObjects,
    ]);

    // Run the engine
    Engine.run(engine);
    Render.run(render);

    // Animation loop for continuous updates
    const animate = () => {
      Matter.Engine.update(engine, 1000 / 60);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
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

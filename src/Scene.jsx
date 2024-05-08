import {
  motion,
  MotionCanvas,
  LayoutOrthographicCamera
} from "framer-motion-3d"
import { MeshStandardMaterial, BoxGeometry, Mesh, Group, DirectionalLight, AmbientLight } from "three"
import { useThree, useFrame, extend } from "@react-three/fiber"
import { transition } from "./settings.js"

extend({ MeshStandardMaterial, BoxGeometry, Mesh, Group, DirectionalLight, AmbientLight })


export default function Scene({ isFullscreen }) {

  return (
    <MotionCanvas dpr={[1, 2]}>
      <LayoutOrthographicCamera
        initial={false}
        animate={
          isFullscreen
            ? {
                x: 10,
                y: 10,
                z: 10,
                zoom: 100
              }
            : { x: 0, y: 0, z: 5, zoom: 67 }
        }
        transition={
          isFullscreen
            ? { ...transition, delay: 1, duration: transition.duration - 1 }
            : transition
        }
      />
      <Lights />
      <Geometry />
    </MotionCanvas>
  );
}

function Lights() {
  const three = useThree();
  useFrame(() => three.camera.lookAt(0, 0, 0));

  return (
    <>
      <ambientLight intensity={0.3} />

      <directionalLight
        intensity={0.5}
        position={[0, 5, 0]}
        rotation={[1.8, 0, 0]}
      />
      <directionalLight
        intensity={1}
        position={[0, 0, 5]}
        rotation={[0, 0, 0]}
      />
    </>
  );
}

function Box({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <motion.meshStandardMaterial color="blue" />
    </mesh>
  );
}


function Geometry({ size = 20 }) {
  const boxes = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (r % 2) {
        const yOffset = c % 2 ? 1 : 0;
        boxes.push(<Box key={`${r}-${c}`} position={[c, r + yOffset, 0]} />);
      }
    }
  }

  const offset = -Math.ceil(size / 2);
  return <group position={[offset, offset, 0]}>{boxes}</group>;
}

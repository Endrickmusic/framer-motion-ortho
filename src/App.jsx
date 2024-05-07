
import { useState, Suspense } from "react"
import { motion, MotionConfig } from "framer-motion"

import './index.css'

import Scene from "./Scene.jsx"


export default function App() {

  const [isFullscreen, setFullscreen] = useState(false);

 return (

  <MotionConfig transition={transition}>
  <div
    data-is-fullscreen={isFullscreen}
    onClick={() => setFullscreen(!isFullscreen)}
  >
    <motion.h1
      layout
      children="Framer Motion Orthographic Camera"
      animate={{ color: isFullscreen ? "#cc0f4e" : "#000" }}
    />
    <motion.div className="container" layout>
      <Suspense fallback={null}>
        <Scene isFullscreen={isFullscreen} />
      </Suspense>
    </motion.div>
  </div>
</MotionConfig>
  
  );
}

export const transition = {
  duration: 4,
  ease: [0.54, 0.01, 0.61, 1]
};

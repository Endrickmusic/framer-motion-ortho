import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useEnvironment, useTexture } from '@react-three/drei'
import { Object3D, Vector4, InstancedBufferAttribute } from 'three'
import { useFrame } from '@react-three/fiber'

import vertexShader from './shader/vertexShader.js'
import fragmentShader from './shader/fragmentShader.js'

export default function Model(props) {
  const instancedRef = useRef()
  const { nodes } = useGLTF('./models/ob1.glb')
  const envMap = useEnvironment({files:'./environments/aerodynamics_workshop_2k.hdr'})
  const matcap = useTexture('./textures/sec2.png')

  // Instancing

  let rows = 100
  const count = rows * rows
  const dummy = new Object3D()

  useEffect(()=>{

  console.log(instancedRef.current)
  

  let index = 0
  let random = new Float32Array(count)
  console.log(random)
  for(let i=0; i < rows; i++){
    for(let j=0; j < rows; j++){
      
      random[index] = Math.random()
      const spacing = 1
      let x = (i - rows / 2) * spacing
      let z = (j - rows / 2) * spacing

      dummy.position.set(x, -10, z)
      dummy.updateMatrix()
      instancedRef.current.setMatrixAt(index++, dummy.matrix)

    }
  }

  instancedRef.current.instanceMatrix.needsUpdate = true

  // add random values to the geometry
  instancedRef.current.geometry.setAttribute('aRandom', new InstancedBufferAttribute(random, 1) )
},[])

const uniforms = useMemo(
  () => ({
    uTime: { type: "f", value: 1.0,},
    uMatcap: { type: "texture", value: matcap },
    uResolution: { type: "vec2", value: new Vector4()}
    })
  )

  useFrame((state, delta) => {
    if (instancedRef.current.material){
    instancedRef.current.material.uniforms.uTime.value += delta
  }   
  })

  return (
    <instancedMesh
    ref={instancedRef}
    args={[nodes['ob1-object-nodata'].geometry, undefined, count]}

    >
      <shaderMaterial 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </instancedMesh>
  )
}

useGLTF.preload('./models/ob1.glb')


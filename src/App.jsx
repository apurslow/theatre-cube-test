import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Box, Sky, Cylinder, Sphere } from "@react-three/drei";
import { getProject, val, types, onChange } from "@theatre/core";
import { SheetProvider, PerspectiveCamera, useCurrentSheet, editable } from "@theatre/r3f";
import { useEffect, useRef, useState } from "react";

import * as THREE from 'three'






function App() {

  const sheet = getProject('Bouncy Box').sheet('Scene')


  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={3} damping={0.5} maxSpeed={0.5}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
  )
}

export default App





function Scene() {

  const sheet = useCurrentSheet()
  const scroll = useScroll()

  const editableCube = editable(Box, 'Box')

  const threeRef = useRef()
  const matRef = useRef()
  const [theatreObject, setTheatreObject] = useState(null)
  const colortype = types.rgba()







  //our callback will run on every animation frame
  useFrame(() => {

    //the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length)

    //update the "position" of trhe playhead in the  sequence as a fraction of the whole length
    sheet.sequence.position = scroll.offset * sequenceLength

  })

  useEffect(
    () => {
      // if `theatreObject` is `null`, we don't need to do anything
      if (!theatreObject) return

      const unsubscribe = theatreObject.onValuesChange((newValues) => {
        // Apply the new offset to our THREE.js object
        //threeRef.current.colortype = newValues.colortype
        matRef.current.color = newValues.colortype
      })
      // unsubscribe from the listener when the component unmounts
      return unsubscribe
    },
    // We only want to run this `useEffect()` when `theatreObject` changes
    [theatreObject],
  )



  return (
    <>
      <color attach='background' args={['skyblue']} />
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.2} />
      <editable.pointLight theatreKey="Light" position={[10, 10, 10]} />


      <editable.mesh theatreKey="Box" additionalProps={{ colortype }} ref={threeRef} objRef={setTheatreObject}>
        <Box >
          <meshStandardMaterial ref={matRef} color={"#db2d2d"} />
        </Box>
      </editable.mesh>




      <editable.mesh theatreKey="Cylinder">
        <Cylinder >
          <meshStandardMaterial color="forestgreen" />
        </Cylinder>
      </editable.mesh>
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 5]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  )
}


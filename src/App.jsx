import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Box, Sky, Cylinder } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import { SheetProvider, PerspectiveCamera, useCurrentSheet, editable } from "@theatre/r3f";

function App() {

  const sheet = getProject('Bouncy Box').sheet('Scene')


  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={1} damping={0.5} maxSpeed={0.5}>
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

  //our callback will run on every animation frame
  useFrame(() => {

    //the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length)

    //update the "position" of trhe playhead in the  sequence as a fraction of the whole length
    sheet.sequence.position = scroll.offset * sequenceLength

  })
  return (
    <>
      <color attach='background' args={['skyblue']} />
      <Sky sunPosition={[100, 20, 100]}  />
      <ambientLight intensity={0.2} />
      <editable.pointLight theatreKey="Light" position={[10, 10, 10]} />
      <editable.mesh  theatreKey="Box">
      <Box >
        <meshStandardMaterial color="hotpink" />
      </Box>
      </editable.mesh>
      <editable.mesh  theatreKey="Cylinder">
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

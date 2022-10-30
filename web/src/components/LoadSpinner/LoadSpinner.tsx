import { ThemeIcon } from '@mantine/core'
import { useSpring, animated } from '@react-spring/web'
type LoadSpinnerProps = {
  width?: string | number
  height?: string | number
  iconStyles?: object,
  themeIconProps?: object
}

// icon from <icon-tabler-loader-3>

const InnerCirclePath = () => {

  const springStyles = useSpring({
    loop: true,
    from:
      {
        transform: "rotate(0deg)",
        transformOrigin: "center"
      },
    to:
      {
        transform: "rotate(360deg)",
        transformOrigin: "center"
      },
    config: {
      duration: 2000
    }
  })

  return (
    <animated.path
      id="innerCircle" d="M17 12a5 5 0 1 0 -5 5"
      style={springStyles}
    ></animated.path>
  )
}

const OuterCirclePath = () => {
  const springStyles = useSpring({
    loop: true,
    from:
      {
        transform: "rotate(0deg)",
        transformOrigin: "center"
      },
    to:
      {
        transform: "rotate(-360deg)",
        transformOrigin: "center"
      },
    config: {
      duration: 2000
    }


  })

  return (
    <animated.path
      id="outerCircle"
      d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"
      style={springStyles}
    ></animated.path>
  )
}


const LoadSpinner = (
  {
    width,
    height,
    iconStyles={},
    themeIconProps={backgroundColor: "rgba(0, 0, 0, 0)"}
  }: LoadSpinnerProps) => {


  return (
    <ThemeIcon sx={{...themeIconProps}}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-loader-3"
        width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"
        {...{...iconStyles, width, height}}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <InnerCirclePath />
        <OuterCirclePath />
      </svg>
    </ThemeIcon>
  )
}

export default LoadSpinner

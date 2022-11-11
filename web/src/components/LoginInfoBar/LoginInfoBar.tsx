
import { Anchor, createStyles, Group, Text } from "@mantine/core"

import { useAuth } from "@redwoodjs/auth"
import { Link, routes } from "@redwoodjs/router"


const useStyles = createStyles(() => ({
  loginInfoBar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: '0 12px 12px 0',
    fontSize: '14px'
  },
  useSpace: {
    marginLeft: '0.25em',
  }
}))


const DisplayUser = (props) => {
  /*
    with user.name: Admin <admin@agilemind.com>
    without:        admin@agilemind.com

  */
  const {user} = props;

  const userString =
    user.name?
      `${user.name} <${user.email}>` : user.email;

  return <Text {...props}>{userString}</Text>
}

const LoginInfoBar = () => {

  const { classes } = useStyles();

  const { currentUser, logOut } = useAuth()

  const WithUser = <>
      Signed in as:
    <DisplayUser user={currentUser} className={classes.useSpace}/>
    <Anchor component={Link} to="#" onClick={logOut} className={classes.useSpace}>
          Sign Out?
    </Anchor>
  </>

  const WithoutUser = <>
    <Anchor component={Link} to={routes.login()} title={"Login"}>
      Log In
    </Anchor>
    <span className={classes.useSpace}>or</span>
    <Anchor
      component={Link}
      to={routes.signup()}
      title={"Sign Up"}
      className={classes.useSpace}
    >
      Sign Up
    </Anchor>
  </>

  return <Group className={classes.loginInfoBar} spacing={0}>
    {currentUser? WithUser : WithoutUser}
  </Group>
}

export default LoginInfoBar


import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SocialButton from '../components/socialButton'
import UserCard from '../components/userCard'


import SocialLogin from '../../src/index'


const Detail = ({ label, data }) => (
  <div style={{ fontSize: '.8rem' }}>
    <label style={{ color: COLORS.lightColor, paddingRight: '.25rem' }}>{label} :</label>
    <span>{data}</span>
  </div>
)

 const cardStyle= {
  boxShadow: '0 0 15px rgba(0,0,0,0.25)',
  background: COLORS.background,
  borderRadius: '5px',
  color: COLORS.color,
  display: 'flex',
  flexDirection: 'column',
  minWidth: '10em',
  maxWidth: '25em'
}

const AccessToken = ({ token }) => {
  const codeStyle = {
    fontFamily: 'monospace',
    wordWrap: 'break-word',
    margin: '.5em 0',
    padding: '.5em',
    fontSize: '85%',
    backgroundColor: 'rgba(27,31,35,0.05)',
    borderRadius: '3px'
  }

  return (
    <div style={{ fontSize: '.8rem' }}>
      <label style={{ color: COLORS.lightColor, paddingRight: '.25rem' }}>Access token :</label>
      <div style={codeStyle}>{token}</div>
    </div>
  )
}

class UserCard extends Component {
  static propTypes = {
    user: PropTypes.shape({
      _profile: PropTypes.object,
      _token: PropTypes.object
    }),
    logout: PropTypes.func
  }

  render () {
    const { user: { _profile, _token }, logout } = this.props
    let expiration = 'unknown'

    if (_token.expiresAt === Infinity) {
      expiration = 'never/unknown (see provider doc)'
    } else if (_token.expiresAt) {
      const date = new Date(_token.expiresAt)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()

      if (month < 10) month = `0${month}`
      if (day < 10) day = `0${day}`
      if (hour < 10) hour = `0${hour}`
      if (minute < 10) minute = `0${minute}`

      expiration = `${month}/${day}/${year} ${hour}:${minute}`
    }

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'left'
      },
      avatar: {
        background: COLORS.background,
        boxShadow: '0 0 12px rgba(0,0,0,0.5)',
        border: `5px solid ${COLORS.white}`,
        borderRadius: '50%',
        height: '7em',
        width: '7em',
        zIndex: '1'
      },
      content: {
        ...cardStyle,
        marginTop: '-.75rem'
      },
      dataContainer: {
        padding: '1.5rem 2rem'
      },
      id: {
        fontSize: '.5rem',
        margin: '-.2rem 0'
      },
      name: {
        fontSize: '1.5rem',
        marginBottom: '.5rem'
      },
      button: {
        color: COLORS.red,
        border: 'none',
        width: '100%',
        padding: '.5rem',
        fontSize: '1em',
        textTransform: 'uppercase'
      }
    }

    const avatar = _profile.profilePicURL ||
      'https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png'

    return (
      <div style={styles.container}>
        <img style={styles.avatar} src={avatar} />
        <div style={styles.content}>
          <div style={styles.dataContainer}>
            <div style={styles.id}>ID {_profile.id}</div>
            <div style={styles.name}>{_profile.name}</div>
            <Detail label='Firstname' data={_profile.firstName} />
            <Detail label='Lastname' data={_profile.lastName} />
            <Detail label='Email' data={_profile.email} />
            <Detail label='Expiration' data={expiration} />
            <AccessToken token={_token.accessToken} />
          </div>
          <button style={styles.button} onClick={logout}>Logout</button>
        </div>
      </div>
    )
  }
}


class Button extends Component {
  static propTypes = {
    triggerLogin: PropTypes.func.isRequired,
    triggerLogout: PropTypes.func.isRequired
  }

  render () {
    const { children, triggerLogin, triggerLogout, ...props } = this.props
    const style = {
      background: '#eee',
      border: '1px solid black',
      borderRadius: '3px',
      display: 'inline-block',
      margin: '5px',
      padding: '10px 20px'
    }

    return (
      <div onClick={triggerLogin} style={style} {...props}>
        { children }
      </div>
    )
  }
}


const COLORS = {
  white: '#fff',
  background: '#eceff1',
  color: '#123',
  lightColor: '#567',
  red: '#d62d20'
}

const SocialButton = SocialLogin(Button);

export default class Demo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      logged: false,
      user: {},
      currentProvider: ''
    }
    this.nodes = {}

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
    this.onLogoutFailure = this.onLogoutFailure.bind(this)
    this.logout = this.logout.bind(this)
  }

  setNodeRef (provider, node) {
    if (node) {
      this.nodes[ provider ] = node
    }
  }

  onLoginSuccess (user) {
    console.log(user)

    this.setState({
      logged: true,
      currentProvider: user._provider,
      user
    })
  }

  onLoginFailure (err) {
    console.error(err)

    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutSuccess () {
    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutFailure (err) {
    console.error(err)
  }

  logout () {
    const { logged, currentProvider } = this.state

    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }

  render () {
    let children

    if (this.state.logged) {
      children = <UserCard user={this.state.user} logout={this.logout} />
    } else {
      children = [
        <SocialButton
          provider='facebook'
          appId={process.env.FB_APP_ID}
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          getInstance={this.setNodeRef.bind(this, 'facebook')}
          key={'facebook'}
        >
          Login with Facebook
        </SocialButton>,
        <SocialButton
          provider='google'
          appId='844845104372-h8htjngp1os1tb79nksc54dq7tko4r8n.apps.googleusercontent.com'
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          onLogoutFailure={this.onLogoutFailure}
          getInstance={this.setNodeRef.bind(this, 'google')}
          key={'google'}
        >
          Login with Google
        </SocialButton>,
        <SocialButton
          autoCleanUri
          provider='instagram'
          appId='afdf675d26214280ac9a792afea5651c'
          redirect={process.env.INSTAGRAM_REDIRECT}
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          getInstance={this.setNodeRef.bind(this, 'instagram')}
          key={'instagram'}
        >
          Login with Instagram
        </SocialButton>,
        <SocialButton
          provider='linkedin'
          appId='7775kne2guetd0'
          onLoginSuccess={this.onLoginSuccess}
          onLoginFailure={this.onLoginFailure}
          onLogoutSuccess={this.onLogoutSuccess}
          getInstance={this.setNodeRef.bind(this, 'linkedin')}
          key={'linkedin'}
        >
          Login with LinkedIn
        </SocialButton>
      ]

      // Amazon only supports HTTPS
      if (window.location.protocol === 'https:') {
        children.push(
          <SocialButton
            provider='amazon'
            appId='amzn1.application-oa2-client.26aaf63624854cbcaa084735a0fc47ed'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'amazon')}
            key={'amazon'}
          >
            Login with Amazon
          </SocialButton>
        )
      } else {
        // We don’t use HTTPS because of Gatekeeper, but it can be enabled if Gatekeeper is served over HTTPS
        children.push(
          <SocialButton
            autoCleanUri
            provider='github'
            gatekeeper='http://localhost:9999'
            appId='8a7c2edb2e602d969839'
            redirect='http://localhost:8080'
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'github')}
            key={'github'}
          >
            Login with GitHub OAuth
          </SocialButton>
        )
      }
    }

    return children
  }
}
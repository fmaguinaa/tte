import React, { Component, Fragment } from 'react'
import Routes from '../../routes/Routes'
// import {
//   Route,
//   Switch
// } from 'react-router-dom'
// import * as paths from '../../routes/paths'

// import Landing from '../landing/Landing'

import LandingLayout from '../../layout/LayoutWrapper'


export default class Root extends Component {
  render() {
    const {history} = this.props
    return (
      <Fragment>
        {/* <Header /> */}

        {/* <Switch> */}
        {/* <LandingLayout history={this.props.history}>
          <Landing/>
        </LandingLayout> */}
        {/* <Route exact path={paths.student} component={()=>Landing}/> */}
        {/* <LandingLayout exact path={paths.landing} component={Landing} /> */}
        {/* <Route exact path={paths.landing} component={()=>Landing}/> */}


        {/* <Route exact path={paths.student} render={() => 
          <StudentLayout history={this.props.history}>
            <Student/>
          </StudentLayout>}
        /> */}
        {/* <Route exact path={paths.tutor} render={() => 
          <TutorLayout history={this.props.history}>
            <Tutor/>
          </TutorLayout>}
        /> */}

        {/* <Route exact path={paths.landing} component={Landing}/> */}
        {/* <Route exact path={paths.login} component={Login}/>
          <Route exact path={paths.recuperar} component={ForgotPassword}/>
          <Route exact path={paths.recuperacion} component={ChangePassword}/> */}
        <LandingLayout history={history}>
            <Routes/>
          </LandingLayout>
        {/* <Routes /> */}
        {/* </Switch> */}
        {/* <Footer /> */}
      </Fragment>
    )
  }
}


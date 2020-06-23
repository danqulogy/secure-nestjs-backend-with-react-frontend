import React from 'react';
import { connect } from 'react-redux';


class Profile extends React.Component {
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <h1>Profile</h1>
        <p>Welcome to your profile page</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(Profile);

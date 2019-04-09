import React, { Component } from 'react';
import AppContainer from './src/navigation/app-container';
import { getPhotosFromAzure } from './src/utilities/cloud';
import { updatePhotos } from './src/state/photos/actions';

class AppWrapper extends Component {
    async componentDidMount(){
        let photos = await getPhotosFromAzure();
        this.props.onUpdatePhotos(photos);
    }
    
    render() {
        return (
            <AppContainer />
        );
    }
}

const mapDispatchToProps = {
  onUpdatePhotos: updatePhotos 
};
  
const mapStateToProps = ({photos}) => ({
  photos
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
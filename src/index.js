import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetails from './components/video_detail';
import _ from 'lodash';
const API_Key = 'AIzaSyAKu93FaHihPkz19t4eT2I9VHjZIV2X0Vs';

class App extends Component{
    constructor(props){
        super(props);
        this.state ={
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('avicii');
        
    }

    videoSearch(term){
        YTSearch({key: API_Key, term: term},(videos)=>{
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }
    render(){
        const videSearch = _.debounce((term)=>{this.videoSearch(term)},300);
        return (
        <div>
            <SearchBar onSearchTermChange={videSearch}/>
            <VideoDetails video={this.state.selectedVideo} />
            <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos} />
        </div>);
    }
}


ReactDOM.render(<App/>, document.querySelector('.container'));
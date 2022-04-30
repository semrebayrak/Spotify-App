import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import AuthService from '../../../auth';
import { item } from '../../../models/item';



interface IDiscoverProps { }

interface IDiscoverState {
  newReleases: Array<item>;
  playlists: Array<item>;
  categories: Array<item>;
}

export default class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };


    this.componentDidMount = async () => {

      const token = await AuthService.login();
      const newReleases = await AuthService.fetchData("new-releases", token);
      const playlists = await AuthService.fetchData("featured-playlists", token);
      const categories = await AuthService.fetchData("categories", token);

      this.setState({
        newReleases: newReleases.albums.items,
        playlists: playlists.playlists.items,
        categories: categories.categories.items
      });


    }


  }
  render() {
    const { newReleases, playlists, categories } = this.state;




    return (
      <div className="discover">


        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}

import { gql } from "@apollo/client"

export const getSongList= gql`
query Query($playlistId: Int!) {
  getPlaylists {
      id
      title
    }
    getSongs(playlistId: $playlistId) {
      _id
      title
      photo
      url
      duration
      artist
    }
  
}
  `;

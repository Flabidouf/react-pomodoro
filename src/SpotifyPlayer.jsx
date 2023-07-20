import React from "react";

 //Add a spotify playlis
const SpotifyPlayer = () => {

  const iframe = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/7rB7MFt8w3QkwIyVRefJic?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`

  function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""} } />)
  }
  return (
    <div>
      <h2 className="h-title">Here is some southing music</h2>
      <Iframe iframe={iframe} />
    </div>
  )
}

//By wrapping the SpotifyPlayer component with React.memo, you ensure that the component is 
//only re-rendered when its props change. This prevents unnecessary re-renders 
  

export default React.memo(SpotifyPlayer)
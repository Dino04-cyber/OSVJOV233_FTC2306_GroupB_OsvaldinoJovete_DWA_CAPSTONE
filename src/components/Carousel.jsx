import React from "react"
import ShowDescription from "./ShowDescription"
import ShowSeasons from "./ShowSeasons"

export default function Carousel() {
    const [carousel, setCarousel] = React.useState([])
    const [selectedShow, setSelectedShow] = React.useState(false)
    const [seasonButton, setSeasonButton] = React.useState(null)
    const [openDialog, setOpenDialog] = React.useState(false)

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      
      const shuffledCarousel = shuffleArray(carousel);
      
      // Set the number of random images
      const maxImages = 15;
      const displayedCarousel = shuffledCarousel.slice(0, maxImages);
      


    React.useEffect(() => {
        fetchShows()
    }, [])


    const fetchShows = async () => {
        const response = await fetch("https://podcast-api.netlify.app/shows")
        const data = await response.json()
        setCarousel(data)
    }

    function togglePreview(show) {
        setSelectedShow(show)
    }

    function handleClose() {
        setSelectedShow(null)
    }

    function toggleSeasonId(item) {
        setSeasonButton(item)
        setOpenDialog(true)
    }

    function onCloseDialog() {
        setOpenDialog(false)
    }

    return (
        <div className="carousel-box">

            {displayedCarousel.map(show => (
                <div key={show.id} className="carousel">
                    <img
                        src={show.image}
                        className="carousel-images"
                        alt={show.title}
                        onClick={() => togglePreview(show)}
                    />

                </div>))
            }

            {selectedShow && (
                <ShowDescription
                    image={selectedShow.image}
                    description={selectedShow.description}
                    text={selectedShow.description}
                    limit={200}
                    seasons={selectedShow.seasons}
                    onClose={handleClose}
                    showSeasons={() => toggleSeasonId(selectedShow.id)} />

            )}

            {openDialog && (
                <ShowSeasons
                    seasonId={seasonButton}
                    openDialog={openDialog}
                    onClose={onCloseDialog}
                />
            )}

        </div>
    )
}
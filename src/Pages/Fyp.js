import '../App.css';
import TinderCard from 'react-tinder-card';
import {useState } from 'react';
import Header from '../Components/Header';

// Test list of colleges
// Eventually want to make this list AI-generated and infinite
const dbRecommendedColleges = [
    {
        name: "Some College",
        location: "Some city in some state",
        size: "Some number of students",
        notables: "list some features they may like about it",
        imgUrl: "A nice picture of its campus",
    },
    {
        name: "Some College",
        location: "Some city in some state",
        size: "Some number of students",
        notables: "list some features they may like about it",
        imgUrl: "A nice picture of its campus",
    },
    {
        name: "Some College",
        location: "Some city in some state",
        size: "Some number of students",
        notables: "list some features they may like about it",
        imgUrl: "A nice picture of its campus",
    },
    {
        name: "Some College",
        location: "Some city in some state",
        size: "Some number of students",
        notables: "list some features they may like about it",
        imgUrl: "A nice picture of its campus",
    },
    {
        name: "Some College",
        location: "Some city in some state",
        size: "Some number of students",
        notables: "list some features they may like about it",
        imgUrl: "A nice picture of its campus",
    },
    {
        name: "Some College",
        location: "Some city in some state",
        size: "Some number of students",
        notables: "list some features they may like about it",
        imgUrl: "A nice picture of its campus",
    },
    {
        name: "Some College",
        location: "Some city in some state",
        size: "Some number of students",
        notables: "list some features they may like about it",
        imgUrl: "A nice picture of its campus",
    },
]

function Fyp() {
    const recommendedColleges = dbRecommendedColleges
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <div className="fyp">
            <div className="swiper-container">
                <div className="card-container">
                    {recommendedColleges.map((college) =>
                        <TinderCard className='swipe' key={college.name} onSwipe={(dir) => swiped(dir, college.name)} onCardLeftScreen={() => outOfFrame(college.name)}>
                            <div style={{ backgroundImage: 'url(' + college.url + ')' }} className='card'>
                            <h3>{college.name}</h3>
                            </div>
                        </TinderCard>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Fyp;
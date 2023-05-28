import React from 'react'
import {Rating} from "@material-ui/lab"
import profilePng from "../../images/profile.jpg"
import "./ReviewCard.css"

const ReviewCard = ({review}) => {

    const options = {
        value : review.rating,
        precision : 0.5,
        readOnly : true
    };

    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    )
}

export default ReviewCard

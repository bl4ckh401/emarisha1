import React from "react"
import "./Angel.css"

function Angel(){
   return(
     <div className="Angel">
        <button >
           Become an Investor
        </button>
        <div className="investors">
           <h4>Want to Get in-touch with an Investor?</h4>
           <p>Attach your Proposal below and we'll connect you</p>
        </div>
        <div className="business_plan">
        <div className="buttons">
          <button>
           Executive Summary
          </button>
          <button>
           Introduction
          </button>
          <button>
           Business Description
          </button>
          <button>
           Market Analysis & Strategy
          </button>
          <button>
           Competitive Analysis
          </button>
          <button>
           Management and Organization Description
          </button>
          <button>
          Products and services description          
          </button>
          <button>
            Operating plan
          </button>
          <button>
           Financial projections
          </button>
          </div>
          <div className="textbox">
          <textarea className="insert">
          </textarea>
          </div>
          <button >SUBMIT PROPOSAL</button>
           </div>
                     <h1>Have a target Investor? Here's our Most esteemed investors and Partners. </h1>

     </div> 
  ) 
}
export default Angel
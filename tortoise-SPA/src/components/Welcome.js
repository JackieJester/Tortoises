import { Component } from "react";

class Welcome extends Component{
    render(){
        return(
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <h1>Welcome to the tortoise bedroom</h1>
            </div>
            <div className='row justify-content-center'>
                <p>Here we prepare tortoises for their slumber</p>
            </div>
        </div>

        )
    }
}

export default Welcome
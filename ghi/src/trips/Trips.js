import { Link } from 'react-router-dom'
import { useGetTripsQuery } from '../store/tripsApi'
export default Trips

// GET LIST OF ALL TRIPS
function Trips() {
    const { data, error, isLoading } = useGetTripsQuery()

    if (isLoading) {
        return (
           <progress className="progress is-primary" max="100"></progress>
        )
    }

    return (
        <div>
            <h1>Your Trips</h1>
            <table class="table is-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>

                </thead>
            </table>

        </div>
    )


}

export function enterLocations(Location) {
    Location.find({}, (err, data) => {
        if (data.length === 0) {
            console.log('here');
            createLocationFromData(Location);
        }
    })
}

function createLocationFromData(Location) {
    Location.create([{
        nearest: 'Melbourne',
        psh: 3.6,
        flat_roof_loss: 14,
        south_direction_loss: 25
    }, {
        nearest: 'Sydney',
        psh: 3.9,
        flat_roof_loss: 13,
        south_direction_loss: 25
    }, {
        nearest: 'Brisbane',
        psh: 4.2,
        flat_roof_loss: 10,
        south_direction_loss: 20
    }, {
        nearest: 'Perth',
        psh: 4.4,
        flat_roof_loss: 12,
        south_direction_loss: 25
    }, {
        nearest: 'Adelaide',
        psh: 4.2,
        flat_roof_loss: 13,
        south_direction_loss: 25
    }, {
        nearest: 'Canberra',
        psh: 4.3,
        flat_roof_loss: 13,
        south_direction_loss: 25
    }, {
        nearest: 'Cairns',
        psh: 4.2,
        flat_roof_loss: 5,
        south_direction_loss: 15
    }, {
        nearest: 'Hobart',
        psh: 3.5,
        flat_roof_loss: 18,
        south_direction_loss: 30
    }, {
        nearest: 'Darwin',
        psh: 4.4,
        flat_roof_loss: 4,
        south_direction_loss: 14
    }, {
        nearest: 'Alice Springs',
        psh: 5,
        flat_roof_loss: 10,
        south_direction_loss: 20
    }]);
}

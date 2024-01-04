var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var times = ['morning', 'afternoon', 'evening', 'night', 'day'];

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let name = event.name === undefined ? 'you' : event.name;
    let city = event.city === undefined ? 'World' : event.city;
    let time = times.indexOf(event.time) < 0 ? 'day' : event.time;
    let day = days.indexOf(event.day) < 0 ? null : event.day;

    let greeting = 'Good ' + time + ', ' + name + ' of ' + city + '. Happy ' + day + ' ! ';
    console.log('Message: ' + greeting);

    return greeting;
}
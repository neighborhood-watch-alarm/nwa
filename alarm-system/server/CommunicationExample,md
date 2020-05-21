Every N time period
Sensor sends uplink:
{
	armStatus : boolean,
}
Response:
Backend responds with downlink
{
	armStatus : boolean
}

IF a trigger occurs on a sensor that is not a panic alarm:
Sensor sends uplink:
{
	tripped : true,
	panic : false
}
Response:
Backend responds with downlink
{
	armStatus : boolean
}
IF a trigger occurs on a sensor that is  a panic alarm:

input: Panic Alarm is triggered
Sensor sends uplink:
{
	tripped	  : boolean
	panic : true
}

Response:
Backend starts alarming everyone.



When the keypad has a code enterred
Keypad sends uplink:
{
	password : string
}
Response:
Backend sends downlink
{
	response : boolean
}

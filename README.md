nwaDTUBackend
Every N time period.
If there is a different ArmStatus it toggles the device.
Sensor sends uplink:
{
	armStatus : boolean
	panic : false,
	armStatus : true,
	response : false
	password : string	
}

Response:
Backend responds with downlink
{
	armStatus : boolean
	panic : false,
	armStatus : true,
	response : false
	password : string
}

IF a trigger occurs on a sensor that is not a panic alarm:
Sensor sends uplink:
{
		armStatus : boolean
	panic : false,
	armStatus : true,
	response : false
	password : string

}


Response:
Backend responds with downlink
{
	tripped : false,
	panic : false
	armStatus : boolean
}


IF a trigger occurs on a sensor that is  a panic alarm:

input: Panic Alarm is triggered
Sensor sends uplink:
{
	tripped : true,
	panic : false,
	armStatus : true
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

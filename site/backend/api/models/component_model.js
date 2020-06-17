const ac = require("./atomic_component.js");
//CONTROL PANEL
const controlPanel = [
  {
    ac: ac.arduinoMega,
    amount: 1
  },
  {
    ac: ac.draginoLoraShield,
    amount: 1
  },
  {
    ac: ac.lcd,
    amount: 1
  },
  {
    ac: ac.keypad,
    amount: 1
  },
  {
    ac: ac.pushButton,
    amount: 1
  },
  {
    ac: ac.breadboard,
    amount: 1
  },
  {
    ac: ac.cable,
    amount: 1
  },
  {
    ac: ac.powerSupply,
    amount: 1
  },
  {
    ac: ac.usbCharger,
    amount: 1
  }
];

//SENSOR NODE
const sensorNode = [
  {
    ac: ac.arduinoUno,
    amount: 1
  },
  {
    ac: ac.draginoLoraShield,
    amount: 1
  },
  {
    ac: ac.breadboard,
    amount: 1
  },
  {
    ac: ac.cable,
    amount: 1
  },
  {
    ac: ac.powerSupply,
    amount: 1
  },
  {
    ac: ac.usbCharger,
    amount: 1
  }
];
//CONTROL PANEL SETUPS
const cpPir = {
  name: "cp-pir",
  type: controlPanel,
  components: [
    {
      ac: ac.pir,
      amount: 1
    },
    {
      ac: ac.maleToMaleWire,
      amount: 1
    },
    {
      ac: ac.maleToFemaleWire,
      amount: 1
    },
    {
      ac: ac.smallWire,
      amount: 1
    }
  ]
};
const cpLidar = {
  name: "cp-lidar",
  type: controlPanel,
  components: [
    {
      ac: ac.lidar,
      amount: 1
    },
    {
      ac: ac.maleToMaleWire,
      amount: 10
    },
    {
      ac: ac.maleToFemaleWire,
      amount: 10
    },
    {
      ac: ac.smallWire,
      amount: 10
    }
  ]
};
const cpUs = {
  name: "cp-us",
  type: controlPanel,
  components: [
    {
      ac: ac.usSensor,
      amount: 1
    },
    {
      ac: ac.maleToMaleWire,
      amount: 100
    },
    {
      ac: ac.maleToFemaleWire,
      amount: 100
    },
    {
      ac: ac.smallWire,
      amount: 100
    }
  ]
};
//SENSOR NODES SETUPS
const snPir = {
  name: "sn-pir",
  type: sensorNode,
  components: [
    {
      ac: ac.pir,
      amount: 1
    },
    {
      ac: ac.maleToMaleWire,
      amount: 0.3
    },
    {
      ac: ac.maleToFemaleWire,
      amount: 0.5
    },
    {
      ac: ac.smallWire,
      amount: 0.8
    }
  ]
};
const snLidar = {
  name: "sn-lidar",
  type: sensorNode,
  components: [
    {
      ac: ac.lidar,
      amount: 1
    },
    {
      ac: ac.maleToMaleWire,
      amount: 1
    },
    {
      ac: ac.maleToFemaleWire,
      amount: 1
    },
    {
      ac: ac.smallWire,
      amount: 1
    }
  ]
};
const snUs = {
  name: "sn-us",
  type: sensorNode,
  components: [
    {
      ac: ac.usSensor,
      amount: 1
    },
    {
      ac: ac.maleToMaleWire,
      amount: 1.5
    },
    {
      ac: ac.maleToFemaleWire,
      amount: 1.5
    },
    {
      ac: ac.smallWire,
      amount: 1.5
    }
  ]
};
exports.devices = [cpPir, cpLidar, cpUs, snPir, snLidar, snUs];
